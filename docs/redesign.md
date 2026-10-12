# CodinginX visual redesign

The October 2026 redesign preserves the Next.js App Router architecture, published routes, structured content, metadata, inquiry API, assistant, analytics consent, security controls and launch gates. The master prompt remains authoritative; the premium redesign brief expands visual expression without changing company facts or approved integrations.

## Art direction

Ink Navy and Warm Cloud establish the page rhythm. Instrument Sans supplies large editorial typography; IBM Plex Mono is reserved for coordinates, indices and technical labels. Composition, layered actual interfaces and structural rules provide depth. There are no purple gradients, glow effects, fake glass panels, custom cursors, particles or stock programmer photographs.

- Home: asymmetric headline and interactive input/output composition, indexed service explorer, real editable intake demo, operations preview, Build / Automate / Scale context, process rail and approved founder names.
- Services: four individually indexed compositions with service-specific product media. Detail pages add an actual browser-system boundary, seven-stage automation story, desktop/mobile interface composition or interactive design journey.
- Work: large alternating showcases, full/detail interface controls, workflow/architecture diagrams, technologies, project classification, limitations and working demos. Detail pages preserve optional approved media, external demo/repository links and verified-results fields.
- Process: the existing five engagement stages are accompanied by requirements, interface-study, working-increment, release-review and improvement artifacts. Discovery through growth remains visible.
- About: editorial founder typography and name-derived monograms. Genuine photographs, biographies, individual responsibilities and profile links remain ready for supplied approved material.
- Insights: contextual diagrams accompany the existing articles. Contact, FAQ, careers, legal pages, assistant, navigation and footer inherit the coherent type, control and motion system.

## Motion and interaction

The implementation uses native CSS, SVG, the Web Animations API and a shared IntersectionObserver. It adds no animation dependency and never hijacks scrolling or changes scroll speed.

Typography, media and structural rules have distinct one-shot reveal treatments. Server-rendered content is always visible; motion does not gate reading or navigation. The hero runs a short finite workflow once when visible, supports pause/replay and manual stage selection, and stops outside the viewport. Service tabs support arrow keys, Home and End. Project-gallery and design-stage controls expose their state to assistive technology. Desktop workflow/process panels follow actual text chapters; mobile uses a compact touch-friendly stage selector and ordinary scrolling.

`prefers-reduced-motion` disables nonessential movement while preserving content, manual controls and useful state changes. No animation-only information, continuous decorative loops, giant parallax, bouncing or cursor effects are used. Button/link shifts, field states, menu/dialog transitions and restrained interface changes provide tactile feedback.

## Media truth and performance

The three responsive WebP screenshots depict the real working Intake lab and Operations desk. Fictional sample data and browser-local limitations remain explicit. The screenshots total approximately 83 KB; Next Image handles intrinsic dimensions, responsive delivery and lazy loading, with eager delivery only where appropriate above the fold. `public/media/README.md` and `scripts/capture-product-media.mjs` describe provenance and repeatable capture.

The extraction function is shared by the working demo and hero. Automation provider connections are illustrative architecture, explicitly labeled as requiring approved configuration. No real AI/CRM/email delivery, client relationship or project outcome is implied. The live demos explain interaction directly; a decorative autoplay video would add loading and motion without improving these workflows. Future recordings must show real implemented behavior, have an appropriate poster/fallback and controls, and respect reduced motion.

## Maintenance

`src/styles/redesign.css` holds the studio presentation; `globals.css` retains the existing tokens and control/accessibility foundation. Components with actual state or browser observation are client components; route content and static diagrams remain server-renderable. `src/content/presentation.ts` maps service visuals and illustrative workflow text. Product media is selected by a project's actual `demo` field, never its order or client label.

New projects without a supported internal demonstration use their supplied screenshots rather than inheriting fake demo material. Keep client permission and results verification in the existing content model. Adding a service or insight also requires choosing a relevant visual, checking the responsive layout and reviewing its diagram against the actual content.

The root-only `/work/` ignore rule keeps scratch evidence out of Git while correctly including `src/app/work/` and its project routes. Next.js's generated agent guidance is retained; `allowedDevOrigins` adds only the loopback QA host and does not broaden production API origins.

## Verification and release boundary

Results of the final production-build browser suite, responsive/contrast review, regression tests, load sample and rendering measurements are recorded in [launch-readiness.md](launch-readiness.md). Local success does not approve production accounts, legal copy or external delivery. All eight external launch evidence gates remain pending until verified. The existing launch checker continues to block public indexing while those inputs are unresolved.
