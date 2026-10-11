# CodinginX Codex Instructions

This repository is the official CodinginX website project.

## Source of truth

Before planning, editing, generating, or reviewing website code, read:

`CODINGINX_MASTER_PROMPT.md`

Treat that file as the source of truth for the product, design, engineering, security, QA, accessibility, SEO, performance, deployment, and launch-readiness requirements for this repository.

## Core working rules

- Build the real production website, not a prototype, mockup, demo-only implementation, or simplified substitute.
- Read `CODINGINX_MASTER_PROMPT.md` fully before beginning substantial implementation work.
- Keep referring back to `CODINGINX_MASTER_PROMPT.md` throughout the project. Do not rely only on memory of the initial task.
- Do not silently drop, weaken, reinterpret, or summarize away requirements merely to finish faster.
- Do not fabricate missing company facts, credentials, client work, founder information, project results, metrics, legal decisions, social links, phone numbers, addresses, API keys, external account details, testimonials, or business policies.
- When a requirement depends on missing information or credentials, implement the correct integration point safely and mark the item as pending instead of inventing a value.
- Use professional engineering judgment for implementation details that are not business decisions.
- Prefer a clean, maintainable, secure implementation over unnecessary complexity.
- Follow the approved CodinginX visual system, typography, color palette, anti-vibe-coded rules, responsive requirements, product-led editorial design direction, Work-page structure, and Founders/About structure defined in the master prompt.
- Preserve the distinction between real client work, concept projects, internal demonstrations, and live demos.
- Validate real behavior, not just code presence.
- Fix issues found during validation when possible instead of merely listing them.
- Do not declare the site launch-ready when the master prompt's launch gate still has unresolved blockers.

## Execution approach

For substantial work:

1. Inspect the existing repository and current project state first.
2. Read `CODINGINX_MASTER_PROMPT.md` fully.
3. Determine the current implementation status before replacing or rebuilding working code.
4. Plan the implementation internally.
5. Implement in coherent phases.
6. Validate continuously as work progresses.
7. Re-read the relevant master-prompt sections before final QA.
8. Complete the required lint, typecheck, tests, production build, responsive checks, link/CTA checks, security review, and launch-readiness checks that are applicable to the implemented architecture.
9. Report genuine external blockers clearly at the end.

Do not repeatedly stop for minor approvals.

Only ask the user for clarification when a real missing business fact, credential, legal choice, external account, required asset, or external permission prevents correct implementation.

## Design integrity

The website must not drift into a generic AI-generated or SaaS-template appearance.

Follow the master prompt's approved visual system, including:

- Ink Navy, Warm Cloud, Graphite, and controlled CodinginX Blue usage
- Instrument Sans as the primary typeface
- IBM Plex Mono as a restrained technical accent
- editorial composition
- product-first visuals
- restrained motion
- disciplined use of cards
- minimal decorative effects
- strong mobile design
- no purple-gradient AI aesthetic
- no Lucide-by-default look
- no fake dashboards, fake testimonials, fake metrics, or fake social proof

If a page begins to look generic or vibe-coded, revise the composition rather than adding more effects.

## Engineering and security

Keep architecture proportional to actual needs.

Do not add unnecessary:

- authentication
- JWT infrastructure
- database systems
- payment systems
- file uploads
- admin dashboards
- webhooks

unless a real requirement justifies them.

Where relevant, implement and validate:

- server-side validation
- XSS protection
- rate limiting
- secret management
- safe error handling
- API cost protection
- CORS controls
- secure external integrations
- duplicate-submission protection
- dependency/security auditing
- monitoring
- backups for meaningful persistent data

Do not expose secrets or fabricate production credentials.

## Completion standard

Before calling substantial work complete:

- run the relevant lint command
- run type checking
- run automated tests
- run a production build
- manually validate critical routes and interactions
- check responsive behavior
- check for broken links and CTAs
- review placeholder content
- review metadata and favicon
- review applicable security controls
- verify no known critical/high-severity issue remains unresolved

If an external requirement is missing, clearly mark the project or feature as pending rather than pretending it is complete.
