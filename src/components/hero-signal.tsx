"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { Arrow } from "./ui";
import { extractDemoLead, sampleInquiry } from "@/lib/demo-lead";

const lead = extractDemoLead(sampleInquiry);
const steps = ["Receive", "Structure", "Review", "Export"] as const;

export function HeroSignal() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const play = useCallback(() => {
    clear();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(3);
      return;
    }
    setActive(0);
    setRunning(true);
    for (let i = 1; i < 4; i++)
      timers.current.push(setTimeout(() => setActive(i), i * 1150));
    timers.current.push(setTimeout(() => setRunning(false), 4100));
  }, [clear]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => {
      if (preference.matches) {
        clear();
        setRunning(false);
      }
    };
    preference.addEventListener("change", reduce);
    return () => preference.removeEventListener("change", reduce);
  }, [clear]);
  useEffect(() => {
    if (
      !root.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          if (!played.current) {
            played.current = true;
            play();
          }
        } else {
          clear();
          setRunning(false);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(root.current);
    return () => {
      clear();
      observer.disconnect();
    };
  }, [clear, play]);
  return (
    <div
      className={`hero-signal ${running ? "is-running" : ""}`}
      ref={root}
      style={{ "--signal-progress": `${(active / 3) * 100}%` } as CSSProperties}
    >
      <div className="signal-coordinates">
        <span>01 / A WORKING CONNECTION</span>
        <span>INPUT → OUTPUT</span>
      </div>
      <svg
        className="signal-brand-mark"
        aria-hidden="true"
        viewBox="0 0 200 200"
      >
        <path
          d="M30 20h35l105 160h-35L30 20Zm105 0h35L65 180H30L135 20Z"
          fill="currentColor"
        />
      </svg>
      <div className="signal-inquiry" data-active={active === 0}>
        <div className="signal-window-top">
          <span className="signal-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M3 5h18v14H3V5Zm0 0 9 8 9-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>
          <div>
            <strong>New inquiry</strong>
            <span>Fictional sample / Alex Sample</span>
          </div>
          <span className="signal-window-index">01</span>
        </div>
        <p>
          “We need an online booking system so customers can request an
          appointment and our team can track the work.”
        </p>
        <div className="signal-message-foot">
          <span>MESSAGE RECEIVED</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16">
            <path
              d="M10 3v13m-4-4 4 4 4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </div>
      </div>
      <div className="signal-connector" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div
        className="signal-record"
        data-active={active > 0}
        data-stage={active}
      >
        <div className="signal-record-top">
          <span>STRUCTURED RECORD</span>
          <span className="signal-status">
            {active === 0
              ? "Output preview"
              : active === 1
                ? "Rule-based extraction"
                : active === 2
                  ? "Ready for review"
                  : "Ready to export"}
          </span>
        </div>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>{lead.name}</dd>
          </div>
          <div>
            <dt>Company</dt>
            <dd>{lead.company}</dd>
          </div>
          <div>
            <dt>Request</dt>
            <dd>{lead.service}</dd>
          </div>
        </dl>
        <div className="signal-record-foot">
          <span className="signal-review-dot" aria-hidden="true" />
          <span>A person in control of the next step.</span>
        </div>
      </div>
      <div className="signal-controls">
        <div
          className="signal-step-controls"
          aria-label="Sample workflow stages"
        >
          {steps.map((step, index) => (
            <button
              key={step}
              type="button"
              aria-pressed={active === index}
              onClick={() => {
                clear();
                setRunning(false);
                setActive(index);
              }}
            >
              <span>0{index + 1}</span>
              {step}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="signal-play"
          onClick={() => {
            if (running) {
              clear();
              setRunning(false);
            } else play();
          }}
          aria-label={
            running ? "Pause sample workflow" : "Replay sample workflow"
          }
        >
          {running ? (
            <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
              <path d="M6 4v12m8-12v12" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
              <path
                d="M5 6a6.5 6.5 0 1 1-1 7M5 2v5H1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="signal-disclosure">
        <span>RULE-BASED / NO LIVE AI OR CRM</span>
        <Link href="/work/lead-intake">
          Try the real demo <Arrow />
        </Link>
      </div>
    </div>
  );
}
