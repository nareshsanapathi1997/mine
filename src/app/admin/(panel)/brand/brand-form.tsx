"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteBrand, SiteConfig, SiteSocialLink } from "@/content/site";

const NETWORKS = ["LinkedIn", "Instagram", "Facebook", "YouTube", "X", "Twitter", "WhatsApp"];

const SLOTS: { key: keyof SiteBrand; label: string }[] = [
  { key: "logoLight", label: "Logo (light background)" },
  { key: "logoDark", label: "Logo (dark / footer)" },
  { key: "icon", label: "Icon (mobile header)" },
  { key: "mark", label: "Hero mark" },
  { key: "favicon", label: "Favicon" },
];

export function BrandForm({ initial }: { initial: SiteConfig }) {
  const router = useRouter();
  const [site, setSite] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function setField<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
    setSite((current) => ({ ...current, [key]: value }));
  }

  async function upload(slot: keyof SiteBrand, file: File) {
    const data = new FormData();
    data.set("slot", slot);
    data.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const payload = (await response.json()) as { ok: boolean; brand?: SiteBrand; message?: string };
    if (!response.ok || !payload.ok || !payload.brand) {
      throw new Error(payload.message || "Could not upload the image.");
    }
    setSite((current) => ({ ...current, brand: payload.brand as SiteBrand }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setPending(true);
    try {
      const response = await fetch("/api/admin/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(site),
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.message || "Could not save.");
        return;
      }
      setMessage("Saved. The live site will update shortly.");
      router.refresh();
    } catch {
      setError("Could not save. Try again.");
    } finally {
      setPending(false);
    }
  }

  function updateSocial(index: number, patch: Partial<SiteSocialLink>) {
    setSite((current) => ({
      ...current,
      social: current.social.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section>
        <h2 className="text-h3 text-ink">Logos</h2>
        <p className="mt-1 text-sm text-muted">PNG, JPG, WebP, SVG or ICO, up to 2 MB.</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {SLOTS.map((slot) => (
            <li key={slot.key} className="card p-4">
              <p className="text-sm font-semibold text-ink">{slot.label}</p>
              <div className="mt-3 flex h-20 items-center justify-center rounded-lg border border-line bg-canvas p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.brand[slot.key]} alt="" className="max-h-full max-w-full object-contain" />
              </div>
              <Label htmlFor={`file-${slot.key}`} className="mt-3 block text-xs">
                Replace
              </Label>
              <Input
                id={`file-${slot.key}`}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon"
                className="mt-1 h-auto py-2"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  setError("");
                  try {
                    await upload(slot.key, file);
                    setMessage("Image uploaded.");
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Upload failed.");
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-h3 text-ink">Company</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Company name" value={site.name} onChange={(value) => setField("name", value)} />
          <Field label="Positioning" value={site.positioning} onChange={(value) => setField("positioning", value)} />
          <Field label="Info email" value={site.email} onChange={(value) => setField("email", value)} />
          <Field label="Support email" value={site.supportEmail} onChange={(value) => setField("supportEmail", value)} />
          <Field label="Phone display" value={site.phoneDisplay} onChange={(value) => setField("phoneDisplay", value)} />
          <Field label="Phone link" value={site.phoneHref} onChange={(value) => setField("phoneHref", value)} />
          <Field label="WhatsApp link" value={site.whatsappHref} onChange={(value) => setField("whatsappHref", value)} />
          <Field label="Location" value={site.location} onChange={(value) => setField("location", value)} />
          <Field label="Hours" value={site.hours} onChange={(value) => setField("hours", value)} />
          <Field label="Public site URL" value={site.url} onChange={(value) => setField("url", value)} />
          <Field label="Name meaning" value={site.nameMeaning} onChange={(value) => setField("nameMeaning", value)} />
        </div>
        <div className="mt-3">
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" value={site.tagline} onChange={(event) => setField("tagline", event.target.value)} className="mt-1" />
        </div>
        <div className="mt-3">
          <Label htmlFor="description">Short description</Label>
          <Textarea id="description" value={site.description} onChange={(event) => setField("description", event.target.value)} className="mt-1 min-h-24" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-h3 text-ink">Social links</h2>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setSite((current) => ({ ...current, social: [...current.social, { label: "LinkedIn", href: "" }] }))}
          >
            Add link
          </Button>
        </div>
        <ul className="mt-4 space-y-3">
          {site.social.map((item, index) => (
            <li key={index} className="card grid gap-3 p-4 sm:grid-cols-[8rem_1fr_auto]">
              <div>
                <Label htmlFor={`social-label-${index}`}>Network</Label>
                <select
                  id={`social-label-${index}`}
                  className="field mt-1 h-11 w-full px-3"
                  value={NETWORKS.includes(item.label) ? item.label : "Custom"}
                  onChange={(event) => updateSocial(index, { label: event.target.value === "Custom" ? item.label : event.target.value })}
                >
                  {NETWORKS.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div>
                <Label htmlFor={`social-href-${index}`}>URL</Label>
                <Input
                  id={`social-href-${index}`}
                  value={item.href}
                  onChange={(event) => updateSocial(index, { href: event.target.value })}
                  className="mt-1"
                  placeholder="https://"
                />
              </div>
              <button
                type="button"
                className="self-end pb-2 text-sm text-danger"
                onClick={() => setSite((current) => ({ ...current, social: current.social.filter((_, i) => i !== index) }))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {site.social.length === 0 ? <p className="mt-3 text-sm text-muted">No social links yet.</p> : null}
      </section>

      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      {message ? <p className="text-sm font-medium text-success">{message}</p> : null}
      <Button type="submit" loading={pending}>
        Save brand settings
      </Button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1" />
    </div>
  );
}
