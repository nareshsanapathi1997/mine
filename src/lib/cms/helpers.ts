import type { DetailPage } from "@/content/details";
import type { Service } from "@/content/services";
import type { SolutionGroup } from "@/lib/cms/types";

export function servicesInGroup(services: Service[], group: SolutionGroup) {
  return group.slugs.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service ? [service] : [];
  });
}

export function relatedDetailLinks(details: DetailPage[], slugs: string[]) {
  return slugs.flatMap((slug) => {
    const page = details.find((item) => item.kind === "solution" && item.slug === slug);
    return page
      ? [{ href: `/solutions/${slug}`, title: page.name, description: page.intro, icon: page.icon }]
      : [];
  });
}
