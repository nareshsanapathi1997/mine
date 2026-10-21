import type { UiIconName } from "@/components/icons";
import type { CaseStudy } from "@/content/case-studies";
import type { DetailPage } from "@/content/details";
import type {
  HomeIndustry,
  HomeProblem,
  HomeService,
  SampleFlow,
} from "@/content/home-page";
import type { Industry } from "@/content/industries";
import type { LegalSection } from "@/content/legal";
import type { NavItem } from "@/content/navigation";
import type { Service } from "@/content/services";
import type { SiteConfig } from "@/content/site";
import type { Stat } from "@/content/stats";
import type { EnquiryField } from "@/lib/enquiry";

export type SectionHead = {
  eyebrow: string;
  title: string;
  intro: string;
};

export type PhotoRef = { src: string; alt: string; width?: number; height?: number };

export type SolutionGroup = {
  id: string;
  title: string;
  description: string;
  slugs: string[];
};

export type ChromeContent = {
  skipLabel: string;
  header: {
    solutionsLabel: string;
    industriesLabel: string;
    ctaLabel: string;
    ctaHref: string;
    contactLabel: string;
    megaUnsureTitle: string;
    megaUnsureBody: string;
    allSolutionsLabel: string;
    allIndustriesLabel: string;
  };
  footer: {
    solutionsTitle: string;
    industriesTitle: string;
    companyTitle: string;
    resourcesTitle: string;
    legalTitle: string;
  };
  dock: {
    talkLabel: string;
    whatsappLabel: string;
    backToTopLabel: string;
  };
  cta: {
    defaultTitle: string;
    defaultDescription: string;
    primaryLabel: string;
    whatsappLabel: string;
    exploreLabel: string;
  };
  detail: {
    talkLabel: string;
    whatsappLabel: string;
    problems: SectionHead;
    builds: SectionHead;
    sampleEyebrow: string;
    sampleIntro: string;
    faqTitle: string;
    relatedTitle: string;
    fixLabel: string;
  };
};

export type HomeHeroContent = {
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  photo: PhotoRef;
  markSrc: string;
};

export type HomeContent = {
  hero: HomeHeroContent;
  problems: SectionHead & { items: HomeProblem[] };
  services: SectionHead & { items: HomeService[]; toolsTitle: string; tools: string[] };
  industries: SectionHead & { items: HomeIndustry[] };
  sample: SectionHead & { moreHref: string; flows: SampleFlow[] };
  steps: SectionHead & { items: { title: string; body: string }[] };
  why: SectionHead & {
    items: { icon: UiIconName; title: string; body: string }[];
    safetyTitle: string;
    safetyIntro: string;
    safety: { icon: UiIconName; label: string }[];
  };
  faq: { eyebrow: string; title: string; intro: string; items: { q: string; a: string }[] };
  cta: { title: string; description: string; primaryLabel: string };
};

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  header: { eyebrow: string; title: string; description: string; photo: PhotoRef };
  story: { eyebrow: string; title: string; paragraphs: string[]; photo: PhotoRef };
  beliefs: SectionHead & { items: { title: string; body: string }[] };
  team: {
    show: boolean;
    eyebrow: string;
    title: string;
    photo: PhotoRef;
    people: { name: string; role: string }[];
    expectTitle: string;
    promises: string[];
    contactLead: string;
  };
  sectorsTitle: string;
  cta: { title: string; description: string; primaryLabel: string };
};

export type ContactContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  photo: PhotoRef;
  offers: string[];
  replyNote: string;
  nextTitle: string;
  nextSteps: { title: string; body: string }[];
  form: {
    labels: Record<EnquiryField, string>;
    hints: Record<EnquiryField, string>;
    needOptions: string[];
    submitLabel: string;
  };
};

export type HubContent = {
  metaTitle: string;
  metaDescription: string;
  header: { eyebrow: string; title: string; description: string; photo: PhotoRef };
  cta: { title: string; description: string; primaryLabel: string };
};

export type CaseStudiesContent = HubContent & {
  todayLabel: string;
  afterLabel: string;
  builtLabel: string;
  sampleTag: string;
  items: CaseStudy[];
};

export type AiAutomationContent = HubContent & {
  canTitle: string;
  cannotTitle: string;
  canIntro: string;
  can: string[];
  cannot: string[];
  tools: SectionHead;
  sample: SampleFlow;
  sampleEyebrow: string;
  sampleIntro: string;
  faqs: { q: string; a: string }[];
  faqTitle: string;
};

export type InsightsContent = HubContent & {
  stages: SectionHead & { items: { icon: UiIconName; title: string; points: string[] }[] };
  checklist: { eyebrow: string; title: string; intro: string; items: string[] };
  faqs: { q: string; a: string }[];
  faqTitle: string;
  notesTitle: string;
};

export type BlogListingContent = {
  metaTitle: string;
  metaDescription: string;
  header: { eyebrow: string; title: string; description: string; photo: PhotoRef };
  emptyTitle: string;
  emptyBody: string;
  ctaLabel: string;
};

export type NotFoundContent = {
  eyebrow: string;
  title: string;
  description: string;
  homeLabel: string;
  contactLabel: string;
  links: NavItem[];
};

export type LegalPageContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

export type LegalContent = {
  effectiveDate: string;
  privacy: LegalPageContent;
  terms: LegalPageContent;
  cookies: LegalPageContent;
};

export type CmsBundle = {
  site: SiteConfig;
  chrome: ChromeContent;
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  solutionsHub: HubContent;
  industriesHub: HubContent;
  caseStudies: CaseStudiesContent;
  aiAutomation: AiAutomationContent;
  insights: InsightsContent;
  blog: BlogListingContent;
  notFound: NotFoundContent;
  legal: LegalContent;
  stats: Stat[];
  services: Service[];
  solutionGroups: SolutionGroup[];
  industries: Industry[];
  details: DetailPage[];
  navigation: {
    primary: NavItem[];
    company: NavItem[];
    resources: NavItem[];
    legal: NavItem[];
    hubs: { solutions: NavItem; industries: NavItem };
    footerServiceSlugs: string[];
  };
};
