# CodinginX website

The official CodinginX software engineering and AI website. [CODINGINX_MASTER_PROMPT.md](CODINGINX_MASTER_PROMPT.md) is the product, design, engineering and launch source of truth. Read it completely alongside [AGENTS.md](AGENTS.md) before substantial changes.

**Current release status: Not yet launch-ready.** The website is implemented and local validation passed: clean install, lint, type checking, 59 unit/integration tests, 53 Chromium checks plus seven final interaction follow-ups, production build and a zero-advisory dependency audit. Real production delivery, domain/HTTPS, operational accounts and business/legal approvals require external inputs. The user approved leaving these integrations configurable and pending. [Launch readiness](docs/launch-readiness.md) records evidence and exact outstanding requirements; it must not be replaced by an assumption that a successful build means a complete launch.

## Documentation

Complete source: [GitHub branch `codinginx-website`](https://github.com/zaigham186/CodinginX-website/tree/codinginx-website). Clone that branch to obtain the implementation:

```bash
git clone --branch codinginx-website https://github.com/zaigham186/CodinginX-website.git
cd CodinginX-website
```

- [Requirements traceability](docs/requirements.md): all 119 numbered master-prompt sections and review surfaces.
- [Visual redesign](docs/redesign.md): art direction, motion, product media provenance and maintenance.
- [Security and data handling](docs/security.md): trust boundaries, applicable controls, safe logging and incident handling.
- [Deployment and operations](docs/deployment.md): local/staging preparation, Vercel, environment separation, domain, monitoring, rollback and backup applicability.
- [Launch readiness](docs/launch-readiness.md): observed test results, launch gate, unresolved facts and production inputs.

## Architecture

Next.js App Router, strict TypeScript and Tailwind provide the application foundation. Public content is structured in source; shared components and design tokens implement Ink Navy, Warm Cloud, Graphite, controlled CodinginX Blue, Instrument Sans and IBM Plex Mono. The site uses server routes for secure integrations rather than a separate API service.

There is no application database, visitor account system, payment system, file-upload endpoint or admin dashboard. Distributed rate-limit/idempotency storage contains expiring technical metadata, not lead content. Email records live in the configured provider/business mailbox, whose retention and recovery require owner approval. Optional AI and analytics stay disabled until configured and reviewed.

## Maintainer principles

- Do not invent founder details, client work, performance results, credentials, legal policies or external account identifiers.
- Keep company/contact facts centralized and unknown values unpublished.
- Label internal demonstrations honestly. A browser workflow example is not a client case study, production authentication or a live external integration.
- Preserve natural scrolling, keyboard access, visible focus, reduced motion and deliberate mobile layouts.
- Keep secrets server-only. Never log full leads or credentials, render untrusted HTML, or report form success after a failed provider operation.
- Revisit relevant master-prompt sections before changing design, integrations or the launch decision.

## Local setup

Use Node.js 22 or newer and npm. Run these commands from the repository root:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Blank integration values are intentional: public content, demonstrations and structured guidance can run without credentials. Missing contact-delivery credentials produce an honest unavailable response and direct email alternative. Optional paid AI and analytics are off by default. Never put real secrets into `.env.example`.

To exercise the production build locally:

```bash
npm run build
npm run start
```

Production origin checks accept `https://codinginx.com` and an explicitly configured exact HTTPS preview origin. Local HTTP is accepted by API handlers in development, not automatically in production mode. Production-like API tests must use the intended origin header or an approved HTTPS preview. Do not broaden CORS just to make local tests pass.

## Commands

| Command                  | Purpose                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Development server.                                                                                                  |
| `npm run build`          | Next.js production build.                                                                                            |
| `npm run start`          | Serve an existing production build.                                                                                  |
| `npm run lint`           | ESLint; warnings fail.                                                                                               |
| `npm run typecheck`      | Generate route types and run strict TypeScript checks.                                                               |
| `npm test`               | Vitest unit/integration suite.                                                                                       |
| `npm run test:watch`     | Vitest watch mode.                                                                                                   |
| `npm run test:e2e`       | Playwright browser/interaction checks. Install browser binaries with `npx playwright install chromium` when needed.  |
| `npm run test:load`      | Safe production-like concurrency test, restricted to an exact loopback origin with real email/AI credentials absent. |
| `npm run check:launch`   | Repository launch-gate checks; an unresolved external gate is an expected failure until resolved.                    |
| `npm run audit:security` | Dependency advisory audit at high severity and above.                                                                |
| `npm run format:check`   | Check source, tests, scripts and documentation with Prettier.                                                        |

The final local runs passed; [launch readiness](docs/launch-readiness.md) records the exact evidence and limits, including the 700-request concurrency test. These results do not verify external service delivery, public hosting or domain ownership.

Browser and concurrency checks expect a running local production server. Start it with `npm run start` in another terminal after building, with real Resend/OpenAI credentials absent. Then run:

```bash
TEST_INTEGRATIONS_UNCONFIGURED=true npm run test:e2e
TEST_INTEGRATIONS_UNCONFIGURED=true npm run test:load
```

`TEST_BASE_URL` defaults to `http://127.0.0.1:3000`; the load runner rejects remote hosts. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can select an installed Chromium binary, and the configuration detects `/usr/bin/chromium` when present. Browser results, traces and screenshots are generated under ignored `work/`; load results are written to `work/load-test-results.json`. These are local validation artifacts, not proof of production service capacity.

The npm dev/build commands explicitly use Webpack for compatibility with the restricted build runner used here. ESLint 9 is retained for current plugin compatibility; npm reports its upstream tooling deprecation, while the final dependency audit reports zero advisories. Reassess supported lint/plugin versions during maintenance. `next.config.ts` sets `experimental.useTypeScriptCli: false` so Next uses the TypeScript compiler API instead of a detached TypeScript 6 CLI subprocess. This does not disable type checking; `npm run typecheck` also runs it independently. `vitest.config.mts` configures the Node-based unit/integration suite. `.github/workflows/ci.yml` defines Node 24 install, lint, typecheck, unit tests, dependency audit, build, Chromium and load checks; a configured workflow is not a claim that the hosted CI run has occurred.

## Configuration

`src/config/siteConfig.ts` centralizes company identity, approved domain, emails, social links, wordmark, CTA and integration switches. `src/content/team.ts` owns founder records; do not create divergent copies of founder facts. Unknown legal name, phone, address, WhatsApp and professional profiles stay unpublished. Approved founder names are Mohammad Suleman Khan and Muhammad Zaigham; biographies, photos and individual responsibilities remain pending.

| Environment variable            | Use and safe default                                                                                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                | Server-only email-provider key. Blank disables delivery.                                                                                                                         |
| `EMAIL_FROM`                    | A bare sender email address verified in the real provider account; no invented sender.                                                                                           |
| `UPSTASH_REDIS_REST_URL`        | Approved HTTPS Upstash REST endpoint. Required for production contact/paid AI protection.                                                                                        |
| `UPSTASH_REDIS_REST_TOKEN`      | Server-only Redis token.                                                                                                                                                         |
| `RATE_LIMIT_SECRET`             | Unique random secret of at least 32 characters; HMACs rate identifiers. Rotation resets visitor bucket identities.                                                               |
| `CONTACT_DAILY_CAP`             | Global attempted inquiries per UTC day; default 100, capped at 1,000; each accepted operation can send two emails.                                                               |
| `SITE_PREVIEW_ORIGIN`           | Optional exact HTTPS preview origin, without path or trailing slash; production domain remains allowed.                                                                          |
| `TRUSTED_PROXY_IP_HEADER`       | Only set on a host whose proxy overwrites `x-real-ip` or `x-forwarded-for`; otherwise a shared anonymous bucket is safer. Vercel uses its platform header.                       |
| `CHAT_AI_ENABLED`               | `false` by default. Enables optional server classification only with credentials and working protections.                                                                        |
| `OPENAI_API_KEY`                | Server-only optional AI provider key.                                                                                                                                            |
| `OPENAI_MODEL`                  | Configured classifier model; defaults to `gpt-4o-mini`. Verify model availability in the real account before enabling.                                                           |
| `CHAT_AI_DAILY_CAP`             | Optional paid classifier global daily cap; default 100, maximum 1,000.                                                                                                           |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | `false` by default. Turns on the Plausible event adapter and consent UI only after owner/account/privacy review. This value is public and build-time; it is not a credential.    |
| `NEXT_PUBLIC_SITE_LAUNCHED`     | Indexing switch, disabled until launch approval. This public build-time value is not evidence that legal, domain, delivery or monitoring checks passed.                          |
| `NEXT_PUBLIC_CHAT_AI_ENABLED`   | Visitor-disclosure switch; pair with `CHAT_AI_ENABLED=true` only after approval and review. Build and server controls prevent paid AI activation without the disclosure setting. |

Use `.env.example` as the authoritative key list and compare it with `src/lib/server/config.ts` when extending integrations. Required secrets must be set in the host's secret manager for each environment. Provider budget alerts, domain verification and real account ownership cannot be created by an environment variable.

`scripts/check-build-config.mjs` runs before Next builds. It loads environment files with Next's own production precedence, rejects AI activation without the disclosure switch, and blocks `NEXT_PUBLIC_SITE_LAUNCHED=true` until `scripts/check-launch.mjs` accepts all eight required evidence gates, credential presence and finalized legal copy. `docs/launch-evidence.json` remains pending. Update it only with actual verified external evidence; a checked flag is not itself evidence. The standalone `npm run check:launch` uses the same environment loader and exits with code 2 while required inputs remain unresolved.

## Content maintenance

| Content  | Location                  | Publication rule                                                     |
| -------- | ------------------------- | -------------------------------------------------------------------- |
| Services | `src/content/services.ts` | Four defined service slugs drive index/details and relationships.    |
| Projects | `src/content/projects.ts` | Only `publicationStatus: "published"` appears publicly.              |
| Founders | `src/content/team.ts`     | Only `approvedForPublication: true` appears publicly.                |
| Careers  | `src/content/careers.ts`  | Only `status: "open"` appears publicly.                              |
| Insights | `src/content/insights.ts` | Only `status: "published"` appears publicly.                         |
| FAQ      | `src/content/faqs.ts`     | Reviewed service/process answers; never invent contractual policies. |
| Process  | `src/content/process.ts`  | Shared five-stage process narrative.                                 |

### Add or update a project

Add a unique stable slug and complete its typed record: title/category/type, publication status, summary/overview, problem/solution, actual features/technologies, workflow, intended benefit, limitations and related service. Add real screenshots with descriptive alt text and dimensions when available. Only supply live/repository URLs that exist and are approved for publication. Keep unmeasured outcomes under `intendedBenefit`; leave `verifiedResults` empty until there is evidence.

Keep a record as `draft` until the experience exists, works and is reviewed. Internal examples use `internal-demonstration`; concept projects use `concept`. A client case study requires `client-work`, real work and client publication approval, plus evidence for any result. Update related content and test the dynamic route, index, sitemap and invalid-slug behavior. The unpublished SaaS MVP record is intentionally reserved for a genuine product with authentication, durable persistence and a complete workflow; a fake login/dashboard would not satisfy it.

### Update founders

Edit approved records in `src/content/team.ts`. Publish only supplied names, role, biography, responsibilities, authentic photo and approved links. Real name approval does not authorize invented experience, achievements or founder quotes. Add an optimized photo with truthful alt text and dimensions when supplied. Unknown fields may remain empty and must not show dummy text. Review About and the homepage after changes.

### Add careers

Add a typed career record with a stable slug, approved title, discipline, status, location/employment terms, description, responsibilities and requirements. Keep it `draft` until approved; set `open` only for an actual vacancy and `closed` when no longer available. Confirm the careers inquiry link uses the central `careers@codinginx.com` value. The no-open-roles state is intentional.

### Add articles

Add a unique slug, title, description, category, `status`, introduction, useful sections, takeaway and relevant service link to `src/content/insights.ts`. Write useful original material rather than filler. Do not invent an author's credentials or publication date. Review heading order, link validity, metadata, reading time and the published-only filter. Verify both the index and dynamic detail route before publishing.

## Project inquiry and assistant

The inquiry uses React Hook Form/Zod in the browser and the independent shared server schema. The API validates same-origin JSON, payload size, field bounds, honeypot, recipient/visitor/global limits and idempotency before calling Resend. The browser retains a submission ID for retrying the same details; the provider receives separate idempotency keys for the business notification and visitor acknowledgment. Redis stores expiring metadata rather than leads. Provider failures return honest errors with a direct email path. Business email acceptance and actual inbox delivery are separate checks.

The assistant's baseline is maintained answers in `src/content/assistant.ts`, selected by structured topic logic. With optional AI enabled, a server-only bounded model call classifies the current message into an allowed topic; its free-form output is never used as a business answer. Update approved static answers when company facts change. Test unconfigured mode, provider rejection/timeout, rate limits and handoff links before enabling AI.

Optional analytics uses the adapter in `src/components/analytics.tsx`. It emits approved event names and bounded nonpersonal attributes, excludes form/chat content and query strings, and respects opt-in choice plus browser privacy signals. Consent preference is stored in this browser. Configure the actual Plausible domain/account and review policy/consent treatment before setting its public build-time flag. Never turn on analytics merely to make a checklist pass.

## Operations and extension

`/api/health` is a liveness endpoint, not proof that email or Redis is ready. Safe server logs identify operation, route, timestamp, request ID and category. A production uptime/error monitor, real alert routing and an operator are still needed. See [deployment](docs/deployment.md) for domain, HTTPS, hosting, rollback and a controlled delivery test.

Git backs up source/content. There is no application database to restore. Redis technical metadata expires and is not a business archive. Email/mailbox records need an approved external retention, backup and recovery policy plus a safe restore check. Do not invent those policies in public copy.

The structured content and shared components can support a future CMS, additional projects/articles/team members or a genuine product. Add authentication, a database, uploads, payments or webhooks only when a real requirement calls for them; reassess security and legal boundaries at that time. Final Privacy/Terms approval, production credentials, domain access and operational ownership remain explicitly pending.
