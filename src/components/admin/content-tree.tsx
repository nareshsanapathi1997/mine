"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageField } from "@/components/admin/image-field";
import {
  ICON_OPTIONS,
  emptyFrom,
  humanize,
  isImagePathKey,
  isLongText,
  isObject,
  isPhoto,
  itemTitle,
  looksLikeImagePath,
  newItem,
  type ContentKey,
} from "@/lib/admin/content-meta";

export function ContentTree({
  cmsKey,
  value,
  onChange,
}: {
  cmsKey: ContentKey;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  if (Array.isArray(value)) {
    return <ArrayNode cmsKey={cmsKey} path={[]} value={value} onChange={onChange} />;
  }
  if (isObject(value)) {
    return (
      <div className="space-y-4">
        {Object.entries(value).map(([key, child], index) => (
          <details key={key} className="card overflow-hidden" open={index === 0}>
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {humanize(key)}
            </summary>
            <div className="border-t border-line px-5 py-4">
              <Node cmsKey={cmsKey} path={[key]} field={key} value={child} onChange={(next) => onChange({ ...value, [key]: next })} />
            </div>
          </details>
        ))}
      </div>
    );
  }
  return <Node cmsKey={cmsKey} path={[]} field="content" value={value} onChange={onChange} />;
}

function Node({
  cmsKey,
  path,
  field,
  value,
  onChange,
}: {
  cmsKey: ContentKey;
  path: string[];
  field: string;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  if (isPhoto(value)) {
    return <ImageField label={humanize(field)} value={value} alt onChange={(next) => onChange(next)} />;
  }
  if (typeof value === "string" && (field === "markSrc" || (isImagePathKey(field) && looksLikeImagePath(value)))) {
    return <ImageField label={humanize(field)} value={value} onChange={(next) => onChange(typeof next === "string" ? next : next.src)} />;
  }
  if (Array.isArray(value)) {
    return <ArrayNode cmsKey={cmsKey} path={path} value={value} onChange={onChange} />;
  }
  if (isObject(value)) {
    return (
      <div className="grid gap-4">
        {Object.entries(value).map(([key, child]) => (
          <div key={key}>
            {Array.isArray(child) || (isObject(child) && !isPhoto(child)) ? (
              <p className="mb-2 text-sm font-semibold text-ink">{humanize(key)}</p>
            ) : null}
            {isPhoto(child) || Array.isArray(child) || isObject(child) ? (
              <Node cmsKey={cmsKey} path={[...path, key]} field={key} value={child} onChange={(next) => onChange({ ...value, [key]: next })} />
            ) : (
              <Primitive field={key} value={child} onChange={(next) => onChange({ ...value, [key]: next })} />
            )}
          </div>
        ))}
      </div>
    );
  }
  return <Primitive field={field} value={value} onChange={onChange} />;
}

function ArrayNode({
  cmsKey,
  path,
  value,
  onChange,
}: {
  cmsKey: ContentKey;
  path: string[];
  value: unknown[];
  onChange: (next: unknown[]) => void;
}) {
  const [open, setOpen] = useState(0);
  const objects = value.some((item) => isObject(item) && !isPhoto(item));
  const picker = objects && value.length > 5;

  function add() {
    const item = newItem(cmsKey, path, value);
    onChange([...value, item]);
    setOpen(value.length);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">{value.length} {value.length === 1 ? "item" : "items"}</p>
        <Button type="button" variant="secondary" size="sm" onClick={add}>
          Add
        </Button>
      </div>
      {value.length === 0 ? <p className="text-sm text-muted">Nothing here yet. Add the first item.</p> : null}
      {picker ? (
        <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
          <ul className="space-y-1">
            {value.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${open === index ? "bg-canvas font-semibold text-ink" : "text-muted hover:bg-canvas hover:text-ink"}`}
                  onClick={() => setOpen(index)}
                >
                  {itemTitle(item, index)}
                </button>
              </li>
            ))}
          </ul>
          {value[open] !== undefined ? (
            <ArrayCard
              cmsKey={cmsKey}
              path={[...path, String(open)]}
              index={open}
              item={value[open]}
              total={value.length}
              onChange={(next) => onChange(value.map((item, i) => (i === open ? next : item)))}
              onRemove={() => {
                onChange(value.filter((_, i) => i !== open));
                setOpen(Math.max(0, open - 1));
              }}
              onMove={(dir) => onChange(move(value, open, dir))}
              onDuplicate={() => {
                onChange([...value.slice(0, open + 1), structuredCloneSafe(value[open]), ...value.slice(open + 1)]);
                setOpen(open + 1);
              }}
            />
          ) : null}
        </div>
      ) : (
        <ul className="space-y-3">
          {value.map((item, index) => (
            <li key={index}>
              <ArrayCard
                cmsKey={cmsKey}
                path={[...path, String(index)]}
                index={index}
                item={item}
                total={value.length}
                onChange={(next) => onChange(value.map((row, i) => (i === index ? next : row)))}
                onRemove={() => onChange(value.filter((_, i) => i !== index))}
                onMove={(dir) => onChange(move(value, index, dir))}
                onDuplicate={() => onChange([...value.slice(0, index + 1), structuredCloneSafe(item), ...value.slice(index + 1)])}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ArrayCard({
  cmsKey,
  path,
  index,
  item,
  total,
  onChange,
  onRemove,
  onMove,
  onDuplicate,
}: {
  cmsKey: ContentKey;
  path: string[];
  index: number;
  item: unknown;
  total: number;
  onChange: (next: unknown) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  onDuplicate: () => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{itemTitle(item, index)}</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="text-xs text-muted" onClick={() => onMove(-1)} disabled={index === 0}>
            Up
          </button>
          <button type="button" className="text-xs text-muted" onClick={() => onMove(1)} disabled={index === total - 1}>
            Down
          </button>
          {isObject(item) ? (
            <button type="button" className="text-xs text-muted" onClick={onDuplicate}>
              Duplicate
            </button>
          ) : null}
          <button type="button" className="text-xs text-danger" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
      {typeof item === "string" ? (
        isLongText("item", item) ? (
          <Textarea value={item} onChange={(event) => onChange(event.target.value)} />
        ) : (
          <Input value={item} onChange={(event) => onChange(event.target.value)} />
        )
      ) : (
        <Node cmsKey={cmsKey} path={path} field={itemTitle(item, index)} value={item} onChange={onChange} />
      )}
    </div>
  );
}

function Primitive({ field, value, onChange }: { field: string; value: unknown; onChange: (next: unknown) => void }) {
  const id = `f-${field}`;
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />
        {humanize(field)}
      </label>
    );
  }
  if (typeof value === "number") {
    return (
      <div>
        <Label htmlFor={id}>{humanize(field)}</Label>
        <Input id={id} type="number" value={Number.isFinite(value) ? value : 0} onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))} className="mt-1" />
      </div>
    );
  }
  if (typeof value !== "string") return null;
  if (field === "icon") {
    const options = ICON_OPTIONS.includes(value as (typeof ICON_OPTIONS)[number]) ? ICON_OPTIONS : [value, ...ICON_OPTIONS];
    return (
      <div>
        <Label htmlFor={id}>{humanize(field)}</Label>
        <select id={id} className="field mt-1 h-11 w-full px-3" value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (field === "kind") {
    return (
      <div>
        <Label htmlFor={id}>{humanize(field)}</Label>
        <select id={id} className="field mt-1 h-11 w-full px-3" value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="solution">Solution page</option>
          <option value="industry">Industry page</option>
        </select>
      </div>
    );
  }
  if (isLongText(field, value)) {
    return (
      <div>
        <Label htmlFor={id}>{humanize(field)}</Label>
        <Textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1" />
      </div>
    );
  }
  return (
    <div>
      <Label htmlFor={id}>{humanize(field)}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1" />
    </div>
  );
}

function move<T>(list: T[], index: number, dir: -1 | 1) {
  const next = index + dir;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
}

function structuredCloneSafe(value: unknown) {
  try {
    return structuredClone(value);
  } catch {
    return emptyFrom(value);
  }
}
