import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SocialGlyph, UiIcon } from "@/components/icons";
import { CookieSettingsButton } from "@/components/consent/cookie-consent";
import { Container } from "@/components/layout/container";
import { getCms } from "@/lib/cms";
import { copyrightYear } from "@/content/site";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-glow">{title}</p>
      <ul className="mt-2 space-y-0.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="footer-link text-sm">
        {children}
      </Link>
    </li>
  );
}

export async function Footer() {
  const { site, chrome, navigation, services, industries } = await getCms();
  const year = copyrightYear();
  const footerServices = navigation.footerServiceSlugs.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug && item.showInFooter);
    return service ? [service] : [];
  });
  const footerIndustries = industries.filter((industry) => industry.showInFooter);

  return (
    <footer className="site-footer band-dark relative text-white">
      <Container className="relative z-[1] py-8 lg:py-10">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo name={site.name} brand={site.brand} variant="inverse" />
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-glow">{site.positioning}</p>
            <p className="mt-2 text-sm leading-snug text-mist">{site.tagline}</p>
          </div>
          <p className="flex flex-col gap-1.5 text-sm lg:items-end">
            <a href={site.phoneHref} className="footer-link inline-flex w-fit items-center gap-2">
              <UiIcon name="phone" className="size-3.5" />
              {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="footer-link inline-flex w-fit items-center gap-2 break-all">
              <UiIcon name="mail" className="size-3.5" />
              {site.email}
            </a>
            <a href={`mailto:${site.supportEmail}`} className="footer-link inline-flex w-fit items-center gap-2 break-all">
              <UiIcon name="mail" className="size-3.5" />
              {site.supportEmail}
            </a>
            <span className="inline-flex items-center gap-2 text-mist">
              <UiIcon name="pin" className="size-3.5" />
              {site.location}
            </span>
            {site.hours ? (
              <span className="inline-flex items-center gap-2 text-mist">
                <UiIcon name="clock" className="size-3.5" />
                {site.hours}
              </span>
            ) : null}
          </p>
        </div>

        <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-5">
          <FooterColumn title={chrome.footer.solutionsTitle}>
            <FooterLink href={navigation.hubs.solutions.href}>{navigation.hubs.solutions.label}</FooterLink>
            {footerServices.map((service) => (
              <FooterLink key={service.slug} href={`/solutions/${service.slug}`}>
                {service.footerLabel ?? service.title}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title={chrome.footer.industriesTitle}>
            <FooterLink href={navigation.hubs.industries.href}>{navigation.hubs.industries.label}</FooterLink>
            {footerIndustries.map((industry) => (
              <FooterLink key={industry.slug} href={`/industries/${industry.slug}`}>
                {industry.footerLabel ?? industry.title}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title={chrome.footer.companyTitle}>
            {navigation.company.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title={chrome.footer.resourcesTitle}>
            {navigation.resources.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-glow">{chrome.footer.legalTitle}</p>
            <ul className="mt-2 space-y-0.5">
              {navigation.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {site.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    <SocialGlyph label={item.label} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-mist">
          © {year} {site.name}
        </p>
      </Container>
    </footer>
  );
}
