"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { automationStory } from "@/content/presentation";
import { processSteps } from "@/content/process";
import { extractDemoLead, sampleInquiry } from "@/lib/demo-lead";
import { InterfaceStudy } from "./product-visual";
import intake from "../../public/media/intake-desktop.webp";

const record = extractDemoLead(sampleInquiry);

function AutomationArtifact({ active }: { active: number }) {
  return (
    <div className="automation-artifact" key={active}>
      <div className="artifact-header">
        <span>{automationStory[active].detail}</span>
        <span>0{active + 1} / 07</span>
      </div>
      <div className="artifact-content">
        {active === 0 && (
          <div className="artifact-email">
            <span className="artifact-overline">
              CUSTOMER REQUEST / FICTIONAL SAMPLE
            </span>
            <p className="artifact-large">
              A booking workflow
              <br />
              that works better.
            </p>
            <div className="artifact-email-meta">
              <span>From</span>
              <strong>Alex Sample</strong>
              <span>Company</span>
              <strong>Example Service Co.</strong>
            </div>
            <p>
              “We currently manage requests in a spreadsheet. We need an online
              booking system so customers can request an appointment.”
            </p>
          </div>
        )}
        {active === 1 && (
          <div className="artifact-classifier">
            <span className="artifact-overline">DEFINE SUPPORTED TASKS</span>
            <p className="artifact-large">
              Understand first.
              <br />
              Act deliberately.
            </p>
            <div>
              <span>Service inquiry</span>
              <span>Booking & scheduling</span>
              <span>Human review</span>
            </div>
            <p>
              Choose rules or AI around the task. Uncertain cases need a clear
              handoff.
            </p>
          </div>
        )}
        {active === 2 && (
          <div className="artifact-fields">
            <span className="artifact-overline">SOURCE → SUPPORTED FIELDS</span>
            {[
              ["Name", record.name],
              ["Company", record.company],
              ["Service", record.service],
            ].map(([key, value]) => (
              <div key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
                <span className="artifact-field-label">
                  Review against source
                </span>
              </div>
            ))}
          </div>
        )}
        {active === 3 && (
          <div className="artifact-record">
            <span className="artifact-overline">
              A RECORD A PERSON CAN REVIEW
            </span>
            <p className="artifact-large">
              Useful structure.
              <br />
              Visible decisions.
            </p>
            <dl>
              {[
                ["name", record.name],
                ["email", record.email],
                ["service", record.service],
              ].map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="artifact-note">
              Review and correction come before any business-system write.
            </p>
          </div>
        )}
        {active === 4 && (
          <div className="artifact-integrations">
            <span className="artifact-overline">CONFIGURE THE CONNECTION</span>
            <div className="integration-source">Reviewed record</div>
            <div className="integration-lines" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="integration-targets">
              <span>CRM</span>
              <span>Spreadsheet</span>
              <span>Business system</span>
            </div>
            <p>Approved access. Explicit validation. Duplicate protection.</p>
          </div>
        )}
        {active === 5 && (
          <div className="artifact-handoff">
            <span className="artifact-overline">
              INTERNAL NOTIFICATION DESIGN
            </span>
            <p className="artifact-large">
              The right context.
              <br />
              The right person.
            </p>
            <ul>
              <li>What arrived</li>
              <li>What was recorded</li>
              <li>What needs attention</li>
            </ul>
            <p>A configured provider and agreed recipients are required.</p>
          </div>
        )}
        {active === 6 && (
          <div className="artifact-confirmation">
            <span className="artifact-overline">
              CUSTOMER ACKNOWLEDGEMENT DESIGN
            </span>
            <span className="artifact-check" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path
                  d="m7 16 6 6 12-13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <p className="artifact-large">Close the loop.</p>
            <p>
              Explain that the inquiry was accepted and what the agreed next
              step will be. Keep failures and delivery status visible.
            </p>
          </div>
        )}
      </div>
      <div className="artifact-footer">
        <span>ILLUSTRATIVE ARCHITECTURE</span>
        <span>NO LIVE INTEGRATIONS</span>
      </div>
    </div>
  );
}

function ProcessArtifact({ active }: { active: number }) {
  return (
    <div className="process-artifact" key={active}>
      <div className="artifact-header">
        <span>
          {
            [
              "Problem definition",
              "Flow & interface study",
              "Working increment",
              "Release review",
              "Improvement loop",
            ][active]
          }
        </span>
        <span>0{active + 1} / 05</span>
      </div>
      {active === 0 && (
        <div className="requirements-artifact">
          <span className="artifact-overline">EXAMPLE / INTAKE LAB</span>
          <p className="artifact-large">
            Make the handoff
            <br />
            inspectable.
          </p>
          <dl>
            <div>
              <dt>User</dt>
              <dd>A person reviewing a sample inquiry</dd>
            </div>
            <div>
              <dt>Workflow</dt>
              <dd>Message → record → review → export</dd>
            </div>
            <div>
              <dt>Boundary</dt>
              <dd>Browser-only. No external delivery.</dd>
            </div>
            <div>
              <dt>Acceptance</dt>
              <dd>Editable fields and a real JSON download</dd>
            </div>
          </dl>
        </div>
      )}
      {active === 1 && <InterfaceStudy compact />}
      {active === 2 && (
        <div className="process-product-crop">
          <Image
            src={intake}
            alt="The working internal Intake lab interface, used as a real development example."
            sizes="(max-width: 960px) 95vw, 650px"
          />
          <div>
            <span className="artifact-overline">A WORKING INCREMENT</span>
            <p>
              Real input.
              <br />
              Reviewable output.
            </p>
          </div>
        </div>
      )}
      {active === 3 && (
        <div className="release-artifact">
          <span className="artifact-overline">EXAMPLE REVIEW SURFACES</span>
          <p className="artifact-large">
            Test the path.
            <br />
            And the edges.
          </p>
          {[
            "Input and validation",
            "Keyboard and mobile",
            "Loading, empty and error states",
            "Security and system boundaries",
            "Release and operational readiness",
          ].map((label) => (
            <div key={label}>
              <i aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
      {active === 4 && (
        <div className="improvement-artifact">
          <span className="artifact-overline">AN INFORMED NEXT STEP</span>
          <p className="artifact-large">
            Learn from use.
            <br />
            Build what matters.
          </p>
          <div>
            <span>Observe</span>
            <i aria-hidden="true" />
            <span>Review</span>
            <i aria-hidden="true" />
            <span>Prioritize</span>
          </div>
          <p>
            Feedback and agreed measures inform the next change. Ongoing
            coverage is defined for the engagement.
          </p>
        </div>
      )}
      <div className="artifact-footer">
        <span>PROJECT ARTIFACT EXAMPLES</span>
        <span>BASED ON INTERNAL WORK</span>
      </div>
    </div>
  );
}

export function ScrollStory({
  variant = "automation",
}: {
  variant?: "automation" | "process";
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const chapters = useRef<(HTMLElement | null)[]>([]);
  const manualTarget = useRef<number | null>(null);
  const steps =
    variant === "automation"
      ? automationStory.map((step) => ({
          title: step.title,
          label: step.label,
          body: step.body,
          outcome: "",
          activities: [] as string[],
        }))
      : processSteps.map((step) => ({
          title: step.title,
          label: step.title,
          body: step.description,
          outcome: step.outcome,
          activities: step.activities,
        }));
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    function update() {
      // On small screens, the stage selector is the stable visual controller.
      if (innerWidth <= 960) return;
      const visible = chapters.current
        .map((element, index) => ({
          index,
          bounds: element?.getBoundingClientRect(),
        }))
        .filter(
          (item) =>
            item.bounds &&
            item.bounds.top < innerHeight * 0.7 &&
            item.bounds.bottom > innerHeight * 0.3,
        );
      if (!visible.length) return;
      visible.sort(
        (a, b) =>
          Math.abs((a.bounds!.top + a.bounds!.bottom) / 2 - innerHeight * 0.5) -
          Math.abs((b.bounds!.top + b.bounds!.bottom) / 2 - innerHeight * 0.5),
      );
      // A chosen stage stays visible while its chapter scrolls into position.
      if (
        manualTarget.current !== null &&
        visible[0].index !== manualTarget.current
      )
        return;
      manualTarget.current = null;
      setActive(visible[0].index);
    }
    let observer: IntersectionObserver;
    function observe() {
      observer?.disconnect();
      const margin = Math.round(innerHeight * 0.2);
      observer = new IntersectionObserver(update, {
        rootMargin: `-${margin}px 0px -${margin}px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      });
      chapters.current.forEach((element) => {
        if (element) observer.observe(element);
      });
    }
    function release() {
      manualTarget.current = null;
      update();
    }
    function interrupt(event: KeyboardEvent) {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(
          event.key,
        )
      )
        release();
    }
    observe();
    window.addEventListener("resize", observe);
    window.addEventListener("scrollend", release);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", interrupt);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
      window.removeEventListener("scrollend", release);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", interrupt);
    };
  }, [variant]);
  function goTo(index: number) {
    setActive(index);
    if (window.innerWidth <= 960) return;
    manualTarget.current = index;
    chapters.current[index]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  }
  return (
    <div className={`scroll-story scroll-story-${variant}`}>
      <div className="story-visual">
        <div
          className="story-nav"
          aria-label={`${variant === "automation" ? "Automation workflow" : "Project process"} stages`}
        >
          {steps.map((step, index) => (
            <button
              key={step.label}
              type="button"
              onClick={() => goTo(index)}
              aria-current={active === index ? "step" : undefined}
              aria-controls={`${id}-chapter-${index}`}
            >
              <span>0{index + 1}</span>
              <span>{step.label}</span>
            </button>
          ))}
        </div>
        {variant === "automation" ? (
          <AutomationArtifact active={active} />
        ) : (
          <ProcessArtifact active={active} />
        )}
        <p className="story-disclosure">
          {variant === "automation"
            ? "A possible system architecture. Live AI, CRM and notification delivery require approved configuration. Our Intake lab demo implements the browser-local extraction and review steps."
            : "Example artifacts illustrate the process. The interface shown is our working internal demonstration, not client work."}
        </p>
      </div>
      <div className="story-chapters">
        {steps.map((step, index) => (
          <article
            key={step.title}
            id={`${id}-chapter-${index}`}
            className={`story-chapter ${active === index ? "is-current" : ""}`}
            ref={(element) => {
              chapters.current[index] = element;
            }}
          >
            <span className="number">
              0{index + 1} /{" "}
              {variant === "automation" ? "THE WORKFLOW" : "THE PROCESS"}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            {step.activities.length > 0 && (
              <ul>
                {step.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            )}
            {step.outcome && (
              <div className="story-outcome">
                <span className="eyebrow">THE OUTCOME</span>
                <p>{step.outcome}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
