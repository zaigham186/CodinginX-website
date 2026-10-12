import { siteConfig } from "@/config/siteConfig";
import "server-only";
import { serverConfig } from "./config";
import { HttpError, providerJson } from "./http";

export type Limit = { key: string; maximum: number; seconds: number };
type Delivery = {
  fingerprint: string;
  owner: string;
  lockUntil: number;
  status: "processing" | "delivered";
  acknowledgement: "sent" | "pending";
};
type Reservation =
  | { status: "reserved" }
  | { status: "delivered"; acknowledgement: "sent" | "pending" }
  | { status: "busy" | "conflict" | "limited" };

const prefix = "codinginx:v1:";
// Shorter than the email provider's 24-hour idempotency window.
const deliveryTtl = 23 * 60 * 60;
const lockDuration = 60_000;
const memory = new Map<string, { value: number | Delivery; expires: number }>();

function cleanMemory() {
  for (const [key, value] of memory)
    if (value.expires <= Date.now()) memory.delete(key);
  if (memory.size > 10_000)
    throw new HttpError(
      503,
      "This service is temporarily unavailable.",
      "local_state_capacity",
    );
}

function redisConfig() {
  const config = serverConfig();
  if (config.redisUrl && config.redisToken) {
    let valid = false;
    try {
      const url = new URL(config.redisUrl);
      valid =
        url.protocol === "https:" &&
        url.hostname.endsWith(".upstash.io") &&
        !url.username &&
        !url.password &&
        !url.search &&
        !url.hash &&
        url.pathname === "/";
    } catch {
      /* Invalid configuration fails closed. */
    }
    if (!valid)
      throw new HttpError(
        503,
        "This service is temporarily unavailable.",
        "redis_configuration_invalid",
      );
    return config;
  }
  if (config.production)
    throw new HttpError(
      503,
      `This service is temporarily unavailable. Please email ${siteConfig.emails.general}.`,
      "distributed_state_unconfigured",
    );
  return null;
}

async function evalRedis(script: string, keys: string[], args: string[]) {
  const config = redisConfig();
  if (!config) throw new Error("redis_unavailable");
  try {
    const { response, body } = await providerJson(
      config.redisUrl,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "EVAL",
          script,
          keys.length,
          ...keys.map((key) => prefix + key),
          ...args,
        ]),
      },
      3000,
    );
    if (
      !response.ok ||
      !body ||
      typeof body !== "object" ||
      !("result" in body) ||
      "error" in body
    )
      throw new Error("redis_response_invalid");
    return (body as { result: unknown }).result;
  } catch {
    throw new HttpError(
      503,
      "This service is temporarily unavailable. Please try again later.",
      "distributed_state_unavailable",
    );
  }
}

const checkLimitsLua = `
for i = 1, #KEYS do
  if tonumber(redis.call('GET', KEYS[i]) or '0') >= tonumber(ARGV[(i - 1) * 2 + 1]) then return 0 end
end
for i = 1, #KEYS do
  local count = redis.call('INCR', KEYS[i])
  if count == 1 then redis.call('EXPIRE', KEYS[i], ARGV[(i - 1) * 2 + 2]) end
end
return 1`;

function memoryAllows(limits: Limit[]) {
  return limits.every(
    (limit) => Number(memory.get(limit.key)?.value || 0) < limit.maximum,
  );
}

function incrementMemory(limits: Limit[]) {
  for (const limit of limits) {
    const previous = memory.get(limit.key);
    memory.set(limit.key, {
      value: Number(previous?.value || 0) + 1,
      expires: previous?.expires || Date.now() + limit.seconds * 1000,
    });
  }
}

export async function consumeLimits(limits: Limit[]) {
  if (redisConfig())
    return (
      (await evalRedis(
        checkLimitsLua,
        limits.map((limit) => limit.key),
        limits.flatMap((limit) => [
          String(limit.maximum),
          String(limit.seconds),
        ]),
      )) === 1
    );
  cleanMemory();
  if (!memoryAllows(limits)) return false;
  incrementMemory(limits);
  return true;
}

const reserveLua = `
local previous = redis.call('GET', KEYS[1])
if previous then
  local data = cjson.decode(previous)
  if data.fingerprint ~= ARGV[1] then return {'conflict'} end
  if data.status == 'delivered' then return {'delivered', data.acknowledgement} end
  if data.lockUntil > tonumber(ARGV[3]) then return {'busy'} end
end
for i = 2, #KEYS do
  if tonumber(redis.call('GET', KEYS[i]) or '0') >= tonumber(ARGV[5 + (i - 2) * 2]) then return {'limited'} end
end
for i = 2, #KEYS do
  local count = redis.call('INCR', KEYS[i])
  if count == 1 then redis.call('EXPIRE', KEYS[i], ARGV[6 + (i - 2) * 2]) end
end
local data = {fingerprint=ARGV[1], owner=ARGV[2], lockUntil=tonumber(ARGV[3]) + 60000, status='processing', acknowledgement='pending'}
if previous then redis.call('SET', KEYS[1], cjson.encode(data), 'KEEPTTL') else redis.call('SET', KEYS[1], cjson.encode(data), 'EX', ARGV[4]) end
return {'reserved'}`;

export async function reserveDelivery(
  id: string,
  fingerprint: string,
  owner: string,
  limits: Limit[],
): Promise<Reservation> {
  const key = `delivery:${id}`;
  if (redisConfig()) {
    const result = await evalRedis(
      reserveLua,
      [key, ...limits.map((limit) => limit.key)],
      [
        fingerprint,
        owner,
        String(Date.now()),
        String(deliveryTtl),
        ...limits.flatMap((limit) => [
          String(limit.maximum),
          String(limit.seconds),
        ]),
      ],
    );
    if (
      !Array.isArray(result) ||
      !["reserved", "delivered", "busy", "conflict", "limited"].includes(
        result[0] as string,
      )
    )
      throw new HttpError(
        503,
        "This service is temporarily unavailable.",
        "state_response_invalid",
      );
    return result[0] === "delivered"
      ? {
          status: "delivered",
          acknowledgement: result[1] === "sent" ? "sent" : "pending",
        }
      : ({ status: result[0] } as Reservation);
  }
  cleanMemory();
  const entry = memory.get(key);
  const previous = entry?.value as Delivery | undefined;
  if (previous) {
    if (previous.fingerprint !== fingerprint) return { status: "conflict" };
    if (previous.status === "delivered")
      return { status: "delivered", acknowledgement: previous.acknowledgement };
    if (previous.lockUntil > Date.now()) return { status: "busy" };
  }
  if (!memoryAllows(limits)) return { status: "limited" };
  incrementMemory(limits);
  memory.set(key, {
    value: {
      fingerprint,
      owner,
      lockUntil: Date.now() + lockDuration,
      status: "processing",
      acknowledgement: "pending",
    },
    expires: entry?.expires || Date.now() + deliveryTtl * 1000,
  });
  return { status: "reserved" };
}

const updateLua = `
local previous = redis.call('GET', KEYS[1])
if not previous then return 0 end
local data = cjson.decode(previous)
if data.owner ~= ARGV[1] then return 0 end
data.status = ARGV[2]
data.acknowledgement = ARGV[3]
data.lockUntil = 0
redis.call('SET', KEYS[1], cjson.encode(data), 'KEEPTTL')
return 1`;

export async function updateDelivery(
  id: string,
  owner: string,
  status: "processing" | "delivered",
  acknowledgement: "sent" | "pending" = "pending",
) {
  const key = `delivery:${id}`;
  if (redisConfig()) {
    if (
      (await evalRedis(updateLua, [key], [owner, status, acknowledgement])) !==
      1
    )
      throw new HttpError(
        503,
        "Delivery status is temporarily unavailable. Please retry with the same inquiry.",
        "delivery_state_conflict",
      );
    return;
  }
  const entry = memory.get(key);
  if (entry && typeof entry.value !== "number" && entry.value.owner === owner)
    entry.value = { ...entry.value, status, acknowledgement, lockUntil: 0 };
}

export function clearLocalStateForTests() {
  if (process.env.NODE_ENV !== "test") throw new Error("test_only");
  memory.clear();
}
