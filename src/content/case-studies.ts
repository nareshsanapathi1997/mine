export type CaseStudy = {
  slug: string;
  industry: string;
  title: string;
  problem: string;
  existingWorkflow: string;
  solution: string;
  architecture: string[];
  technology: string[];
  /** Illustrative system patterns. Not verified client engagements. */
  placeholder: true;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "education-admissions",
    industry: "Education",
    title: "AI admission system",
    problem: "Enquiries arrive on a form, on WhatsApp, and at the front desk, and each one is handled by hand.",
    existingWorkflow: "A counsellor copies the enquiry into a sheet, then follows up from memory.",
    solution:
      "An AI agent captures the enquiry, writes it to a CRM, and hands exceptions to the admissions desk. Follow-up and admission stay on the same record.",
    architecture: ["Enquiry", "AI Agent", "CRM", "Follow-up", "Admission"],
    technology: ["Web", "AI agents", "WhatsApp", "CRM"],
    placeholder: true,
  },
  {
    slug: "hotel-bookings",
    industry: "Hospitality",
    title: "Booking and guest communication",
    problem: "Room enquiries and booking messages are relayed manually between the website, WhatsApp, and the front desk.",
    existingWorkflow: "Whoever answers the chat checks availability somewhere else, then confirms from memory.",
    solution:
      "The website, a booking record, WhatsApp, and an AI agent read one availability list and write one confirmation.",
    architecture: ["Enquiry", "Availability", "Booking", "WhatsApp", "Confirmation"],
    technology: ["Web", "WhatsApp automation", "AI agents", "Operations dashboard"],
    placeholder: true,
  },
  {
    slug: "factory-orders",
    industry: "Manufacturing",
    title: "Order and production visibility",
    problem: "Inventory and production status live in separate files, so a manager waits for someone to assemble a report.",
    existingWorkflow: "An order is copied from the inbox into a stock sheet, then again onto the floor.",
    solution:
      "One operational record runs stock check, approval, production status, and the customer notification.",
    architecture: ["Order", "Stock check", "Approval", "Production", "Notification"],
    technology: ["Business software", "Workflow automation", "Dashboards"],
    placeholder: true,
  },
];
