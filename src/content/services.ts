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

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
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
    description:
      "AI-powered voice assistants for customer support, admissions, bookings and business operations.",
    details:
      "Callers can check a status, book, or raise a request. The outcome is written back into your systems.",
    icon: "audio",
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
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
    showInFooter: true,
    description:
      "Cloud deployment, CI/CD, monitoring, backups, security and infrastructure management.",
    details:
      "A calm path from release to production: deployment, monitoring, backups and access treated as part of the product.",
    icon: "cloud",
  },
];

export const footerServices = services.filter((service) => service.showInFooter);
