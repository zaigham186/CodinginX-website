# Master-prompt traceability

The source of truth is [CODINGINX_MASTER_PROMPT.md](../CODINGINX_MASTER_PROMPT.md), read together with [AGENTS.md](../AGENTS.md). This index does not replace or weaken either file. Every numbered master requirement appears below. Acceptance descriptions are pointers; the complete source section still governs.

Implementation and local verification are separate from public launch. Evidence, dates, commands, and unresolved inputs belong in [launch-readiness.md](launch-readiness.md). An item without evidence is not a passed check. External conditions must be verified against the deployed release, even after local checks pass.

## Company, positioning, and conversion

| Section                      | Required outcome                                                             | Review surface                              |
| ---------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------- |
| 1. Company                   | CodinginX, USA-based, two co-founders; no fabricated history or proof.       | Central company configuration and all copy. |
| 2. Long-term market position | Software engineering and AI partner; Build / Automate / Scale.               | Home, services, process.                    |
| 3. Target customers          | Startups/growing companies and SMBs; no invented locality.                   | Home and service narratives.                |
| 4. Core services             | Custom Software, AI & Automation, Web & Mobile, UI/UX.                       | Services index and four detail pages.       |
| 5. Secondary capabilities    | QA, SEO foundations, maintenance and integrations support the main offering. | Service content; restrained navigation.     |
| 6. Primary website objective | Consistent Start a Project conversion and Explore Our Work secondary action. | Navigation, page CTAs and inquiry flow.     |

## Visual identity and interaction

| Section                             | Required outcome                                                       | Review surface                                           |
| ----------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| 7. Visual identity                  | Editorial, precise, mature, product-led composition.                   | Every rendered page.                                     |
| 8. Color system                     | Exact approved palette; accessible combinations.                       | Shared design tokens and contrast audit.                 |
| 9. Color usage principle            | Ink Navy, Warm Cloud, Graphite; controlled blue.                       | Full-page visual audit.                                  |
| 10. Forbidden color treatments      | No generic purple/neon/glow/gradient styling.                          | Styles and screenshots.                                  |
| 11. Typography system               | Instrument Sans and restrained IBM Plex Mono.                          | Font files/loading and computed styles.                  |
| 12. Typographic hierarchy           | Responsive readable type at the specified approximate scales.          | Phone, tablet and desktop screenshots.                   |
| 13. Typography rules                | Readable measure, deliberate hierarchy, no excessive weights/tracking. | Long-form pages and home.                                |
| 14. Layout and composition          | Disciplined responsive grid with varied editorial widths.              | Shared containers and route layouts.                     |
| 15. Editorial composition           | Indexed services and substantial product presentations.                | Home, services, Work.                                    |
| 16. Card usage                      | Containment only where useful; restrained radius and shadows.          | Global design review.                                    |
| 17. Button design                   | Consistent rectangular controls, contrast, focus and touch targets.    | Buttons, links, forms.                                   |
| 18. Dark and light rhythm           | Meaningful dark sections within a predominantly light editorial site.  | Full-page review.                                        |
| 19. Product-first visual design     | Actual functioning demonstrations, diagrams or real product assets.    | Home and Work; provenance labels.                        |
| 20. Work/project presentation       | Editorial storytelling and truthful client/concept/demo distinctions.  | Work and project details.                                |
| 21. Founders and team presentation  | Only approved real names, roles, profiles and photographs.             | About and founder configuration; external input pending. |
| 22. Dividers and structure          | Whitespace, rules, typography and alignment.                           | Shared section styling.                                  |
| 23. Motion                          | Motion communicates state or function.                                 | Menu, assistant and demonstrations.                      |
| 24. Forbidden motion                | No spectacle, continuous decoration, cursor effects or tilt.           | Styles and browser review.                               |
| 25. Hover behavior                  | Restrained interactive feedback.                                       | Pointer and keyboard states.                             |
| 26. Scroll behavior                 | Natural scrolling; no hidden content or scroll hijacking.              | All viewports and reduced motion.                        |
| 27. Page transitions                | Optional; no delay or unnecessary dependency.                          | Route navigation.                                        |
| 28. Product demonstration motion    | State changes explain actual demonstration functionality.              | Interactive demonstrations.                              |
| 29. Motion performance              | Reduced-motion support and no material performance harm.               | CSS preference checks and performance measurements.      |
| 30. Iconography                     | Purposeful custom/simple symbols; no default icon-card aesthetic.      | Navigation, CTAs and assistant.                          |
| 31. Current-market design direction | Flexible, contemporary product storytelling.                           | Visual design audit.                                     |
| 32. Avoid trend chasing             | No unnecessary WebGL, 3D, spectacle or usability compromises.          | Dependencies and visual review.                          |
| 33. Visual quality test             | Recognizable CodinginX composition rather than a replaceable template. | Holistic human review.                                   |
| 34. Final visual target             | Engineering studio, product discipline and business credibility.       | Home, services, Work and About review.                   |

## Routes and content

| Section                               | Required outcome                                                                                  | Review surface                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 35. Website architecture              | Complete multipage site, dynamic project/article details and branded 404.                         | Route inventory, sitemap and browser traversal.                                                                     |
| 36. Homepage                          | Specific hero, useful supporting copy and two clear CTAs.                                         | `/`.                                                                                                                |
| 37. Homepage narrative                | Services, work, problems, Build/Automate/Scale, process, capabilities, founders, FAQ, footer.     | `/`; subjects may link to deeper routes.                                                                            |
| 38. Services page                     | Business problems, capabilities, examples, process, related work and FAQs.                        | `/services` and service detail content.                                                                             |
| 39. Custom Software page              | SaaS, operations, portals/APIs, MVPs and custom-vs-existing judgment.                             | Custom Software detail.                                                                                             |
| 40. AI & Automation page              | Practical email/support/lead/integration workflows.                                               | AI & Automation detail and lead demonstration.                                                                      |
| 41. Web & Mobile page                 | Websites as business systems, plus apps, booking, redesign and portals.                           | Web & Mobile detail.                                                                                                |
| 42. UI/UX page                        | Discovery through responsive design systems and usability.                                        | UI/UX detail.                                                                                                       |
| 43. Our Work                          | Capability proof with honest concept/client/live classifications.                                 | `/work`.                                                                                                            |
| 44. Initial featured project strategy | Support lead automation, service operations and SaaS MVP project types.                           | Project model and demonstrators. Full external integrations/authentication must not be implied by browser examples. |
| 45. Project page structure            | Problem, solution, actual technology, inspectable demo and intended benefits; publication status. | Project model and `/work/[slug]`.                                                                                   |
| 46. About                             | Honest company story and configurable real founder information.                                   | `/about`.                                                                                                           |
| 47. Process                           | Discovery, Planning & Design, Development, Testing & Launch, Support & Growth.                    | `/process`.                                                                                                         |
| 48. Start a Project/contact           | Concise qualification form covering required context.                                             | `/contact`.                                                                                                         |
| 49. Contact workflow                  | Client/server validation, spam/rate controls, real delivery, honest feedback and deduplication.   | Contact UI/API, unit and browser tests.                                                                             |
| 50. Business emails                   | Central known email addresses and functioning mailto links.                                       | Site configuration and link audit.                                                                                  |
| 51. Chatbot                           | Useful structured assistant; optional bounded server AI; no invented facts.                       | Assistant UI/API and failure-mode tests.                                                                            |
| 52. Insights                          | Useful original articles; no filler collection.                                                   | `/insights` and article details.                                                                                    |
| 53. FAQ                               | Useful service/process answers without invented contractual policies.                             | FAQ content and contextual rendering.                                                                               |
| 54. Careers                           | Only open roles published; honest empty state and careers email.                                  | `/careers` and job publication filter.                                                                              |
| 55. Central configuration             | Company, contact, social, founder, CTA and integration settings centralized.                      | `src/config/`.                                                                                                      |
| 56. Structured content                | Maintainable service/project/FAQ/team/career/insight models.                                      | `src/content/`.                                                                                                     |

## Architecture and quality

| Section                        | Required outcome                                                                                | Review surface                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 57. Tech stack                 | Stable Next.js App Router, strict TypeScript, Tailwind, specified fonts, sound form validation. | Package manifest, configuration and components.                                                |
| 58. Backend architecture       | Next route handlers/actions; no unnecessary separate server.                                    | `src/app/api/`.                                                                                |
| 59. Database                   | No application database without a real requirement.                                             | Data-flow/security applicability review.                                                       |
| 60. Authentication             | No production authentication unless required.                                                   | Security applicability review; browser demo must not claim real auth.                          |
| 61. Tokens and secrets         | Server-only credentials, protected env files, no secret exposure.                               | Config imports, build output, `.gitignore`.                                                    |
| 62. Admin                      | Structured content; no unnecessary custom admin.                                                | Repository structure.                                                                          |
| 63. Project structure          | Maintainable routes/components/content/config/lib/styles/public assets.                         | Source tree.                                                                                   |
| 64. Design system              | Reusable structural/interactive primitives and shared tokens.                                   | Components and styles.                                                                         |
| 65. Loading/error/empty states | Honest asynchronous states and safe failures.                                                   | Forms, assistant, careers, errors and unavailable integrations.                                |
| 66. Responsive design          | Phone through wide desktop without clipping, overlap or overflow.                               | Browser viewport matrix.                                                                       |
| 67. Website integrity          | Working nav/logo/footer, no dead CTA, real mailto, dynamic year and 404.                        | Link/CTA and keyboard tests.                                                                   |
| 68. Placeholder content        | No accidental dummy business data, unfinished public text or starter assets.                    | Source and rendered-content audit.                                                             |
| 69. Accessibility              | Semantic structure, labels, focus, keyboard, contrast and reduced motion.                       | Automated accessibility plus manual interaction review.                                        |
| 70. SEO                        | Unique metadata, canonical/OG URLs, sitemap, robots and truthful structured data.               | Route responses and crawler audit.                                                             |
| 71. Local SEO readiness        | Extensible architecture; no fabricated location pages.                                          | Content and route inventory.                                                                   |
| 72. Performance                | Target LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.                                                         | Lab measurements and post-launch field monitoring; local timings do not certify field results. |
| 73. Image optimization         | Appropriate sizing/compression, dimensions and lazy loading.                                    | Asset inventory and rendered media.                                                            |
| 74. Caching                    | Static public content cached; no sensitive response caching.                                    | Route headers and data flow.                                                                   |
| 75. File uploads               | No upload surface unless actually required.                                                     | API inventory; not applicable initially.                                                       |

## Security, privacy, and business integrity

| Section                      | Required outcome                                                                   | Review surface                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 76. Security                 | Proportional validation, rate/cost limits, secrets, headers, CORS and safe errors. | [security.md](security.md), code and tests.                                                 |
| 77. Input/injection security | Bound/validate untrusted input, escape output; conditional SQL/CSRF/SSRF controls. | API adversarial tests and security review.                                                  |
| 78. Authorization            | Server enforcement when protected resources exist.                                 | Applicability review; no accounts initially.                                                |
| 79. CORS                     | Deliberate same-origin policy, no wildcard sensitive endpoint.                     | API request tests.                                                                          |
| 80. Webhook security         | Signature/replay/idempotency controls if webhooks introduced.                      | Applicability review; no webhook receiver initially.                                        |
| 81. API cost protection      | Distributed limits, caps, bounded output/timeouts and provider spending settings.  | AI/email integration, tests, provider setup.                                                |
| 82. Security hygiene         | Env/git/source-map/log/dependency review.                                          | Audit commands and production checks.                                                       |
| 83. Duplicate protection     | Disabled pending UI plus server/provider idempotency.                              | Repeated and concurrent inquiry tests.                                                      |
| 84. Privacy Policy           | Accurate data handling, providers, cookies/analytics/chatbot and review flags.     | `/privacy`; final legal approval pending.                                                   |
| 85. Terms and Conditions     | Dedicated footer-linked terms; no invented contractual decisions.                  | `/terms`; final business/legal approval pending.                                            |
| 86. Analytics                | Configurable minimal event architecture; no unnecessary personal data.             | Event adapter and disabled-by-default configuration.                                        |
| 87. Content writing          | Concrete, professional language; no filler, emoji or public em dashes.             | Rendered copy and source scans.                                                             |
| 88. Brand voice              | Engineers who understand business; clear and credible.                             | Editorial review.                                                                           |
| 89. Proof strategy           | Real demo/process/technical explanation; no manufactured proof.                    | All projects and company copy.                                                              |
| 90. Pricing                  | Inquiry/scoping unless an approved pricing model exists.                           | FAQ, assistant and service copy.                                                            |
| 91. Future growth            | Extendable content architecture without unnecessary future infrastructure.         | Models and maintainer docs.                                                                 |
| 92. Logo                     | Supplied real logo or professionally replaceable wordmark.                         | Header/footer/favicon/social image. Wordmark is permitted; adoption remains a brand choice. |
| 93. Favicon                  | Branded icon, tested in deployed output.                                           | Local and production favicon requests/browser.                                              |
| 94. Company information      | Only supplied company/domain/emails/Instagram and known country facts.             | Central configuration and content audit.                                                    |

## Deployment, validation, and launch

| Section                                 | Required outcome                                                                                    | Review surface                                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 95. Custom domain                       | Approved `codinginx.com` hostname, DNS, HTTPS, redirects and canonical behavior.                    | Live production checks; pending deployment/access.                                                  |
| 96. Remove builder/AI branding          | No unnecessary platform/starter attribution; retain legal notices.                                  | Source and rendered-page audit.                                                                     |
| 97. Deployment                          | Vercel preferred; env, setup, deployment/domain documentation.                                      | [deployment.md](deployment.md), `.env.example`.                                                     |
| 98. Development quality                 | Clear, typed, maintainable code with purposeful dependencies.                                       | Lint/typecheck and human review.                                                                    |
| 99. Source control                      | Correct ignore rules, no secrets/junk, cloneable current source.                                    | Git status/diff and remote delivery; record actual state.                                           |
| 100. Testing                            | Full interaction, form, security, responsive, content, metadata and routes matrix.                  | Automated and manual verification results.                                                          |
| 101. Automated tests                    | Meaningful API/validation/business/security/content tests.                                          | Test suite and execution logs.                                                                      |
| 102. Load test                          | Approximately 100 concurrent users against production-like local/staging routes.                    | Load script, observed latency/errors/rate-limit results. No paid-provider traffic without approval. |
| 103. Browser and interaction validation | Run site; inspect every major route and click important controls.                                   | Browser tests and manual screenshots.                                                               |
| 104. Build validation                   | Lint, typecheck, tests and production build pass.                                                   | Recorded final commands and results.                                                                |
| 105. Monitoring                         | Uptime, errors, API failures, deploy health and provider failures observable.                       | Safe local hooks plus configured production account/alerts; external setup pending.                 |
| 106. Error logging                      | Safe route/operation/time/request/category only; no lead payloads or secrets.                       | Logging implementation and logs audit.                                                              |
| 107. Backups                            | Define backup handling only for meaningful persistent data.                                         | Provider records/mailbox approval pending; no application DB.                                       |
| 108. Backup restore test                | Test real recovery where persistent business records are retained.                                  | External provider/mailbox recovery evidence pending; Redis throttle metadata is expendable.         |
| 109. Launch checklist                   | All applicable UI, feedback, SEO, security, tests, infrastructure, identity/content/legal checks.   | [launch-readiness.md](launch-readiness.md).                                                         |
| 110. Launch gate                        | No launch declaration with unresolved required condition.                                           | Release decision and external evidence.                                                             |
| 111. Do not fake completion             | Safe integration points; explicit missing facts/accounts/assets.                                    | Readiness status and final handoff.                                                                 |
| 112. Security complexity rule           | Real, proportional controls; no unused auth/payment/upload/webhook/database infrastructure.         | Architecture and applicability checklist.                                                           |
| 113. Execution approach                 | Foundation, homepage, complete pages, functionality, QA and production phases.                      | Implementation history and staged verification.                                                     |
| 114. Decision making                    | Exercise design/engineering judgment; ask only for genuinely missing business inputs.               | Decision log and remaining-input list.                                                              |
| 115. Quality bar                        | Deliberate studio-grade design and credible engineering.                                            | Visual and technical review.                                                                        |
| 116. Final design audit                 | Full forbidden-treatment audit plus typography, authentic work and functional mobile design.        | Every rendered route and responsive screenshots.                                                    |
| 117. Final production walkthrough       | Desktop/mobile/customer/search/developer/operator perspectives.                                     | Local walkthrough plus external production recheck.                                                 |
| 118. Most important principle           | Demonstrate thinking, building, process, business value and trust.                                  | Product demonstrations and all content.                                                             |
| 119. Final deliverable                  | Source/build/pages/design/content/flows/SEO/security/docs/tests/evidence and honest pending inputs. | Repository, README and all readiness evidence.                                                      |

## Explicit boundaries to preserve

- A functioning browser demonstration is proof of the workflow implemented here. It is not client work, a shipped customer platform, live AI/CRM integration, or production authentication.
- Section 44 describes the future portfolio strategy. Any absent real authentication, persistence, provider integration or published project asset must be disclosed rather than imitated or implied.
- A local email-provider mock validates application behavior; it does not prove mail arrives in CodinginX's real inbox.
- A safe legal draft is not business/legal approval. An environment switch is not evidence that approval occurred.
- A static site preview is not proof of `codinginx.com`, HTTPS, alerts, production rate limits or mailbox recovery.
- Optional AI and analytics may remain disabled. A real project inquiry path, reviewed legal pages, approved domain and necessary operational monitoring remain launch conditions.

## Section 119 deliverable index

This table maps each of the master prompt's 42 final deliverables to its actual artifact or status. “Implemented” describes local source and observed behavior; it does not imply that pending external services or legal approvals exist. See [launch-readiness.md](launch-readiness.md) for final numbers, limitations and the blocked public-launch checklist.

| Item | Deliverable                            | Artifact and actual status                                                                                                                                                                               |
| ---- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Complete source code                   | Source, assets, tests and documentation published to GitHub on the `codinginx-website` branch.                                                                                                           |
| 2    | Working production build               | Final Next.js 16.4.0 Webpack production build passed, with 28 static outputs and dynamic APIs/contact route.                                                                                             |
| 3    | All required pages                     | 20 published content routes plus branded 404, including four service details, two genuine browser-demo project pages and three articles. The future SaaS MVP stays explicitly unpublished.               |
| 4    | Responsive implementation              | 120 page/viewport visits across 320, 375, 768, 1280, 1440 and 1920px; Chromium suite passed.                                                                                                             |
| 5    | CodinginX design system                | Shared UI, navigation/footer, forms, assistant, editorial layouts and design tokens in `src/components/` and `src/styles/`.                                                                              |
| 6    | Approved color system                  | Required navy/cloud/graphite/blue palette implemented. Text-bearing primary buttons use approved Blue Hover for accessible contrast.                                                                     |
| 7    | Instrument Sans + IBM Plex Mono        | Self-hosted font packages imported by root layout; Instrument Sans computed styles verified.                                                                                                             |
| 8    | Finished website copy                  | Service/process/article/project copy present and reviewed; approved founder names published. Biography/assets and final legal terms remain explicitly pending.                                           |
| 9    | Structured content architecture        | Typed `src/content/` models with publication controls and central company configuration.                                                                                                                 |
| 10   | Functional project inquiry flow        | Browser/server validation, safe email integration, limits/idempotency and all failure states implemented/tested. Real Resend account/sender/inbox verification pending.                                  |
| 11   | Chatbot architecture                   | Structured answers plus optional bounded server classification and disclosure gate; paid integration disabled.                                                                                           |
| 12   | SEO implementation                     | Route metadata, canonical/OG values, structured data, sitemap and default noindex launch policy verified locally.                                                                                        |
| 13   | Analytics architecture                 | Consent-aware allowlisted Plausible adapter implemented; disabled pending owner/account/privacy decisions.                                                                                               |
| 14   | Applicable security controls           | Validation, origin/body limits, safe output/logging, Redis limit/idempotency design, API caps/timeouts, headers and secret boundaries; see security guide.                                               |
| 15   | Privacy Policy                         | Accurate implementation review draft at `/privacy`, linked and noindex. Final legal approval and provider/retention decisions pending.                                                                   |
| 16   | Terms and Conditions                   | Honest review draft at `/terms`, linked and noindex. Business/legal decisions not invented.                                                                                                              |
| 17   | `.env.example`                         | Supplied key names and disabled defaults; no actual credentials.                                                                                                                                         |
| 18   | README                                 | Setup, architecture, commands, configuration, content maintenance and operational boundaries.                                                                                                            |
| 19   | Local setup instructions               | README clean install/dev/production-server and test commands. Final clean `npm ci` passed.                                                                                                               |
| 20   | Deployment instructions                | [deployment.md](deployment.md), Vercel/Node setup and launch gates. Actual hosting remains pending.                                                                                                      |
| 21   | Custom-domain configuration            | Canonical domain and redirect code plus DNS/HTTPS runbook. Real `codinginx.com` deployment and DNS changes not performed.                                                                                |
| 22   | Production favicon                     | Branded SVG, ICO and Apple icon installed and verified locally; live-domain verification pending.                                                                                                        |
| 23   | Company configuration explanation      | README Configuration section and `src/config/siteConfig.ts`.                                                                                                                                             |
| 24   | Adding projects explanation            | README project instructions, typed model, published-only filtering and optional real screenshots/links.                                                                                                  |
| 25   | Adding client case studies explanation | README specifies `client-work`, real work/publication permission and verified-result evidence.                                                                                                           |
| 26   | Updating founders explanation          | README founder instructions; approved names with optional real photos/bios/profiles only.                                                                                                                |
| 27   | Adding careers explanation             | README career instructions; only actual `status: open` vacancies published.                                                                                                                              |
| 28   | Adding articles explanation            | README article instructions and published-only typed records.                                                                                                                                            |
| 29   | Inquiry delivery explanation           | README, deployment and security guides explain Resend acceptance, Redis metadata, acknowledgments, retries and actual delivery verification.                                                             |
| 30   | Chatbot configuration explanation      | README/env guide documents structured answers, paired AI/disclosure switches and provider controls.                                                                                                      |
| 31   | Monitoring instructions                | Health/safe-log hooks implemented; deployment guide covers real monitor/account/alerts, all externally pending.                                                                                          |
| 32   | Backup/recovery explanation            | No application lead DB; Redis metadata expendable. External mailbox/provider policy and safe restore validation still need approval.                                                                     |
| 33   | Automated test suite                   | 59 unit/integration tests in seven files and 46 Chromium browser checks pass locally. CI workflow configured; hosted CI run not claimed.                                                                 |
| 34   | Completed launch checklist             | Local checklist and GitHub source publication complete; external production checklist remains blocked.                                                                                                   |
| 35   | Security applicability checklist       | [security.md](security.md), with justified non-applicability for SQL/auth/uploads/payments/webhooks.                                                                                                     |
| 36   | Lint/typecheck/tests/build results     | Final local passes recorded in launch readiness; dependency audit reports zero vulnerabilities.                                                                                                          |
| 37   | 100-user concurrency summary           | 700 local requests in seven 100-request concurrent batches; zero unexpected failures and healthy after. Exact latency table recorded.                                                                    |
| 38   | Broken-link/CTA summary                | Chromium navigation/CTA/contextual-link/metadata/404 suite passed. Real mailbox or third-party social availability is not implied.                                                                       |
| 39   | Responsive/mobile summary              | Six viewport widths, manual mobile layouts and assistant, focus/menu/FAQ/reduced-motion checks recorded. Chromium only.                                                                                  |
| 40   | Final visual-design audit              | All 20 routes and 404 visually inspected; refreshed key screenshots reviewed, font/glyph/contrast issues fixed.                                                                                          |
| 41   | Final production walkthrough results   | Local production build walkthrough completed. Actual deployed-domain/customer/operator walkthrough remains a required external gate.                                                                     |
| 42   | Remaining production inputs            | Readiness external-input table: hosting/DNS, real email/Redis, legal review, monitoring, mailbox retention/recovery and deployment verification; optional founder assets/AI/analytics listed separately. |
