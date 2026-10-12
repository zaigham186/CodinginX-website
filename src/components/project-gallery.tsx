"use client";

import { useId, useState } from "react";
import Image from "next/image";
import intake from "../../public/media/intake-desktop.webp";
import operations from "../../public/media/operations-desktop.webp";
import mobile from "../../public/media/operations-mobile.webp";

export function ProjectGallery({
  project,
}: {
  project: "intake" | "operations";
}) {
  const [detail, setDetail] = useState(false);
  const id = useId();
  return (
    <figure
      className={`project-gallery project-gallery-${project}`}
      data-detail={detail}
      data-reveal="media"
    >
      <div className="gallery-toolbar">
        <span>
          {project === "intake" ? "INTAKE LAB" : "OPERATIONS DESK"} / REAL
          INTERFACE
        </span>
        <div className="gallery-view-controls" aria-label="Interface views">
          <button
            type="button"
            aria-pressed={!detail}
            aria-controls={id}
            onClick={() => setDetail(false)}
          >
            Full interface
          </button>
          <button
            type="button"
            aria-pressed={detail}
            aria-controls={id}
            onClick={() => setDetail(true)}
          >
            Interaction detail
          </button>
        </div>
      </div>
      <div className="gallery-canvas" id={id}>
        <div className="gallery-browser">
          <div className="visual-browser-bar">
            <span className="browser-buttons" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>CODINGINX / INTERNAL DEMONSTRATION</span>
          </div>
          <Image
            src={project === "intake" ? intake : operations}
            alt={
              project === "intake"
                ? "Actual sample inquiry extraction into editable fields in Intake lab."
                : "Actual sample request scheduling and status interface in Operations desk."
            }
            sizes="(max-width: 767px) 95vw, 1320px"
          />
        </div>
        {project === "operations" && (
          <div className="gallery-phone">
            <div className="phone-top" aria-hidden="true" />
            <Image
              src={mobile}
              alt="Responsive mobile view of the same internal Operations desk demonstration."
              sizes="(max-width: 767px) 130px, 230px"
            />
          </div>
        )}
        <span className="gallery-annotation">
          {detail
            ? "DESIGNED AROUND THE NEXT ACTION"
            : project === "intake"
              ? "FROM MESSAGE TO REVIEWABLE RECORD"
              : "INTAKE. SCHEDULE. STATUS."}
        </span>
      </div>
      <figcaption>
        <span>Internal demonstration. Fictional sample data.</span>
        <span>
          {project === "intake"
            ? "Rule-based / browser-local"
            : "Local browser persistence"}
        </span>
      </figcaption>
    </figure>
  );
}
