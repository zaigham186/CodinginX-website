"use client";
import { Arrow } from "@/components/ui";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { assistantAnswers, type AssistantTopic } from "@/content/assistant";
import { trackEvent } from "./analytics";
import { siteConfig } from "@/config/siteConfig";

function safeLink(href: unknown): href is string {
  if (
    typeof href !== "string" ||
    href.includes("\\") ||
    Array.from(href).some((character) => character.charCodeAt(0) <= 32)
  )
    return false;
  if (
    [
      `mailto:${siteConfig.emails.general}`,
      `mailto:${siteConfig.emails.careers}`,
    ].includes(href)
  )
    return true;
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  try {
    return new URL(href, siteConfig.url).origin === siteConfig.url;
  } catch {
    return false;
  }
}

type Answer = {
  message: string;
  links: readonly { label: string; href: string }[];
};
const choices: { label: string; topic: AssistantTopic }[] = [
  { label: "Find the right service", topic: "services" },
  { label: "Plan an MVP", topic: "mvp" },
  { label: "Explore automation", topic: "ai" },
  { label: "See the work", topic: "work" },
  { label: "Start an inquiry", topic: "contact" },
];
export function SiteAssistant() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  const locked = useRef(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => () => request.current?.abort(), []);
  function open() {
    dialog.current?.showModal();
    trackEvent("chatbot_opened");
  }
  function close() {
    dialog.current?.close();
    request.current?.abort();
    trigger.current?.focus();
  }
  function choose(topic: AssistantTopic) {
    setAnswer(assistantAnswers[topic]);
    setError("");
  }
  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (locked.current || !message.trim()) return;
    locked.current = true;
    setBusy(true);
    setError("");
    const controller = new AbortController();
    request.current = controller;
    const timer = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object")
        throw new Error();
      const value = result as Answer;
      if (typeof value.message !== "string" || !Array.isArray(value.links))
        throw new Error();
      setAnswer({
        message: value.message,
        links: value.links.filter(
          (l) => safeLink(l.href) && typeof l.label === "string",
        ),
      });
      setMessage("");
    } catch {
      setError(
        controller.signal.aborted
          ? "That response took too long. Choose a topic below or contact the team directly."
          : "The assistant service is unavailable. The guided topics below still work, or you can contact the team.",
      );
    } finally {
      clearTimeout(timer);
      locked.current = false;
      setBusy(false);
      request.current = null;
    }
  }
  return (
    <>
      <button
        ref={trigger}
        className="assistant-launcher"
        onClick={open}
        aria-haspopup="dialog"
        aria-controls="codinginx-assistant"
      >
        <span className="assistant-symbol" aria-hidden="true">
          X
        </span>
        <span>Ask CodinginX</span>
      </button>
      <dialog
        ref={dialog}
        id="codinginx-assistant"
        className="assistant-dialog"
        aria-labelledby="assistant-title"
        onClose={() => {
          request.current?.abort();
          trigger.current?.focus();
        }}
      >
        <div className="assistant-shell">
          <header className="assistant-header">
            <div>
              <h2 id="assistant-title">CodinginX assistant</h2>
              <p>Find a useful place to start.</p>
            </div>
            <button
              onClick={close}
              className="assistant-close"
              aria-label="Close assistant"
            >
              ×
            </button>
          </header>
          <div className="assistant-body">
            <p className="assistant-intro">
              What are you looking to build or improve? Choose a topic for an
              answer from our published information.
            </p>
            <div className="assistant-choices">
              {choices.map((c) => (
                <button
                  type="button"
                  key={c.topic}
                  onClick={() => choose(c.topic)}
                >
                  {c.label}
                  <Arrow />
                </button>
              ))}
            </div>
            {answer && (
              <div
                className="assistant-answer"
                role="status"
                aria-live="polite"
              >
                <p>{answer.message}</p>
                <div>
                  {answer.links.map((l) => (
                    <Link key={l.href} href={l.href} onClick={close}>
                      {l.label} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {error && (
              <div className="assistant-error" role="alert">
                <p>{error}</p>
                <Link href="/contact" onClick={close}>
                  Contact CodinginX
                </Link>
              </div>
            )}
            <form onSubmit={send} className="assistant-form">
              <label htmlFor="assistant-message">Or ask a question</label>
              <div>
                <input
                  ref={input}
                  id="assistant-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  placeholder="What can you help automate?"
                  disabled={busy}
                />
                <button
                  type="submit"
                  disabled={busy || !message.trim()}
                  aria-label={busy ? "Getting an answer" : "Send question"}
                >
                  {busy ? "…" : "→"}
                </button>
              </div>
              <p className="assistant-disclosure">
                No prices or deadlines are agreed here. Avoid sensitive
                information. Typed questions are processed on the server
                {process.env.NEXT_PUBLIC_CHAT_AI_ENABLED === "true"
                  ? " and may be classified by OpenAI"
                  : ""}
                .{" "}
                <Link href="/privacy" onClick={close}>
                  Privacy
                </Link>
              </p>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
