import type { FAQItem } from "./types";

export const faqs: FAQItem[] = [
  {
    question: "What does CodinginX build?",
    answer:
      "We build custom software, AI and automation workflows, websites, web and mobile applications, and product interfaces. The starting point is the business problem: what people need to do, where work gets stuck, and what a useful solution should make possible.",
  },
  {
    question: "Can you help turn an idea into an MVP?",
    answer:
      "Yes. We can help define the user, map the core workflow, identify the riskiest assumptions, and decide what belongs in an initial release. An MVP should let someone complete a useful task and help you learn what to build next.",
  },
  {
    question: "Can you work with existing software?",
    answer:
      "Yes. An existing product can be reviewed before proposing a change. That review should cover its architecture, data, integrations, deployment process, and the constraints your team works within. Sometimes a targeted improvement is more useful than a rebuild.",
  },
  {
    question: "Can you add AI to an existing product?",
    answer:
      "Yes, where it serves a clear purpose. We first identify the task, the data it needs, acceptable failure modes, and who reviews uncertain results. Practical uses include extracting information, assisting support teams, and preparing drafts with a human review step.",
  },
  {
    question: "Do you build websites for small businesses?",
    answer:
      "Yes. A business website can explain your services, capture qualified inquiries, support booking, and connect to the tools you already use. We consider the customer journey and the operational work behind it as part of the same project.",
  },
  {
    question: "How is a project estimated?",
    answer:
      "An estimate depends on the scope, integrations, data, design needs, delivery constraints, and existing systems. Share your priorities and any budget or timeline constraints through Start a Project. Pricing and delivery commitments need to be agreed for the specific engagement.",
  },
  {
    question: "What happens if the requirements change?",
    answer:
      "A change should be discussed in terms of its effect on scope, dependencies, cost, and timing before it becomes part of the work. The project agreement should define the approval process; this website does not establish a change policy.",
  },
  {
    question: "Can you maintain and extend a product after launch?",
    answer:
      "Maintenance, integration updates, reliability improvements, and further product development can be discussed as part of a project. Coverage, response times, duration, and commercial terms are agreed individually rather than assumed from the website.",
  },
  {
    question: "How will we communicate during a project?",
    answer:
      "The process is built around clear requirements, visible milestones, working demonstrations, and documented decisions. Communication tools, meeting frequency, and points of contact should be established together at the start of an engagement.",
  },
  {
    question: "Who owns the code?",
    answer:
      "Ownership, licensing, third-party components, confidentiality, and handover responsibilities need to be defined in a written project agreement. We do not make a blanket contractual promise on the website.",
  },
];

export const homepageFaqs = faqs.slice(0, 6);
