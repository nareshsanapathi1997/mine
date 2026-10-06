"use client";

import { Bot, Briefcase, Database, Globe, Smartphone, Workflow } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const nodes = [
  { label: "Website", icon: Globe, className: "left-[4%] top-[18%]" },
  { label: "Mobile App", icon: Smartphone, className: "right-[4%] top-[18%]" },
  { label: "CRM", icon: Briefcase, className: "left-[4%] bottom-[22%]" },
  { label: "Automation", icon: Workflow, className: "right-[4%] bottom-[22%]" },
  { label: "Business Data", icon: Database, className: "left-1/2 bottom-[5%] -translate-x-1/2" },
];

const paths = [
  "M28 28 C 36 38, 42 42, 48 48",
  "M72 28 C 64 38, 58 42, 52 48",
  "M28 72 C 36 64, 42 58, 48 54",
  "M72 72 C 64 64, 58 58, 52 54",
  "M50 84 C 50 74, 50 64, 50 58",
];

function NodeCard({
  label,
  icon: Icon,
  emphasis = false,
  className = "",
}: {
  label: string;
  icon: typeof Globe;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg border bg-[#10192c] px-3 py-2.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] ${
        emphasis ? "border-ai/80 ai-pulse" : "border-white/14"
      } ${className}`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
          emphasis ? "bg-ai text-white" : "bg-white/8 text-mist"
        }`}
      >
        <Icon className="size-4" strokeWidth={1.5} aria-hidden />
      </span>
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
}

function FloatCard({
  kicker,
  body,
  late = false,
  className,
  live,
  reduced,
}: {
  kicker: string;
  body: string;
  late?: boolean;
  className: string;
  live: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      className={`float-card absolute hidden xl:block ${late ? "float-card-late" : ""} ${className}`}
      animate={live && !reduced ? { y: [0, -8, 0] } : undefined}
      transition={{ duration: late ? 5.4 : 4.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="text-[11px] font-semibold tracking-[0.12em] text-accent-glow uppercase">{kicker}</p>
      <p className="mt-1 text-sm leading-snug text-white">{body}</p>
    </motion.div>
  );
}

export function SystemMap() {
  const stage = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    if (reduced || typeof IntersectionObserver === "undefined") {
      node.classList.add("is-live");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        node.classList.add("is-live");
        setLive(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const node = stage.current;
    if (!node || reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const tilt = node.querySelector<HTMLElement>(".system-tilt");
    if (!tilt) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
      tilt.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
    };
    const onLeave = () => {
      tilt.style.setProperty("--rx", "0deg");
      tilt.style.setProperty("--ry", "0deg");
    };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <figure ref={stage} className="system-stage relative">
      <figcaption className="sr-only">
        Connected systems around an AI agent: Website, Mobile App, CRM, Automation and Business Data.
      </figcaption>

      <div className="panel p-4 xl:hidden">
        <p className="eyebrow text-mist">
          <span className="eyebrow-mark" aria-hidden="true" />
          Connected systems
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <NodeCard label="Website" icon={Globe} />
          <NodeCard label="Mobile App" icon={Smartphone} />
          <div className="col-span-2">
            <NodeCard label="AI Agent" icon={Bot} emphasis />
          </div>
          <NodeCard label="CRM" icon={Briefcase} />
          <NodeCard label="Automation" icon={Workflow} />
          <div className="col-span-2">
            <NodeCard label="Business Data" icon={Database} />
          </div>
        </div>
      </div>

      <div className="system-tilt hidden xl:block">
        <div className="panel relative aspect-[6/5]">
          <p className="eyebrow absolute top-5 left-5 text-mist">
            <span className="eyebrow-mark" aria-hidden="true" />
            Connected systems
          </p>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {paths.map((d) => (
              <g key={d}>
                <path d={d} fill="none" className="flow-line" stroke="#93c5fd" strokeWidth="0.45" strokeOpacity="0.55" />
                <path d={d} fill="none" className="flow-packet" stroke="#ffffff" strokeWidth="0.85" strokeLinecap="round" />
              </g>
            ))}
          </svg>
          {nodes.map((node) => (
            <NodeCard key={node.label} label={node.label} icon={node.icon} className={`absolute ${node.className}`} />
          ))}
          <NodeCard
            label="AI Agent"
            icon={Bot}
            emphasis
            className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <FloatCard
          kicker="AI Agent"
          body="Application status is in review. Admissions has been notified."
          className="top-[3%] left-[24%]"
          live={live}
          reduced={reduced}
        />
        <FloatCard
          kicker="Lead captured"
          body="Website enquiry routed to the CRM."
          late
          className="right-[16%] bottom-[1%]"
          live={live}
          reduced={reduced}
        />
      </div>
    </figure>
  );
}
