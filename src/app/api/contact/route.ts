import { handleContact } from "@/lib/server/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 45;

export const POST = handleContact;
