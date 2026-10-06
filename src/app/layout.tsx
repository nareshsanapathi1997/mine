import type { Metadata, Viewport } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { ConsentProvider } from "@/components/consent/cookie-consent";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { MotionStage } from "@/components/motion/stage";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/content/site";
import { organizationJsonLd } from "@/lib/structured-data";
import { themeBootScript } from "@/lib/theme";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = `${siteConfig.name} — Digital systems that operate, automate and grow`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <head>
        <script id="theme-boot" dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <noscript>
          <style>
            {`[data-reveal],[data-reveal-stagger] [data-reveal-child]{opacity:1!important;filter:none!important;transform:none!important}`}
          </style>
        </noscript>
        <RevealObserver />
        <MotionStage />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ConsentProvider>
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </ConsentProvider>
      </body>
    </html>
  );
}
