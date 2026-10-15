export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "Examples", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export const companyLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Examples", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export const resourceLinks: NavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "Safety and quality", href: "/insights" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];
