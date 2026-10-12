import { siteConfig } from "@/config/siteConfig";
import "server-only";
import type { ContactSubmission } from "@/lib/validation";
import { serverConfig, emailConfigured } from "./config";
import { HttpError, providerJson } from "./http";

async function sendEmail(payload: Record<string, unknown>, key: string) {
  const config = serverConfig();
  if (!emailConfigured())
    throw new HttpError(
      503,
      `Inquiry delivery is temporarily unavailable. Please email ${siteConfig.emails.general}.`,
      "email_unconfigured",
    );
  try {
    const { response, body } = await providerJson(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.emailKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": key,
        },
        body: JSON.stringify({ from: config.emailFrom, ...payload }),
      },
    );
    if (
      !response.ok ||
      !body ||
      typeof body !== "object" ||
      !("id" in body) ||
      typeof body.id !== "string"
    )
      throw new Error("email_provider_failed");
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(
      503,
      `We could not confirm delivery. Please retry this inquiry, or email ${siteConfig.emails.general}.`,
      "email_provider_unavailable",
    );
  }
}

export async function deliverInquiry(data: ContactSubmission) {
  const config = serverConfig();
  // Text-only messages avoid interpreting any visitor input as HTML.
  await sendEmail(
    {
      to: [config.emailTo],
      reply_to: data.email,
      subject: `Project inquiry: ${data.service}`,
      text: [
        "New CodinginX project inquiry",
        `Reference: ${data.submissionId}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Website: ${data.website || "Not provided"}`,
        `Service: ${data.service}`,
        `Stage: ${data.stage}`,
        `Budget indicated by visitor: ${data.budget}`,
        `Desired timeline: ${data.timeline}`,
        "Privacy notice acknowledged: yes",
        "",
        "Project details:",
        data.details,
      ].join("\n"),
    },
    `inquiry-${data.submissionId}`,
  );
}

export async function acknowledgeInquiry(data: ContactSubmission) {
  await sendEmail(
    {
      to: [data.email],
      reply_to: serverConfig().emailTo,
      subject: "Your CodinginX inquiry has been submitted",
      text: `Thank you for contacting CodinginX. Your project inquiry has been submitted for delivery to our team. We will review the information and follow up using the email address you provided.\n\nThis message confirms submission. Scope, cost, availability, and timing will be discussed directly.\n\nIf you did not submit an inquiry, you can ignore this message.\n\nCodinginX\n${siteConfig.url}`,
    },
    `acknowledgement-${data.submissionId}`,
  );
}
