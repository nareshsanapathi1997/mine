"use client";

import { useState } from "react";

// True once the first page has rendered in this tab.
let hasRendered = false;

/**
 * Subtle fade and lift on client-side navigation only. The first page load is
 * never animated, so there is no flash and no delay to the largest paint.
 * Only opacity and transform change, so nothing shifts. The animation is
 * defined in globals.css inside a no-preference media query, so reduced
 * motion users get an instant swap. The wrapper ends with transform: none,
 * so sticky and fixed children behave normally afterwards.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    const value = hasRendered;
    if (typeof window !== "undefined") hasRendered = true;
    return value;
  });
  return <div className={animate ? "page-enter route-enter" : "page-enter"}>{children}</div>;
}
