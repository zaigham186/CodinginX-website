import { siteConfig } from "@/config/siteConfig";
export const assistantAnswers = {
  services: {
    message:
      "CodinginX builds custom software, practical AI and automation, web and mobile products, and UI/UX design. Tell us what your users need to do or which task your team repeats, and we can help you explore a starting point.",
    links: [
      { label: "Explore services", href: "/services" },
      { label: "Start a Project", href: "/contact" },
    ],
  },
  software: {
    message:
      "Custom software can help when existing tools do not fit a specific workflow. CodinginX works on SaaS products, internal systems, customer portals, APIs, integrations, and existing product improvements. A useful first step is to describe your users, their main task, and your current tools.",
    links: [
      { label: "Custom Software", href: "/services/custom-software" },
      {
        label: "Discuss your project",
        href: "/contact?service=Custom%20Software",
      },
    ],
  },
  ai: {
    message:
      "Useful automation starts with a repeated task and clear boundaries. Examples include structuring incoming inquiries, connecting business tools, and answering approved support questions with a human handoff. CodinginX can help assess where AI adds value and where a simpler workflow is enough.",
    links: [
      { label: "AI & Automation", href: "/services/ai-automation" },
      {
        label: "Discuss automation",
        href: "/contact?service=AI%20%26%20Automation",
      },
    ],
  },
  web: {
    message:
      "CodinginX builds business websites, web applications, mobile experiences, booking flows, and customer portals. The starting point is what a visitor needs to accomplish, such as making an inquiry, requesting a quote, or managing a service.",
    links: [
      { label: "Web & Mobile", href: "/services/web-mobile-development" },
      {
        label: "Start a Project",
        href: "/contact?service=Website%20%2F%20Web%20Application",
      },
    ],
  },
  design: {
    message:
      "UI/UX work can clarify a product before development through user flows, wireframes, prototypes, responsive interfaces, and design systems. Share the main user journey and where people currently get stuck.",
    links: [
      { label: "UI/UX & Product Design", href: "/services/ui-ux-design" },
      { label: "Discuss design", href: "/contact?service=UI%2FUX" },
    ],
  },
  mvp: {
    message:
      "For an MVP, focus on one audience, one useful outcome, and the smallest workflow that can test your idea. CodinginX can help turn that into a scoped product plan and working software. Share what you want to validate and what you already have.",
    links: [
      { label: "Our process", href: "/process" },
      { label: "Discuss an MVP", href: "/contact?service=MVP%20%2F%20SaaS" },
    ],
  },
  pricing: {
    message:
      "Cost, availability, and delivery timing depend on scope, integrations, and what already exists. CodinginX does not publish fixed pricing tiers here. Share your goals, approximate budget, and desired timing so the team can discuss the project directly.",
    links: [{ label: "Start a Project", href: "/contact" }],
  },
  process: {
    message:
      "The process moves through discovery, planning and design, development, testing and launch, then support and growth. Scope and milestones are discussed around the actual project. Contract terms, ownership, payment, and support commitments need to be agreed directly with the team.",
    links: [
      { label: "Read the process", href: "/process" },
      { label: "Contact the team", href: "/contact" },
    ],
  },
  work: {
    message:
      "The Work section explains the problem, approach, and intended benefit of each published project. Internal concepts and demonstrations are labeled separately from client work. Explore the demonstrations and their limitations before discussing a similar project.",
    links: [{ label: "Explore Our Work", href: "/work" }],
  },
  about: {
    message:
      "CodinginX is a USA-based software engineering, AI, and digital product company founded by two co-founders. The focus is practical technology, thoughtful engineering, and transparent communication. For information that is not published here, contact the team directly.",
    links: [
      { label: "About CodinginX", href: "/about" },
      { label: "Email the team", href: `mailto:${siteConfig.emails.general}` },
    ],
  },
  careers: {
    message: `The Careers page lists only roles that are currently open. You can contact ${siteConfig.emails.careers} with a relevant introduction and portfolio. The assistant cannot confirm hiring decisions or offer employment.`,
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Email careers", href: `mailto:${siteConfig.emails.careers}` },
    ],
  },
  contact: {
    message: `Use Start a Project to share your name, work email, company, goals, project stage, approximate budget, and desired timeline. The form sends your inquiry to CodinginX when delivery is available. You can also email ${siteConfig.emails.general} directly. Please do not share passwords, API keys, or confidential information here.`,
    links: [
      { label: "Start a Project", href: "/contact" },
      { label: "Email CodinginX", href: `mailto:${siteConfig.emails.general}` },
    ],
  },
  privacy: {
    message:
      "Please avoid sharing sensitive information in this assistant. The privacy page explains the site’s forms, assistant, and optional integrations. Contact CodinginX for privacy questions or business and contract terms that need a direct answer.",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact CodinginX", href: "/contact" },
    ],
  },
  other: {
    message:
      "I can help you explore CodinginX services, understand the process, find work, or start a project inquiry. I cannot confirm unpublished company information, quote a price, promise a deadline, or agree contract terms. What are you hoping to build or improve?",
    links: [
      { label: "Explore services", href: "/services" },
      { label: "Start a Project", href: "/contact" },
    ],
  },
} as const;

export type AssistantTopic = keyof typeof assistantAnswers;
export const assistantTopics = Object.keys(
  assistantAnswers,
) as AssistantTopic[];

export function guidedTopic(message: string): AssistantTopic {
  const text = message.toLowerCase();
  const rules: Array<[AssistantTopic, RegExp]> = [
    ["privacy", /privacy|data retention|cookie|confidential|legal|\bterms\b/],
    [
      "pricing",
      /pric|cost|budget|quote|how much|deadline|timeline|how long|delivery date/,
    ],
    ["careers", /career|hiring|\bjob\b|employment|resume|résumé/],
    ["contact", /contact|human|email|start a project|talk to|speak to|inquiry/],
    ["about", /founder|about|location|based|company|team|office/],
    [
      "process",
      /process|payment|ownership|contract|owns? the code|support|maintain|communication/,
    ],
    ["work", /portfolio|work example|project example|demo|case stud|client/],
    ["mvp", /\bmvp\b|startup|idea|minimum viable|prototype/],
    ["ai", /\bai\b|automat|chatbot|artificial|integrat/],
    ["design", /design|ui\/ux|user experience|wireframe|figma/],
    ["web", /website|mobile|web app|booking|e-commerce/],
    ["software", /software|saas|portal|dashboard|\bapi\b|internal system/],
    ["services", /service|what do you|what can you|build|help/],
  ];
  return rules.find(([, pattern]) => pattern.test(text))?.[0] || "other";
}
