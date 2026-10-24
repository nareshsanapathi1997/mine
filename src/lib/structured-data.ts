import type { Service } from "@/content/services";
import { siteGeo } from "@/content/seo";
import type { SiteConfig } from "@/content/site";

function postalAddress() {
  return {
    "@type": "PostalAddress",
    addressLocality: siteGeo.city,
    addressRegion: siteGeo.region,
    addressCountry: siteGeo.countryCode,
  };
}

function geoCoordinates() {
  return {
    "@type": "GeoCoordinates",
    latitude: siteGeo.latitude,
    longitude: siteGeo.longitude,
  };
}

function areaServedPlaces() {
  return siteGeo.areasServed.map((name) => ({
    "@type": "Place",
    name,
  }));
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serviceJsonLd(
  site: SiteConfig,
  input: { name: string; description: string; path: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    areaServed: areaServedPlaces(),
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      address: postalAddress(),
    },
    url: new URL(input.path, site.url).toString(),
  };
}

export function breadcrumbJsonLd(site: SiteConfig, items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: new URL(item.path, site.url).toString() } : {}),
    })),
  };
}

export function articleJsonLd(
  site: SiteConfig,
  input: {
    title: string;
    description: string;
    path: string;
    datePublished: string;
    author: string;
  },
) {
  const author =
    input.author === site.name
      ? { "@type": "Organization", name: site.name, url: site.url }
      : { "@type": "Person", name: input.author };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    author,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: new URL("/varasena-brand-pack/varasena-logo-dark.png", site.url).toString(),
      },
    },
    mainEntityOfPage: new URL(input.path, site.url).toString(),
  };
}

export function websiteJsonLd(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

function founderEntities(founders: { name: string; role: string }[]) {
  return founders
    .filter((person) => person.name.trim())
    .map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    }));
}

export function organizationJsonLd(site: SiteConfig, founders: { name: string; role: string }[] = []) {
  const people = founderEntities(founders);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    ...(site.phoneHref ? { telephone: site.phoneHref.replace(/^tel:/, "") } : {}),
    address: postalAddress(),
    areaServed: areaServedPlaces(),
    sameAs: sameAsLinks(site),
    ...(people.length ? { founder: people } : {}),
    logo: new URL("/varasena-brand-pack/varasena-logo-dark.png", site.url).toString(),
    description: site.description,
    knowsLanguage: ["en", "en-IN"],
  };
}

function sameAsLinks(site: SiteConfig) {
  return site.social.map((item) => item.href).filter((href) => Boolean(href?.trim()));
}

/** Local / GEO schema for Visakhapatnam-based software services. */
export function localBusinessJsonLd(site: SiteConfig, founders: { name: string; role: string }[] = []) {
  const people = founderEntities(founders);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: new URL("/varasena-brand-pack/varasena-logo-dark.png", site.url).toString(),
    logo: new URL("/varasena-brand-pack/varasena-logo-dark.png", site.url).toString(),
    description: site.description,
    email: site.email,
    ...(site.phoneHref ? { telephone: site.phoneHref.replace(/^tel:/, "") } : {}),
    address: postalAddress(),
    geo: geoCoordinates(),
    areaServed: areaServedPlaces(),
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:30",
    },
    sameAs: sameAsLinks(site),
    ...(people.length ? { founder: people } : {}),
    knowsLanguage: ["en", "en-IN"],
    knowsAbout: [
      "Software company Visakhapatnam",
      "Software company Vizag",
      "Website development Visakhapatnam",
      "Website development Vizag",
      "Mobile app development Vizag",
      "Custom software Visakhapatnam",
      "School management software",
      "School ERP Vizag",
      "Hotel booking software Vizag",
      "Clinic appointment software",
      "Factory order tracking",
      "WhatsApp automation Vizag",
      "AI chatbot for business",
      "AI assistants",
      "GST invoice software",
    ],
    serviceType: [
      "Website development",
      "Mobile app development",
      "Custom business software",
      "WhatsApp automation",
      "AI assistants",
      "Cloud hosting",
    ],
  };
}

export function servicesJsonLd(site: SiteConfig, services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} services`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        serviceType: service.title,
        areaServed: areaServedPlaces(),
        provider: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          address: postalAddress(),
        },
        url: new URL(`/solutions/${service.slug}`, site.url).toString(),
      },
    })),
  };
}
