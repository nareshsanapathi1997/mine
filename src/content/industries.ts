import type { IconName } from "@/content/types";

export type Industry = {
  slug: string;
  title: string;
  footerLabel?: string;
  showInFooter?: boolean;
  audience: string;
  summary: string;
  solutions: string[];
  icon: IconName;
};

export const industries: Industry[] = [
  {
    slug: "education",
    title: "Education",
    showInFooter: true,
    audience: "Schools, Colleges, Coaching Institutes",
    summary:
      "Admissions, students, fees and parent communication in one institution platform.",
    solutions: [
      "Admissions",
      "Student Management",
      "Attendance",
      "Fees",
      "Exams",
      "AI Student Assistant",
      "AI Admission Agent",
    ],
    icon: "graduation",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    showInFooter: true,
    audience: "Hotels, Resorts, Hospitality Businesses",
    summary:
      "Enquiries, bookings and guest communication without a manual relay between tools.",
    solutions: [
      "Bookings",
      "Guest Management",
      "CRM",
      "WhatsApp",
      "AI Booking Agent",
      "Operations",
    ],
    icon: "hotel",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    showInFooter: true,
    audience: "Manufacturing Companies, Factories, Industrial Businesses",
    summary:
      "Inventory, production and orders visible in one operational picture.",
    solutions: [
      "Inventory",
      "Production",
      "Orders",
      "Employees",
      "Reports",
      "Automation",
    ],
    icon: "factory",
  },
  {
    slug: "corporate-smes",
    title: "Corporate & SMEs",
    footerLabel: "SMEs",
    showInFooter: true,
    audience: "Growing companies and multi-team organizations",
    summary:
      "Sales, people, finance and operations connected instead of scattered across files.",
    solutions: [
      "CRM",
      "HR",
      "Sales",
      "Operations",
      "Finance",
      "Automation",
      "Dashboards",
    ],
    icon: "building",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    showInFooter: true,
    audience: "Hospitals, Clinics, Healthcare Organizations",
    summary:
      "Appointments, patient communication and follow-up that do not depend on a front desk inbox.",
    solutions: [
      "Appointments",
      "Patient communication",
      "CRM",
      "Notifications",
      "AI assistants",
    ],
    icon: "heart",
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    showInFooter: true,
    audience: "Consultancies, Agencies, Service businesses",
    summary:
      "Leads, client work and reporting in a system your team can actually run.",
    solutions: [
      "Lead management",
      "Customer portals",
      "Automation",
      "Reports",
      "AI assistants",
    ],
    icon: "briefcase",
  },
];

export const footerIndustries = industries.filter((industry) => industry.showInFooter);
