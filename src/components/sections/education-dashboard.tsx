"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const nav = [
  { label: "Students", active: true },
  { label: "Admissions", active: false },
  { label: "Attendance", active: false },
  { label: "Fees", active: false },
  { label: "Courses", active: false },
  { label: "AI Assistant", active: false, ai: true },
];

const rows = [
  ["A. Rao", "Science", "Morning", "Present", "Clear"],
  ["B. Shah", "Commerce", "Evening", "Absent", "Due"],
  ["C. Iyer", "Foundation", "Weekend", "Present", "Clear"],
];

const metrics = [
  { label: "Admissions", value: 2, rest: " in review", width: "68%" },
  { label: "Fees", value: 1, rest: " marked due", width: "34%" },
  { label: "Courses", value: 3, rest: " listed", width: "100%" },
];

const sentence = "The Term 2 receipt is in Fees. It can be sent to the parent contact on file.";

export function EducationDashboard() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [counts, setCounts] = useState(() => metrics.map((item) => item.value));
  const [typed, setTyped] = useState(sentence);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node || reduced || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setCounting(true);
        setCounts(metrics.map(() => 0));
        setTyped("");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!counting) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 900);
      setCounts(metrics.map((item) => Math.round(item.value * t)));
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [counting]);

  useEffect(() => {
    if (!counting) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(sentence.slice(0, index));
      if (index >= sentence.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [counting]);

  return (
    <figure
      ref={root}
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_50px_-36px_rgba(15,23,42,0.45)] ${counting ? "is-counting" : ""}`}
    >
      <figcaption className="sr-only">
        Illustrative campus workspace showing students, admissions, attendance, fees, courses and an AI assistant. Sample interface only.
      </figcaption>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">Campus</p>
          <p className="text-xs text-muted">Student operations</p>
        </div>
        <p className="text-xs font-medium text-muted">Sample data</p>
      </div>
      <div className="grid sm:grid-cols-[180px_minmax(0,1fr)]">
        <div className="flex gap-1 overflow-x-auto border-b border-line bg-navy p-2 sm:flex-col sm:border-r sm:border-b-0">
          {nav.map((item) => (
            <div
              key={item.label}
              className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm ${
                item.active ? "bg-white font-medium text-navy" : "text-mist"
              }`}
            >
              {item.ai ? <span className="size-1.5 rounded-full bg-ai-glow" aria-hidden="true" /> : null}
              {item.label}
            </div>
          ))}
        </div>
        <div className="space-y-3 bg-surface p-3 sm:p-4">
          <ul className="space-y-2 sm:hidden">
            {rows.map((row) => (
              <li key={row[0]} className="rounded-md border border-line p-3 text-sm">
                <p className="font-medium text-ink">{row[0]}</p>
                <p className="mt-1 text-muted">
                  {row[1]} · {row[2]}
                </p>
                <p className="mt-1 text-ink">
                  {row[3]} · Fees {row[4]}
                </p>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-hidden rounded-md border border-line sm:block">
            <div className="grid grid-cols-5 border-b border-line bg-canvas px-3 py-2 text-[11px] font-medium tracking-[0.04em] text-muted uppercase">
              <span>Student</span>
              <span>Course</span>
              <span>Batch</span>
              <span>Attendance</span>
              <span>Fees</span>
            </div>
            {rows.map((row) => (
              <div key={row[0]} className="grid grid-cols-5 border-b border-line px-3 py-2.5 text-sm text-ink last:border-b-0">
                {row.map((cell) => (
                  <span key={`${row[0]}-${cell}`}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {metrics.map((item, index) => (
              <div key={item.label} className="rounded-md border border-line px-3 py-2">
                <p className="text-[11px] font-medium tracking-[0.04em] text-muted uppercase">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {counts[index]}
                  {item.rest}
                </p>
                <div className="dash-fill mt-2">
                  <span style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-line border-l-2 border-l-ai px-3 py-3">
            <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">AI Assistant</p>
            <p className="mt-2 text-sm text-ink">Where is my fee receipt?</p>
            <p className="mt-1 min-h-11 text-sm leading-relaxed text-muted">
              {typed}
              {counting && typed.length < sentence.length ? (
                <span className="ml-0.5 inline-block h-3 w-px bg-ai align-middle" aria-hidden="true" />
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
