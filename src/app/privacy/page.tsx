import { LegalPage } from "@/components/legal-page";
import { privacySections } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Privacy Policy",
    "Review draft describing CodinginX website data handling, inquiries, assistant, browser demonstrations, and optional analytics.",
    "/privacy",
  ),
  robots: { index: false, follow: true },
};
export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" sections={privacySections} />;
}
