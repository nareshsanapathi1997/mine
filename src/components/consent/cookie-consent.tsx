"use client";

import Script from "next/script";
import Link from "next/link";
import { useCallback, useContext, useRef, useState, useSyncExternalStore, createContext } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "kyntriq-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

type ConsentApi = {
  openPreferences: () => void;
};

const ConsentContext = createContext<ConsentApi | null>(null);

let cached: Consent | null | undefined;
const listeners = new Set<() => void>();

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed.analytics !== "boolean") return null;
    return {
      necessary: true,
      analytics: parsed.analytics,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cached = undefined;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  if (cached === undefined) cached = readConsent();
  return cached;
}

function getServerSnapshot() {
  return null;
}

function emit() {
  cached = readConsent();
  listeners.forEach((listener) => listener());
}

export function useConsent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function saveConsent(analytics: boolean) {
  const value: Consent = {
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  emit();
}

function gaId() {
  const value = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
  return /^G-[A-Z0-9]+$/.test(value) ? value : "";
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);

  const openPreferences = useCallback(() => {
    setAnalyticsChoice(Boolean(readConsent()?.analytics));
    dialogRef.current?.showModal();
  }, []);

  return (
    <ConsentContext.Provider value={{ openPreferences }}>
      {children}
      <AnalyticsScripts />
      <CookieBanner onPreferences={openPreferences} />
      <CookieDialog
        dialogRef={dialogRef}
        analyticsChoice={analyticsChoice}
        onAnalyticsChoice={setAnalyticsChoice}
      />
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton() {
  const api = useContext(ConsentContext);
  if (!api) return null;
  return (
    <button type="button" className="footer-link" onClick={api.openPreferences}>
      Cookie settings
    </button>
  );
}

function AnalyticsScripts() {
  const mounted = useMounted();
  const consent = useConsent();
  const id = gaId();
  if (!mounted || !consent?.analytics || !id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

function CookieBanner({ onPreferences }: { onPreferences: () => void }) {
  const mounted = useMounted();
  const consent = useConsent();
  if (!mounted || consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div
        role="region"
        aria-label="Cookie consent"
        className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.5)] sm:p-5"
      >
        <p className="text-sm leading-relaxed text-ink">
          We store this choice in your browser. Analytics cookies run only if you allow them and a measurement ID is
          configured for this site. Reading the pages and sending an enquiry do not require a choice.
          <Link href="/cookies" className="text-link ml-1">
            Cookie Policy
          </Link>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => saveConsent(false)}>
            Reject
          </Button>
          <Button type="button" variant="ghost" onClick={onPreferences}>
            Preferences
          </Button>
          <Button type="button" onClick={() => saveConsent(true)}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

function CookieDialog({
  dialogRef,
  analyticsChoice,
  onAnalyticsChoice,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  analyticsChoice: boolean;
  onAnalyticsChoice: (value: boolean) => void;
}) {
  return (
    <dialog ref={dialogRef} className="cookie-dialog" aria-labelledby="cookie-prefs-title">
      <div className="p-6">
        <h2 id="cookie-prefs-title" className="text-xl font-semibold tracking-[-0.03em] text-ink">
          Cookie settings
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Necessary storage remembers this choice. Analytics is optional and stays off until you allow it.
        </p>
        <ul className="mt-5 space-y-4">
          <li className="rounded-xl border border-line p-4">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <span className="block text-sm font-semibold text-ink">Necessary</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  Always on. Saves your decision in this browser so we do not ask on every page.
                </span>
              </span>
            </label>
          </li>
          <li className="rounded-xl border border-line p-4">
            <label className="flex items-start gap-3" htmlFor="cookie-analytics">
              <input
                id="cookie-analytics"
                type="checkbox"
                className="mt-1"
                checked={analyticsChoice}
                onChange={(event) => onAnalyticsChoice(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold text-ink">Analytics</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  Google Analytics 4, and only when this deployment has a measurement ID. Used to understand which
                  pages are visited.
                </span>
              </span>
            </label>
          </li>
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={() => dialogRef.current?.close()}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              saveConsent(analyticsChoice);
              dialogRef.current?.close();
            }}
          >
            Save preferences
          </Button>
        </div>
      </div>
    </dialog>
  );
}
