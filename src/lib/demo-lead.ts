export type DemoLead = {
  name: string;
  email: string;
  company: string;
  service: string;
  summary: string;
};

export const sampleInquiry =
  "Name: Alex Sample\nEmail: alex@example.com\nCompany: Example Service Co.\nWe need an online booking system so customers can request an appointment and our team can track the work. We currently manage requests in a spreadsheet.";

/** The same deterministic extraction powers both the live demo and its hero visualization. */
export function extractDemoLead(text: string): DemoLead {
  const line = (label: string) =>
    text.match(new RegExp(`^${label}:\\s*(.+)$`, "im"))?.[1]?.trim() || "";
  return {
    name: line("Name"),
    email: text.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i)?.[0] || "",
    company: line("Company"),
    service: /book|schedul/i.test(text)
      ? "Booking & scheduling"
      : /automat|AI|inquiry/i.test(text)
        ? "Workflow automation"
        : /website|web site/i.test(text)
          ? "Business website"
          : "Needs review",
    summary: text
      .split("\n")
      .filter((line) => !/^(Name|Email|Company):/i.test(line))
      .join(" ")
      .trim(),
  };
}
