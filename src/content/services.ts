import { getDetail } from "@/content/details";
import type { IconName } from "@/content/types";

export type Service = {
  slug: string;
  title: string;
  footerLabel?: string;
  showInFooter?: boolean;
  description: string;
  details: string;
  icon: IconName;
};

const rawServices: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    footerLabel: "Web Development",
    showInFooter: true,
    description:
      "Corporate websites, education portals, business portals and custom web applications.",
    details:
      "A website that can take an enquiry, show the right information and hand the next step to your team or an AI agent.",
    icon: "globe",
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    footerLabel: "Mobile Apps",
    showInFooter: true,
    description:
      "Android and iOS applications for customers, employees, students and businesses.",
    details:
      "Apps for the people who do the work and the people you serve — attendance, bookings, orders, approvals and updates.",
    icon: "smartphone",
  },
  {
    slug: "business-software",
    title: "Business Software",
    showInFooter: true,
    description:
      "Custom CRM, ERP, dashboards, portals and internal business systems.",
    details:
      "Software shaped around your process: pipelines, records, roles and the reports managers actually open.",
    icon: "blocks",
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    showInFooter: true,
    description:
      "Website AI agents, customer support agents, sales agents, knowledge assistants and business AI agents.",
    details:
      "Agents that can look up your information, decide on a next step and call a business system — not only reply in a chat window.",
    icon: "bot",
  },
  {
    slug: "voice-ai",
    title: "Voice AI",
    showInFooter: true,
    description:
      "AI-powered voice assistants for customer support, admissions, bookings and business operations.",
    details:
      "Callers can check a status, book, or raise a request. The outcome is written back into your systems.",
    icon: "audio",
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    showInFooter: true,
    description:
      "Automated conversations, lead capture, notifications, reminders and customer support.",
    details:
      "WhatsApp becomes a working channel: capture the request, answer from your information, and notify the owner of the next step.",
    icon: "message",
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    footerLabel: "Automation",
    showInFooter: true,
    description:
      "Automate repetitive business processes using workflows, APIs and AI.",
    details:
      "The handoffs your team repeats — enquiry to CRM, booking to confirmation, order to invoice — run as a workflow.",
    icon: "workflow",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    footerLabel: "Cloud & DevOps",
    showInFooter: true,
    description:
      "Cloud deployment, CI/CD, monitoring, backups, security and infrastructure management.",
    details:
      "A calm path from release to production: deployment, monitoring, backups and access treated as part of the product.",
    icon: "cloud",
  },
];

/** Names and summaries come from the detail pages so menus match page content. */
export const services: Service[] = rawServices.map((service) => {
  const page = getDetail("solution", service.slug);
  return page ? { ...service, title: page.name, footerLabel: undefined, details: page.intro } : service;
});

const footerOrder = [
  "ai-agents",
  "voice-ai",
  "whatsapp-automation",
  "business-automation",
  "web-development",
  "mobile-applications",
  "business-software",
  "cloud-devops",
];

export const footerServices = footerOrder.flatMap((slug) => {
  const service = services.find((item) => item.slug === slug && item.showInFooter);
  return service ? [service] : [];
});

export const solutionGroups = [
  {
    id: "ai",
    title: "AI and automation",
    description: "Assistants that answer customers, and messages and tasks that run on their own.",
    slugs: ["ai-agents", "voice-ai", "whatsapp-automation", "business-automation"],
  },
  {
    id: "software",
    title: "Websites, apps and software",
    description: "Websites, mobile apps and business software built around how your team works.",
    slugs: ["web-development", "mobile-applications", "business-software"],
  },
  {
    id: "infrastructure",
    title: "Hosting and support",
    description: "Keeping your website and software online, backed up and looked after.",
    slugs: ["cloud-devops"],
  },
] as const;

export function servicesInGroup(slugs: readonly string[]) {
  return slugs.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service ? [service] : [];
  });
}
