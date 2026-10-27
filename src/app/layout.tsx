import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteProvider } from "@/components/cms/site-provider";
import { ConsentProvider } from "@/components/consent/cookie-consent";
import { Footer } from "@/components/layout/footer";
import { FloatingDock } from "@/components/layout/floating-dock";
import { Navbar } from "@/components/layout/navbar";
import { PublicChrome } from "@/components/layout/public-chrome";
import { Splash } from "@/components/layout/splash";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { MotionStage } from "@/components/motion/stage";
import { JsonLd } from "@/components/seo/json-ld";
import { geoMetaTags, homeSearch, keywordsForPath } from "@/content/seo";
import { publishedProjects, withProjectsLink } from "@/content/projects";
import { getCms } from "@/lib/cms";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { themeBootScript } from "@/lib/theme";
import "./globals.css";
// The site palette: must stay after globals.css (its rules win by order).
import "./palette.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Admin saves call revalidatePath, so edits show at once. This is only a safety net.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getCms();
  const title = homeSearch.title;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    keywords: keywordsForPath("/"),
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title,
      description: homeSearch.description,
      url: site.url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: homeSearch.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "jDh6G9aBy1Ya1ggGPkNiKBW8toKFcH-0K60wYyUFt9I",
    },
    icons: {
      icon: [{ url: site.brand?.favicon || "/icon.png" }],
      apple: [{ url: site.brand?.icon || "/apple-icon.png" }],
    },
    formatDetection: {
      telephone: false,
    },
    other: {
      ...geoMetaTags(),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbfcfe",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cms = await getCms();
  const { site, chrome } = cms;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script id="theme-boot" dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <PublicChrome>
          <Splash />
        </PublicChrome>
        <JsonLd data={organizationJsonLd(site, cms.about.team.people)} />
        <JsonLd data={localBusinessJsonLd(site, cms.about.team.people)} />
        <JsonLd data={websiteJsonLd(site)} />
        <noscript>
          <style>
            {`[data-reveal],[data-reveal-stagger] [data-reveal-child]{opacity:1!important;filter:none!important;transform:none!important}`}
          </style>
        </noscript>
        <RevealObserver />
        <MotionStage />
        <PublicChrome>
          <a href="#main" className="skip-link">
            {chrome.skipLabel}
          </a>
        </PublicChrome>
        <SiteProvider site={site} chrome={chrome}>
          <ConsentProvider>
            <PublicChrome>
              <Navbar
                siteName={site.name}
                brand={site.brand}
                chrome={chrome}
                primaryNav={withProjectsLink(cms.navigation.primary, publishedProjects(cms.projects.items).length > 0, cms.projects.navLabel)}
                solutionGroups={cms.solutionGroups}
                services={cms.services}
                industries={cms.industries}
              />
            </PublicChrome>
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <PublicChrome>
              <FloatingDock />
              <Footer />
            </PublicChrome>
          </ConsentProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
