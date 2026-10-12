export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`wordmark${compact ? " wordmark-compact" : ""}`}
      aria-label="CodinginX"
    >
      <span aria-hidden="true">
        Codingin<span className="wordmark-x">X</span>
      </span>
    </span>
  );
}
