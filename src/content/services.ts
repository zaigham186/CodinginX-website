import type { FAQItem } from "./types";

export interface Service {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  headline: string;
  problem: string;
  audience: string;
  capabilities: { title: string; description: string }[];
  scenarios: { title: string; description: string }[];
  process: string[];
  faq: FAQItem[];
  relatedProject: string;
  cta: string;
}

export const services: Service[] = [
  {
    slug: "custom-software",
    index: "01",
    title: "Custom Software",
    shortTitle: "Custom Software",
    summary:
      "Software shaped around how your business works. From a focused MVP to the systems behind daily operations.",
    description:
      "Custom software development for SaaS products, internal tools, customer portals, APIs, and business operations.",
    headline: "Build the software your next step needs.",
    problem:
      "When a critical workflow lives across spreadsheets, inboxes, and disconnected tools, even simple work can be hard to track. Custom software can bring that workflow into one place with clear responsibilities, reliable data, and room to evolve.",
    audience:
      "For founders defining a first product, teams improving existing software, and businesses whose essential workflow no longer fits their tools.",
    capabilities: [
      {
        title: "SaaS & MVP development",
        description:
          "Define and build the smallest useful product around a complete user workflow. Add accounts, permissions, billing, or other infrastructure only where the product needs them.",
      },
      {
        title: "Operations & internal systems",
        description:
          "Replace fragmented handoffs with business applications, scheduling tools, dashboards, and CRM-style workflows that reflect how your team operates.",
      },
      {
        title: "Customer portals",
        description:
          "Give customers a clear place to submit requests, review progress, manage information, and complete the actions your service requires.",
      },
      {
        title: "APIs & integrations",
        description:
          "Connect existing software with deliberate data mapping, permissions, error handling, and visibility into failed transfers.",
      },
      {
        title: "Modernization",
        description:
          "Review the system you already have, identify the constraints that matter, and plan improvements without assuming everything needs to be rebuilt.",
      },
    ],
    scenarios: [
      {
        title: "A first product people can actually use",
        description:
          "A founder needs more than presentation screens. We map the core action, the data it produces, and the operational work needed to support a usable release.",
      },
      {
        title: "One view of a service request",
        description:
          "A team needs to know what arrived, who owns it, and what happens next. A shared workflow can connect intake, scheduling, and status instead of relying on memory.",
      },
    ],
    process: [
      "Map the workflow and compare custom development with available tools.",
      "Define the data, permissions, integrations, and first useful release.",
      "Build iteratively against agreed acceptance criteria.",
      "Test real scenarios and prepare a maintainable deployment and handover.",
    ],
    faq: [
      {
        question: "When is custom software the right choice?",
        answer:
          "It becomes worth considering when a workflow is important to your business and available tools create persistent constraints. Compare the cost of development and maintenance with the cost of workarounds, duplicate data, and limited flexibility. A configured off-the-shelf tool may still be the better choice.",
      },
      {
        question: "Can you improve a product we already have?",
        answer:
          "Yes. The first step is a review of the code, architecture, deployment, data, and known issues. That gives us a basis for proposing targeted improvements, integration work, or a staged modernization plan.",
      },
      {
        question: "Will an MVP be ready to grow?",
        answer:
          "An initial product should have clear boundaries, sensible data modeling, and a maintainable foundation. That does not mean building every future feature. Architecture decisions should reflect the current requirements and the next likely changes.",
      },
    ],
    relatedProject: "service-operations",
    cta: "Discuss Your Software Project",
  },
  {
    slug: "ai-automation",
    index: "02",
    title: "AI & Automation",
    shortTitle: "AI & Automation",
    summary:
      "Connect tools, structure information, and reduce repetitive work. Put AI where it has a useful job to do.",
    description:
      "Practical AI integration and business automation for customer inquiries, support workflows, lead processing, and connected systems.",
    headline: "Less repetitive work. More useful information.",
    problem:
      "An inquiry arrives in one system, gets copied into another, and waits for someone to notice it. Automation can handle repeatable steps. AI can help interpret unstructured information when the workflow also accounts for uncertainty and human review.",
    audience:
      "For businesses handling repeated inquiries, teams moving information between tools, and product owners exploring a specific AI capability.",
    capabilities: [
      {
        title: "Lead processing",
        description:
          "Connect form or email intake to structured records, routing, internal notifications, and customer acknowledgements. Prevent duplicate processing and keep failures visible.",
      },
      {
        title: "Support assistance",
        description:
          "Help visitors find approved answers, capture relevant details, and reach the right person. Set clear boundaries when the assistant does not know or needs to escalate.",
      },
      {
        title: "AI in existing software",
        description:
          "Add focused capabilities such as information extraction, classification, or draft preparation with evaluation, review controls, and bounded API usage.",
      },
      {
        title: "Business integrations",
        description:
          "Connect forms, email, CRM tools, spreadsheets, calendars, databases, and APIs using the simplest maintainable approach for the job.",
      },
      {
        title: "Workflow automation",
        description:
          "Use custom code or tools such as n8n, Make, and Zapier where appropriate. Define the trigger, permissions, retries, and operational owner.",
      },
    ],
    scenarios: [
      {
        title: "Customer email to a reviewed lead",
        description:
          "An inquiry is received, relevant fields are extracted, and uncertainty is flagged. After validation, the workflow can create a CRM record, notify the team, and prepare a response. Live delivery requires the relevant connected accounts and permissions.",
      },
      {
        title: "Support with a useful handoff",
        description:
          "An assistant answers from approved service information and gathers the details needed for a conversation. Requests outside its knowledge or authority move to a person rather than becoming invented answers.",
      },
    ],
    process: [
      "Identify a repeated task and establish how it works today.",
      "Decide which steps need rules, AI, approval, or direct human judgment.",
      "Build a small workflow with explicit data and failure boundaries.",
      "Evaluate representative cases and monitor quality, cost, and exceptions.",
    ],
    faq: [
      {
        question: "Does every automation need AI?",
        answer:
          "No. A clear rule, API integration, or scheduled job is often more predictable and easier to maintain. AI is useful when the task involves variation in language or information that simple rules cannot handle well enough.",
      },
      {
        question: "Can an assistant answer everything about our business?",
        answer:
          "It should answer only within approved knowledge and its defined role. Unknown questions, sensitive requests, and contractual decisions need a human handoff. An assistant should not invent an answer to keep the conversation moving.",
      },
      {
        question: "How do you approach data and API costs?",
        answer:
          "The design should minimize the data sent to providers, keep credentials on the server, cap usage, set timeouts, and define access controls. Provider selection, account configuration, retention, and legal requirements need to be reviewed for the project.",
      },
    ],
    relatedProject: "lead-intake",
    cta: "Start a Project",
  },
  {
    slug: "web-mobile-development",
    index: "03",
    title: "Web & Mobile",
    shortTitle: "Web & Mobile",
    summary:
      "Websites and applications that help people find you, take action, and get things done on any screen.",
    description:
      "Business website, web application, and mobile development with useful customer journeys, responsive interfaces, and connected workflows.",
    headline: "Give your business a useful digital front door.",
    problem:
      "A website should make it easier for a customer to understand your business and take the next step. A web or mobile application should make the task itself easier. Both need to work beyond the first impression, including forms, integrations, loading states, and everyday maintenance.",
    audience:
      "For businesses establishing a professional online presence, teams replacing an outdated website, and founders bringing a web or mobile product to market.",
    capabilities: [
      {
        title: "Business websites & redesigns",
        description:
          "Clear positioning, useful service information, accessible navigation, fast pages, and a direct path to an inquiry. Build the content around what customers need to decide.",
      },
      {
        title: "Web applications & SaaS",
        description:
          "Responsive interfaces for meaningful workflows, supported by the appropriate data model, APIs, account system, and operational tooling.",
      },
      {
        title: "Booking & online requests",
        description:
          "Turn a phone-and-email process into an understandable online flow. Handle availability, validation, confirmations, and exceptions where connected systems support them.",
      },
      {
        title: "Customer portals & commerce",
        description:
          "Create a focused place for customers to interact with your business. Scope portals or e-commerce around actual access, transaction, and support requirements.",
      },
      {
        title: "Mobile applications",
        description:
          "Choose an approach based on the user journey, device capabilities, release process, and maintenance needs. A responsive web experience may be enough; some tasks justify a dedicated app.",
      },
    ],
    scenarios: [
      {
        title: "A business without a useful website",
        description:
          "Explain the service, answer the questions that delay an inquiry, and collect the right details. The website becomes a storefront, information hub, and entry point to the work behind the scenes.",
      },
      {
        title: "An online request that reaches the team",
        description:
          "A quote request needs more than a submit button. Validate the details, send them to the agreed destination, handle delivery failures, and show the visitor an accurate result.",
      },
    ],
    process: [
      "Define the customer journey and the actions the experience should support.",
      "Plan content, information architecture, responsive layouts, and integrations.",
      "Build accessible pages and working end-to-end interactions.",
      "Verify performance, search foundations, mobile behavior, and launch configuration.",
    ],
    faq: [
      {
        question: "Can you help if our business has no website?",
        answer:
          "Yes. We can start with the services, customer questions, and inquiry flow your site needs to support. Your business facts, brand assets, and approved legal information form the basis of the content.",
      },
      {
        question: "Do we need a mobile app or a responsive website?",
        answer:
          "That depends on the task. A responsive website works across devices and is easy to reach. A dedicated app can be appropriate for device features, frequent use, or a specific mobile workflow. We can help assess the tradeoffs.",
      },
      {
        question: "Can the website connect to our current tools?",
        answer:
          "Often, yes. The implementation depends on the tools' APIs, access permissions, subscription limits, and data requirements. Those details should be confirmed before promising an integration.",
      },
    ],
    relatedProject: "service-operations",
    cta: "Start a Project",
  },
  {
    slug: "ui-ux-design",
    index: "04",
    title: "UI/UX & Product Design",
    shortTitle: "UI/UX & Product Design",
    summary:
      "Clear user journeys and considered interfaces. Make complex software easier to understand and use.",
    description:
      "Product design, user flows, interface design, responsive systems, and prototypes grounded in the tasks people need to complete.",
    headline: "Make the next action clear.",
    problem:
      "An interface can look polished and still make everyday work difficult. Product design connects what a person is trying to do with the information, decisions, and feedback the software provides. The details matter most where someone is uncertain or something goes wrong.",
    audience:
      "For founders shaping an initial product, teams untangling a difficult workflow, and businesses bringing consistency to an existing interface.",
    capabilities: [
      {
        title: "Discovery & information architecture",
        description:
          "Understand users, tasks, content, and business constraints. Organize the experience so people can find what they need and understand where they are.",
      },
      {
        title: "User flows & wireframes",
        description:
          "Map the path through a task before polishing screens. Include decisions, alternate routes, empty states, permissions, and recovery from errors.",
      },
      {
        title: "Interface & responsive design",
        description:
          "Use typography, spacing, hierarchy, and considered controls to make complex information readable across phones, tablets, and desktop screens.",
      },
      {
        title: "Prototypes & usability",
        description:
          "Make important interactions inspectable and testable. Use feedback to resolve confusing steps before they become expensive implementation decisions.",
      },
      {
        title: "Design systems & handoff",
        description:
          "Define reusable foundations and interaction patterns in tools such as Figma, with component behavior and implementation context alongside the visual work.",
      },
    ],
    scenarios: [
      {
        title: "A workflow with too many unclear steps",
        description:
          "Trace the user's goal, identify what information is needed at each moment, and remove avoidable decisions. Prototype the revised flow so the change can be evaluated.",
      },
      {
        title: "A product that has outgrown its first screens",
        description:
          "Bring shared patterns to forms, navigation, data views, and status feedback. A practical design system gives future features a consistent starting point.",
      },
    ],
    process: [
      "Understand the user, the task, and the context of use.",
      "Map the flow and validate the information structure.",
      "Design the interface and its responsive, error, and empty states.",
      "Review usability and document behavior for implementation.",
    ],
    faq: [
      {
        question: "Can design be a separate engagement?",
        answer:
          "A focused design scope can be discussed on its own or as part of development. The useful deliverables depend on whether you need to test an idea, improve a workflow, or prepare an interface for implementation.",
      },
      {
        question: "What does a prototype prove?",
        answer:
          "A prototype helps evaluate navigation, information, and interaction choices. It does not prove that a backend, integration, or business model works. Those assumptions need their own validation.",
      },
      {
        question: "How do you account for accessibility?",
        answer:
          "Accessibility starts with hierarchy, labels, contrast, keyboard behavior, and clear feedback. Designs should describe the interaction requirements, and the implemented product must then be tested with those requirements in mind.",
      },
    ],
    relatedProject: "service-operations",
    cta: "Start a Project",
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
