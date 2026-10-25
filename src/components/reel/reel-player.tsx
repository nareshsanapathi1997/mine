"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import "@/components/home/promo-reel.css";

export type Timed = { s: number; e?: number };
export type VoiceLine = [number, string];

/** Vertical position that stretches on phones, where the stage switches to portrait. */
export function y(n: number) {
  return `calc(${n} * var(--y))`;
}

export function on(t: number, { s, e = Number.POSITIVE_INFINITY }: Timed) {
  return t >= s && t < e;
}

function fmt(x: number, max: number) {
  const s = Math.floor(Math.min(max, Math.max(0, x)));
  return `0:${s < 10 ? "0" : ""}${s}`;
}

export function Scene({ t, s, e, children }: { t: number; s: number; e: number; children: ReactNode }) {
  return <div className={cn("promo-reel-scene", on(t, { s, e }) && "promo-reel-on")}>{children}</div>;
}

export function Item({
  t,
  s,
  e,
  className,
  style,
  children,
}: Timed & { t: number; className: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={cn("promo-reel-it", className, on(t, { s, e }) && "promo-reel-on")} style={style}>
      {children}
    </div>
  );
}

export function Brand({ t, s, top = 45 }: { t: number; s: number; top?: number }) {
  return (
    <Item t={t} s={s} className="promo-reel-logo promo-reel-brand" style={{ left: "10cqw", top: y(top) }}>
      <div className="promo-reel-v">V</div>
      VARASENA Technologies · Visakhapatnam
    </Item>
  );
}

export function ServiceGrid({
  t,
  s,
  items,
  columns = 3,
}: {
  t: number;
  s: number;
  items: { title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div className={cn("promo-reel-grid", columns === 2 && "promo-reel-grid-2")}>
      {items.map((item, index) => (
        <div key={item.title} className={cn("promo-reel-tile", on(t, { s: s + index * 0.35 }) && "promo-reel-on")}>
          <b>{item.title}</b>
          <span>{item.body}</span>
        </div>
      ))}
    </div>
  );
}

function pickIndianVoice() {
  const voices = window.speechSynthesis.getVoices();
  const indian = voices.filter((v) => /en[-_]IN/i.test(v.lang) || /india/i.test(v.name));
  return (
    indian.find((v) => /neerja|prabhat/i.test(v.name)) ??
    indian.find((v) => /natural|online/i.test(v.name)) ??
    indian.find((v) => /heera|ravi|google/i.test(v.name)) ??
    indian[0] ??
    voices.find((v) => /hi[-_]IN/i.test(v.lang)) ??
    null
  );
}

export function ReelPlayer({
  duration,
  voiceLines,
  stillAt,
  label,
  className,
  children,
}: {
  duration: number;
  voiceLines: VoiceLine[];
  /** Frame shown when the visitor prefers reduced motion. */
  stillAt: number;
  label: string;
  className?: string;
  children: (t: number) => ReactNode;
}) {
  const reduce = usePrefersReducedMotion();
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const [voiceOn, setVoiceOn] = useState(false);
  const spoken = useRef(-1);
  const last = useRef(0);
  const playingRef = useRef(playing);
  const tRef = useRef(t);
  const voice = useRef<SpeechSynthesisVoice | null>(null);

  playingRef.current = playing;
  tRef.current = t;

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const pick = () => {
      voice.current = pickIndianVoice();
    };
    pick();
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", pick);
  }, []);

  const say = useCallback((txt: string) => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = voice.current?.lang ?? "en-IN";
      if (voice.current) u.voice = voice.current;
      u.rate = 0.98;
      window.speechSynthesis.speak(u);
    } catch {
      /* speech API unavailable */
    }
  }, []);

  const hush = () => {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (reduce) {
      setPlaying(false);
      setT(stillAt);
      return;
    }
    last.current = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      if (playingRef.current) {
        let next = tRef.current + (now - last.current) / 1000;
        if (next >= duration) {
          next = 0;
          spoken.current = -1;
        }
        tRef.current = next;
        setT(next);
      }
      last.current = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce, duration, stillAt]);

  useEffect(() => {
    if (!voiceOn || !playing || reduce) return;
    for (let i = 0; i < voiceLines.length; i++) {
      if (t >= voiceLines[i][0] && i > spoken.current) {
        spoken.current = i;
        say(voiceLines[i][1]);
      }
    }
  }, [t, voiceOn, playing, reduce, say, voiceLines]);

  useEffect(() => hush, []);

  const syncSpoken = (at: number) => {
    spoken.current = -1;
    for (let i = 0; i < voiceLines.length; i++) {
      if (voiceLines[i][0] < at) spoken.current = i;
    }
  };

  const seek = (value: number) => {
    setT(value);
    tRef.current = value;
    syncSpoken(value);
    hush();
  };

  return (
    <div className={cn("promo-reel", className)}>
      <div className="promo-reel-chrome" aria-hidden="true">
        <span className="promo-reel-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="promo-reel-url">varasena.com · sample</span>
        <span className="promo-reel-live">
          <b />
          {duration} sec
        </span>
      </div>
      <div className="promo-reel-stage" role="group" aria-roledescription="video" aria-label={label}>
        {children(t)}
        <div className="promo-reel-bar" style={{ width: `${(t / duration) * 100}%` }} aria-hidden="true" />
      </div>

      <div className="promo-reel-ctl">
        <button
          type="button"
          onClick={() => {
            if (playing) hush();
            setPlaying(!playing);
          }}
          aria-label={playing ? "Pause promo" : "Play promo"}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.05}
          value={t}
          aria-label="Seek promo"
          onChange={(e) => seek(Number(e.target.value))}
        />
        <time dateTime={`PT${Math.floor(t)}S`}>
          {fmt(t, duration)} / {fmt(duration, duration)}
        </time>
        <button
          type="button"
          aria-pressed={voiceOn}
          onClick={() => {
            if (voiceOn) hush();
            else syncSpoken(tRef.current);
            setVoiceOn(!voiceOn);
          }}
        >
          Voiceover: {voiceOn ? "on" : "off"}
        </button>
      </div>
    </div>
  );
}
