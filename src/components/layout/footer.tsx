import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { CookieSettingsButton } from "@/components/consent/cookie-consent";
import { Container } from "@/components/layout/container";
import { footerIndustries } from "@/content/industries";
import { companyLinks, legalLinks, resourceLinks } from "@/content/navigation";
import { footerServices } from "@/content/services";
import { copyrightYear, siteConfig } from "@/content/site";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-glow">{title}</p>
      <ul className="mt-4 space-y-2">{children}</ul>
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

export function Footer() {
  const year = copyrightYear();

  return (
    <footer className="band-dark relative text-white">
      <Container className="relative z-[1] py-16 lg:py-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo variant="inverse" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-glow">{siteConfig.positioning}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">{siteConfig.tagline}</p>
          </div>
          <p className="flex flex-col gap-1 text-sm lg:items-end">
            <a href={siteConfig.phoneHref} className="footer-link w-fit">
              {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="footer-link w-fit break-all">
              {siteConfig.email}
            </a>
            <span className="text-mist">{siteConfig.location}</span>
          </p>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-5">
          <FooterColumn title="Solutions">
            {footerServices.map((service) => (
              <FooterLink key={service.slug} href={`/solutions/${service.slug}`}>
                {service.footerLabel ?? service.title}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Industries">
            {footerIndustries.map((industry) => (
              <FooterLink key={industry.slug} href={`/industries/${industry.slug}`}>
                {industry.footerLabel ?? industry.title}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Company">
            {companyLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Resources">
            {resourceLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-glow">Legal</p>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((item) => (
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
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-sm text-mist">
          © {year} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
