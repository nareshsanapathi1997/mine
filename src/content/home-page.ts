import { newImages } from "@/content/new-images";
import type { UiIconName } from "@/components/icons";

/* Home page copy. Plain English, Indian examples, no invented numbers. */

export type HomeProblem = { icon: UiIconName; who: string; problem: string; fix: string };

export const homeProblems: HomeProblem[] = [
  {
    icon: "graduation",
    who: "Schools and coaching",
    problem: "Admission enquiries come on WhatsApp, calls and walk-ins. Some never get a reply.",
    fix: "Every enquiry is saved in one list, the right counsellor is told, and a follow-up is sent if nobody replies.",
  },
  {
    icon: "clipboard",
    who: "Fee collection",
    problem: "Staff check a register and send fee reminders one by one.",
    fix: "Reminders go out on WhatsApp on the due date, and the payment status updates when the fee is paid.",
  },
  {
    icon: "hotel",
    who: "Hotels",
    problem: "Room enquiries arrive at night and are answered late, or the same room is promised twice.",
    fix: "Guests get an instant reply with real availability, and the front desk confirms the booking in one place.",
  },
  {
    icon: "factory",
    who: "Factories",
    problem: "Purchase orders sit in Excel and email. Nobody knows which order is at which stage.",
    fix: "Each order moves through stock check, approval, production and dispatch on a screen everyone can see.",
  },
  {
    icon: "heart",
    who: "Clinics",
    problem: "The reception phone is always busy with OPD appointment calls.",
    fix: "Patients book or change an OPD slot on WhatsApp or online, and get a reminder the day before.",
  },
  {
    icon: "briefcase",
    who: "Small businesses",
    problem: "GST invoices and quotations are typed again from orders and chats.",
    fix: "Invoices and quotations are created from the order itself, and sent to the customer on email or WhatsApp.",
  },
  {
    icon: "clipboard",
    who: "CAs, lawyers and consultants",
    problem: "Client files, deadlines and document requests live in email and WhatsApp. Things get missed.",
    fix: "Each client file, deadline and reminder sits in one place, and clients get updates automatically.",
  },
];

export type HomeService = {
  icon: UiIconName;
  title: string;
  body: string;
  examples: string[];
  href: string;
  photo: { src: string; alt: string; width?: number; height?: number };
};

export const homeServices: HomeService[] = [
  {
    icon: "globe",
    title: "Websites and mobile apps",
    body: "Fast websites that bring enquiries, and apps for parents, guests, staff or customers.",
    examples: ["School website with online admission form", "Hotel booking site", "Staff attendance app"],
    href: "/solutions/web-development",
    photo: newImages["web-development"],
  },
  {
    icon: "blocks",
    title: "Software for your daily work",
    body: "Simple software built around how your team already works, instead of a heavy package you have to adjust to.",
    examples: ["Student, fee and exam management", "Order and stock tracking", "Owner's dashboard"],
    href: "/solutions/business-software",
    photo: newImages["business-software"],
  },
  {
    icon: "message",
    title: "WhatsApp and automatic reminders",
    body: "Replies, reminders and updates go out on their own, from the details already in your software.",
    examples: ["Fee and payment reminders", "Booking confirmations", "Order and dispatch updates"],
    href: "/solutions/whatsapp-automation",
    photo: newImages["whatsapp-automation"],
  },
  {
    icon: "bot",
    title: "AI assistants",
    body: "A helper on WhatsApp, your website or phone that answers common questions from your own information, and passes anything important to a person.",
    examples: ["Course and fee questions", "Room availability", "Appointment booking"],
    href: "/ai-automation",
    photo: newImages["ai-agents"],
  },
  {
    icon: "cloud",
    title: "Hosting, security and support",
    body: "We put your software online, keep backups, watch for problems and keep improving it after launch.",
    examples: ["Secure cloud hosting", "Regular backups", "Ongoing support"],
    href: "/solutions/cloud-devops",
    photo: newImages["cloud-devops"],
  },
];

export const homeTools = [
  "WhatsApp Business",
  "Your website",
  "Google Sheets",
  "Excel",
  "Tally",
  "Gmail",
  "Microsoft 365",
  "Razorpay",
  "UPI payments",
  "SMS",
  "Your CRM",
  "Your existing database",
];

export type HomeIndustry = {
  slug: string;
  label: string;
  icon: UiIconName;
  heading: string;
  summary: string;
  examples: string[];
  photo: { src: string; alt: string; width?: number; height?: number };
};

export const homeIndustries: HomeIndustry[] = [
  {
    slug: "education",
    label: "Schools, colleges and coaching",
    icon: "graduation",
    heading: "From the first enquiry to the fee receipt.",
    summary: "Admissions, fees, attendance and parent messages in one place, with WhatsApp doing the reminders.",
    examples: ["Admission enquiries and follow-ups", "Fee reminders and receipts", "Attendance and parent updates", "Batch and timetable management"],
    photo: newImages["education"],
  },
  {
    slug: "hospitality",
    label: "Hotels and resorts",
    icon: "hotel",
    heading: "Answer every booking enquiry, day or night.",
    summary: "Guests get quick answers and confirmations on WhatsApp, and the front desk sees every booking.",
    examples: ["Room availability on WhatsApp", "Booking confirmations", "Check-in and guest messages", "Front-desk dashboard"],
    photo: newImages["hospitality"],
  },
  {
    slug: "manufacturing",
    label: "Factories and manufacturers",
    icon: "factory",
    heading: "Know where every order stands.",
    summary: "Orders, stock and production stages tracked in one system, so nobody has to call the floor.",
    examples: ["Purchase and sales orders", "Stock and material checks", "Production stages", "Dispatch updates to customers"],
    photo: newImages["manufacturing"],
  },
  {
    slug: "healthcare",
    label: "Clinics and hospitals",
    icon: "heart",
    heading: "Fewer calls at reception, fewer missed appointments.",
    summary: "Patients book and get reminders on WhatsApp, so reception spends less time on the phone.",
    examples: ["OPD appointment booking", "Reminders before the visit", "Report-ready messages", "Follow-up visit reminders"],
    photo: newImages["healthcare"],
  },
  {
    slug: "corporate-smes",
    label: "Small and growing businesses",
    icon: "briefcase",
    heading: "Less typing, fewer missed follow-ups.",
    summary: "Leads, quotes, invoices and approvals in one simple system that works on your phone.",
    examples: ["Lead tracking and follow-ups", "GST invoices and quotations", "Approvals on mobile", "Daily sales report"],
    photo: newImages["corporate-smes-alt"],
  },
  {
    slug: "professional-services",
    label: "CAs, lawyers and consultants",
    icon: "briefcase",
    heading: "Client work tracked, documents in order.",
    summary: "Client files, deadlines and reminders in one place, with updates sent to clients automatically.",
    examples: ["Client and case tracking", "Document collection on WhatsApp", "Deadline and renewal reminders", "Billing and payment follow-ups"],
    photo: newImages["professional-services"],
  },
];

export type SampleFlow = { id: string; label: string; title: string; steps: { title: string; body: string }[] };

export const sampleFlows: SampleFlow[] = [
  {
    id: "school",
    label: "School admission",
    title: "A parent asks about admission on WhatsApp",
    steps: [
      { title: "Parent sends a message", body: "\"Is admission open for Class 6?\" arrives at 9 PM on the school's WhatsApp number." },
      { title: "Instant reply", body: "The assistant replies with the class, fee details and the form link, using the school's own information." },
      { title: "Saved in the admission list", body: "The parent's name, number and class are added to the admission list. No one types it again." },
      { title: "Counsellor is told", body: "The admissions counsellor sees the new enquiry next morning, with the full chat." },
      { title: "Follow-up if needed", body: "If the form is not filled in two days, a polite reminder goes to the parent." },
    ],
  },
  {
    id: "hotel",
    label: "Hotel booking",
    title: "A guest asks for a room for the weekend",
    steps: [
      { title: "Guest sends a message", body: "\"Do you have a double room for Saturday?\" arrives on WhatsApp late at night." },
      { title: "Real availability", body: "The reply checks today's room list, so the same room is never offered twice." },
      { title: "Booking held", body: "The room is held and a payment link is shared with the guest." },
      { title: "Front desk confirms", body: "Reception sees the booking and confirms it with one tap." },
      { title: "Before arrival", body: "The guest gets directions and check-in time on the day before arrival." },
    ],
  },
  {
    id: "factory",
    label: "Factory order",
    title: "A customer sends a purchase order",
    steps: [
      { title: "Order comes in", body: "A purchase order arrives by email and is entered once." },
      { title: "Stock check", body: "Material in stock is checked automatically and shortages are flagged." },
      { title: "Approval on mobile", body: "The manager approves the order from the phone." },
      { title: "Production stages", body: "The floor team updates each stage, and everyone sees the same status." },
      { title: "Customer update", body: "The customer gets a dispatch message with the GST invoice attached." },
    ],
  },
  {
    id: "clinic",
    label: "Clinic appointment",
    title: "A patient books an OPD slot on WhatsApp",
    steps: [
      { title: "Patient sends a message", body: "\"Do you have a slot with Dr. Rao tomorrow morning?\" arrives on the clinic WhatsApp." },
      { title: "Open slots shown", body: "The assistant shares the open morning slots from the clinic's own diary." },
      { title: "Booking confirmed", body: "The patient picks a time. The slot is held and a confirmation is sent." },
      { title: "Reception sees it", body: "Reception sees the new booking with the patient's name and number." },
      { title: "Reminder before the visit", body: "A polite reminder goes out the evening before the appointment." },
    ],
  },
];

export const homeSteps = [
  { title: "We listen", body: "A short call to understand how your work happens today and where it gets stuck." },
  { title: "We plan", body: "A simple written plan for the first piece of work, with cost and timeline." },
  { title: "We build", body: "You see working screens every week or two, and tell us what to change." },
  { title: "We launch and support", body: "We set it up, train your team and keep supporting and improving it." },
];

export const homeReasons: { icon: UiIconName; title: string; body: string }[] = [
  { icon: "compass", title: "Built around your work", body: "We study how your school, hotel or factory runs, then build to fit it. Your team does not have to change everything." },
  { icon: "layers", title: "Start small", body: "Begin with the one problem that hurts most. Add more later on the same software." },
  { icon: "user", title: "People stay in charge", body: "AI only answers routine questions. Fee waivers, discounts and decisions stay with your staff." },
  { icon: "handshake", title: "We stay after launch", body: "Training, fixes and improvements continue after the software goes live." },
];

export const homeSafety: { icon: UiIconName; label: string }[] = [
  { icon: "users", label: "Each staff member sees only what they need" },
  { icon: "shield", label: "Secure login" },
  { icon: "clipboard", label: "A log of who changed what" },
  { icon: "user", label: "Important actions need approval" },
  { icon: "database", label: "Regular backups" },
  { icon: "cloud", label: "Secure cloud hosting" },
];

export const homeFaq = [
  { q: "What does Kyntriq Solutions do?", a: "We build websites, apps and software for schools, coaching centres, hotels, factories, clinics, CAs, consultants and small businesses. We also set up WhatsApp replies, reminders and AI assistants that work with your software." },
  { q: "We already use Excel, Tally or another software. Do we have to stop?", a: "No. We usually connect to what you already use. Replacing a tool is your choice, and only if it really helps." },
  { q: "What is an AI assistant, in simple words?", a: "It is a helper that replies to common questions on WhatsApp, your website or phone, using your own information like fees, timings or room rates. When a question needs a person, it passes it to your staff." },
  { q: "Will the AI take decisions on its own?", a: "Only simple, approved actions like sharing a form link or booking an open slot. Discounts, refunds, fee waivers and anything important stay with your team." },
  { q: "Can you send WhatsApp reminders for fees, bookings or appointments?", a: "Yes. Reminders and confirmations can go out automatically on WhatsApp, SMS or email, based on the dates in your software." },
  { q: "How much does it cost and how long does it take?", a: "It depends on what you need. After a short call we send a written plan with the cost and timeline for the first piece of work." },
  { q: "Is our data safe?", a: "Each staff member gets their own login and sees only what they need. Data is hosted securely, backed up regularly, and stays yours." },
  { q: "Are the examples on this site real clients?", a: "No. The examples are sample scenarios to show how the software works. They are not named clients and do not show real results." },
];
