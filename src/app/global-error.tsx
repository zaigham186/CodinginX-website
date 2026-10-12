"use client";
import { siteConfig } from "@/config/siteConfig";
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "sans-serif",
          padding: "3rem",
          color: "#18202C",
          background: "#F6F4EF",
        }}
      >
        <main>
          <h1>We couldn’t load CodinginX.</h1>
          <p>
            Please try again. If this continues, contact{" "}
            <a href={`mailto:${siteConfig.emails.general}`}>
              {siteConfig.emails.general}
            </a>
            .
          </p>
          <button
            onClick={reset}
            style={{ padding: "1rem", cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
