"use client";

import { useEffect } from "react";

export function MotionStage() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let frame = 0;
    let point: PointerEvent | null = null;
    let magnet: HTMLElement | null = null;

    const apply = () => {
      frame = 0;
      if (!point) return;
      const spot = (point.target as HTMLElement | null)?.closest?.(".card, .spot, .lift-card") as HTMLElement | null;
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${point.clientX - rect.left}px`);
        spot.style.setProperty("--my", `${point.clientY - rect.top}px`);
      }

      const next = (point.target as HTMLElement | null)?.closest?.(".btn-primary, .btn-ai") as HTMLElement | null;
      if (magnet && magnet !== next) {
        magnet.style.setProperty("--dx", "0px");
        magnet.style.setProperty("--dy", "0px");
        magnet = null;
      }
      if (!next || next.hasAttribute("disabled") || next.getAttribute("aria-disabled") === "true") return;
      const rect = next.getBoundingClientRect();
      const x = point.clientX - (rect.left + rect.width / 2);
      const y = point.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(x, y) > 90) {
        next.style.setProperty("--dx", "0px");
        next.style.setProperty("--dy", "0px");
        return;
      }
      next.style.setProperty("--dx", `${(x * 0.16).toFixed(2)}px`);
      next.style.setProperty("--dy", `${(y * 0.2).toFixed(2)}px`);
      magnet = next;
    };

    const onMove = (event: PointerEvent) => {
      point = event;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const clear = () => {
      magnet?.style.setProperty("--dx", "0px");
      magnet?.style.setProperty("--dy", "0px");
      magnet = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", clear);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
