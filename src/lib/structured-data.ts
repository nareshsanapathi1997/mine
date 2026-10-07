import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    areaServed: "IN",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: new URL(input.path, siteConfig.url).toString(),
  };
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: new URL(item.path, siteConfig.url).toString() } : {}),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}) {
  const author =
    input.author === siteConfig.name
      ? { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }
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
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: new URL("/kyntriq-solutions-logo.jpg", siteConfig.url).toString(),
      },
    },
    mainEntityOfPage: new URL(input.path, siteConfig.url).toString(),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.phoneDisplay ? { telephone: siteConfig.phoneDisplay } : {}),
    ...(siteConfig.location ? { address: siteConfig.location } : {}),
    logo: new URL("/kyntriq-solutions-logo.jpg", siteConfig.url).toString(),
    description: siteConfig.description,
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} services`,
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
          name: siteConfig.name,
          url: siteConfig.url,
        },
        url: new URL(`/solutions/${service.slug}`, siteConfig.url).toString(),
      },
    })),
  };
}
