"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section container error-page">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>Let’s try that again.</h1>
      <p className="lead">
        This page couldn’t be loaded. You can retry or return home.
      </p>
      <div className="button-row">
        <button className="button button-primary" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="button button-secondary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
