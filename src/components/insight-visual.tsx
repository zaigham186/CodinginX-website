const indexBySlug: Record<string, number | undefined> = {
  "plan-an-mvp-before-writing-code": 0,
  "what-business-tasks-to-automate-first": 1,
  "custom-software-vs-off-the-shelf-tools": 2,
};

export function InsightVisual({ slug }: { slug: string }) {
  const selected = indexBySlug[slug];
  if (selected === undefined) return null;
  const titles = [
    "Start with the useful unit.",
    "Follow the repeated task.",
    "Choose around the fit.",
  ];
  const paths = [
    ["One audience", "One complete workflow", "A clear release boundary"],
    ["Repeated task", "Defined information", "A reviewed handoff"],
    ["Workflow fit", "Ownership & portability", "Long-term maintenance"],
  ];
  return (
    <figure
      className={"insight-visual insight-visual-" + selected}
      data-reveal="media"
    >
      <figcaption>
        <span>CODINGINX / FIELD NOTES</span>
        <span>0{selected + 1}</span>
      </figcaption>
      <p className="insight-visual-title">{titles[selected]}</p>
      <div className="insight-visual-path">
        {paths[selected].map((label, position) => (
          <div key={label}>
            <span className="insight-visual-node">0{position + 1}</span>
            <p>{label}</p>
            {position < 2 && <i aria-hidden="true" />}
          </div>
        ))}
      </div>
      <span className="insight-visual-caption">
        EDITORIAL DIAGRAM / A WAY TO THINK THROUGH THE DECISION
      </span>
    </figure>
  );
}
