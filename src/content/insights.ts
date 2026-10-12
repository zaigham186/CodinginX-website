export type InsightSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: "Product planning" | "AI & automation" | "Engineering decisions";
  status: "draft" | "published";
  introduction: readonly string[];
  sections: readonly InsightSection[];
  takeaway: string;
  relatedService: { title: string; href: string };
};

export const insights: readonly Insight[] = [
  {
    slug: "plan-an-mvp-before-writing-code",
    title: "How to plan an MVP before writing code",
    description:
      "A practical guide to defining the user problem, choosing a first workflow, and setting a useful release boundary for your MVP.",
    category: "Product planning",
    status: "published",
    introduction: [
      "An MVP earns its place by helping you learn something that matters to the business. A smaller feature list alone does not make a product a useful experiment. Before development begins, decide who needs the product, what they should be able to accomplish, and what evidence would justify investing in the next release.",
      "A clear plan also protects engineering time. It gives the team a way to resolve new requests without repeatedly reopening every decision. The aim is enough shared understanding to build responsibly, with room to revise the product when real use challenges your assumptions.",
    ],
    sections: [
      {
        id: "define-the-user-problem",
        heading: "Start with a specific user and a recurring problem",
        paragraphs: [
          "Describe one group of people in a recognizable situation. A booking product for small businesses is broad. A booking workflow for a service coordinator who currently reconciles requests across email and a shared calendar is concrete enough to investigate. Write down how that person works today, where the process breaks, and what those failures cost in time, uncertainty, or missed work.",
          "Speak with prospective users before committing to a solution. Ask them to walk through a recent example and show the tools they used. Separate observed behavior from opinions about a proposed product. Someone saying an idea sounds useful is weaker evidence than a repeated problem they already spend effort trying to solve.",
        ],
      },
      {
        id: "choose-one-complete-workflow",
        heading: "Choose one complete workflow",
        paragraphs: [
          "Map the smallest useful journey from trigger to outcome. For a scheduling tool, that might be receiving a request, checking availability, confirming an appointment, and notifying the right person. A polished calendar screen without a reliable confirmation step leaves the actual job unfinished.",
          "List the normal path and the important exceptions. What happens if a slot becomes unavailable, an email fails, or a person changes their mind? Include the recovery steps needed to make the workflow usable. Defer adjacent capabilities such as advanced reporting when they do not help test the central assumption.",
        ],
      },
      {
        id: "set-the-release-boundary",
        heading: "Make the release boundary explicit",
        paragraphs: [
          "Write a short scope document with three groups: required for the first useful outcome, helpful after initial learning, and deliberately excluded. Give every required feature an acceptance condition a person can verify. Replace vague requirements such as fast onboarding with a description of the information collected and the task a new user can complete.",
          "Keep a separate assumption list. Each assumption should identify what you believe, what would challenge it, and how you will gather evidence. This makes tradeoffs easier when a request arrives late: does the change support the current learning goal, resolve a real usability problem, or belong in a later release?",
        ],
      },
      {
        id: "plan-for-real-operation",
        heading: "Include the work that makes the product operable",
        paragraphs: [
          "A first release still needs appropriate security, accessible interfaces, useful error states, and a way to investigate failures. If the product stores important data, define access rules and recovery procedures. If it sends messages or calls paid services, consider duplicate requests, timeouts, delivery failures, and usage limits before implementation.",
          "Identify the external dependencies early. A payment account, third-party API, approved legal text, or domain access can block a release even when the interface is finished. Assign an owner to each dependency and record what remains pending. Use test environments where available, and verify production configuration separately before inviting real users.",
        ],
      },
      {
        id: "define-evidence-and-next-steps",
        heading: "Decide what you will learn after release",
        paragraphs: [
          "Choose a small set of questions tied to the workflow. Can intended users complete it? Where do they need assistance? Does the outcome matter enough for them to return? Combine appropriate product events with conversations and observation. Avoid collecting personal data simply because an analytics tool makes it easy.",
          "Agree on how you will review findings and choose the next change. A failed assumption can be valuable if it prevents a larger investment in the wrong direction. Keep technical debt visible, distinguish defects from new scope, and reserve capacity for support. The next release should respond to evidence from the first.",
        ],
      },
    ],
    takeaway:
      "Before choosing a stack or requesting an estimate, prepare a user problem, one complete workflow, a release boundary, a dependency list, and a plan for learning from real use.",
    relatedService: {
      title: "Explore custom software development",
      href: "/services/custom-software",
    },
  },
  {
    slug: "what-business-tasks-to-automate-first",
    title: "What business tasks should you automate first?",
    description:
      "Choose an automation opportunity by examining repetition, rules, data quality, failure costs, and the people who will run the workflow.",
    category: "AI & automation",
    status: "published",
    introduction: [
      "The best first automation often starts with an ordinary task: moving an approved request into another system, checking whether information is complete, or reminding someone about an unresolved item. These tasks are easy to overlook because people have learned to work around them.",
      "Choosing carefully matters more than choosing an impressive technology. A useful automation has a clear trigger, an observable outcome, and a responsible owner. It also has a safe way to stop or ask for help when the information is incomplete. Start by understanding the process as it actually works.",
    ],
    sections: [
      {
        id: "observe-the-current-work",
        heading: "Watch the task before redesigning it",
        paragraphs: [
          "Ask the person doing the work to walk through several recent examples, including an awkward one. Record where information arrives, which systems they open, what they copy, and which judgments they make. Pay attention to informal checks that never appear in a written procedure. A coordinator may recognize a duplicate request from context that is absent from the form.",
          "Use this map to separate unnecessary steps from necessary ones. Removing an outdated approval or collecting a missing field earlier may solve the problem with less complexity. Automating a confusing process can make its mistakes faster and harder to notice.",
        ],
      },
      {
        id: "compare-candidates",
        heading: "Compare value with the consequences of failure",
        paragraphs: [
          "Look for work that repeats, follows reasonably stable rules, and consumes meaningful attention. Then consider how the team detects and corrects an error. An internal reminder is usually easier to reverse than changing a customer record, issuing a refund, or sending a message outside the company.",
          "Estimate value from your own observations rather than a vendor's promised savings. Include time spent reviewing output, resolving exceptions, and maintaining integrations. A task with fewer runs may still be worth automating if it frequently delays a more important workflow. Avoid treating raw execution count as the only measure of usefulness.",
        ],
      },
      {
        id: "choose-rules-or-ai",
        heading: "Use rules where the decision is predictable",
        paragraphs: [
          "If a form field maps directly to a team, use a rule. If a request must have a valid email address, validate it. These operations do not require a language model. Ordinary software is often easier to inspect when the expected behavior can be specified precisely.",
          "AI can help interpret variable inputs such as free-text inquiries or documents with inconsistent layouts. Treat its output as a proposal that must pass validation before it changes a system. Define allowed categories, required fields, and a review path for ambiguity. For consequential actions, keep a person responsible for approval until the use case supports a safer level of autonomy.",
        ],
      },
      {
        id: "design-the-exception-path",
        heading: "Design the exception path alongside the happy path",
        paragraphs: [
          "Every connection can fail. Credentials expire, services become unavailable, and a request may arrive twice. Decide which failures can be retried safely and which require review. Give each operation an identifier so repeating a delivery does not create another customer record or send another acknowledgement.",
          "Make unresolved work visible to an owner. A useful alert explains the failed step and the available next action without exposing unnecessary personal information. Keep a manual recovery route, limit retries, and set timeouts. If the workflow uses paid APIs, add request caps and spending controls before opening it to public input.",
        ],
      },
      {
        id: "pilot-and-maintain",
        heading: "Pilot a bounded workflow and keep ownership clear",
        paragraphs: [
          "Test representative cases with appropriately protected data, including missing fields, duplicates, conflicting information, and provider outages. Start with a narrow workflow and review its output before expanding the amount of work it handles. Decide in advance which failures should pause the automation and who can restart it.",
          "After release, review completed tasks, exceptions, corrections, and maintenance effort together. An apparently successful run may still produce an unusable outcome downstream. Keep the workflow description, integration permissions, and recovery instructions current. Someone should own changes when the business process or an external API changes; automation is an operational responsibility after the initial build.",
        ],
      },
    ],
    takeaway:
      "Choose a repetitive task with a clear outcome and manageable failure costs. Simplify it first, automate a bounded path, and make exceptions visible to a person who can act.",
    relatedService: {
      title: "Explore AI and automation services",
      href: "/services/ai-automation",
    },
  },
  {
    slug: "custom-software-vs-off-the-shelf-tools",
    title: "Custom software or off-the-shelf tools?",
    description:
      "Compare workflow fit, total operating cost, integration needs, data portability, and long-term ownership before deciding what to build.",
    category: "Engineering decisions",
    status: "published",
    introduction: [
      "Buying software and building software both create commitments. A purchased tool brings a vendor's workflow, pricing, and roadmap. A custom product brings responsibility for implementation, maintenance, security, and support. The useful comparison is how each option serves a specific business process over time.",
      "Begin with the work your team needs to complete. A familiar category name such as CRM, portal, or operations platform rarely captures the details that determine whether a tool will fit. Document the essential workflow before comparing products or asking for a development estimate.",
    ],
    sections: [
      {
        id: "separate-essential-from-preferred",
        heading: "Separate essential requirements from preferences",
        paragraphs: [
          "Identify what the business must be able to do, which data it needs, and who needs access. Distinguish requirements driven by real constraints from habits created by the current tool. A particular screen layout may be negotiable. The ability to restrict access to customer information may be essential.",
          "Use actual scenarios to evaluate options. Ask a vendor to demonstrate the difficult handoff, unusual permission rule, or exception that your team regularly encounters. Include the people who will use the system. A feature checklist can say that a product supports approvals while hiding a workflow that requires repeated manual work.",
        ],
      },
      {
        id: "evaluate-existing-tools",
        heading: "Give existing tools a serious evaluation",
        paragraphs: [
          "An established product can be a sensible choice when the workflow is common and its configuration meets your important requirements. Your team may gain useful capabilities without assuming responsibility for building every supporting function. Check the vendor's documentation, support arrangements, security information, and export capabilities before treating these benefits as guaranteed.",
          "Run a limited trial using representative data that you are permitted to share. Test daily tasks and administration, including onboarding, access changes, data correction, and export. Record the workarounds required. A tool that appears affordable can become expensive if several people must repeatedly reconcile it with the rest of the business.",
        ],
      },
      {
        id: "identify-the-custom-boundary",
        heading: "Look for a defensible custom boundary",
        paragraphs: [
          "Custom development deserves consideration when a distinctive workflow creates value that existing products cannot support adequately, or when critical integration and access needs remain unresolved. Be specific about that gap. Wanting complete flexibility is too broad to guide a responsible scope or estimate.",
          "A hybrid approach may fit better than replacing an entire system. Keep a reliable accounting or scheduling product and build the customer experience or integration it lacks. Confirm that the required APIs exist, that their commercial terms permit your use, and that rate limits support the workflow. An integration depends on the vendor's ongoing interface and policies.",
        ],
      },
      {
        id: "compare-operating-cost",
        heading: "Compare the cost of operating each option",
        paragraphs: [
          "For purchased software, consider subscription changes, user seats, required add-ons, implementation, training, and the cost of workarounds. For custom software, include discovery, design, engineering, testing, hosting, monitoring, maintenance, and support. In both cases, migration and process change require time from your own team.",
          "Compare scenarios over a period appropriate to your planning horizon, and make assumptions visible. A growing user count or a new integration can change the result. Avoid presenting an exact long-term saving when the inputs are uncertain. Use ranges and revisit them as requirements become clearer. Budget for keeping either option useful after the initial launch.",
        ],
      },
      {
        id: "plan-for-change-and-exit",
        heading: "Plan for change, ownership, and exit",
        paragraphs: [
          "Check whether you can export usable data and how difficult it would be to move to another system. Review who controls service accounts, source code access where applicable, deployment configuration, and documentation. Ownership terms and support obligations should be explicitly agreed with the relevant provider; they should never be inferred from a sales conversation.",
          "Write a short decision record that explains the chosen option, alternatives considered, assumptions, and the conditions that would trigger a review. If uncertainty remains high, run a focused technical investigation or prototype before committing to the full build. A good decision leaves the business with an operable system and a clear understanding of its responsibilities.",
        ],
      },
    ],
    takeaway:
      "Buy when an existing product supports the essential workflow well. Build a focused custom solution when a specific, valuable requirement justifies the responsibility of owning it.",
    relatedService: {
      title: "Explore custom software development",
      href: "/services/custom-software",
    },
  },
];

export function getPublishedInsights(): readonly Insight[] {
  return insights.filter((insight) => insight.status === "published");
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find(
    (insight) => insight.slug === slug && insight.status === "published",
  );
}

export function getInsightReadingMinutes(insight: Insight): number {
  const text = [
    ...insight.introduction,
    ...insight.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []),
    ]),
    insight.takeaway,
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}
