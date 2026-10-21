"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PhotoValue = { src: string; alt: string; width?: number; height?: number };

export function ImageField({
  label,
  value,
  onChange,
  alt,
}: {
  label: string;
  value: string | PhotoValue;
  onChange: (next: string | PhotoValue) => void;
  alt?: boolean;
}) {
  const id = useId();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const photo = typeof value === "string" ? { src: value, alt: "" } : value;

  async function upload(file: File) {
    setError("");
    setBusy(true);
    try {
      const size = await readSize(file);
      const data = new FormData();
      data.set("kind", "content");
      data.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: data });
      const payload = (await response.json()) as { ok: boolean; url?: string; message?: string };
      if (!response.ok || !payload.ok || !payload.url) {
        throw new Error(payload.message || "Could not upload the image.");
      }
      if (typeof value === "string") {
        onChange(payload.url);
      } else {
        onChange({
          ...photo,
          src: payload.url,
          width: size?.width ?? photo.width,
          height: size?.height ?? photo.height,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card space-y-3 p-4">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="flex h-36 items-center justify-center overflow-hidden rounded-lg border border-line bg-canvas">
        {photo.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt="" className="h-full w-full object-cover" />
        ) : (
          <p className="text-sm text-muted">No image yet</p>
        )}
      </div>
      <div>
        <Label htmlFor={`${id}-file`}>Upload image</Label>
        <Input
          id={`${id}-file`}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="mt-1 h-auto py-2"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <p className="mt-1 text-xs text-muted">PNG, JPG or WebP, up to 5 MB.</p>
      </div>
      {alt ? (
        <div>
          <Label htmlFor={`${id}-alt`}>Image description</Label>
          <Input
            id={`${id}-alt`}
            value={photo.alt}
            onChange={(event) => onChange({ ...photo, alt: event.target.value })}
            className="mt-1"
            placeholder="What the photo shows"
          />
        </div>
      ) : null}
      <div>
        <Label htmlFor={`${id}-src`}>Or paste an image path</Label>
        <Input
          id={`${id}-src`}
          value={photo.src}
          onChange={(event) => {
            const src = event.target.value;
            onChange(typeof value === "string" ? src : { ...photo, src });
          }}
          className="mt-1"
          placeholder="/uploads/content/…"
        />
      </div>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
    </div>
  );
}

function readSize(file: File) {
  return new Promise<{ width: number; height: number } | null>((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    image.src = url;
  });
}
