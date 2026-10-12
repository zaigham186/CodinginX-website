# Launch readiness

**Status: Not yet launch-ready.**

This file distinguishes implemented capability, observed local verification and external production approval. No checklist entry is passed by assumption. The master prompt's sections 95, 100–119 govern launch. No public deployment or Sites publication should bypass that gate.

## Evidence record

Local verification was recorded on October 11–12, 2026 UTC. The complete website is implemented locally. Final clean installation, lint, type checking, unit/integration tests, production build, dependency audit and Chromium suite passed. The complete source is published on GitHub's `codinginx-website` branch. External service acceptance and public deployment remain pending.

| Check                                    | Final evidence/status                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository source state                  | Complete source is committed and published to `zaigham186/CodinginX-website` on the `codinginx-website` branch.                                                                                                                                                                                            |
| Clean installation                       | Final `npm ci` passed using the committed-format lockfile. ESLint 9 emits a tooling deprecation warning; see the maintenance note below.                                                                                                                                                                   |
| Lint                                     | Final `npm run lint` passed with warnings configured to fail.                                                                                                                                                                                                                                              |
| Type checking                            | Final `npm run typecheck` passed. Next build also completed its TypeScript stage.                                                                                                                                                                                                                          |
| Unit/integration tests                   | Final `npm test`: **59 tests across seven files passed**, including API validation/failures, idempotency, rate limits, AI disclosure and six environment/gate regressions.                                                                                                                                 |
| Production build                         | Final `work/build.log`: **Next.js 16.4.0 Webpack build passed**, generating **28 static outputs** alongside dynamic contact/API routes.                                                                                                                                                                    |
| Browser/CTA/link audit                   | Final Chromium suite: **46/46 passed in 3.4 minutes**, with zero skipped, unexpected or flaky tests. Route/CTA/link, form, assistant, demonstration, navigation and error behavior checked. Evidence: `work/e2e.log`, `work/browser-results.json`.                                                         |
| Responsive/keyboard/reduced-motion audit | **120 route/viewport visits** across 20 published content routes at **320, 375, 768, 1280, 1440 and 1920px**. No tested horizontal overflow. Keyboard navigation, focus return, skip link, FAQ and reduced-motion checks passed.                                                                           |
| Accessibility/contrast                   | Zero axe violations on all 20 routes and the mobile assistant state. Earlier white-on-`#2F6BFF` button contrast was 4.49:1; changing text-bearing primary surfaces to approved `#2459DB` resolved it. Automated results complement manual review and do not certify every possible assistive technology.   |
| Dependency/security audit                | Final advisory audit reports **zero vulnerabilities** across production/development dependencies. Reviewed API/security boundaries and production response headers. A static scan of 95 source files found no credential patterns or actual env file; this is not a comprehensive credential-system audit. |
| 100-user concurrency test                | Passed locally: **100 concurrent requests per scenario, 700 total**, zero unexpected statuses/network failures, healthy after. External integrations disabled. Full observed latency table below.                                                                                                          |
| Metadata, sitemap, robots and favicon    | Local metadata, sitemap, unlaunched robots policy, branded SVG/ICO/Apple icons, unpublished routes and 404 checks passed. Production-domain response validation remains external.                                                                                                                          |
| Visual/content audit                     | All 20 content routes plus branded 404 visually inspected. Refreshed home/Work/About/Contact/mobile-assistant screenshots reviewed; no new issues observed. Instrument Sans computed styles verified; custom SVG arrows render correctly. No browser page errors observed.                                 |
| Production domain and HTTPS              | Not configured or verified for this implementation.                                                                                                                                                                                                                                                        |
| Real email delivery                      | Provider credentials/domain verification not supplied; configured integration and failure behavior tested with mocks/local unavailable state only.                                                                                                                                                         |
| Production alerts and monitoring         | Account, destination and alert ownership not supplied. Health endpoint and safe logs are implemented, not a complete external monitoring setup.                                                                                                                                                            |
| Legal approval                           | Factual Privacy/Terms review drafts are present and linked. No invented entity, governing law, IP/payment terms or retention promise found. Final business/legal approval remains outstanding.                                                                                                             |
| Git delivery                             | Source publication is complete on `codinginx-website`; the GitHub branch and file contents are checked during delivery. Production deployment remains pending.                                                                                                                                             |

Browser verification used Chromium only. Safari, Firefox and physical-device behavior were not independently exercised. The local performance samples below are not field Core Web Vitals. Optional analytics remains off, and no real paid provider or production database was load-tested.

The lint stack uses ESLint 9 for current plugin compatibility and reports an upstream deprecation warning during installation. It has no reported advisory in the observed audit. Revisit supported lint/plugin versions during normal dependency maintenance; this is tooling debt, not a claim of a detected runtime vulnerability.

### Local concurrency evidence

`work/load-test-results.json` records a production-build test against `http://127.0.0.1:3000`. Each row is a separate 100-request simultaneous batch. No Resend/OpenAI credentials were enabled, no real emails were sent and no paid AI requests were made.

| Scenario                      | Observed responses | p50      | p95      | Maximum  |
| ----------------------------- | ------------------ | -------- | -------- | -------- |
| Home                          | 100 × 200          | 3,322 ms | 3,485 ms | 3,802 ms |
| Services                      | 100 × 200          | 1,700 ms | 1,878 ms | 1,927 ms |
| Work                          | 100 × 200          | 910 ms   | 924 ms   | 927 ms   |
| Contact page                  | 100 × 200          | 3,361 ms | 3,371 ms | 3,374 ms |
| Invalid contact request       | 100 × expected 400 | 532 ms   | 789 ms   | 819 ms   |
| Unconfigured contact delivery | 100 × expected 503 | 405 ms   | 564 ms   | 583 ms   |
| Structured assistant          | 100 × 200          | 223 ms   | 456 ms   | 471 ms   |

There were no unexpected failures and the server stayed healthy. Expected 400/503 responses demonstrate validation and safe unconfigured behavior; they do not demonstrate successful email delivery. The assistant used the nonpaid structured fallback, so this run does not verify real Redis limits or paid-provider capacity. These constrained local timings are not a production throughput promise or an LCP measurement.

### Local rendering performance samples

`work/performance.json` contains one synthetic browser sample per configuration, taken before the final small fixes. They are useful observations rather than field Core Web Vitals certification.

| Configuration                                  | LCP      | CLS     | Longest sampled interaction | Transferred bytes |
| ---------------------------------------------- | -------- | ------- | --------------------------- | ----------------- |
| 1440px desktop, unthrottled local              | 1,588 ms | 0.00119 | 112 ms                      | 254,761           |
| 375px mobile, 4× CPU, 1.6 Mbps, 150 ms latency | 1,016 ms | 0.00127 | 152 ms                      | 234,819           |

The sampled interaction duration is not a field INP result. Real network, device, hosting/CDN and visitor distributions still require production monitoring. No production speed guarantee is made.

### Release-gate regression review

The prebuild gate now loads `.env.production.local`, `.env.local`, `.env.production` and `.env` using Next's actual precedence while preserving process-environment priority. Six regression tests use temporary synthetic fixtures, never the repository's actual environment files. They verify that file-based launch/AI flags cannot bypass gates, precedence is correct, credentials are not printed and missing required external gate names fail closed. Paid AI also requires its visitor-disclosure switch at runtime. The launch checker remains intentionally unsuccessful while the eight external evidence gates, real credentials and final legal copy are unresolved.

## External launch blockers

| Required input or decision                                                   | Why it matters                                                                                                               | Safe implementation boundary                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Approved production hosting project and account access                       | Deployment ownership, secrets, runtime logs and rollback must belong to CodinginX.                                           | Repository is prepared for the master prompt's preferred Next.js/Vercel deployment; do not create or claim an unrelated production account.                                                                                                                             |
| Domain/DNS access and approved apex/www policy                               | Verify the actual `codinginx.com` release, TLS, redirects, canonical and Open Graph hostnames.                               | Public metadata uses the approved company domain; live DNS/HTTPS must still be checked.                                                                                                                                                                                 |
| Email-delivery provider account, API key and verified sending domain/address | A success message must reflect provider acceptance, followed by real inbox delivery validation.                              | Keep missing configuration explicit and route visitors to the supplied `info@codinginx.com` mailto.                                                                                                                                                                     |
| Production distributed limit/idempotency store and secret                    | Serverless instances need consistent abuse and duplicate protection.                                                         | No paid API processing without required production controls. Redis stores short-lived technical metadata, not inquiry content. Local/mock tests do not prove the Lua operations execute correctly in the real configured Redis service; verify this in private staging. |
| Legal review and approved entity/policy facts                                | Privacy/Terms must accurately cover operator identity, providers, inquiry handling, cookies/analytics/chatbot and retention. | Maintain truthful draft pages/review gates; do not invent legal entity, jurisdiction, promises, payment/IP terms or retention periods.                                                                                                                                  |
| Monitoring/alert account and operator destination                            | Failures must reach a responsible person; a health endpoint alone is insufficient.                                           | Implement safe observable errors/health integration, then verify real uptime and failure alerts externally.                                                                                                                                                             |
| Email/mailbox records retention, recovery and access policy                  | External lead records may be meaningful business data even without an application database.                                  | Document provider/mailbox handling; approve retention and test recovery before claiming this operational requirement is complete.                                                                                                                                       |
| Production configuration and post-deploy verification                        | Local tests cannot verify provider-domain setup, real credentials, CDN headers or real alerts.                               | Re-run the production walkthrough and launch checker against the actual release.                                                                                                                                                                                        |

## Missing content and optional choices

- **Founder information and approved assets:** the user supplied and approved the names **Mohammad Suleman Khan** and **Muhammad Zaigham**, both co-founders. Biographies, responsibility divisions, photographs and public profiles remain pending; the user authorized adding those later. The supplied names are published with the approved co-founder role; no individual credentials or responsibility division was invented. Completing the fuller founder presentation needs those remaining inputs.
- **Client portfolio:** no approved client assets, testimonials, results or public case studies were supplied. Publish only honestly labeled internal demonstrations actually implemented here. Add approved client work later; no need to invent a launch portfolio.
- **SaaS MVP demonstration:** master section 44's third project type is represented by an unpublished draft record. A genuine authentication system, durable user data and full SaaS workflow have not been implemented or supplied. This is an explicit pending portfolio expansion under that section's eventual-demonstration strategy, not a claimed completed product. The two published browser demonstrations cover rule-based lead extraction and local service operations only; they do not establish a live AI/CRM integration, real calendar/notifications, production authentication or multi-user persistence.
- **Logo:** a replaceable professional wordmark is explicitly permitted. A new official asset or adoption of that wordmark is a brand decision, not an inherent technical blocker.
- **Optional AI provider:** structured assistant operation must remain useful without AI. Enable real AI only after account, spending limits, privacy review and production controls are approved and verified.
- **Optional analytics:** disabled until a provider/account and any required consent treatment are selected and reflected accurately in the Privacy Policy. Lack of optional analytics alone need not block launch.
- **Careers:** no open roles supplied. Publish an honest empty state; never imply that specific roles are open.
- **Phone, street address, legal entity, registration details and LinkedIn:** absent. Leave unpublished until supplied. Country-level USA positioning is known.

## Final local release checklist

- [x] All 20 published content routes render; unknown and unpublished project/article slugs return the branded 404.
- [x] Navigation, logo, mobile menu/Escape/focus, footer and important CTAs work; known email/social destinations are correctly linked. External inbox delivery and social-service availability are separate checks.
- [x] Contact validation, provider acceptance/failure, timeout, duplicates, rate limits and recovery are covered by local/browser/mocked tests; actual provider delivery remains pending.
- [x] Structured assistant works on phone and desktop; optional AI failure/timeout/limits/disclosure controls are tested without paid traffic.
- [x] Both demonstrations work and disclose sample data, scope and persistence boundaries. A genuine SaaS MVP remains an explicit unpublished future expansion.
- [x] Six viewport widths across 20 routes show no tested unintended horizontal overflow; manual review found no material clipping or unusable controls.
- [x] Keyboard, visible focus, heading/label semantics, contrast and reduced-motion behavior reviewed and automated checks passed.
- [x] Public content reviewed for invented facts, accidental placeholders, test URLs, starter assets and forbidden visual treatments. Legal draft labels are deliberate pending approvals.
- [x] Local metadata, canonical/OG values, sitemap, unlaunched robots policy and branded favicon verified.
- [x] Final lint, typecheck, 59 unit/integration tests, 46 browser tests and production build pass.
- [x] Local 100-request concurrent batches tested with safe unconfigured APIs; 700 total expected responses and healthy server after.
- [x] API validation, payload bounds, origin policy, timeouts, costs, duplicate controls, safe logging, headers and secret boundaries reviewed.
- [x] Final dependency audit reports zero advisories; test/operational limitations are documented.
- [x] Ignore rules, example environment, lockfile and clean `npm ci` reviewed. Static credential-pattern scan found no matches; no real environment file is included in source handoff.
- [x] Complete source committed and published to the real GitHub repository on `codinginx-website`, with remote content verified.

## External production checklist

- [ ] CodinginX-owned hosting project configured, runtime secrets set, privileged accounts secured.
- [ ] Approved Privacy and Terms published with correct operator/provider/retention statements.
- [ ] Production sender verified; one controlled test inquiry reaches the real business inbox and confirmation behavior is checked.
- [ ] Sender DNS authentication, delivery/bounce visibility and spam-folder behavior checked in the real provider/mailbox.
- [ ] Real Redis Lua operations, distributed rate limiting and idempotency verified across staging/production instances.
- [ ] Email and optional AI provider budgets/caps/alerts configured and verified externally.
- [ ] `codinginx.com`/approved canonical hostname resolves to this release; HTTPS and apex/www redirects work.
- [ ] Live responses have expected headers, metadata, sitemap/robots behavior, favicon and social preview.
- [ ] Uptime monitor and safe application/provider alerts configured; test alert received by responsible operator.
- [ ] Applicable external mailbox/provider retention and recovery approved and verified.
- [x] Optional AI and analytics explicitly disabled in the delivered defaults. Recheck actual deployment environment before public launch; enabling either reopens its configuration/privacy/testing gate.
- [ ] Final desktop/mobile/customer/search/developer/operator walkthrough completed against production.
- [ ] All remaining launch blockers resolved and final gate recorded.

Do not change the status to launch-ready solely because local tests pass, a deploy succeeds, or a configuration flag is enabled.
