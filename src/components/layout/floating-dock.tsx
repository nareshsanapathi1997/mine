"use client";

import { ChatWidget } from "@/components/chat/chat-widget";
import { Glyph } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useConsent } from "@/components/consent/cookie-consent";
import { useSite } from "@/components/cms/site-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

/**
 * Bottom-right floating controls: WhatsApp, back-to-top and the mobile
 * "Talk to us" bar, laid out together so they never overlap.
 * Hidden while the cookie banner is open (first visit only).
 */
const noop = () => () => {};

export function FloatingDock() {
  const { site, chrome } = useSite();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const consent = useConsent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted || !consent) return null;
  const showBar = scrolled && pathname !== "/contact";

  return (
    <>
      <div className={cn("dock fixed right-4 z-40 flex flex-col items-end gap-3 lg:right-6 lg:bottom-6", showBar ? "bottom-[5.25rem]" : "bottom-4")}>
        {scrolled ? (
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)]"
            aria-label={chrome.dock.backToTopLabel}
            onClick={() => {
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }}
          >
            <Glyph name="arrow-up" className="size-5" />
          </button>
        ) : null}
        <ChatWidget />
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={chrome.dock.whatsappLabel} className="wa-fab">
          <WhatsAppGlyph />
        </a>
      </div>
      {showBar ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 py-3 pr-20 pl-4 backdrop-blur-md lg:hidden">
          <Button asChild arrow className="w-full">
            <Link href={chrome.header.ctaHref}>{chrome.dock.talkLabel}</Link>
          </Button>
        </div>
      ) : null}
    </>
  );
}
