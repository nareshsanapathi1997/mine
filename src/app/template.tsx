"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const NAV_FLAG = "kyntriq-nav";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(NAV_FLAG) === "1";
    const mark = window.setTimeout(() => sessionStorage.setItem(NAV_FLAG, "1"), 80);
    if (!seen || reduced) return () => window.clearTimeout(mark);
    const frame = window.requestAnimationFrame(() => setPlay(true));
    return () => {
      window.clearTimeout(mark);
      window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <motion.div
      initial={false}
      animate={play ? { opacity: [0, 1], y: [12, 0] } : { opacity: 1, y: 0 }}
      transition={play ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}
