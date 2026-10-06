import { services, type Service } from "@/content/services";
import type { IconName } from "@/content/types";

export type DetailSection = {
  heading: string;
  body: string[];
};

export type SolutionPage = {
  slug: string;
  title: string;
  description: string;
  lede: string;
  icon: IconName;
  sections: DetailSection[];
  includes: string[];
  related: string[];
};

type Extra = {
  lede: string;
  sections: DetailSection[];
  includes: string[];
  related: string[];
};

const serviceExtras: Record<string, Extra> = {
  "web-development": {
    lede: "A website that can take an enquiry, show the right information and hand the next step to a person or an automated workflow.",
    sections: [
      {
        heading: "What the site is for",
        body: [
          "A corporate site, an education portal or a customer portal fails when it only publishes pages. The useful version collects a request, answers the common questions and passes a complete record to the team that owns the next step.",
          "We design that path first: who arrives, what they need to finish, and which system should hold the result.",
        ],
      },
      {
        heading: "How it connects",
        body: [
          "Forms, accounts and content sit next to the CRM, WhatsApp and the dashboards managers already check. An AI agent can use the same information, with a defined set of actions, instead of living in a separate chat widget.",
          "The public site and the internal tools share one description of a lead, an application or a booking, so nobody retypes it.",
        ],
      },
    ],
    includes: [
      "Corporate websites and campaign landing pages",
      "Education and customer portals",
      "Custom web applications",
      "Enquiry flows that write into business systems",
    ],
    related: ["business-software", "ai-agents", "whatsapp-automation"],
  },
  "mobile-applications": {
    lede: "Apps for the people who do the work and the people you serve — attendance, bookings, orders, approvals and updates.",
    sections: [
      {
        heading: "Who the app is for",
        body: [
          "A mobile app earns its place when someone needs to act away from a desk: a parent checking a fee, a guest changing a booking, a supervisor approving a request, a field team updating an order.",
          "We start from that job, then decide whether it belongs in a customer app, a staff app, or both sharing the same records.",
        ],
      },
      {
        heading: "The same system, on a phone",
        body: [
          "The app is not a second copy of the business. It reads and writes the same student, guest, order or ticket that the website and the dashboard use.",
          "Notifications tell a person that something changed. They do not become the only place that information exists.",
        ],
      },
    ],
    includes: [
      "Android and iOS applications",
      "Customer, student and employee apps",
      "Approvals, attendance, bookings and orders",
      "Notifications tied to a real record",
    ],
    related: ["web-development", "business-software", "ai-agents"],
  },
  "business-software": {
    lede: "Software shaped around how the organization already works: pipelines, records, roles and the reports managers actually open.",
    sections: [
      {
        heading: "Built around the process",
        body: [
          "A CRM, an ERP-style system, a portal or a dashboard is useful when it matches the steps your team already takes. We map those steps before choosing screens.",
          "Roles decide who can see a record, who can change it and who only needs a summary.",
        ],
      },
      {
        heading: "One record, many views",
        body: [
          "Sales, operations and finance should not keep three spreadsheets for the same customer. The system holds the record once. Each team gets the view they need.",
          "Automation and AI agents call the same system, so a follow-up or a status reply does not depend on someone exporting a file.",
        ],
      },
    ],
    includes: [
      "Custom CRM and internal portals",
      "Operational dashboards",
      "Role-based records and approvals",
      "Reports drawn from live data",
    ],
    related: ["web-development", "business-automation", "cloud-devops"],
  },
  "ai-agents": {
    lede: "Agents that can look up your information, decide on a next step and call a business system — not only reply in a chat window.",
    sections: [
      {
        heading: "An agent is allowed to act",
        body: [
          "A chatbot answers. An agent is given a short list of actions: check a status, create a ticket, hold a slot, notify an owner. Anything outside that list is handed to a person.",
          "The useful test is simple. After the conversation, is the work done in the system of record, or does someone still retype it?",
        ],
      },
      {
        heading: "Where it sits",
        body: [
          "The same pattern fits a website assistant, a sales agent, a support agent or a knowledge assistant. The difference is which records it may read and which actions it may take.",
          "Voice and WhatsApp can use the same rules, so a caller and a chat user do not get two different versions of the truth.",
        ],
      },
    ],
    includes: [
      "Website, support and sales agents",
      "Knowledge assistants grounded in your material",
      "Defined actions written back to business systems",
      "A clear handoff when a person should decide",
    ],
    related: ["voice-ai", "whatsapp-automation", "business-automation"],
  },
  "voice-ai": {
    lede: "Callers can check a status, book, or raise a request. The outcome is written back into your systems.",
    sections: [
      {
        heading: "Calls that finish a job",
        body: [
          "Voice is the right channel when people already phone you: admissions, front desk, bookings, a service line. The assistant should resolve the common requests and pass the rest on with the context already captured.",
          "A call that only takes a message still leaves the desk to do the work. A useful call updates the record.",
        ],
      },
      {
        heading: "Limits you choose in advance",
        body: [
          "Before anything goes live, write down what the voice agent may confirm, what it may change, and what must wait for a person. Payments, exceptions and complaints usually stay with staff.",
          "The same boundaries should match the website and WhatsApp, so the channel does not change the answer.",
        ],
      },
    ],
    includes: [
      "Support, admissions and booking lines",
      "Status checks and request capture",
      "Write-back to the system of record",
      "Handoff with the details already collected",
    ],
    related: ["ai-agents", "whatsapp-automation", "web-development"],
  },
  "whatsapp-automation": {
    lede: "WhatsApp becomes a working channel: capture the request, answer from your information, and notify the owner of the next step.",
    sections: [
      {
        heading: "The channel people already use",
        body: [
          "Many teams already run the business from a WhatsApp thread. The problem is not the app. It is that the thread is the only copy of the lead, the booking or the complaint.",
          "Automation keeps the conversation, and writes the outcome somewhere a colleague can see it after the chat is buried.",
        ],
      },
      {
        heading: "Capture, answer, notify",
        body: [
          "A new message can create or update a record, send a reminder, or answer a question from information you control. The person who owns the next step gets a notification, not a forwarded screenshot.",
          "Templates and office hours stay explicit, so customers are not promised a reply the team cannot keep.",
        ],
      },
    ],
    includes: [
      "Lead capture from WhatsApp",
      "Reminders and status notifications",
      "Answers drawn from your own information",
      "A record the rest of the team can open",
    ],
    related: ["ai-agents", "business-automation", "web-development"],
  },
  "business-automation": {
    lede: "The handoffs your team repeats — enquiry to CRM, booking to confirmation, order to invoice — run as a workflow.",
    sections: [
      {
        heading: "Start with one repeated handoff",
        body: [
          "Automation pays off on work that already has a known path. Enquiry to follow-up, booking to confirmation, order to invoice. We pick one path, name every step, and only then connect the tools.",
          "Exceptions stay visible. A workflow that hides the awkward cases just creates a second inbox.",
        ],
      },
      {
        heading: "APIs, webhooks and AI where they help",
        body: [
          "Some steps are ordinary integrations: create a record, send a message, update a status. Some steps need a judgment that an AI agent can make inside rules you set, such as routing a request.",
          "Either way, the result lands in the system people already trust, and a person can see what happened.",
        ],
      },
    ],
    includes: [
      "Workflow design for a repeated process",
      "API and webhook connections",
      "AI steps with an allowed set of actions",
      "A visible trail when a step needs a person",
    ],
    related: ["ai-agents", "whatsapp-automation", "business-software"],
  },
  "cloud-devops": {
    lede: "A calm path from release to production: deployment, monitoring, backups and access treated as part of the product.",
    sections: [
      {
        heading: "Shipping is part of the build",
        body: [
          "A portal or an agent is unfinished if only one person knows how to deploy it. We set up a repeatable path from a change to a running system, with a way to see that it is healthy.",
          "Environments stay separate, so a test does not write into live student, guest or customer data.",
        ],
      },
      {
        heading: "Keep it running",
        body: [
          "Monitoring, backups and access reviews are planned with the first release. They are how you notice a failure, restore a record and decide who can reach production.",
          "The same foundation should be able to take the next workflow without a new hosting design each time.",
        ],
      },
    ],
    includes: [
      "Cloud deployment and environments",
      "CI/CD for repeatable releases",
      "Monitoring, backups and access",
      "Room to add the next workflow",
    ],
    related: ["business-software", "web-development", "business-automation"],
  },
};

const sectorPages: SolutionPage[] = [
  {
    slug: "education",
    title: "Education systems",
    description:
      "Admissions, student records, fees, attendance and parent communication designed as one education system.",
    lede: "Admissions, students, fees and parent updates in one system, so a coaching desk or a campus office is not retyping the same family into three tools.",
    icon: "graduation",
    sections: [
      {
        heading: "The work the system has to carry",
        body: [
          "An enquiry becomes an application, then a student, then a fee, an attendance record and a message to a parent. When each of those lives in a different sheet, the status nobody trusts is the one a parent hears on the phone.",
          "We design the education system around that chain. The public site or WhatsApp can start it. The office finishes the exceptions. The dashboard shows where each application stands.",
        ],
      },
      {
        heading: "Assistants with a narrow job",
        body: [
          "An admissions agent can answer course questions, collect missing details and report a status. It should not invent a fee waiver or a seat. Those stay with the team, and the handoff includes what the family already said.",
          "Schools, colleges and coaching institutes share this shape. The records and the calendar change. The idea does not.",
        ],
      },
    ],
    includes: [
      "Admissions and application status",
      "Student records, attendance and fees",
      "Parent and student communication",
      "An assistant that can look up, not invent, an answer",
    ],
    related: ["web-development", "business-software", "ai-agents", "whatsapp-automation"],
  },
  {
    slug: "hospitality",
    title: "Hospitality systems",
    description:
      "Enquiry, booking, guest communication and operations for hotels and hospitality businesses, without a manual relay.",
    lede: "Enquiries, bookings and guest messages in one path, so the front desk is not the only place that knows what was promised.",
    icon: "hotel",
    sections: [
      {
        heading: "From the first message to the stay",
        body: [
          "A guest may start on the website, on WhatsApp or on a phone call. The booking, the confirmation and the special request should meet in one record before anyone arrives.",
          "Payments, availability and housekeeping notes stay attached to that stay, not to whichever staff member answered first.",
        ],
      },
      {
        heading: "Agents that may book, and may not guess",
        body: [
          "A booking agent can check what is open, hold a room and send a confirmation when the rules are clear. Rate exceptions, complaints and anything that changes a published policy go to a person.",
          "Voice and WhatsApp should read the same availability, so two channels cannot sell the same room twice.",
        ],
      },
    ],
    includes: [
      "Enquiries and bookings",
      "Guest records and confirmations",
      "WhatsApp and voice on the same availability",
      "An operations view of what is arriving",
    ],
    related: ["web-development", "whatsapp-automation", "voice-ai", "ai-agents"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing systems",
    description:
      "Inventory, production, orders and notifications connected so a factory is not waiting on a spreadsheet export.",
    lede: "Inventory, production and orders in one operational picture, with the repeated handoffs running as a workflow.",
    icon: "factory",
    sections: [
      {
        heading: "See the order while it is still moving",
        body: [
          "A new order should check stock, wait for the approval it needs, and reach production without a coordinator copying rows between files. The customer notification is the last step, not a separate project.",
          "Managers need a view of what is late and what is waiting, drawn from the same records the floor updates.",
        ],
      },
      {
        heading: "Automate the known path",
        body: [
          "Stock checks, status changes and invoice handoffs are good automation. A quality exception or a custom order still needs a person, and the system should make that wait obvious.",
          "Cloud deployment, backups and access matter here because the record is the operation, not a brochure.",
        ],
      },
    ],
    includes: [
      "Inventory and order records",
      "Production status and approvals",
      "Customer notifications when a step completes",
      "Dashboards for what is waiting",
    ],
    related: ["business-software", "business-automation", "cloud-devops"],
  },
];

/** Short public URLs that permanently redirect to a canonical solution. */
export const solutionAliases: Record<string, string> = {
  automation: "business-automation",
};

function fromService(service: Service, extra: Extra): SolutionPage {
  return {
    slug: service.slug,
    title: service.title,
    description: service.description,
    lede: extra.lede,
    icon: service.icon,
    sections: extra.sections,
    includes: extra.includes,
    related: extra.related,
  };
}

const servicePages: SolutionPage[] = services.map((service) => {
  const extra = serviceExtras[service.slug];
  if (!extra) {
    throw new Error(`Missing solution detail for ${service.slug}`);
  }
  return fromService(service, extra);
});

const pagesBySlug = new Map<string, SolutionPage>(
  [...servicePages, ...sectorPages].map((page) => [page.slug, page]),
);

export function getSolution(slug: string) {
  return pagesBySlug.get(slug);
}

export function listSolutionSlugs() {
  return [...pagesBySlug.keys(), ...Object.keys(solutionAliases)];
}

export function sectorOfferings() {
  return sectorPages;
}

export function relatedSolutionLinks(slugs: string[]) {
  return slugs.flatMap((slug) => {
    const page = pagesBySlug.get(slug);
    if (!page) return [];
    return [
      {
        href: `/solutions/${page.slug}`,
        title: page.title,
        description: page.description,
      },
    ];
  });
}
