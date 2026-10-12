"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** A shared observer adds one-shot enhancement; server content is always visible. */
export function MotionSystem() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    let observer: IntersectionObserver | undefined;
    function prepare() {
      observer?.disconnect();
      animations.splice(0).forEach((animation) => animation.cancel());
      if (preference.matches || !window.IntersectionObserver) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            const kind = element.dataset.reveal;
            const keyframes: Keyframe[] =
              kind === "media"
                ? [
                    { clipPath: "inset(3% 0 3% 0)", transform: "scale(.985)" },
                    { clipPath: "inset(0)", transform: "scale(1)" },
                  ]
                : kind === "line"
                  ? [
                      { transform: "scaleX(.72)", opacity: 0.7 },
                      { transform: "scaleX(1)", opacity: 1 },
                    ]
                  : [
                      { transform: "translateY(16px)", opacity: 0.72 },
                      { transform: "translateY(0)", opacity: 1 },
                    ];
            animations.push(
              element.animate(keyframes, {
                duration: kind === "media" ? 800 : 560,
                easing: "cubic-bezier(.22,.75,.2,1)",
              }),
            );
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
      );
      document
        .querySelectorAll("[data-reveal]")
        .forEach((element) => observer?.observe(element));
    }
    prepare();
    preference.addEventListener("change", prepare);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", prepare);
    };
  }, [pathname]);
  return null;
}
