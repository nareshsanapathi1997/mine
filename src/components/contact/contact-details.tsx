import { siteConfig } from "@/content/site";

const items = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "Phone",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    label: "Location",
    value: siteConfig.location,
  },
  {
    label: "Hours",
    value: siteConfig.hours,
  },
];

export function ContactDetails() {
  return (
    <dl className="mt-3 divide-y divide-line border-y border-line">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 py-3">
          <dt className="text-small text-muted">{item.label}</dt>
          <dd className="text-small font-medium text-ink">
            {item.href ? (
              <a href={item.href} className="inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                {item.value}
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center">{item.value}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
