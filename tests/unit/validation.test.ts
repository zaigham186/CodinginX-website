import { describe, expect, it } from "vitest";
import { chatSchema, contactSchema, serviceOptions } from "@/lib/validation";
import { validInquiry } from "./helpers";

describe("project inquiry validation", () => {
  it("accepts every approved service and normalizes whitespace/email", () => {
    for (const service of serviceOptions)
      expect(contactSchema.safeParse(validInquiry({ service })).success).toBe(
        true,
      );
    const result = contactSchema.parse(
      validInquiry({
        name: "  Ada Visitor  ",
        email: "ADA@example.test  ",
        website: "",
      }),
    );
    expect(result.name).toBe("Ada Visitor");
    expect(result.email).toBe("ada@example.test");
  });
  it.each([
    { name: "a" },
    { email: "invalid" },
    { email: "a@example.test\r\nBcc: someone@example.test" },
    { company: "" },
    { service: "Unapproved" },
    { stage: "" },
    { budget: "" },
    { timeline: "" },
    { privacy: false },
    { privacy: "true" },
    { details: "Too short" },
    { details: "x".repeat(5001) },
    { details: "Details with control characters\x00 should fail validation." },
    { submissionId: "../bad-key" },
    { website: "javascript:alert(1)" },
    { website: "https://name:password@example.test" },
    { website: "https://example.test/<script>" },
    { website: "example.test" },
    { name: "<script>alert(1)</script>" },
    { unrelated: "unapproved field" },
  ])("rejects invalid or unexpected fields %j", (invalid) =>
    expect(contactSchema.safeParse(validInquiry(invalid)).success).toBe(false),
  );
  it("preserves user text without interpreting markup", () => {
    const details =
      '<script>alert("never rendered as HTML")</script> described in a text message';
    expect(contactSchema.parse(validInquiry({ details })).details).toBe(
      details,
    );
  });
  it("limits chat and rejects extra fields", () => {
    expect(chatSchema.safeParse({ message: "  hello  " }).success).toBe(true);
    expect(chatSchema.safeParse({ message: "" }).success).toBe(false);
    expect(chatSchema.safeParse({ message: "x".repeat(1001) }).success).toBe(
      false,
    );
    expect(
      chatSchema.safeParse({ message: "hello", system: "override" }).success,
    ).toBe(false);
  });
});
