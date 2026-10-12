import type { PublicationStatus } from "./types";

export type ProjectType = "internal-demonstration" | "concept" | "client-work";

export interface Project {
  slug: string;
  title: string;
  category: string;
  type: ProjectType;
  typeLabel: string;
  publicationStatus: PublicationStatus;
  pendingReason?: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  workflow: { title: string; description: string }[];
  intendedBenefit: string;
  verifiedResults: string[];
  limitations: string[];
  screenshots: { src: string; alt: string; width: number; height: number }[];
  demo?: "lead-intake" | "service-operations";
  liveUrl?: string;
  repositoryUrl?: string;
  relatedService: string;
}

export const projects: Project[] = [
  {
    slug: "lead-intake",
    title: "From inquiry to structured lead.",
    category: "Automation / Information extraction",
    type: "internal-demonstration",
    typeLabel: "Internal demonstration",
    publicationStatus: "published",
    summary:
      "Try an inquiry-processing workflow that turns a message into an editable, downloadable record.",
    overview:
      "A working browser demonstration of the first part of a lead-processing workflow. Enter a sample inquiry, inspect the extracted fields, make corrections, and download a structured record. It makes the handoff visible without implying a connected CRM or a live AI service.",
    problem:
      "Customer inquiries often arrive as free-form messages. A team then has to identify contact details, understand the request, and transfer that information into the next system. Missing context and unreviewed extraction can make that handoff unreliable.",
    solution:
      "This demonstration uses deterministic rules to extract supported details from a message. It separates the source message from the structured output and leaves the person in control of corrections and export. It is an inspectable starting point for discussing a larger automation.",
    features: [
      "Editable inquiry input and structured output",
      "Rule-based contact and request extraction",
      "Human review before export",
      "Downloadable JSON record",
      "Browser-only processing with no live message delivery",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Browser APIs"],
    workflow: [
      {
        title: "Receive",
        description:
          "Enter an example inquiry. Use sample information rather than sensitive customer data.",
      },
      {
        title: "Structure",
        description:
          "Deterministic rules identify supported fields and prepare an editable record.",
      },
      {
        title: "Review",
        description:
          "Inspect the values, correct anything incomplete, and decide whether the record is useful.",
      },
      {
        title: "Export",
        description:
          "Download the record as JSON. No CRM, spreadsheet, email, or notification provider is contacted.",
      },
    ],
    intendedBenefit:
      "Make the intake handoff easier to inspect and show where validation belongs before information enters a business system. This demonstration has no measured business outcomes.",
    verifiedResults: [],
    limitations: [
      "This is an internal demonstration, not client work.",
      "Extraction is rule-based. It does not use a language model or demonstrate real AI accuracy.",
      "It does not write to a CRM or spreadsheet, send messages, notify a team, or provide a customer-support backend.",
      "A production workflow needs approved connected accounts, server-side validation, access controls, monitoring, and evaluation with representative data.",
    ],
    screenshots: [],
    demo: "lead-intake",
    relatedService: "ai-automation",
  },
  {
    slug: "service-operations",
    title: "A clearer view of the work ahead.",
    category: "Custom software / Service operations",
    type: "internal-demonstration",
    typeLabel: "Internal demonstration",
    publicationStatus: "published",
    summary:
      "A working sample board for intake, scheduling, and job status, with data stored in your browser.",
    overview:
      "A small operations workflow you can use directly. Add a sample service request, set its schedule, and move it through its status changes. The interface uses clearly labeled sample data and browser storage, so its behavior can be explored without a real customer account.",
    problem:
      "A service request can move through an inbox, a calendar, and several conversations before work starts. When those handoffs are unclear, it becomes difficult to see what is scheduled and what needs attention.",
    solution:
      "The demonstration brings request intake, a schedule, and explicit status into one local board. It shows the core interaction and the information a team would need to discuss before building a shared operational system.",
    features: [
      "Sample service-request intake",
      "Editable scheduling and status",
      "A shared visual structure for upcoming work",
      "Local browser persistence",
      "A reset control for restoring the sample state",
    ],
    technologies: ["Next.js", "React", "TypeScript", "localStorage"],
    workflow: [
      {
        title: "Intake",
        description:
          "Create a sample request with the information needed to identify the work.",
      },
      {
        title: "Schedule",
        description:
          "Set a date and make the planned work visible in the board.",
      },
      {
        title: "Track",
        description: "Update the request status as work progresses.",
      },
      {
        title: "Review",
        description:
          "Return to the board in the same browser or reset the sample data to start again.",
      },
    ],
    intendedBenefit:
      "Make the steps between an incoming request and completed work easier to understand. No operational improvements or customer outcomes have been measured.",
    verifiedResults: [],
    limitations: [
      "All initial records are fictional sample data for an internal demonstration.",
      "Records live in this browser, not a shared production database. Clearing browser storage removes them.",
      "There is no account system, multi-user access, external calendar, email, or notification delivery.",
      "A production system would need agreed scheduling rules, permissions, secure persistence, integration behavior, monitoring, and a recovery plan.",
    ],
    screenshots: [],
    demo: "service-operations",
    relatedService: "custom-software",
  },
  {
    slug: "saas-mvp",
    title: "SaaS MVP",
    category: "Product development",
    type: "concept",
    typeLabel: "Concept project",
    publicationStatus: "draft",
    pendingReason:
      "No genuine SaaS product with authentication, durable persistence, and a complete user workflow has been supplied or implemented. Keep unpublished until those capabilities exist and are validated.",
    summary:
      "A content model reserved for a genuine working SaaS demonstration.",
    overview: "",
    problem: "",
    solution: "",
    features: [],
    technologies: [],
    workflow: [],
    intendedBenefit: "",
    verifiedResults: [],
    limitations: [],
    screenshots: [],
    relatedService: "custom-software",
  },
];

export const getPublishedProjects = () =>
  projects.filter((project) => project.publicationStatus === "published");
export const getProjectBySlug = (slug: string) =>
  getPublishedProjects().find((project) => project.slug === slug);
