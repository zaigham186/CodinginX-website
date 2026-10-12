export const dynamic = "force-dynamic";

// Liveness only. Integration readiness must be checked through the launch runbook.
export function GET() {
  return Response.json(
    { status: "ok" },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
