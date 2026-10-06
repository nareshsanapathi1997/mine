import { industries, type Industry } from "@/content/industries";
import type { IconName } from "@/content/types";

export type IndustrySection = {
  heading: string;
  body: string[];
};

export type IndustryLink = {
  href: string;
  title: string;
  description: string;
};

export type IndustryPage = {
  slug: string;
  title: string;
  description: string;
  lede: string;
  icon: IconName;
  sections: IndustrySection[];
  includes: string[];
  relatedServices: string[];
  explore: IndustryLink[];
  parent?: { href: string; label: string };
};

type Extra = Omit<IndustryPage, "slug" | "title" | "icon">;

const coreExtras: Record<string, Extra> = {
  education: {
    description:
      "Digital systems for schools, colleges and coaching institutes: admissions, students, fees and parent communication.",
    lede: "Schools, colleges and coaching institutes share one operational problem. The family, the application and the fee should not live in three different places.",
    sections: [
      {
        heading: "Where the day gets stuck",
        body: [
          "Admissions enquiries arrive on a form, on WhatsApp and at the front desk. Attendance, fees and exam updates then move through another set of sheets. Parents hear whichever version was copied last.",
          "The useful system starts at the enquiry and keeps a single status through enrolment, fees and the messages that follow.",
        ],
      },
      {
        heading: "Same shape, different calendar",
        body: [
          "A school, a college and a coaching institute do not run the same timetable. They do share admissions, student records and a need to answer “where does this application stand?” without opening four tools.",
          "AI fits as a status and information assistant. Seat decisions, fee exceptions and counselling stay with staff.",
        ],
      },
    ],
    includes: [
      "Admissions and student records",
      "Attendance, fees and exams",
      "Parent and student updates",
      "A status a caller and a chat can both trust",
    ],
    relatedServices: ["web-development", "business-software", "ai-agents", "whatsapp-automation"],
    explore: [
      {
        href: "/industries/schools",
        title: "Schools",
        description: "Attendance, fees and parent updates for a school office.",
      },
      {
        href: "/industries/colleges",
        title: "Colleges",
        description: "Programmes, admissions cycles and department handoffs.",
      },
      {
        href: "/industries/coaching",
        title: "Coaching institutes",
        description: "Enquiries, batches and admissions follow-up.",
      },
      {
        href: "/solutions/education",
        title: "Education systems",
        description: "The product shape: one chain from enquiry to student record.",
      },
    ],
  },
  hospitality: {
    description:
      "Systems for hotels, resorts and hospitality businesses: bookings, guests, WhatsApp and an operations view.",
    lede: "Hotels and resorts lose time when the enquiry, the booking and the guest request each live in a different chat.",
    sections: [
      {
        heading: "The front desk should not be the database",
        body: [
          "Guests write, call and book online. If the only complete story is in someone’s memory, the next shift starts again. A guest record should hold the stay, the requests and what was already confirmed.",
          "Housekeeping, the desk and whoever answers WhatsApp need that same stay, not a forwarded message.",
        ],
      },
      {
        heading: "Channels that agree",
        body: [
          "Website, WhatsApp and voice can all start a booking. They should read one availability list and write one confirmation. An agent may complete the straightforward stay and must hand over the exception.",
        ],
      },
    ],
    includes: [
      "Enquiries and bookings",
      "Guest records",
      "WhatsApp and phone on the same stay",
      "A view of arrivals and open requests",
    ],
    relatedServices: ["web-development", "whatsapp-automation", "voice-ai", "ai-agents"],
    explore: [
      {
        href: "/industries/hotels",
        title: "Hotels",
        description: "Room enquiries, confirmations and guest messages for a property.",
      },
      {
        href: "/solutions/hospitality",
        title: "Hospitality systems",
        description: "How bookings, guests and operations fit together.",
      },
    ],
  },
  manufacturing: {
    description:
      "Operational systems for factories and industrial businesses: inventory, production, orders and reporting.",
    lede: "Factories lose the order between the inbox, the stock sheet and the floor. The system should show where it is.",
    sections: [
      {
        heading: "One picture of the order",
        body: [
          "Inventory, production and dispatch are often updated by different people in different files. A manager then waits for someone to assemble a report before they know what is late.",
          "We connect those records so a status change on the floor is the same status a customer notification can use.",
        ],
      },
      {
        heading: "Automate the path you already trust",
        body: [
          "Stock check, approval, production, invoice, notification. That sequence is a workflow when every step has an owner. Custom work and quality holds stay visible instead of being forced through.",
        ],
      },
    ],
    includes: [
      "Inventory and orders",
      "Production status",
      "Approvals and invoices",
      "Reports from the live record",
    ],
    relatedServices: ["business-software", "business-automation", "cloud-devops"],
    explore: [
      {
        href: "/solutions/manufacturing",
        title: "Manufacturing systems",
        description: "The systems we put around inventory, production and orders.",
      },
      {
        href: "/solutions/business-automation",
        title: "Business automation",
        description: "The repeated handoff from order to customer notification.",
      },
    ],
  },
  "corporate-smes": {
    description:
      "Connected CRM, operations, finance and dashboards for growing companies and multi-team organizations.",
    lede: "Growing companies collect tools faster than they collect a single view of a customer. Sales, operations and finance then reconcile by hand.",
    sections: [
      {
        heading: "Stop copying the same customer",
        body: [
          "A lead arrives on the site or WhatsApp, a quote lives in a sheet, and the invoice lives somewhere else. Each handoff is a chance to lose the status. A CRM or internal system should hold the record once.",
          "Dashboards are only useful when they read that record. A chart built from last week’s export is a second opinion, not a control.",
        ],
      },
      {
        heading: "A small system you can extend",
        body: [
          "Start with the workflow that hurts: follow-up, approvals, or the report a founder asks for every Monday. Add the next team on the same foundation instead of buying a new tool for each department.",
        ],
      },
    ],
    includes: [
      "CRM and sales follow-up",
      "Operations and finance records",
      "Dashboards on live data",
      "WhatsApp and website enquiries in the same pipeline",
    ],
    relatedServices: ["business-software", "business-automation", "whatsapp-automation", "cloud-devops"],
    explore: [
      {
        href: "/solutions/business-software",
        title: "Business software",
        description: "CRM, portals and the reports managers open.",
      },
      {
        href: "/blog/connecting-whatsapp-crm-and-dashboards",
        title: "WhatsApp, CRM and dashboards",
        description: "How to connect the three tools SMEs already have.",
      },
    ],
  },
  healthcare: {
    description:
      "Appointment, communication and follow-up systems for hospitals, clinics and healthcare organizations.",
    lede: "Clinics lose follow-up when appointments, reminders and patient messages depend on a front-desk inbox.",
    sections: [
      {
        heading: "The appointment is the record",
        body: [
          "A patient books, changes a time, or asks what to bring. If that conversation stays in a personal chat, the next person on the desk cannot see it. The appointment record should hold the status and the messages that belong to it.",
          "We do not treat this website as a clinical system. The work described here is scheduling, communication and follow-up around the tools you already use for care.",
        ],
      },
      {
        heading: "Reminders without a second inbox",
        body: [
          "Notifications on SMS, email or WhatsApp should come from the appointment, and a reply that changes the booking should update it. An assistant can answer routine questions and must hand clinical decisions to staff.",
        ],
      },
    ],
    includes: [
      "Appointment requests and changes",
      "Patient communication and reminders",
      "A CRM view of follow-up",
      "Assistants limited to routine questions",
    ],
    relatedServices: ["web-development", "voice-ai", "whatsapp-automation", "ai-agents"],
    explore: [
      {
        href: "/solutions/whatsapp-automation",
        title: "WhatsApp automation",
        description: "Reminders and replies that update a record.",
      },
      {
        href: "/solutions/voice-ai",
        title: "Voice AI",
        description: "A phone line that can check a status and book a defined slot.",
      },
    ],
  },
  "professional-services": {
    description:
      "Lead, portal and reporting systems for consultancies, agencies and service businesses.",
    lede: "Service firms lose the thread between the first enquiry, the work underway and the report a client expects.",
    sections: [
      {
        heading: "A lead should become a job",
        body: [
          "Enquiries, proposals and active work often sit in different tools, so a partner cannot see which conversations are waiting. Lead management only helps if the same record can become the job.",
          "A client portal then shows the status you are willing to share, instead of a trail of email attachments.",
        ],
      },
      {
        heading: "Reporting from the work, not from memory",
        body: [
          "Status reports are a poor use of a senior person’s week when the underlying tasks are already in a system. Automation can assemble the update. The judgment about the account stays with the team.",
        ],
      },
    ],
    includes: [
      "Lead and pipeline management",
      "Client portals",
      "Workflow between enquiry and delivery",
      "Reports assembled from current work",
    ],
    relatedServices: ["web-development", "business-software", "ai-agents", "business-automation"],
    explore: [
      {
        href: "/solutions/business-software",
        title: "Business software",
        description: "Pipelines, portals and internal records.",
      },
      {
        href: "/solutions/ai-agents",
        title: "AI agents",
        description: "Assistants that look up a status and open the right next step.",
      },
    ],
  },
};

const childPages: IndustryPage[] = [
  {
    slug: "schools",
    title: "Schools",
    description: "School operations software for attendance, fees, parent communication and day-to-day office work.",
    lede: "A school office spends the day answering the same parent questions that a shared record could already show.",
    icon: "graduation",
    parent: { href: "/industries/education", label: "Education" },
    sections: [
      {
        heading: "The office and the parent",
        body: [
          "Attendance, fee status and a circular are simple facts. They become a queue when each one is copied into a different chat. Parents then call because they cannot see a consistent answer.",
          "A school system keeps those facts on the student, and lets the website, an app or WhatsApp read the ones you choose to share.",
        ],
      },
      {
        heading: "What stays with people",
        body: [
          "Discipline, counselling and fee exceptions are conversations. The software should record the outcome and the next step, not pretend to decide them. An assistant can tell a parent where to look and when the office is open.",
        ],
      },
    ],
    includes: [
      "Attendance and student records",
      "Fee status a parent can check",
      "Notices that point at the same record",
      "A front office that is not retyping the day",
    ],
    relatedServices: ["web-development", "business-software", "whatsapp-automation", "mobile-applications"],
    explore: [
      {
        href: "/industries/education",
        title: "Education",
        description: "How schools, colleges and coaching institutes share one pattern.",
      },
      {
        href: "/solutions/education",
        title: "Education systems",
        description: "Admissions through parent communication, as one system.",
      },
    ],
  },
  {
    slug: "colleges",
    title: "Colleges",
    description: "College systems for admissions cycles, programmes, student records and department handoffs.",
    lede: "A college admissions cycle breaks when each department keeps its own list of who has applied and who has paid.",
    icon: "graduation",
    parent: { href: "/industries/education", label: "Education" },
    sections: [
      {
        heading: "One application, several departments",
        body: [
          "Programmes, documents, fees and hostel or transport questions land on different desks. The applicant still expects one status. The system should let each department update its part without creating a private spreadsheet.",
          "Publishing that status on a portal, or through an assistant, only works if the departments are writing to the same application.",
        ],
      },
      {
        heading: "After enrolment",
        body: [
          "Once a student joins, attendance, exams and announcements are the same problem at a larger scale. Start with the admissions handoff if that is where the lists diverge, then extend the record rather than adding a second product.",
        ],
      },
    ],
    includes: [
      "Admissions across programmes",
      "Document and fee checkpoints",
      "A status the applicant can see",
      "Student records after enrolment",
    ],
    relatedServices: ["web-development", "business-software", "ai-agents", "whatsapp-automation"],
    explore: [
      {
        href: "/industries/education",
        title: "Education",
        description: "The wider pattern for schools, colleges and coaching.",
      },
      {
        href: "/solutions/education",
        title: "Education systems",
        description: "The system behind the admissions cycle.",
      },
    ],
  },
  {
    slug: "coaching",
    title: "Coaching institutes",
    description:
      "Systems for coaching institutes: enquiries, admissions follow-up, batches and parent updates.",
    lede: "Coaching admissions is a race between a WhatsApp chat and a spreadsheet. The family should not depend on which counsellor replies.",
    icon: "graduation",
    parent: { href: "/industries/education", label: "Education" },
    sections: [
      {
        heading: "Enquiry to batch",
        body: [
          "A typical path is short and repeated: course question, application, fee, batch, reminder. It feels manageable until two counsellors answer the same parent differently.",
          "Capture the enquiry once, show the next step, and let reminders come from that record. Counselling and exceptions stay with a person who can see the history.",
        ],
      },
      {
        heading: "What to automate first",
        body: [
          "Status replies and fee or batch reminders remove the most repetitive messages. Deciding a scholarship or a batch change should remain a staff action, with the outcome written back so the next message is accurate.",
        ],
      },
    ],
    includes: [
      "Enquiry capture from web and WhatsApp",
      "Application status",
      "Batch and fee reminders",
      "A counsellor view of who is waiting",
    ],
    relatedServices: ["whatsapp-automation", "ai-agents", "business-software", "web-development"],
    explore: [
      {
        href: "/blog/automating-admissions-for-coaching-institutes",
        title: "Automating admissions",
        description: "A practical order of work for a coaching desk.",
      },
      {
        href: "/solutions/education",
        title: "Education systems",
        description: "How the admissions chain sits in one system.",
      },
      {
        href: "/industries/education",
        title: "Education",
        description: "Schools, colleges and coaching on the same pattern.",
      },
    ],
  },
  {
    slug: "hotels",
    title: "Hotels",
    description: "Hotel systems for room enquiries, bookings, confirmations and guest messages.",
    lede: "A hotel loses bookings in the gap between the website, WhatsApp and the front desk diary.",
    icon: "hotel",
    parent: { href: "/industries/hospitality", label: "Hospitality" },
    sections: [
      {
        heading: "One stay, every channel",
        body: [
          "A guest asks if a room is free, then messages a late arrival, then calls to add a request. Those are one stay. If each channel has its own notes, the confirmation and the room assignment drift apart.",
          "The website, WhatsApp and the desk should create or update the same booking, and the guest should receive one confirmation.",
        ],
      },
      {
        heading: "What an agent may promise",
        body: [
          "If availability and rate rules are explicit, an agent can hold a room and send the confirmation. Anything outside the published rule — a complaint, a custom rate, a group — goes to staff with the conversation attached.",
        ],
      },
    ],
    includes: [
      "Room enquiries and bookings",
      "Confirmations on WhatsApp and email",
      "Guest requests on the stay record",
      "A desk view that matches what was promised",
    ],
    relatedServices: ["web-development", "whatsapp-automation", "voice-ai", "ai-agents"],
    explore: [
      {
        href: "/industries/hospitality",
        title: "Hospitality",
        description: "Hotels and resorts as one operational pattern.",
      },
      {
        href: "/solutions/hospitality",
        title: "Hospitality systems",
        description: "Bookings, guests and operations together.",
      },
    ],
  },
];

function fromIndustry(industry: Industry, extra: Extra): IndustryPage {
  return {
    slug: industry.slug,
    title: industry.title,
    icon: industry.icon,
    ...extra,
  };
}

const corePages: IndustryPage[] = industries.map((industry) => {
  const extra = coreExtras[industry.slug];
  if (!extra) {
    throw new Error(`Missing industry detail for ${industry.slug}`);
  }
  return fromIndustry(industry, extra);
});

const pagesBySlug = new Map<string, IndustryPage>(
  [...corePages, ...childPages].map((page) => [page.slug, page]),
);

export function getIndustryPage(slug: string) {
  return pagesBySlug.get(slug);
}

export function listIndustrySlugs() {
  return [...pagesBySlug.keys()];
}
