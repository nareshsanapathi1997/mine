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
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-glow">{title}</p>
      <ul className="mt-3 space-y-1">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="footer-link">
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = copyrightYear();

  return (
    <footer className="band-dark relative text-white">
      <Container className="section relative z-[1]">
        <div className="grid-12">
          <div className="col-span-12 max-w-sm lg:col-span-4">
            <Logo variant="inverse" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent-glow">
              {siteConfig.positioning}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist">{siteConfig.tagline}</p>
            <p className="mt-4 flex flex-col gap-1 text-sm">
              <a href={siteConfig.phoneHref} className="footer-link w-fit">
                {siteConfig.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="footer-link w-fit break-all">
                {siteConfig.email}
              </a>
              <span className="text-mist">{siteConfig.location}</span>
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <FooterColumn title="Solutions">
              {footerServices.map((service) => (
                <FooterLink key={service.slug} href={`/solutions/${service.slug}`}>
                  {service.footerLabel ?? service.title}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <FooterColumn title="Industries">
              {footerIndustries.map((industry) => (
                <FooterLink key={industry.slug} href={`/industries/${industry.slug}`}>
                  {industry.footerLabel ?? industry.title}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <FooterColumn title="Company">
              {companyLinks.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <FooterColumn title="Resources">
              {resourceLinks.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label === "Privacy Policy"
                    ? "Privacy"
                    : item.label === "Terms & Conditions"
                      ? "Terms"
                      : item.label === "Cookie Policy"
                        ? "Cookies"
                        : item.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
