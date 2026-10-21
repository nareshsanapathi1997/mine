"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContentTree } from "@/components/admin/content-tree";
import { sectionMeta, type ContentKey } from "@/lib/admin/content-meta";

export function ContentEditor({ cmsKey, initial }: { cmsKey: ContentKey; initial: unknown }) {
  const router = useRouter();
  const meta = sectionMeta(cmsKey);
  const [value, setValue] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function save() {
    setError("");
    setMessage("");
    setPending(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: cmsKey, payload: value }),
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

  return (
    <div className="mx-auto max-w-5xl pb-24">
      <Link href="/admin/content" className="text-sm text-accent-ink">
        All pages
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Content</p>
          <h1 className="text-h2 mt-2 text-ink">{meta?.title ?? cmsKey}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">{meta?.body}</p>
        </div>
        {meta?.preview ? (
          <a href={meta.preview} target="_blank" rel="noreferrer" className="text-sm text-accent-ink">
            View live page
          </a>
        ) : null}
      </div>
      <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
        Upload a photo in any image box, then edit the words next to it. Use Add to create a new block, card or page.
      </p>
      <div className="mt-6">
        <ContentTree cmsKey={cmsKey} value={value} onChange={setValue} />
      </div>
      <div className="sticky bottom-4 z-10 mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur">
        {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
        {message ? <p className="text-sm font-medium text-success">{message}</p> : null}
        <Button type="button" loading={pending} onClick={() => void save()} className="ml-auto">
          Save this page
        </Button>
      </div>
    </div>
  );
}
