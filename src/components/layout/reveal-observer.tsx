"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const selector = "[data-reveal], [data-reveal-stagger]";

function markInView(nodes: Iterable<HTMLElement>) {
  const vh = window.innerHeight || 1;
  for (const node of nodes) {
    if (node.classList.contains("is-visible")) continue;
    const rect = node.getBoundingClientRect();
    if (rect.bottom > 8 && rect.top < vh * 0.94) node.classList.add("is-visible");
  }
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const collect = () => document.querySelectorAll<HTMLElement>(selector);

    if (reduce || typeof IntersectionObserver === "undefined") {
      collect().forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -4% 0px" },
    );

    const watch = () => {
      const nodes = collect();
      nodes.forEach((node) => {
        if (!node.classList.contains("is-visible")) observer.observe(node);
      });
      markInView(nodes);
    };

    watch();

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        watch();
      });
    };

    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
