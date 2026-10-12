# Security and data handling

This document records the intended boundaries and review criteria from master-prompt sections 58–62, 75–83 and 105–112. Implementation details and verification evidence must match the final source. See [launch-readiness.md](launch-readiness.md) for observed results and unresolved production inputs.

## System boundaries

The site uses Next.js route handlers for server work. There is no application database, user-account system, payment processor, file upload, admin dashboard or inbound webhook requirement. Content is maintained in source. Browser demonstrations must clearly disclose that they are demonstrations and must never imply production authentication or customer records.

The project inquiry crosses a trust boundary: untrusted visitor input is validated, bounded, spam/rate checked, deduplicated and sent through a server-only email provider. No visitor-controlled URL should be fetched. A submitted website URL is contact context, not an instruction to crawl a site. Browser success must mean the server accepted the intended operation; missing credentials and provider failures cannot become success states.

The structured site assistant works without an AI account. Optional AI uses a server-only provider with bounded input/output, cost/rate controls and timeouts. It must not accept instructions to invent company facts, quote binding prices or offer contracts. AI output is untrusted text and is never rendered as HTML.

Production Redis is a distributed technical control store for counters, idempotency keys/locks and their expiration. It does not store names, email addresses, project details, chat transcripts or full lead payloads. Hashing or HMACing an identifier makes it pseudonymous, not automatically nonpersonal; include relevant metadata handling in the reviewed policy.

Current state uses the `codinginx:v1:` key prefix. Delivery keys contain a submission UUID, SHA-256 request fingerprint, random operation owner ID, lock deadline, delivery status and acknowledgment status. They expire after 23 hours, below Resend's documented 24-hour idempotency window. The processing lock is 60 seconds. HMAC identifiers use the server-only rate secret. Contact caps are five attempts per visitor per 15 minutes, three per recipient per UTC day, and a configured global daily cap (default 100, maximum 1,000). The rate windows/counters expire; they are not a lead archive. The assistant uses a 20-message/10-minute visitor limit when the state service is available; optional AI adds ten requests per visitor per hour and a default 100-request global daily cap (maximum 1,000).

In nonproduction development, bounded in-memory state substitutes for Redis. Production paid operations require the secret and Redis. Structured, nonpaid assistant guidance deliberately remains available when that infrastructure is absent; its endpoint then does not have an application-level distributed limiter. Set appropriate host/WAF request protections in production and retain the paid-provider fail-closed behavior. `/api/health` reports liveness only, not delivery/provider readiness.

Email sends only plain text to fixed provider `api.resend.com`; sender credentials stay server-side. Optional AI calls the fixed OpenAI endpoint with the current message only, `store: false`, at most 32 output tokens, a six-second timeout and no retry. It classifies into approved topics; all displayed answers come from the maintained site knowledge. Provider retention behavior still requires review: `store: false` must not be represented as an unconditional provider data-retention guarantee.

## Applicability checklist

| Surface/control                               | Applies?                                    | Required handling                                                                                                                                               |
| --------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client validation                             | Yes                                         | Usable labels/errors, bounded fields, no duplicate pending submissions.                                                                                         |
| Server validation                             | Yes                                         | Independent schema validation, allowed enums, string lengths and safe email/URL parsing.                                                                        |
| Request body size/type                        | Yes                                         | Reject malformed JSON, invalid content type and oversized payloads before costly work.                                                                          |
| XSS/output safety                             | Yes                                         | Render visitor/provider data as text. Escape email HTML or use plain text. JSON-LD must safely encode embedded text.                                            |
| Abuse/spam/rate limits                        | Yes                                         | Honeypot or equivalent, bounded per-client and global counts, distributed production state. Fail safely when controls are unavailable.                          |
| Duplicate operations                          | Yes                                         | Pending UI lock plus server/provider idempotency. Validate concurrent duplicates and failure recovery.                                                          |
| API spending                                  | Yes when external provider enabled          | Per-client/global caps, provider spending alerts/caps, input/output bounds, request timeouts and bounded retries.                                               |
| Secrets                                       | Yes                                         | Server-only env; never `NEXT_PUBLIC_*`, browser storage, logs, HTML or Git. Scope each key minimally.                                                           |
| Same-origin/CORS                              | Yes                                         | Reject unapproved origins for sensitive APIs; no permissive wildcard origin. Origin checks complement abuse protection, not authentication.                     |
| Cookie/session CSRF                           | No current session architecture             | No cookie-authenticated account actions. JSON POST/origin checks reduce cross-site submission surface. Reassess when sessions are added.                        |
| SQL injection/RLS/indexes                     | Not applicable                              | No SQL database. Do not claim SQL controls were tested; reassess if persistence is introduced.                                                                  |
| Password hashing/JWT/MFA/object authorization | Not applicable to website visitors          | No production visitor accounts or protected resources. Hosting/provider accounts still require owner-managed strong access controls.                            |
| SSRF                                          | No visitor-controlled server fetch intended | Provider hosts are configured/allowlisted, not taken from submitted URLs. Reassess if crawling or remote import is added.                                       |
| Upload validation/storage                     | Not applicable                              | No upload endpoint.                                                                                                                                             |
| Webhook signatures/replay                     | Not applicable                              | No inbound webhook receiver.                                                                                                                                    |
| Security headers                              | Yes                                         | Deliberate CSP and suitable HSTS/frame/content-type/referrer/permissions policies; inspect production responses.                                                |
| Sensitive caching                             | Yes                                         | API responses with personal/operation data are not publicly cached. Static public content may be cached.                                                        |
| Logging/error messages                        | Yes                                         | Safe category, operation, route, timestamp and request identifier; no full leads, transcripts, keys, authorization headers or stack traces in public responses. |
| Dependency/source-map hygiene                 | Yes                                         | Lockfile and audit; no public browser production source maps containing sensitive logic/data.                                                                   |
| Monitoring                                    | Yes                                         | Real uptime/API/error/deployment/provider alert routing plus tested operator response.                                                                          |
| Backups                                       | Conditional external business records       | No application database backups. Review mailbox/provider records; Redis rate/idempotency metadata is short-lived and expendable.                                |

## Security verification required

Test malformed and oversized input, missing/invalid fields, HTML/script-like text, invalid origins, invalid content type, spam trap, limits and Retry-After, unconfigured providers, provider rejection, timeout, duplicate/concurrent submissions, server failure recovery and sanitized responses. Optional AI tests must cover unconfigured mode, provider errors/timeouts, bounded requests, rate limits and safe fallback. Test mocks should never send real mail or charge an external AI account.

Audit production output for exposed secrets, public environment misuse, dangerous HTML sinks, unexpected remote fetch destinations, overly permissive CORS, source maps, default credentials and unnecessary dependencies. A clean dependency advisory report does not replace code review. The final record must state the command and observed result rather than claiming absolute security.

The current CSP permits inline scripts/styles for the framework's rendering and styling model; production removes development-only `unsafe-eval`. This is a deliberate limitation of the current policy, not a strict nonce-based CSP. User-controlled content must remain escaped text, and no untrusted HTML/script insertion is permitted. If future features introduce richer external content, revisit a nonce/hash policy and sanitization rather than relying on CSP alone. Production headers must still be inspected after the hosting layer is applied.

Release configuration is also a trust boundary. The prebuild and standalone launch scripts load Next environment files before checking flags, so `.env.local` cannot silently enable indexing or paid AI beyond the corresponding gates. The checker requires every named external gate, not merely whichever keys happen to exist in a JSON file. Six isolated regression tests cover file precedence, launch/AI flags and non-disclosure of synthetic credential values. Actual legal/service/domain approval must still be supported by external evidence; changing flags is not approval.

## Operational policy decisions still needed

- CodinginX must approve the actual data controller/legal identity, processors, processing purposes and retention/erasure handling.
- The hosting provider may retain IP addresses and request logs independently of application-level logging; account settings and the Privacy Policy must reflect reality.
- Email provider acceptance is not proof of final inbox delivery. Verify the sending domain, authentication records, delivery/bounce visibility and a real inbox test.
- Set provider budget/spending alerts and decide who handles failed deliveries, rate anomalies and unavailable dependencies.
- Define access, retention, backup and recovery for the business mailbox and any retained email-provider records. Do not invent retention periods in code or policy copy.
- When adding analytics, AI, CRM, a database, authentication or file uploads, re-review policy content, consent requirements, this applicability table and the launch gate before enabling the feature.

## Incident and recovery procedure

1. Triage the affected release/route using safe request IDs, timestamps and error categories. Do not copy personal lead contents into public tickets or logs.
2. Disable the affected optional provider or fail the contact API safely while retaining the public business mailto option.
3. Revoke/rotate compromised keys through the owner-controlled provider account, then replace runtime secrets and redeploy.
4. Roll back the hosting deployment if a recent release caused the failure. Source rollback does not undo external email delivery.
5. Confirm duplicate protection and provider delivery status before manually retrying an inquiry. Avoid sending multiple confirmations.
6. Restore external retained records only through the approved mailbox/provider recovery procedure. Redis technical metadata need not be restored, but rate/cost controls must be re-established before enabling paid traffic.
7. Record the root cause, affected boundaries, fix and verification without unnecessary personal information. Business/legal incident-notification decisions require the approved policy and responsible operator.
