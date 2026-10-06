export type CaseStudy = {
  slug: string;
  title: string;
  challenge: string;
  solution: string;
  result?: string;
  /** Placeholder studies are layout examples, not verified client engagements. */
  placeholder: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "education-platform",
    title: "Education Platform",
    challenge:
      "Managing admissions, students and communication across multiple systems.",
    solution: "Centralized web platform + automation + AI assistant.",
    result: "Faster operations and better customer communication.",
    placeholder: true,
  },
  {
    slug: "hotel-automation",
    title: "Hotel Automation",
    challenge: "Manual enquiries and booking communication.",
    solution: "Website + booking system + WhatsApp automation + AI agent.",
    placeholder: true,
  },
  {
    slug: "manufacturing-dashboard",
    title: "Manufacturing Dashboard",
    challenge: "Disconnected inventory and production data.",
    solution: "Centralized business dashboard + workflow automation.",
    placeholder: true,
  },
];
