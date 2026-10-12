export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  activities: string[];
  outcome: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understand the work before defining the software. We look at the people, decisions, and existing systems behind your project.",
    activities: [
      "Identify users, business objectives, and the workflow to improve.",
      "Review existing tools, data, integrations, and operational constraints.",
      "Discuss budget, priorities, risks, and what success would mean.",
    ],
    outcome:
      "A shared problem definition, practical constraints, and a clear next decision.",
  },
  {
    number: "02",
    title: "Planning & Design",
    description:
      "Turn the problem into a buildable plan. Connect the customer experience to the technical decisions that support it.",
    activities: [
      "Map user flows and the most important screens.",
      "Define requirements, architecture, integration boundaries, and data handling.",
      "Agree the initial scope, milestones, and acceptance criteria.",
    ],
    outcome:
      "A scoped implementation plan with explicit assumptions and review points.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Build in useful increments. Make progress visible through working software and keep decisions connected to the agreed priorities.",
    activities: [
      "Implement the core workflow and connect the required systems.",
      "Review working increments, edge cases, and feedback.",
      "Document changes and address risks as they become clearer.",
    ],
    outcome:
      "Working software that can be inspected against real requirements.",
  },
  {
    number: "04",
    title: "Testing & Launch",
    description:
      "Check the complete experience, including what happens when something fails. A release needs an operational plan as well as a finished interface.",
    activities: [
      "Validate functionality, accessibility, responsive behavior, and performance.",
      "Review security, permissions, data handling, and integration failures.",
      "Prepare deployment, monitoring, documentation, and a recovery path.",
    ],
    outcome:
      "A reviewed release with understood limitations and a clear handover.",
  },
  {
    number: "05",
    title: "Support & Growth",
    description:
      "Use what happens after launch to inform what comes next. Improve the product around evidence from its users and operations.",
    activities: [
      "Review issues, feedback, and agreed product measures.",
      "Plan maintenance and integration updates appropriate to the system.",
      "Prioritize the next improvements within the agreed engagement.",
    ],
    outcome:
      "An informed improvement plan. Ongoing coverage is agreed for each project.",
  },
];
