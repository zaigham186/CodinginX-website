"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ProductVisual, type ProductVisualKind } from "./product-visual";
import { Arrow } from "./ui";

export type ServiceTeaser = {
  index: string;
  title: string;
  slug: string;
  summary: string;
  kind: ProductVisualKind;
};

export function ServicesExplorer({ items }: { items: ServiceTeaser[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % items.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index + items.length - 1) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }
  const selected = items[active];
  return (
    <div className="services-explorer">
      <div
        className="service-tabs"
        role="tablist"
        aria-label="Explore CodinginX services"
        aria-orientation="vertical"
      >
        {items.map((service, index) => (
          <button
            key={service.slug}
            id={`${id}-tab-${index}`}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onKeyDown={(event) => keyboard(event, index)}
            onClick={() => setActive(index)}
          >
            <span className="number">{service.index}</span>
            <span>{service.title}</span>
            <Arrow />
          </button>
        ))}
        <p className="explorer-aside">
          One considered approach.
          <br />
          Different ways to move your business forward.
        </p>
      </div>
      <div
        className="service-tab-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div key={selected.slug} className="service-panel-content">
          <ProductVisual kind={selected.kind} />
          <div className="service-panel-caption">
            <p>{selected.summary}</p>
            <Link className="text-link" href={`/services/${selected.slug}`}>
              Explore the service <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
