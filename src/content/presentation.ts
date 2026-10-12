export const automationStory = [
  {
    label: "Receive",
    title: "A request arrives.",
    body: "A website form or email becomes the starting point. Capture the original message and its context before passing anything on.",
    detail: "Customer request",
    artifact: "request",
  },
  {
    label: "Understand",
    title: "Choose the right interpretation.",
    body: "Rules or an AI model can classify a request. Define the supported tasks, evaluate uncertain cases, and give people a way to intervene.",
    detail: "Rules or optional AI",
    artifact: "classify",
  },
  {
    label: "Extract",
    title: "Find the useful information.",
    body: "Identify supported contact and request fields. Keep the source message close so each extracted value can be checked.",
    detail: "Information extraction",
    artifact: "extract",
  },
  {
    label: "Review",
    title: "Make the record inspectable.",
    body: "Show the structured information, flag what is incomplete, and leave a person in control of corrections and approval.",
    detail: "Human review",
    artifact: "record",
  },
  {
    label: "Connect",
    title: "Move it into the right system.",
    body: "After validation, a configured integration can create a record in the agreed CRM, spreadsheet, or business system. Permissions and duplicate handling belong at this boundary.",
    detail: "Approved business system",
    artifact: "connect",
  },
  {
    label: "Notify",
    title: "Give the team a clear handoff.",
    body: "A configured notification can tell the right person what arrived, what was recorded, and what needs attention. Delivery failures should remain visible.",
    detail: "Internal notification",
    artifact: "notify",
  },
  {
    label: "Confirm",
    title: "Close the loop with the customer.",
    body: "A configured acknowledgement can explain the next step. Keep provider acceptance, actual delivery, and any follow-up commitments distinct.",
    detail: "Customer confirmation",
    artifact: "confirm",
  },
] as const;

export const serviceVisuals = {
  "custom-software": {
    kind: "operations",
    caption: "OPERATIONS DESK / WORKING INTERNAL DEMO",
    subject: "Bring the whole workflow into view.",
  },
  "ai-automation": {
    kind: "intake",
    caption: "INTAKE LAB / RULE-BASED INTERNAL DEMO",
    subject: "From unstructured input to a useful handoff.",
  },
  "web-mobile-development": {
    kind: "responsive",
    caption: "ONE REAL INTERFACE / TWO RESPONSIVE VIEWS",
    subject: "The same useful experience, wherever it opens.",
  },
  "ui-ux-design": {
    kind: "design",
    caption: "INTERFACE STUDY / BASED ON INTAKE LAB",
    subject: "Make the next action feel obvious.",
  },
} as const;
