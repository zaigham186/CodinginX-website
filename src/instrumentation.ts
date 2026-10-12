import type { Instrumentation } from "next";

/** Operational metadata only. Never forward exception text, headers, or visitor content. */
export const onRequestError: Instrumentation.onRequestError = async (
  _error,
  _request,
  context,
) => {
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      operation: "request_error",
      route: context.routePath,
      category: "server_render_or_handler_failure",
      requestId: crypto.randomUUID(),
    }),
  );
};
