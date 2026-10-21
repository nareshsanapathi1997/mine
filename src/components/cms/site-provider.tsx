"use client";

import { createContext, useContext } from "react";
import type { ChromeContent } from "@/lib/cms/types";
import type { SiteConfig } from "@/content/site";

type SiteContextValue = {
  site: SiteConfig;
  chrome: ChromeContent;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({
  site,
  chrome,
  children,
}: {
  site: SiteConfig;
  chrome: ChromeContent;
  children: React.ReactNode;
}) {
  return <SiteContext.Provider value={{ site, chrome }}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) {
    throw new Error("useSite must be used within SiteProvider.");
  }
  return value;
}
