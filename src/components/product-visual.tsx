import Image from "next/image";
import intake from "../../public/media/intake-desktop.webp";
import operations from "../../public/media/operations-desktop.webp";
import mobile from "../../public/media/operations-mobile.webp";
import { Arrow } from "./ui";

export type ProductVisualKind =
  "intake" | "operations" | "responsive" | "design";

export function InterfaceStudy({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`interface-study ${compact ? "is-compact" : ""}`}>
      <div className="study-top">
        <span>INTAKE LAB</span>
        <span>INTERFACE STUDY / 01</span>
      </div>
      <div className="study-flow" aria-label="Intake interface user flow">
        <span>Message</span>
        <i aria-hidden="true" />
        <span>Review</span>
        <i aria-hidden="true" />
        <span>Export</span>
      </div>
      <div className="study-layout">
        <div
          className="study-wireframe"
          aria-label="Wireframe based on the lead intake demo"
        >
          <span className="study-caption">01 / INFORMATION HIERARCHY</span>
          <div className="wire-title" />
          <div className="wire-columns">
            <div>
              <i />
              <i />
              <i />
              <b />
            </div>
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="wire-foot" />
        </div>
        <div className="study-tokens">
          <span className="study-caption">02 / INTERFACE LANGUAGE</span>
          <p>
            Aa<span>Instrument Sans</span>
          </p>
          <div
            className="token-swatches"
            role="img"
            aria-label="Interface palette: Ink Navy, CodinginX Blue, Blue Mist and Warm Cloud"
          >
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="study-control">
            Review before export
            <Arrow />
          </div>
        </div>
      </div>
      <p className="study-note">
        A design artifact based on the working internal demonstration.
      </p>
    </div>
  );
}

export function ProductVisual({
  kind,
  className = "",
  eager = false,
}: {
  kind: ProductVisualKind;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={`product-visual product-visual-${kind} ${className}`}
      data-reveal="media"
    >
      <div className="visual-grid" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="visual-meta">
        <span>CODINGINX / PRODUCT STUDIES</span>
        <span>
          {kind === "intake"
            ? "01"
            : kind === "operations"
              ? "02"
              : kind === "responsive"
                ? "03"
                : "04"}
        </span>
      </div>
      {kind === "design" ? (
        <InterfaceStudy />
      ) : (
        <div className="visual-screen-set">
          <div className="visual-browser">
            <div className="visual-browser-bar">
              <span className="browser-buttons" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>
                {kind === "intake" ? "INTAKE LAB" : "OPERATIONS DESK"}
              </span>
              <span className="visual-local">INTERNAL DEMO</span>
            </div>
            <Image
              src={kind === "intake" ? intake : operations}
              alt={
                kind === "intake"
                  ? "Actual Intake lab interface showing a sample inquiry and its editable extracted record."
                  : "Actual Operations desk interface with fictional sample requests, scheduling and status controls."
              }
              sizes="(max-width: 767px) 95vw, (max-width: 1200px) 70vw, 1100px"
              priority={eager}
              className="visual-desktop-image"
            />
          </div>
          {kind === "responsive" && (
            <div className="visual-phone">
              <div className="phone-top" aria-hidden="true" />
              <Image
                src={mobile}
                alt="The same working Operations desk demonstration arranged for a mobile screen."
                sizes="(max-width: 767px) 140px, 220px"
                className="visual-mobile-image"
              />
              <span className="phone-caption">
                SAME WORKFLOW. SMALLER SCREEN.
              </span>
            </div>
          )}
          {kind === "intake" && (
            <div className="visual-field-detail">
              <span className="study-caption">A CLEAR HANDOFF</span>
              <p>Source → structure → review</p>
              <div>
                <span>Human review</span>
                <span>Before export</span>
              </div>
            </div>
          )}
          {kind === "operations" && (
            <div className="visual-state-detail">
              <span className="study-caption">EXPLICIT STATES</span>
              <div>
                <span>New</span>
                <span>Scheduled</span>
                <span>In progress</span>
                <span>Complete</span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="visual-foot">
        <span>
          {kind === "design"
            ? "FLOW → WIREFRAME → INTERFACE"
            : "REAL INTERFACE / FICTIONAL SAMPLE DATA"}
        </span>
        <span>
          {kind === "intake"
            ? "RULE-BASED EXTRACTION"
            : kind === "design"
              ? "BASED ON INTAKE LAB"
              : "BROWSER-LOCAL WORKFLOW"}
        </span>
      </div>
    </div>
  );
}

export function SystemArchitecture({
  variant = "intake",
}: {
  variant?: "intake" | "operations";
}) {
  const stages =
    variant === "intake"
      ? ["Message", "Deterministic rules", "Human review", "JSON download"]
      : ["Request", "Schedule", "Status", "Browser storage"];
  return (
    <figure className="system-architecture" data-reveal="media">
      <figcaption>
        <span className="eyebrow">SYSTEM BOUNDARY</span>
        <span>Inside your browser</span>
      </figcaption>
      <div className="architecture-path">
        {stages.map((stage, index) => (
          <div key={stage}>
            <span className="number">0{index + 1}</span>
            <p>{stage}</p>
            {index < stages.length - 1 && <i aria-hidden="true" />}
          </div>
        ))}
      </div>
      <p className="architecture-caption">
        {variant === "intake"
          ? "No model, CRM or email provider is called by this demonstration."
          : "No shared database, account system or external calendar is connected."}
      </p>
    </figure>
  );
}
