"use client";
import { useEffect, useId, useRef, useState } from "react";
import { trackEvent } from "./analytics";
import { extractDemoLead, sampleInquiry, type DemoLead } from "@/lib/demo-lead";

export function LeadIntakeDemo({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [input, setInput] = useState(sampleInquiry);
  const [lead, setLead] = useState<DemoLead | null>(null);
  const [notice, setNotice] = useState("");
  const result = useRef<HTMLDivElement>(null);
  function process() {
    if (input.trim().length < 20) {
      setNotice(
        "Enter at least 20 characters so there is something to review.",
      );
      return;
    }
    setLead(extractDemoLead(input));
    setNotice(
      "Fields extracted using rules. Review and correct each value before export.",
    );
    trackEvent("demo_viewed", { demo: "lead" });
  }
  function download() {
    if (!lead) return;
    const url = URL.createObjectURL(
      new Blob(
        [JSON.stringify({ kind: "CodinginX internal demo", ...lead }, null, 2)],
        { type: "application/json" },
      ),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "codinginx-sample-lead.json";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(
      "Your JSON record is ready to download. Nothing was sent to a server.",
    );
  }
  return (
    <div className={`demo demo-lead ${compact ? "demo-compact" : ""}`}>
      <div className="demo-toolbar">
        <div>
          <span className="demo-brand">Intake lab</span>
          <span className="demo-subtitle">From message to record</span>
        </div>
        <span className="demo-label">RULE-BASED / LOCAL ONLY</span>
      </div>
      <div className="demo-progress" aria-label="Intake workflow">
        <span className="is-complete">01 / Inquiry</span>
        <span className={lead ? "is-complete" : ""}>02 / Review</span>
        <span>03 / Export</span>
        <span className="demo-progress-state">
          {lead ? "Ready for human review" : "Start with the sample"}
        </span>
      </div>
      <div className="demo-grid">
        <div className="demo-input-pane">
          <label htmlFor={`${id}-message`} className="demo-section-title">
            <span className="number">01</span> The incoming message
          </label>
          <textarea
            id={`${id}-message`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={compact ? 6 : 8}
            maxLength={3000}
            spellCheck={false}
          />
          <p className="demo-help">
            Fictional sample. Use labeled Name, Email, and Company fields. Do
            not enter sensitive information.
          </p>
          <div className="demo-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={process}
            >
              Structure the inquiry <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="demo-reset"
              onClick={() => {
                setInput(sampleInquiry);
                setLead(null);
                setNotice("Sample restored.");
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="demo-result-pane" ref={result}>
          <h3 className="demo-section-title">
            <span className="number">02</span> Reviewable information
          </h3>
          {lead ? (
            <div className="demo-result-fields">
              {(Object.keys(lead) as (keyof DemoLead)[]).map((key) => (
                <div
                  className="demo-result-field"
                  key={key}
                  data-empty={!lead[key].trim()}
                >
                  <label htmlFor={`${id}-${key}`}>{key}</label>
                  {!lead[key].trim() && (
                    <span className="demo-field-note">
                      Add missing information
                    </span>
                  )}
                  {key === "summary" ? (
                    <textarea
                      id={`${id}-${key}`}
                      value={lead[key]}
                      maxLength={3000}
                      rows={3}
                      onChange={(e) =>
                        setLead({ ...lead, [key]: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      id={`${id}-${key}`}
                      value={lead[key]}
                      maxLength={300}
                      onChange={(e) =>
                        setLead({ ...lead, [key]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                className="button button-secondary"
                onClick={download}
              >
                Download JSON <span aria-hidden="true">↓</span>
              </button>
            </div>
          ) : (
            <div className="demo-empty">
              <div className="demo-record-symbol" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>
                A clear record starts
                <br />
                with a little structure.
              </p>
              <span>
                Run the sample to see the fields here.
                <br />
                Review always comes before the handoff.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="demo-footer">
        <p role="status" aria-live="polite">
          {notice ||
            "An internal demonstration. No AI model, CRM, or email service is connected."}
        </p>
      </div>
    </div>
  );
}

type Job = {
  id: string;
  title: string;
  date: string;
  status: "New" | "Scheduled" | "In progress" | "Complete";
};
const storageKey = "codinginx.operations-demo.v1";
const initialJobs: Job[] = [
  {
    id: "sample-1",
    title: "Example equipment inspection",
    date: "",
    status: "New",
  },
  {
    id: "sample-2",
    title: "Sample maintenance request",
    date: "",
    status: "Scheduled",
  },
];
const statuses: Job["status"][] = [
  "New",
  "Scheduled",
  "In progress",
  "Complete",
];
function validJobs(value: unknown): value is Job[] {
  return (
    Array.isArray(value) &&
    value.length <= 30 &&
    value.every(
      (j) =>
        j &&
        typeof j === "object" &&
        typeof j.id === "string" &&
        j.id.length < 100 &&
        typeof j.title === "string" &&
        j.title.length <= 100 &&
        typeof j.date === "string" &&
        (!j.date || /^\d{4}-\d{2}-\d{2}$/.test(j.date)) &&
        statuses.includes(j.status),
    )
  );
}
export function OperationsDemo({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [notice, setNotice] = useState(
    "Sample records. Changes stay in this browser.",
  );
  const [ready, setReady] = useState(false);
  // Browser-owned demo data is hydrated after the server's deterministic sample render.
  useEffect(() => {
    try {
      const value = localStorage.getItem(storageKey);
      if (value) {
        const parsed: unknown = JSON.parse(value);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronize browser storage after hydration.
        if (validJobs(parsed)) setJobs(parsed);
        else
          setNotice(
            "Saved demo data could not be read. The sample is shown instead.",
          );
      }
    } catch {
      setNotice(
        "Browser storage is unavailable. Changes will last for this visit only.",
      );
    }
    setReady(true);
  }, []);
  function save(next: Job[]) {
    setJobs(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotice(
        "Saved in this browser only. No calendar or notification was sent.",
      );
    } catch {
      setNotice("Changes are visible, but could not be saved in this browser.");
    }
  }
  function add(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 3) {
      setNotice("Describe the request in at least 3 characters.");
      return;
    }
    if (jobs.length >= 30) {
      setNotice(
        "The demonstration holds up to 30 sample requests. Clear it to start again.",
      );
      return;
    }
    save([
      ...jobs,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        date,
        status: date ? "Scheduled" : "New",
      },
    ]);
    setTitle("");
    setDate("");
    trackEvent("demo_viewed", { demo: "operations" });
  }
  return (
    <div className={`demo demo-operations ${compact ? "demo-compact" : ""}`}>
      <div className="demo-toolbar">
        <div>
          <span className="demo-brand">Operations desk</span>
          <span className="demo-subtitle">Every request has a next step</span>
        </div>
        <span className="demo-label">SAMPLE DATA / LOCAL ONLY</span>
      </div>
      <div className="operations-summary" aria-label="Sample request states">
        {statuses.map((status) => (
          <div key={status}>
            <span>{status}</span>
            <strong>
              {jobs.filter((job) => job.status === status).length}
            </strong>
            <i aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="operations-body">
        <form onSubmit={add} className="demo-booking-form">
          <div>
            <label htmlFor={`${id}-title`}>New sample request</label>
            <input
              id={`${id}-title`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="Describe a service request"
              required
              minLength={3}
            />
          </div>
          <div>
            <label htmlFor={`${id}-date`}>
              Schedule <span>(optional)</span>
            </label>
            <input
              id={`${id}-date`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            className="button button-primary"
            type="submit"
            disabled={!ready}
          >
            Add request
          </button>
        </form>
        <div className="demo-jobs">
          {jobs.length ? (
            jobs.map((job) => (
              <article key={job.id} className="demo-job">
                <div>
                  <p className="demo-job-name">{job.title}</p>
                  <span className="demo-help">SAMPLE REQUEST</span>
                </div>
                <div>
                  <label htmlFor={`${id}-${job.id}-date`}>Schedule</label>
                  <input
                    id={`${id}-${job.id}-date`}
                    type="date"
                    value={job.date}
                    onChange={(e) =>
                      save(
                        jobs.map((j) =>
                          j.id === job.id ? { ...j, date: e.target.value } : j,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-${job.id}-status`}>Status</label>
                  <select
                    id={`${id}-${job.id}-status`}
                    value={job.status}
                    onChange={(e) =>
                      save(
                        jobs.map((j) =>
                          j.id === job.id
                            ? { ...j, status: e.target.value as Job["status"] }
                            : j,
                        ),
                      )
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="demo-remove"
                  type="button"
                  aria-label={`Remove ${job.title}`}
                  onClick={() => save(jobs.filter((j) => j.id !== job.id))}
                >
                  ×
                </button>
              </article>
            ))
          ) : (
            <p className="demo-empty-small">
              No sample requests. Add one above to explore the workflow.
            </p>
          )}
        </div>
        <div className="demo-actions">
          <button
            type="button"
            className="demo-reset"
            onClick={() => save(initialJobs)}
          >
            Restore sample
          </button>
          <button
            type="button"
            className="demo-reset"
            onClick={() => {
              setJobs([]);
              try {
                localStorage.removeItem(storageKey);
                setNotice("All local demonstration records cleared.");
              } catch {
                setNotice(
                  "Records cleared for this visit. Browser storage could not be accessed.",
                );
              }
            }}
          >
            Clear local data
          </button>
        </div>
      </div>
      <div className="demo-footer">
        <p role="status" aria-live="polite">
          {notice}
        </p>
      </div>
    </div>
  );
}
export function ProductPreview({ kind }: { kind: "lead" | "operations" }) {
  return kind === "lead" ? (
    <LeadIntakeDemo compact />
  ) : (
    <OperationsDemo compact />
  );
}
