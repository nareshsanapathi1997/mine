import { siteConfig } from "@/content/site";

export function ContactDetails() {
  return (
    <dl className="mt-6 border-t border-line">
      <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 border-b border-line py-3">
        <dt className="text-small text-muted">Phone</dt>
        <dd className="text-small font-medium text-ink">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4"
          >
            {siteConfig.phoneDisplay}
          </a>
        </dd>
      </div>
      <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 py-3">
        <dt className="text-small text-muted">Email</dt>
        <dd className="text-small font-medium text-ink">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4"
          >
            {siteConfig.email}
          </a>
        </dd>
      </div>
    </dl>
  );
}
