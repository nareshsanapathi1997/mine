"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const selector = "[data-reveal], [data-reveal-stagger]";

function isRevealed(node: HTMLElement) {
  return node.hasAttribute("data-revealed");
}

function reveal(node: Element) {
  (node as HTMLElement).setAttribute("data-revealed", "");
}

function markInView(nodes: Iterable<HTMLElement>) {
  const vh = window.innerHeight || 1;
  for (const node of nodes) {
    if (isRevealed(node)) continue;
    const rect = node.getBoundingClientRect();
    if (rect.bottom > 8 && rect.top < vh * 0.94) reveal(node);
  }
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const collect = () => document.querySelectorAll<HTMLElement>(selector);

    /*
     * Use data-revealed (not className) so React hydration never fights a
     * class we mutate on the DOM. Defer the first pass until after paint so
     * App Router segment commits finish first.
     */
    let observer: IntersectionObserver | null = null;
    let frame = 0;
    let startFrame = 0;
    let mutations: MutationObserver | null = null;

    const watch = () => {
      const nodes = collect();
      const active = observer;
      if (reduce || !active) {
        nodes.forEach(reveal);
        return;
      }
      nodes.forEach((node) => {
        if (!isRevealed(node)) active.observe(node);
      });
      markInView(nodes);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        watch();
      });
    };

    startFrame = window.requestAnimationFrame(() => {
      startFrame = 0;
      if (reduce || typeof IntersectionObserver === "undefined") {
        watch();
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -4% 0px" },
      );

      watch();
      mutations = new MutationObserver(schedule);
      mutations.observe(document.body, { childList: true, subtree: true });
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    });

    return () => {
      if (startFrame) window.cancelAnimationFrame(startFrame);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      mutations?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return null;
}
