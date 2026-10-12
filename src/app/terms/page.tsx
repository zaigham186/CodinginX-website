import { LegalPage } from "@/components/legal-page";
import { termsSections } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Terms and Conditions",
    "CodinginX website terms review draft. Final contractual and legal decisions remain subject to business and legal review.",
    "/terms",
  ),
  robots: { index: false, follow: true },
};
export default function TermsPage() {
  return <LegalPage title="Terms and Conditions" sections={termsSections} />;
}
