import { newImages, type BannerImage } from "@/content/new-images";

/**
 * Sample scenarios. These are illustrations of what we would build,
 * not client projects, and they contain no claimed results.
 */
export type CaseStudy = {
  slug: string;
  industry: string;
  industryHref: string;
  photo: BannerImage;
  title: string;
  before: string[];
  built: string[];
  after: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "school-admissions",
    industry: "School",
    industryHref: "/industries/schools",
    photo: newImages.education,
    title: "A school that misses admission enquiries in peak season",
    before: [
      "Enquiries come by phone, WhatsApp, website form and walk-in.",
      "The counsellor writes them in a register and calls back from memory.",
      "Parents call again to ask about documents and status.",
    ],
    built: ["One admission list for every enquiry", "WhatsApp assistant for fees, timings and documents", "Follow-up reminders for counsellors", "Online form and admission fee payment"],
    after: [
      "Every enquiry is saved with its source and next step.",
      "Counsellors can see who is waiting for a call.",
      "Parents get updates on WhatsApp without calling.",
    ],
  },
  {
    slug: "hotel-bookings",
    industry: "Hotel",
    industryHref: "/industries/hotels",
    photo: newImages.hospitality,
    title: "A hotel that answers booking messages late",
    before: [
      "Night-time WhatsApp enquiries wait until morning.",
      "Room availability is checked in a register or someone's memory.",
      "Guests call for directions and check-in time.",
    ],
    built: ["One room list for the whole team", "WhatsApp booking assistant", "Advance payment links", "Automatic pre-arrival messages"],
    after: [
      "Guests get a reply with rooms and rates at any hour.",
      "The front desk confirms bookings from one list.",
      "Guests receive directions and timings before they arrive.",
    ],
  },
  {
    slug: "factory-orders",
    industry: "Factory",
    industryHref: "/industries/manufacturing",
    photo: newImages.manufacturing,
    title: "A factory where nobody knows the exact stage of an order",
    before: [
      "Orders are copied from email to Excel to the floor.",
      "Stock is counted by hand and runs short without warning.",
      "Customers call sales to ask about delivery dates.",
    ],
    built: ["Order tracking from PO to dispatch", "Stock list with low-stock alerts", "Mobile updates for supervisors", "Dispatch messages and GST invoices"],
    after: [
      "Each order is entered once and shows its current stage.",
      "Low stock is flagged before it stops production.",
      "Customers get a message when their order is dispatched.",
    ],
  },
  {
    slug: "clinic-appointments",
    industry: "Clinic",
    industryHref: "/industries/healthcare",
    photo: newImages["healthcare-alt"],
    title: "A clinic whose reception phone never stops ringing",
    before: [
      "Most calls are for booking or changing appointments.",
      "Patients forget visits and follow-ups.",
      "Patients call to check if reports are ready.",
    ],
    built: ["OPD booking on WhatsApp and website", "Visit and follow-up reminders", "Report-ready messages", "Reception dashboard for the day"],
    after: [
      "Patients book and change slots themselves.",
      "Reminders go out without anyone sending them.",
      "Reception has more time for patients at the desk.",
    ],
  },
];
