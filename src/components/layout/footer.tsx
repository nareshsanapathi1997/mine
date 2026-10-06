import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { CookieSettingsButton } from "@/components/consent/cookie-consent";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { footerIndustries } from "@/content/industries";
import {
  companyLinks,
  legalLinks,
  resourceLinks,
} from "@/content/navigation";
import { footerServices } from "@/content/services";
import { copyrightYear, siteConfig } from "@/content/site";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-glow">
        {title}
      </p>
      <ul className="cluster space-y-1">{children}</ul>
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
    <footer className="band-dark relative overflow-hidden text-white">
      <div className="band-grid" aria-hidden="true" />
      <Container className="section relative z-[1]">
        <div className="grid-12">
          <div className="col-span-12 max-w-md lg:col-span-4">
            <Logo variant="inverse" />
            <p className="cluster text-sm leading-relaxed text-mist">{siteConfig.tagline}</p>
            <p className="text-h3 cluster text-white">
              Tell us which operation you want to change.
            </p>
            <Button asChild variant="quiet" arrow className="cluster">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-8 lg:grid-cols-4">
            <FooterColumn title="Company">
              {companyLinks.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title="Services">
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
            <FooterColumn title="Resources">
              {resourceLinks.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
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
