import type { Service } from "@/content/services";
import type { SiteConfig } from "@/content/site";

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
    areaServed: "IN",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
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
  };
}

export function organizationJsonLd(site: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    ...(site.phoneHref ? { telephone: site.phoneHref.replace(/^tel:/, "") } : {}),
    ...(site.location ? { address: site.location } : {}),
    sameAs: site.social.map((item) => item.href),
    logo: new URL("/varasena-brand-pack/varasena-logo-dark.png", site.url).toString(),
    description: site.description,
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
        areaServed: "IN",
        provider: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        url: new URL(`/solutions/${service.slug}`, site.url).toString(),
      },
    })),
  };
}
