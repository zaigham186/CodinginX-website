import { siteConfig } from "@/config/siteConfig";
import "server-only";
import { contactSchema } from "@/lib/validation";
import { acknowledgeInquiry, deliverInquiry } from "./email";
import { emailConfigured, serverConfig } from "./config";
import {
  clientIdentity,
  digest,
  enforceOrigin,
  errorResponse,
  HttpError,
  json,
  privateIdentifier,
  readJson,
  requestId,
  safeLog,
} from "./http";
import { reserveDelivery, updateDelivery } from "./state";

function deliveredResponse(id: string, acknowledgement: "sent" | "pending") {
  return json({
    ok: true,
    message:
      acknowledgement === "sent"
        ? "Your inquiry has been accepted for delivery to CodinginX. A confirmation email has also been queued."
        : "Your inquiry has been accepted for delivery to CodinginX. We could not send a confirmation email. You do not need to submit it again.",
    requestId: id,
    acknowledgement,
  });
}

export async function handleContact(request: Request) {
  const id = requestId();
  try {
    enforceOrigin(request);
    const input = await readJson(request, 16_384);
    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (
          typeof field === "string" &&
          field !== "submissionId" &&
          field !== "websiteTrap" &&
          !fieldErrors[field]
        )
          fieldErrors[field] = issue.message;
      }
      return json(
        {
          ok: false,
          message: "Please check the highlighted fields and try again.",
          fieldErrors,
          requestId: id,
        },
        400,
      );
    }
    const data = parsed.data;
    if (data.websiteTrap)
      throw new HttpError(
        400,
        `We could not process this inquiry. Please email ${siteConfig.emails.general}.`,
      );
    if (!emailConfigured())
      throw new HttpError(
        503,
        `Inquiry delivery is temporarily unavailable. Please email ${siteConfig.emails.general}.`,
        "email_unconfigured",
      );
    const config = serverConfig();
    const identity = clientIdentity(request);
    const day = new Date().toISOString().slice(0, 10);
    const reservation = await reserveDelivery(
      data.submissionId,
      digest(JSON.stringify(data)),
      id,
      [
        { key: `contact:visitor:${identity}`, maximum: 5, seconds: 900 },
        {
          key: `contact:recipient:${privateIdentifier(data.email)}:${day}`,
          maximum: 3,
          seconds: 86_400,
        },
        {
          key: `contact:global:${day}`,
          maximum: config.contactDailyCap,
          seconds: 86_400,
        },
      ],
    );
    if (reservation.status === "delivered")
      return deliveredResponse(id, reservation.acknowledgement);
    if (reservation.status === "conflict")
      throw new HttpError(
        409,
        "This inquiry reference was already used for different details. Start a new inquiry.",
      );
    if (reservation.status === "busy")
      throw new HttpError(
        409,
        "This inquiry is already being processed. Wait a moment, then retry.",
        "inquiry_processing",
        10,
      );
    if (reservation.status === "limited")
      throw new HttpError(
        429,
        `We have reached the inquiry limit for now. Please try later or email ${siteConfig.emails.general}.`,
        "rate_limited",
        900,
      );
    try {
      await deliverInquiry(data);
    } catch (error) {
      // Keep the fingerprint and provider idempotency key for safe timeout retries.
      try {
        await updateDelivery(data.submissionId, id, "processing");
      } catch {
        safeLog("/api/contact", "release_delivery", id, "state_update_failed");
      }
      throw error;
    }
    // Persist delivery before attempting the secondary acknowledgement.
    await updateDelivery(data.submissionId, id, "delivered");
    try {
      await acknowledgeInquiry(data);
      await updateDelivery(data.submissionId, id, "delivered", "sent");
      return deliveredResponse(id, "sent");
    } catch {
      safeLog("/api/contact", "acknowledgement", id, "acknowledgement_pending");
      return deliveredResponse(id, "pending");
    }
  } catch (error) {
    return errorResponse(error, "/api/contact", id);
  }
}
