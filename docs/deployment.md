# Deployment and operations

Production publication is pending the master-prompt launch gate. The preferred target is a CodinginX-owned Vercel project running Next.js, or an equivalent Node hosting platform with a documented reason. A public Sites publication is not a substitute for the required runtime, owner-controlled integrations and domain checks. Follow [launch-readiness.md](launch-readiness.md) before public launch.

## Prepare a reproducible release

1. Use the Node version declared by the repository and the committed package lockfile.
2. Install with `npm ci`, copy `.env.example` to an ignored `.env.local`, and fill only values for accounts CodinginX actually controls. Never commit credentials.
3. Run the repository's lint, typecheck, test, browser and production build commands. See README for the current command names.
4. Run the production server locally or in private staging. Exercise every required route, inquiry state, assistant state and demonstration, then run the safe concurrency check.
5. Review security applicability, all public facts/copy, legal drafts and the pending-input list. Record exact results rather than treating deployment success as validation.

`npm run build` first runs `scripts/check-build-config.mjs`. Both it and the standalone launch checker load environment files through `@next/env` with Next's production precedence. Leave `NEXT_PUBLIC_SITE_LAUNCHED=false` while the release gate is unresolved. Enabling it requires all eight named gates in `docs/launch-evidence.json`, required credential presence and final legal text to pass. The evidence file is an operator record, not an automatic substitute for verifying DNS, delivery, Redis, legal approval or alerts. The prebuild check also rejects AI activation without `NEXT_PUBLIC_CHAT_AI_ENABLED=true`; runtime controls require the paired disclosure value as well.

The current scripts use `--webpack` and the TypeScript compiler API (`experimental.useTypeScriptCli: false`) to avoid detached subprocess limitations of the build environment used here. Type checking remains enabled. CI is defined in `.github/workflows/ci.yml` for Node 24, including Chromium and the local credential-free load test; verify its actual run in the owner-controlled repository after source delivery.

## Hosting setup

- Import the real repository into the approved CodinginX Vercel account. Keep production and preview environment variables separate.
- Use the Next.js framework preset, declared Node runtime, lockfile-based install and the repository build script. Route handlers require a server runtime; a static-only export cannot handle the secure inquiry flow.
- Store secrets through the hosting secret manager. No email/AI/Redis credential belongs in a `NEXT_PUBLIC_*` variable.
- Use separate staging credentials and verify limits without sending test inquiries to uninvolved people or calling paid providers during load tests.
- Restrict preview access as appropriate and preserve preview `noindex` behavior. Do not enable public indexing or mark legal review complete until the release gate is satisfied.
- Set account access controls and operator ownership; protect hosting, DNS, mailbox and provider accounts with strong authentication.
- Verify the host's trusted forwarding-header semantics. Rate limiting must use a trustworthy client identifier on the chosen host; an attacker-supplied forwarded IP must not trivially bypass limits.

## Email and distributed protections

Choose the configured email provider, verify an authorized sender/domain, and set the server-only credentials and sender value described in `.env.example`. The primary recipient is the supplied business address `info@codinginx.com`, centralized in company configuration. Do not invent an authenticated sender or claim that a domain has been verified.

Configure the required production Redis endpoint/token and rate-limit identity secret. Redis is used for short-lived abuse/idempotency metadata, not lead content. Configure TLS, scoped access and provider limits; verify distributed behavior across concurrent requests. Production APIs must fail safely if mandatory protections are missing or unavailable.

After deployment, send one explicitly controlled inquiry using a real address owned by the tester. Confirm the business notification arrives, the intended acknowledgment behavior works, repeated clicks do not create repeated delivery, and errors never report success. Check bounce/delivery visibility in the provider account. DNS mail authentication and inbox placement require real external evidence.

## Domain and HTTPS

The supplied domain is `codinginx.com`. Use the exact records provided by the chosen hosting dashboard; do not copy guessed IP/CNAME values from documentation. First inspect existing DNS to avoid damaging mail or unrelated services. Domain changes require the owner's supplied access and authorization.

1. Confirm the approved canonical hostname and whether the alternate `www`/apex name redirects to it.
2. Add the domain to the correct production project and apply only the required owner-approved DNS records.
3. Preserve existing MX, SPF, DKIM, DMARC and other business records unless a verified email-provider setup requires an authorized change.
4. Wait for provider-issued TLS and verify certificate validity over the actual hostname.
5. Check both HTTP and HTTPS, apex and `www`, redirect status/chain and absence of loops.
6. Verify every route's canonical and Open Graph URL, sitemap URLs, robots policy, favicon and social image against the production hostname.
7. Re-run the desktop/mobile walkthrough, link checker, security-header review and controlled form test against the actual release.

No localhost or preview URL should appear in production metadata. A canonical URL in source does not prove DNS points to this application.

## Monitoring

Configure a CodinginX-owned uptime monitor for the actual HTTPS homepage and the implemented health endpoint, plus an alert destination with a responsible operator. Use hosting runtime/deployment logs and the documented application error integration to detect form/provider failures. Test a safe failure and confirm an alert arrives; a health route or logging function alone does not fulfill monitoring.

Safe diagnostic fields are operation, route, timestamp, request identifier and error category. Do not collect full inquiry messages, email addresses, chat transcripts, API keys, authorization headers or secrets in routine monitoring. Check the host/provider's own log retention and access settings; application redaction cannot override independent platform logging.

## Optional analytics and AI

Analytics and AI may remain disabled. Do not add an account ID, live key, endpoint or consent claim without an approved owner-controlled account and policy decision. When enabling either feature, update Privacy/Terms where needed, verify event/message data minimization, configure spending and failure alerts, and re-run security/failure tests.

The structured assistant remains the reliable baseline. Optional AI must fail back to useful site guidance, have server-only keys, bounded requests, request/time/token limits and provider spending controls. It must not invent prices, policies, credentials or project results.

## Backups and recovery

There is no application lead database. Git protects code and content; retain a source copy in the real repository and verify another developer can clone, install, build and run it. Hosting rollback protects deployable releases; record the release identifier and rollback method in the operator's deployment record.

Redis contains expiring rate-limit and idempotency metadata. It is not the business system of record and does not require lead-database backup infrastructure. Losing it may temporarily weaken counters or duplicate history, so re-establish controls before restoring paid traffic. Provider-level email idempotency remains important during transient store loss.

Business inquiries delivered to email and provider-held delivery records may be meaningful persistent data. CodinginX must choose the mailbox/provider owner, access controls, retention, backup provider/frequency/location, deletion process and recovery procedure. Do not invent those business policies. Test recovery with a safe test record in the actual service before claiming backup/restore readiness. Application database restore testing is not applicable while no application database exists.

## Rollback

Use the host's previous known-good deployment and verify its runtime configuration is compatible. Recheck health, contact failure/success behavior, header policy and canonical URLs. Do not roll back to a release with a known high/critical vulnerability. Secrets are managed separately: rotate or revoke keys in the provider account, update the hosting environment and redeploy as needed. A rollback cannot retract email already sent or substitute for recovery of external business records.

## Release decision

Record source commit, deployment identifier, production hostname, final command/test results, known limitations, controlled delivery evidence, legal approval, monitor-alert evidence and recovery applicability. Mark the release **Not yet launch-ready** while required facts, integrations or domain checks remain unresolved. Optional features may remain deliberately disabled; required launch conditions may not be silently waived.
