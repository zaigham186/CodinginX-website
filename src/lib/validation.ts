import { z } from "zod";

export const serviceOptions = [
  "Custom Software",
  "MVP / SaaS",
  "AI & Automation",
  "Website / Web Application",
  "Mobile App",
  "UI/UX",
  "Existing Product Improvement",
  "Not Sure Yet",
] as const;
export const stageOptions = [
  "Idea / discovery",
  "Planning / design",
  "Ready to build",
  "Existing product",
] as const;
export const budgetOptions = [
  "Not sure yet",
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000+",
] as const;
export const timelineOptions = [
  "Flexible",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months",
] as const;

// Plain text is retained as text throughout the application and email delivery.
const singleLine = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine(
      (value) => !/[\x00-\x1f\x7f<>]/.test(value),
      "Use plain text without line breaks or angle brackets.",
    );
const website = z
  .string()
  .trim()
  .max(300)
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return (
        ["https:", "http:"].includes(url.protocol) &&
        !url.username &&
        !url.password &&
        !!url.hostname &&
        !/[\x00-\x20<>]/.test(value)
      );
    } catch {
      return false;
    }
  }, "Enter a complete http:// or https:// website address.")
  .optional();

export const contactSchema = z
  .object({
    name: singleLine(2, 100),
    email: z
      .string()
      .trim()
      .max(254)
      .email("Enter a valid email address.")
      .transform((value) => value.toLowerCase()),
    company: singleLine(2, 150),
    website,
    service: z.enum(serviceOptions),
    stage: z.enum(stageOptions),
    budget: z.enum(budgetOptions),
    timeline: z.enum(timelineOptions),
    details: z
      .string()
      .trim()
      .min(30, "Tell us a little more (at least 30 characters).")
      .max(5000, "Use 5,000 characters or fewer.")
      .refine(
        (value) => !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value),
        "Remove unsupported characters.",
      ),
    privacy: z.literal(true, {
      error: "Please acknowledge the privacy notice.",
    }),
    websiteTrap: z.string().max(200).default(""),
    submissionId: z.string().uuid(),
  })
  .strict();

export type ContactInput = z.input<typeof contactSchema>;
export type ContactSubmission = z.output<typeof contactSchema>;

export const chatSchema = z
  .object({
    message: z
      .string()
      .trim()
      .min(1)
      .max(1000)
      .refine((value) => !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)),
  })
  .strict();
