"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSite } from "@/components/cms/site-provider";
import { cn } from "@/lib/cn";
import "./chat-widget.css";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "varasena-chat";
const SUGGESTIONS = [
  "What do you build?",
  "Can you make a website for my school?",
  "How much does an app cost?",
  "Can AI reply to my WhatsApp?",
];
const PAGE_PATH = /(\/(?:solutions|industries)\/[a-z0-9-]+|\/(?:contact|ai-automation|about|case-studies|blog|solutions|industries)\b)/g;

function linkify(text: string): ReactNode[] {
  return text.split(PAGE_PATH).map((part, index) =>
    index % 2 === 1 ? (
      <Link key={index} href={part as "/"} className="chat-link">
        {part}
      </Link>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

function ChatGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5.1A8 8 0 1 1 21 12Z" strokeLinejoin="round" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeLinecap="round" strokeWidth="2.6" />
    </svg>
  );
}

export function ChatWidget() {
  const { site } = useSite();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent">("idle");
  const [leadError, setLeadError] = useState("");
  const openedAt = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  /** Closes the panel from inside it and gives focus back to the button that opened it. */
  function closePanel() {
    setOpen(false);
    fabRef.current?.focus();
  }

  const restored = useRef(false);

  /** Restores this tab's conversation the first time the panel opens. */
  function toggleOpen() {
    if (!restored.current) {
      restored.current = true;
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) setMessages(JSON.parse(saved) as Message[]);
      } catch {
        /* ignore */
      }
    }
    setOpen((value) => !value);
  }

  useEffect(() => {
    if (!restored.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      /* ignore */
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy, leadOpen]);

  useEffect(() => {
    if (!open) return;
    openedAt.current = openedAt.current || Date.now();
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      // Only Escape pressed inside the chat closes it, not Escape meant for a menu or dialog.
      if (event.key === "Escape" && panelRef.current?.contains(document.activeElement)) closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text: string) => {
    const question = text.trim().slice(0, 1000);
    if (!question || busy) return;
    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = (await response.json()) as { ok: boolean; reply?: string; message?: string };
      if (data.ok && data.reply) setMessages([...next, { role: "assistant", content: data.reply }]);
      else setError(data.message ?? "Something went wrong. Please try again.");
    } catch {
      setError("Could not reach the assistant. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const asked = messages
      .filter((item) => item.role === "user")
      .map((item) => item.content)
      .join(" | ");
    const note = String(form.get("note") ?? "").trim();
    setLeadState("sending");
    setLeadError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          company: "",
          industry: "",
          budget: "",
          need: (note || "Website chat enquiry").slice(0, 160),
          message: `Website chat enquiry. ${note ? `Note: ${note}. ` : ""}Asked: ${asked || "No questions yet."}`.slice(0, 2000),
          formStartedAt: openedAt.current || Date.now() - 5000,
          fax: "",
        }),
      });
      const data = (await response.json()) as { ok: boolean; message?: string; errors?: Record<string, string> };
      if (data.ok) {
        setLeadState("sent");
        setLeadOpen(false);
        setMessages((list) => [
          ...list,
          { role: "assistant", content: "Thank you. Our team will call or WhatsApp you soon, usually within one working day." },
        ]);
      } else {
        setLeadState("idle");
        setLeadError(data.errors ? Object.values(data.errors)[0] : (data.message ?? "Please check your details."));
      }
    } catch {
      setLeadState("idle");
      setLeadError("Could not send. Please WhatsApp us instead.");
    }
  };

  return (
    <>
      <button
        type="button"
        ref={fabRef}
        className="chat-fab"
        aria-label={open ? "Close chat assistant" : "Chat with our assistant"}
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={toggleOpen}
      >
        {open ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <ChatGlyph />
        )}
      </button>

      {open ? (
        <section ref={panelRef} id="chat-panel" className="chat-panel" role="dialog" aria-modal="false" aria-label="Chat assistant">
          <header className="chat-head">
            <span className="chat-avatar" aria-hidden="true">
              V<b className="chat-online" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="chat-title">VARASENA Assistant</p>
              <p className="chat-sub">
                <b className="chat-online-dot" aria-hidden="true" />
                Online · Replies in seconds
              </p>
            </div>
            <button type="button" className="chat-close" aria-label="Close chat" onClick={closePanel}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="chat-list" aria-live="polite">
            <div className="chat-msg chat-bot">
              Hello! Ask me about websites, apps, software, WhatsApp automation or AI for your business in Vizag. For
              anything I cannot answer, our team takes over.
            </div>
            {messages.length === 0 ? (
              <div className="chat-chips">
                {SUGGESTIONS.map((item) => (
                  <button key={item} type="button" onClick={() => void send(item)}>
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
            {messages.map((item, index) => (
              <div key={index} className={cn("chat-msg", item.role === "user" ? "chat-user" : "chat-bot")}>
                {item.role === "assistant" ? linkify(item.content) : item.content}
              </div>
            ))}
            {busy ? (
              <div className="chat-msg chat-bot chat-typing" aria-label="Assistant is typing">
                <i />
                <i />
                <i />
              </div>
            ) : null}
            {error ? <p className="chat-error">{error}</p> : null}

            {leadOpen ? (
              <form className="chat-lead" onSubmit={submitLead}>
                <p className="chat-lead-title">Leave your number, we will call you</p>
                <input name="name" required autoComplete="name" placeholder="Your name" maxLength={80} />
                <input name="phone" required type="tel" autoComplete="tel" placeholder="Phone or WhatsApp" maxLength={20} />
                <input name="email" required type="email" autoComplete="email" placeholder="Email" maxLength={120} />
                <input name="note" placeholder="What do you need? (optional)" maxLength={160} />
                {leadError ? <p className="chat-error">{leadError}</p> : null}
                <div className="flex gap-2">
                  <button type="submit" className="chat-send flex-1" disabled={leadState === "sending"}>
                    {leadState === "sending" ? "Sending…" : "Send"}
                  </button>
                  <button type="button" className="chat-ghost" onClick={() => setLeadOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : null}
          </div>

          <div className="chat-actions">
            {leadState !== "sent" ? (
              <button type="button" onClick={() => setLeadOpen(true)} disabled={leadOpen}>
                Leave your number
              </button>
            ) : null}
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
              maxLength={1000}
              disabled={busy}
            />
            <button type="submit" className="chat-send" disabled={busy || !input.trim()} aria-label="Send">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="currentColor">
                <path d="M3.4 20.4 21 12 3.4 3.6l.01 6.53L15 12 3.41 13.87z" />
              </svg>
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
