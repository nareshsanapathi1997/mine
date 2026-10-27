"use client";

import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import { ContactForm } from "@/components/contact/contact-form";

/**
 * Prefills "What do you need" from `?need=` on the client, so /contact can be
 * a static page instead of rendering on every request. Render inside
 * <Suspense> with a plain <ContactForm> as the fallback.
 */
export function ContactFormFromQuery(props: Omit<ComponentProps<typeof ContactForm>, "defaultNeed">) {
  const need = useSearchParams().get("need") ?? "";
  return <ContactForm key={need} defaultNeed={need} {...props} />;
}
