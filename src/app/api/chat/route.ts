import { handleChat } from "@/lib/server/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

export const POST = handleChat;
