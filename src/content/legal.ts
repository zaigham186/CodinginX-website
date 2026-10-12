import { siteConfig } from "@/config/siteConfig";
export const privacySections = [
  {
    title: "About this review draft",
    paragraphs: [
      "This page describes the website implementation prepared for CodinginX. It is a review draft, not a representation that production providers, retention periods, or legal terms have been approved. Final business and legal review is required before public launch.",
      `CodinginX can be contacted at ${siteConfig.emails.general}. The legal entity name, applicable legal requirements, and any additional required contact details still need to be confirmed.`,
    ],
  },
  {
    title: "Project inquiries",
    paragraphs: [
      "The project form asks for your name, work email, company, optional website, service interest, project stage, approximate budget, desired timeline, and project details. These details are intended to help CodinginX respond to your inquiry. Please do not include credentials or sensitive customer records.",
      "The implementation supports sending inquiry details through Resend to CodinginX and sending an acknowledgement to the visitor. Delivery credentials and a verified sender are pending configuration. The form does not report success when delivery is unavailable. Email accepted by a provider is not a guarantee of inbox delivery.",
      "The website does not create a lead database. Once configured, the email provider and recipient mailbox will process inquiry records. The final provider configuration, access, retention, deletion process, and any international transfers need business and legal review.",
    ],
  },
  {
    title: "Website assistant",
    paragraphs: [
      "Guided topic buttons use approved information already included in the website. Typed questions are sent to the website server to select an answer. No conversation history is written to a database by this application.",
      "An optional OpenAI integration can classify a typed question into a known topic. Answers remain drawn from approved website content. This integration is disabled by default and must not be enabled until the provider, disclosure, and applicable data requirements have been reviewed. Do not send personal or confidential information to the assistant.",
    ],
  },
  {
    title: "Demonstrations and browser storage",
    paragraphs: [
      "The lead intake demonstration processes text in your browser and can download a JSON file to your device. It does not connect to a CRM, AI model, or email service.",
      "The operations demonstration stores sample requests in localStorage on your device. Its Clear local data control removes that stored demonstration data. Do not use the demonstration for real customer records. Browser storage may be accessible to other people who use the same browser profile.",
    ],
  },
  {
    title: "Optional analytics",
    paragraphs: [
      "Analytics is disabled by default. The implementation supports Plausible after an account and the relevant business and legal choices are confirmed. When enabled, visitors can allow or decline analytics, and change their choice using Privacy preferences. Browser Do Not Track and Global Privacy Control signals are respected. Your analytics choice is stored in localStorage under codinginx.analytics-consent.v1; use Privacy preferences to change it, or clear site storage in your browser.",
      "Analytics events are restricted to page views and selected interactions. Form fields, chat text, URL queries, and referral URLs are excluded from the application’s event payload. A provider may receive connection information such as an IP address when a request is made. Approved provider settings and current terms must be reflected here before activation.",
    ],
  },
  {
    title: "Security and operational records",
    paragraphs: [
      "The application emits operational events with the route, operation, timestamp, request identifier, and error category. It is designed to exclude inquiry content, secrets, and raw IP addresses from those logs. Hosting services may separately produce access and operational logs.",
      "When production inquiry delivery is configured, Redis holds rate-limit counters and submission metadata with expiry. Submission metadata includes a content fingerprint, processing status, and request identifiers, not the message itself. Rate identities are hashed with a server secret. Operational retention settings and access must be reviewed before launch.",
    ],
  },
  {
    title: "Choices and privacy requests",
    paragraphs: [
      `You can contact ${siteConfig.emails.general} with a privacy question or a request concerning information you have shared. The applicable request process, verification requirements, response periods, retention schedule, and jurisdiction-specific rights need final legal review.`,
      "External links, including Instagram and email applications, lead to services with their own practices. Review those services before sharing information with them.",
    ],
  },
];
export const termsSections = [
  {
    title: "Status of these terms",
    paragraphs: [
      "These Terms and Conditions are a review draft for the CodinginX website. They are not final business-approved contractual terms. Public launch requires review of the legal entity, applicable law, and the terms appropriate to the business.",
      `Questions about CodinginX or a proposed project can be sent to ${siteConfig.emails.general}.`,
    ],
  },
  {
    title: "Information on this website",
    paragraphs: [
      "The website describes software engineering, AI and automation, web and mobile development, and product design services. Service descriptions explain possible work and an approach to delivery; they do not by themselves establish a project scope, price, deadline, or service agreement.",
      "Project inquiries start a conversation. Budget and timeline selections communicate preferences and are not an accepted quote or commitment.",
    ],
  },
  {
    title: "Projects and demonstrations",
    paragraphs: [
      "Internal demonstrations are labeled separately from client work. Their sample data is fictional, and their stated limitations are part of the description. Local demonstrations do not provide production scheduling, live CRM delivery, shared storage, or customer notifications.",
      "Intended benefits are design goals, not verified business results. No measured outcomes, client relationships, or third-party endorsements should be inferred from internal demonstrations.",
    ],
  },
  {
    title: "Assistant responses",
    paragraphs: [
      "The assistant helps visitors find published information and start an inquiry. It cannot agree to a contract, make a hiring decision, guarantee a result, or confirm unpublished company information. Project-specific questions need a conversation with the team.",
    ],
  },
  {
    title: "Separate project agreements",
    paragraphs: [
      "Scope, fees, payment, intellectual property, confidentiality, warranties, support, termination, liability, and dispute resolution must be addressed in an approved agreement appropriate to each engagement. Those decisions have not been supplied for this website draft.",
      "Nothing in a demonstration, form acknowledgement, or assistant response is intended to substitute for that agreement.",
    ],
  },
  {
    title: "Third-party services and links",
    paragraphs: [
      "The website may link to external services. Optional integrations require their own accounts, permissions, and terms. Final website terms should identify any relevant responsibilities and limitations after provider selection and legal review.",
    ],
  },
  {
    title: "Items requiring final review",
    paragraphs: [
      "Before publication as final terms, CodinginX must confirm the contracting entity, ownership and permitted use of website material, acceptable use, applicable disclaimers, governing law, liability provisions, dispute procedures, and an effective date. These are business and legal decisions and have intentionally not been invented.",
    ],
  },
];
