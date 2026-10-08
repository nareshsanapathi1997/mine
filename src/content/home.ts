import type { IconName } from "@/content/types";

export const trustItems: { label: string; icon: IconName }[] = [
  { label: "Web Applications", icon: "globe" },
  { label: "Mobile Apps", icon: "smartphone" },
  { label: "AI Agents", icon: "bot" },
  { label: "Automation", icon: "workflow" },
  { label: "Cloud", icon: "cloud" },
  { label: "Integrations", icon: "link" },
];

export const disconnectedSystems = [
  "Website",
  "Leads",
  "WhatsApp",
  "Customer support",
  "Employees",
  "Payments",
  "Reports",
  "Operations",
];

export const connectedFlow = [
  "Customer",
  "Website / WhatsApp / Mobile",
  "AI",
  "Automation",
  "Business Systems",
  "Management Dashboard",
];

export const aiSteps = [
  "Customer asks a question",
  "AI understands the request",
  "AI searches business information",
  "AI decides what to do",
  "AI calls business systems",
  "Automation executes the task",
  "Customer receives the result",
] as const;

export type AiExample = {
  id: string;
  prompt: string;
  result: string;
};

export const aiExamples: AiExample[] = [
  {
    id: "application-status",
    prompt: "Check my application status",
    result:
      "The applicant receives the current status, and the admissions desk is notified.",
  },
  {
    id: "hotel-room",
    prompt: "Book a hotel room",
    result: "The room is reserved and a confirmation is prepared for WhatsApp and email.",
  },
  {
    id: "schedule-demo",
    prompt: "Schedule a demo",
    result: "An open time is held and a confirmation is sent to both sides.",
  },
  {
    id: "generate-report",
    prompt: "Generate a report",
    result: "The report is assembled from current business data and shared with the requester.",
  },
  {
    id: "send-invoice",
    prompt: "Send my invoice",
    result: "The invoice is located and sent to the customer on the channel they used.",
  },
  {
    id: "course-availability",
    prompt: "Check course availability",
    result: "Open seats are returned, with a clear next step to continue the application.",
  },
  {
    id: "support-ticket",
    prompt: "Create a support ticket",
    result: "A ticket is created and routed to the queue that owns that request.",
  },
];

export const automationFlows: { id: string; title: string; steps: string[] }[] = [
  {
    id: "enquiry",
    title: "Enquiry to follow-up",
    steps: [
      "Website enquiry",
      "AI qualification",
      "CRM",
      "WhatsApp",
      "Sales notification",
      "Follow-up",
    ],
  },
  {
    id: "booking",
    title: "Booking to dashboard",
    steps: [
      "Online booking",
      "Payment",
      "Confirmation",
      "WhatsApp",
      "Email",
      "Dashboard",
    ],
  },
  {
    id: "order",
    title: "Order to notification",
    steps: [
      "New order",
      "Inventory check",
      "Approval",
      "Production",
      "Invoice",
      "Customer notification",
    ],
  },
];

export const processSteps: { number: string; title: string; description: string }[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand how the business currently operates.",
  },
  {
    number: "02",
    title: "Specify",
    description: "Map the people, the records, the rules, and the work that is repeated.",
  },
  {
    number: "03",
    title: "Build",
    description: "Build the software or the AI the workflow actually needs.",
  },
  {
    number: "04",
    title: "Connect",
    description: "Connect the systems and APIs so the same fact is not copied twice.",
  },
  {
    number: "05",
    title: "Stay",
    description: "Improve and maintain the system after the first release.",
  },
];

export const whyPoints: { title: string; description: string; icon: IconName }[] = [
  {
    title: "The operation comes first",
    description:
      "We learn how the institution or company already works, then choose the software that fits that map.",
    icon: "compass",
  },
  {
    title: "AI only where the action is named",
    description:
      "An agent looks up your information and takes a step you have already defined. If the action cannot be named, it is not automated.",
    icon: "cpu",
  },
  {
    title: "One workflow, then the next",
    description:
      "Begin with the process that is blocking the team. Later branches, products, and channels sit on the same foundation.",
    icon: "layers",
  },
  {
    title: "Handoffs removed from the day",
    description:
      "Enquiry to CRM, booking to confirmation, order to invoice — the repeated copy-and-paste is designed out.",
    icon: "workflow",
  },
  {
    title: "Secure infrastructure",
    description:
      "Access, deployment, backups and monitoring are part of the build, not a later patch.",
    icon: "shield",
  },
  {
    title: "Long-term technology partner",
    description:
      "We stay for deployment, maintenance and the next improvement — not only the first release.",
    icon: "handshake",
  },
];

export const educationCapabilities = [
  "Student Management",
  "Admissions",
  "Courses",
  "Batches",
  "Attendance",
  "Exams",
  "Fees",
  "Faculty",
  "Parent Communication",
  "AI Student Assistant",
  "AI Admission Agent",
];

export const ecosystemChannels = [
  {
    id: "website",
    label: "Website",
    detail:
      "A visitor asks for a course, a room or a quote. The AI layer reads the request and updates the right system.",
  },
  {
    id: "mobile",
    label: "Mobile App",
    detail:
      "Staff and customers follow the same rules from a phone — attendance, orders, bookings or approvals — without a side spreadsheet.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail:
      "A WhatsApp message can capture a lead, answer from your information and notify the person who owns the next step.",
  },
  {
    id: "voice",
    label: "Voice",
    detail:
      "A caller can check a status, make a booking or raise a request. The voice agent writes the outcome into your systems.",
  },
] as const;

export const ecosystemSystems = ["CRM", "ERP", "Database", "Payments", "Reports"];
