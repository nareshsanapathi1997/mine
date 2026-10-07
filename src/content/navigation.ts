export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export const companyLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export const resourceLinks: NavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "Technology Insights", href: "/insights" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];
