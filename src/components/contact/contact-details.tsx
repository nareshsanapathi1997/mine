import type { SiteConfig } from "@/content/site";

export function ContactDetails({ site }: { site: SiteConfig }) {
  return (
    <dl className="mt-6 border-t border-line">
      <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 border-b border-line py-3">
        <dt className="text-small text-muted">Phone</dt>
        <dd className="min-w-0 text-small font-medium text-ink">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 min-w-0 items-center break-all text-ink underline decoration-line underline-offset-4"
          >
            {site.phoneDisplay}
          </a>
        </dd>
      </div>
      <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 border-b border-line py-3">
        <dt className="text-small text-muted">Location</dt>
        <dd className="text-small font-medium text-ink">{site.location}</dd>
      </div>
      <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 border-b border-line py-3">
        <dt className="text-small text-muted">Info</dt>
        <dd className="min-w-0 text-small font-medium text-ink">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 min-w-0 items-center break-all text-ink underline decoration-line underline-offset-4"
          >
            {site.email}
          </a>
        </dd>
      </div>
      <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 py-3">
        <dt className="text-small text-muted">Support</dt>
        <dd className="min-w-0 text-small font-medium text-ink">
          <a
            href={`mailto:${site.supportEmail}`}
            className="inline-flex min-h-11 min-w-0 items-center break-all text-ink underline decoration-line underline-offset-4"
          >
            {site.supportEmail}
          </a>
        </dd>
      </div>
    </dl>
  );
}
