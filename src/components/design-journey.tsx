"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InterfaceStudy } from "./product-visual";
import { Arrow } from "./ui";
import intake from "../../public/media/intake-desktop.webp";

export function DesignJourney() {
  const [active, setActive] = useState(0);
  const id = useId();
  const stages = ["User flow", "Wireframe", "Working interface"];
  return (
    <div className="design-journey">
      <div
        className="design-journey-controls"
        aria-label="Inspect the interface design process"
      >
        {stages.map((stage, index) => (
          <button
            key={stage}
            type="button"
            aria-pressed={active === index}
            aria-controls={id}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {stage}
            <Arrow />
          </button>
        ))}
      </div>
      <div id={id} className="design-journey-canvas" key={active}>
        {active === 0 ? (
          <div className="design-flow-map">
            <span className="artifact-overline">
              START WITH THE PERSON’S TASK
            </span>
            <h3>
              Turn a message
              <br />
              into a record worth using.
            </h3>
            <div className="design-flow-route">
              <span>Enter inquiry</span>
              <i aria-hidden="true" />
              <span>Extract fields</span>
              <i aria-hidden="true" />
              <span>Review & correct</span>
              <i aria-hidden="true" />
              <span>Export JSON</span>
            </div>
            <p>
              A user flow based on the real, browser-local Intake lab
              demonstration.
            </p>
          </div>
        ) : active === 1 ? (
          <InterfaceStudy />
        ) : (
          <div className="design-working-view">
            <Image
              src={intake}
              alt="The actual Intake lab demonstration that implements the pictured user flow and interface study."
              sizes="(max-width: 767px) 95vw, 1000px"
            />
            <Link className="text-link" href="/work/lead-intake">
              Try the working interface <Arrow />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
