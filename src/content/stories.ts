export type StoryPoint = {
  title: string;
  body: string;
};

export type SolutionStory = {
  eyebrow: string;
  headline: string;
  support: string;
  problem: string;
  workflow: string[];
  features: StoryPoint[];
  useCases: StoryPoint[];
};

export type IndustryStory = {
  hero: string;
  problems: StoryPoint[];
  solutions: StoryPoint[];
  ai: string;
  workflow: string[];
  cta: string;
};

export const sharedIntegrations = [
  "CRM",
  "WhatsApp",
  "Email",
  "Google",
  "Payments",
  "ERP",
  "APIs",
  "Databases",
];

export const deliverySteps: StoryPoint[] = [
  {
    title: "Discover",
    body: "Map who receives the request, which record is trusted, and which step is repeated.",
  },
  {
    title: "Design",
    body: "Specify the experience, the data, and the actions a person or an agent may take.",
  },
  {
    title: "Build",
    body: "Deliver the website, app, or internal system against that specification.",
  },
  {
    title: "Connect",
    body: "Join WhatsApp, payments, and the systems of record so the same update is not copied twice.",
  },
  {
    title: "Launch",
    body: "Deploy, monitor, and stay for the next improvement after the first release.",
  },
];

export const solutionStories: Record<string, SolutionStory> = {
  "ai-agents": {
    eyebrow: "AI Agents",
    headline: "AI agents that work inside your business.",
    support:
      "An agent looks up your information, decides on a next step you have already allowed, and writes the outcome into the system your team trusts.",
    problem:
      "A chat window that only replies still leaves someone to retype the request into a CRM, a booking sheet, or a ticket queue. The work is not done until the record changes.",
    workflow: ["Customer", "AI Agent", "Business Data", "Decision", "Action"],
    features: [
      {
        title: "A short list of allowed actions",
        body: "Check a status, create a ticket, hold a slot, or notify an owner. Anything outside the list goes to a person.",
      },
      {
        title: "Grounded in your information",
        body: "Answers come from the records and pages you control, not from a generic model reply.",
      },
      {
        title: "Write-back, not a transcript",
        body: "The useful test is simple: after the conversation, is the work done in the system of record?",
      },
      {
        title: "The same rules on every channel",
        body: "Website, WhatsApp, and voice can share one definition of a lead, a booking, or a ticket.",
      },
      {
        title: "A visible handoff",
        body: "When a person should decide, the agent passes the context already collected.",
      },
      {
        title: "Sales, support, and knowledge",
        body: "The pattern is the same. The difference is which records it may read and which actions it may take.",
      },
    ],
    useCases: [
      {
        title: "Application status",
        body: "A family asks where an application stands. The agent reads the record and notifies the admissions desk.",
      },
      {
        title: "Support that creates a ticket",
        body: "A request becomes a ticket in the queue that owns it, instead of a paragraph in a chat log.",
      },
      {
        title: "Sales follow-up",
        body: "A qualified enquiry is written to the CRM and the owner is told what to do next.",
      },
    ],
  },
  "voice-ai": {
    eyebrow: "Voice AI",
    headline: "Calls that finish a job, not only take a message.",
    support:
      "Callers can check a status, book, or raise a request. The outcome is written back into the same systems the desk already uses.",
    problem:
      "A call that only takes a message still leaves the front desk to do the work. People already phone admissions, bookings, and service lines. The useful call updates the record.",
    workflow: ["Caller", "Voice agent", "Business data", "Decision", "Confirmation"],
    features: [
      {
        title: "Common requests, resolved",
        body: "Status checks, straightforward bookings, and request capture are named in advance.",
      },
      {
        title: "Limits you choose",
        body: "Payments, exceptions, and complaints stay with staff unless you explicitly allow them.",
      },
      {
        title: "Same answer as chat",
        body: "Voice reads the same availability and status as the website and WhatsApp.",
      },
      {
        title: "Handoff with context",
        body: "When a person takes over, they receive what the caller already said.",
      },
    ],
    useCases: [
      {
        title: "Admissions line",
        body: "A parent checks an application status without waiting for the office to open a sheet.",
      },
      {
        title: "Hotel front desk",
        body: "A guest asks what is open. The agent holds a stay only when the rules are clear.",
      },
      {
        title: "Service requests",
        body: "A caller raises a request that lands in the queue, not in a voicemail inbox.",
      },
    ],
  },
  "whatsapp-automation": {
    eyebrow: "WhatsApp Automation",
    headline: "WhatsApp as a working channel, not the only copy of the lead.",
    support:
      "Capture the request, answer from your information, and notify the person who owns the next step.",
    problem:
      "Many teams already run the business from a WhatsApp thread. The thread then becomes the only copy of the lead, the booking, or the complaint.",
    workflow: ["WhatsApp message", "Capture", "Record", "Answer", "Notify owner"],
    features: [
      {
        title: "Lead capture",
        body: "A new message can create or update a record the rest of the team can open.",
      },
      {
        title: "Answers from your information",
        body: "Course details, availability, and status come from sources you control.",
      },
      {
        title: "Reminders and notifications",
        body: "Confirmations and follow-ups go out without a forwarded screenshot.",
      },
      {
        title: "Office hours stay explicit",
        body: "Customers are not promised a reply the team cannot keep.",
      },
    ],
    useCases: [
      {
        title: "Enquiry to CRM",
        body: "A WhatsApp enquiry becomes a lead with the next owner already notified.",
      },
      {
        title: "Booking confirmation",
        body: "Once a stay or seat is held, the confirmation is sent on the same thread.",
      },
      {
        title: "Fee or status reminder",
        body: "A reminder is tied to a record, so two people do not send two different versions.",
      },
    ],
  },
  "business-automation": {
    eyebrow: "Business Automation",
    headline: "The handoff your team repeats, run as a workflow.",
    support:
      "Enquiry to CRM, booking to confirmation, order to invoice. One path is named, connected, and left visible when a person still needs to decide.",
    problem:
      "Automation pays off on work that already has a known path. A workflow that hides the awkward cases just creates a second inbox.",
    workflow: ["Trigger", "Check", "Record", "Approval", "Notification"],
    features: [
      {
        title: "Start with one path",
        body: "Pick the handoff that blocks the day before connecting every tool.",
      },
      {
        title: "APIs and webhooks",
        body: "Create a record, send a message, update a status — ordinary steps, made reliable.",
      },
      {
        title: "AI only inside rules",
        body: "An agent may route a request. It may not invent a decision you have not named.",
      },
      {
        title: "Exceptions stay visible",
        body: "A person can see what happened and what is waiting.",
      },
    ],
    useCases: [
      {
        title: "Enquiry to follow-up",
        body: "Website enquiry, qualification, CRM, WhatsApp, and a sales notification.",
      },
      {
        title: "Booking to dashboard",
        body: "Online booking, payment, confirmation, and a view the desk can trust.",
      },
      {
        title: "Order to invoice",
        body: "Stock check, approval, production, invoice, and a customer notification.",
      },
    ],
  },
  "web-development": {
    eyebrow: "Web Development",
    headline: "Websites that take a request and hand it to the next step.",
    support:
      "Corporate sites, education portals, and customer applications that collect a complete record instead of publishing pages alone.",
    problem:
      "A site fails when it only explains the business. The useful version answers common questions and passes a complete request to the team or workflow that owns it.",
    workflow: ["Visitor", "Website", "Enquiry", "CRM", "Next step"],
    features: [
      {
        title: "A path, then the pages",
        body: "Who arrives, what they need to finish, and which system should hold the result.",
      },
      {
        title: "Portals and applications",
        body: "Accounts, content, and forms sit next to the records staff already use.",
      },
      {
        title: "Shared description of a lead",
        body: "The public site and the internal tools use one shape for an application, booking, or quote.",
      },
      {
        title: "Ready for an agent",
        body: "An AI agent can use the same information, with a defined set of actions.",
      },
    ],
    useCases: [
      {
        title: "Corporate site",
        body: "A visitor asks for a quote. The enquiry arrives complete, not as a loose email.",
      },
      {
        title: "Education portal",
        body: "A family starts an application and can see the status later.",
      },
      {
        title: "Customer portal",
        body: "A customer checks an order or a request without calling the office.",
      },
    ],
  },
  "mobile-applications": {
    eyebrow: "Mobile Applications",
    headline: "Apps for the people who do the work, and the people you serve.",
    support:
      "Attendance, bookings, orders, approvals, and updates — reading and writing the same records as the website and the dashboard.",
    problem:
      "A second app that keeps its own copy of the business just adds another place to reconcile. The phone should be another view of the same system.",
    workflow: ["Person", "Mobile app", "Shared record", "Notification", "Dashboard"],
    features: [
      {
        title: "Built around a job away from a desk",
        body: "A parent checking a fee, a guest changing a booking, a supervisor approving a request.",
      },
      {
        title: "Customer and staff apps",
        body: "Both can share the same student, guest, order, or ticket.",
      },
      {
        title: "Notifications tied to a record",
        body: "A message says something changed. It is not the only place that information exists.",
      },
      {
        title: "Android and iOS",
        body: "The channel follows the job, not a separate product strategy.",
      },
    ],
    useCases: [
      {
        title: "Approvals",
        body: "A manager approves a request that already exists in the operational system.",
      },
      {
        title: "Attendance and orders",
        body: "Field or campus updates land in the same record the office sees.",
      },
      {
        title: "Guest or parent updates",
        body: "The person you serve follows the status without a phone call.",
      },
    ],
  },
  "business-software": {
    eyebrow: "Business Software",
    headline: "Software shaped around how the organization already works.",
    support:
      "CRM, portals, dashboards, and internal systems: pipelines, records, roles, and the reports managers actually open.",
    problem:
      "Sales, operations, and finance often keep three spreadsheets for the same customer. Each handoff is a chance to lose the status.",
    workflow: ["Request", "Record", "Role", "Workflow", "Report"],
    features: [
      {
        title: "Process before screens",
        body: "The steps your team already takes decide the software, not a generic module list.",
      },
      {
        title: "Roles",
        body: "Who can see a record, who can change it, and who only needs a summary.",
      },
      {
        title: "One record, many views",
        body: "Each team gets the view they need from the same customer, order, or student.",
      },
      {
        title: "Live reports",
        body: "A dashboard reads the record. A chart from last week’s export is a second opinion.",
      },
    ],
    useCases: [
      {
        title: "Custom CRM",
        body: "Follow-up that matches how your team actually sells or admits.",
      },
      {
        title: "Operations portal",
        body: "Approvals and status in one place instead of a shared inbox.",
      },
      {
        title: "Management dashboard",
        body: "What is waiting, drawn from the system people update during the day.",
      },
    ],
  },
  "cloud-devops": {
    eyebrow: "Cloud & DevOps",
    headline: "A calm path from a change to a running system.",
    support:
      "Deployment, monitoring, backups, and access treated as part of the product — not a later patch.",
    problem:
      "A portal or an agent is unfinished if only one person knows how to deploy it, or if a test can write into live student, guest, or customer data.",
    workflow: ["Change", "Review", "Deploy", "Monitor", "Restore"],
    features: [
      {
        title: "Repeatable releases",
        body: "A change follows the same path every time, with environments kept separate.",
      },
      {
        title: "Monitoring",
        body: "You can see that the system is healthy instead of waiting for a complaint.",
      },
      {
        title: "Backups and access",
        body: "Restore a record, and decide who can reach production.",
      },
      {
        title: "Room for the next workflow",
        body: "The next product should not need a new hosting design.",
      },
    ],
    useCases: [
      {
        title: "First production release",
        body: "The website, app, or agent ships with a way to update it.",
      },
      {
        title: "A system of record",
        body: "Student, guest, or order data is backed up and access is explicit.",
      },
      {
        title: "The next workflow",
        body: "A later automation sits on the same foundation.",
      },
    ],
  },
  education: {
    eyebrow: "Education systems",
    headline: "From enquiry to student record, without retyping the family.",
    support:
      "Admissions, students, fees, and parent updates in one chain a school, college, or coaching desk can actually run.",
    problem:
      "An enquiry becomes an application, then a student, a fee, an attendance mark, and a message to a parent. When each lives in a different sheet, the status a parent hears is whichever version was copied last.",
    workflow: ["Enquiry", "AI Agent", "CRM", "Admission", "Student management"],
    features: [
      {
        title: "Admissions status",
        body: "One status a caller, a chat, and the office can all trust.",
      },
      {
        title: "Student records",
        body: "Attendance, fees, and exams attached to the same student.",
      },
      {
        title: "Parent communication",
        body: "Updates tied to the record, not to a personal chat.",
      },
      {
        title: "A narrow assistant",
        body: "It can look up a status. Seat decisions and fee exceptions stay with staff.",
      },
    ],
    useCases: [
      {
        title: "Coaching admissions",
        body: "Two counsellors stop answering the same parent from different chats.",
      },
      {
        title: "School office",
        body: "Fees and attendance are not a second project after the website.",
      },
      {
        title: "College cycle",
        body: "Programmes and department handoffs share one application.",
      },
    ],
  },
  hospitality: {
    eyebrow: "Hospitality systems",
    headline: "The front desk should not be the only database.",
    support:
      "Enquiries, bookings, and guest messages meet in one stay before anyone arrives.",
    problem:
      "Guests write, call, and book online. If the only complete story is in someone’s memory, the next shift starts again.",
    workflow: ["Enquiry", "Availability", "Booking", "Confirmation", "Stay"],
    features: [
      {
        title: "One guest record",
        body: "The stay, the requests, and what was already confirmed.",
      },
      {
        title: "Channels that agree",
        body: "Website, WhatsApp, and voice read one availability list.",
      },
      {
        title: "Agents that may not guess",
        body: "A straightforward stay can be completed. Exceptions go to a person.",
      },
      {
        title: "Operations view",
        body: "Arrivals and open requests, not a forwarded message.",
      },
    ],
    useCases: [
      {
        title: "Room enquiry",
        body: "A WhatsApp question checks availability and can hold a room.",
      },
      {
        title: "Confirmation",
        body: "Email and WhatsApp send the same confirmation.",
      },
      {
        title: "Shift handover",
        body: "The next shift sees the stay, not a personal chat history.",
      },
    ],
  },
  manufacturing: {
    eyebrow: "Manufacturing systems",
    headline: "See the order while it is still moving.",
    support:
      "Inventory, production, and orders in one operational picture, with the repeated handoffs running as a workflow.",
    problem:
      "Inventory, production, and dispatch are often updated by different people in different files. A manager then waits for someone to assemble a report.",
    workflow: ["Order", "Stock check", "Approval", "Production", "Notification"],
    features: [
      {
        title: "One picture of the order",
        body: "A status change on the floor is the same status a notification can use.",
      },
      {
        title: "Approvals that stay visible",
        body: "Custom work and quality holds are not forced through.",
      },
      {
        title: "Invoices and notifications",
        body: "The customer update is the last step of the path, not a separate project.",
      },
      {
        title: "Live reports",
        body: "What is late and what is waiting, from the records the floor updates.",
      },
    ],
    useCases: [
      {
        title: "New order",
        body: "Stock is checked before anyone copies a row into another sheet.",
      },
      {
        title: "Production status",
        body: "A manager sees what is waiting without asking for an export.",
      },
      {
        title: "Customer notification",
        body: "The buyer hears the status that the floor just recorded.",
      },
    ],
  },
};

export const industryStories: Record<string, IndustryStory> = {
  education: {
    hero: "Technology for institutions that manage thousands of students.",
    problems: [
      { title: "Admissions", body: "Enquiries arrive on a form, on WhatsApp, and at the front desk." },
      { title: "Attendance", body: "Daily marks live in a sheet the parent cannot see." },
      { title: "Fees", body: "A fee status is copied into chat instead of read from the record." },
      { title: "Exams", body: "Results and schedules move through yet another file." },
      { title: "Communication", body: "Parents hear whichever version was copied last." },
    ],
    solutions: [
      { title: "AI admission agent", body: "Answers course questions and reports a status. Seat decisions stay with staff." },
      { title: "Student portal", body: "Families and students see the same application the office updates." },
      { title: "Management system", body: "Admissions, attendance, fees, and exams on one student." },
      { title: "WhatsApp automation", body: "Reminders and follow-up tied to the record, not a personal thread." },
    ],
    ai: "An assistant can check application status, course availability, and what document is missing. It should not invent a fee waiver or a seat.",
    workflow: ["Enquiry", "AI Agent", "CRM", "Admission", "Student management"],
    cta: "Build your education system.",
  },
  schools: {
    hero: "A school office that is not retyping the same family into attendance, fees, and chat.",
    problems: [
      { title: "Front office", body: "The enquiry, the admission, and the parent chat are three stories." },
      { title: "Attendance", body: "Teachers mark a register that parents only hear about later." },
      { title: "Fees", body: "Reminders depend on whoever remembers the due date." },
    ],
    solutions: [
      { title: "Admissions desk", body: "One status from the first enquiry through enrolment." },
      { title: "Parent updates", body: "Fee and attendance messages read the student record." },
      { title: "Staff view", body: "The office sees what is waiting without assembling a sheet." },
    ],
    ai: "Parents can ask where an application or a fee stands. Exceptions still go to the office.",
    workflow: ["Enquiry", "Admission", "Student record", "Fee", "Parent update"],
    cta: "Build the system your school office runs.",
  },
  colleges: {
    hero: "Programmes, admissions cycles, and department handoffs on one application.",
    problems: [
      { title: "Cycles", body: "Each intake starts a new sheet instead of a new status on the same system." },
      { title: "Departments", body: "A programme office and the central desk do not share the application." },
      { title: "Counselling", body: "The conversation is in chat. The decision is somewhere else." },
    ],
    solutions: [
      { title: "Application record", body: "One application through enquiry, offer, and enrolment." },
      { title: "Department handoff", body: "The next office sees what was already collected." },
      { title: "Status assistant", body: "Applicants can check progress without a new email thread." },
    ],
    ai: "An agent can explain a programme and report status. Offers and exceptions stay with staff.",
    workflow: ["Enquiry", "Programme", "Application", "Department", "Enrolment"],
    cta: "Build your admissions system.",
  },
  coaching: {
    hero: "Enquiries, batches, and follow-up for a coaching desk that currently lives in WhatsApp.",
    problems: [
      { title: "Two counsellors", body: "The same parent gets two answers from two chats." },
      { title: "Batches", body: "Seat availability is a memory, not a list." },
      { title: "Follow-up", body: "The next call depends on who remembers the family." },
    ],
    solutions: [
      { title: "Enquiry capture", body: "WhatsApp and the website write the same lead." },
      { title: "Batch view", body: "Open seats are a record the assistant can read." },
      { title: "Follow-up", body: "The owner of the next step is notified with the context already captured." },
    ],
    ai: "The agent can check a batch and collect missing details. Counselling stays with a person.",
    workflow: ["WhatsApp enquiry", "AI Agent", "Lead", "Batch", "Follow-up"],
    cta: "Build your admissions follow-up.",
  },
  hospitality: {
    hero: "Bookings, guests, and messages for properties that should not run on a front-desk inbox.",
    problems: [
      { title: "Enquiries", body: "Website, WhatsApp, and phone each start a different story." },
      { title: "Bookings", body: "Availability is checked in one place and confirmed in another." },
      { title: "Guest requests", body: "The next shift inherits a chat, not a stay." },
    ],
    solutions: [
      { title: "Booking path", body: "One availability list for every channel." },
      { title: "Guest record", body: "The stay holds the requests and what was already promised." },
      { title: "AI booking agent", body: "Straightforward stays can be held. Rate exceptions go to staff." },
      { title: "Operations", body: "Arrivals and open requests in one view." },
    ],
    ai: "A guest can ask what is open and receive a confirmation when the rules are clear. Complaints and policy changes stay with the desk.",
    workflow: ["Enquiry", "Availability", "Booking", "Confirmation", "Stay"],
    cta: "Build your hospitality system.",
  },
  hotels: {
    hero: "Room enquiries, confirmations, and guest messages for a single property.",
    problems: [
      { title: "Rooms", body: "Two channels can describe the same night differently." },
      { title: "Confirmations", body: "WhatsApp says one thing and email says another." },
      { title: "Handover", body: "Special requests live in the chat of whoever answered." },
    ],
    solutions: [
      { title: "One availability list", body: "Website, WhatsApp, and voice read the same rooms." },
      { title: "Confirmation", body: "The guest receives the stay that was actually held." },
      { title: "Desk view", body: "The next shift sees the request on the stay." },
    ],
    ai: "The agent may check a room and send a confirmation. It may not invent a rate.",
    workflow: ["Enquiry", "Room", "Hold", "Confirmation", "Arrival"],
    cta: "Build the booking path for your property.",
  },
  manufacturing: {
    hero: "Inventory, production, and orders visible while the work is still moving.",
    problems: [
      { title: "Inventory", body: "Stock is a sheet updated after the floor has already moved." },
      { title: "Production", body: "Status lives with the person who last edited the file." },
      { title: "Orders", body: "The customer is notified from a different copy than the one production uses." },
    ],
    solutions: [
      { title: "Order record", body: "Stock check, approval, and production share one order." },
      { title: "Workflow", body: "The known path runs. Quality holds stay visible." },
      { title: "Reports", body: "What is late is read from the live record." },
    ],
    ai: "An assistant can answer where an order stands. It should not skip an approval or a quality hold.",
    workflow: ["Order", "Stock", "Approval", "Production", "Notification"],
    cta: "Build your operational picture.",
  },
  "corporate-smes": {
    hero: "Sales, people, and operations connected for companies that have outgrown a stack of files.",
    problems: [
      { title: "Leads", body: "A quote lives in a sheet and the invoice lives somewhere else." },
      { title: "Follow-up", body: "The next step depends on a personal inbox." },
      { title: "Reports", body: "Monday’s dashboard is last week’s export." },
    ],
    solutions: [
      { title: "CRM", body: "One customer record for sales follow-up." },
      { title: "Operations", body: "Approvals and work status beside that customer." },
      { title: "Dashboards", body: "Reports drawn from the record people update." },
      { title: "Automation", body: "The repeated handoff runs. Exceptions stay visible." },
    ],
    ai: "An agent can capture a lead, book a demo, or draft a status from the CRM. Pricing exceptions stay with the team.",
    workflow: ["Lead", "CRM", "Follow-up", "Work", "Report"],
    cta: "Build the system your teams share.",
  },
  healthcare: {
    hero: "Appointments, patient communication, and follow-up that do not depend on a front-desk inbox.",
    problems: [
      { title: "Appointments", body: "A call, a WhatsApp message, and a walk-in each keep a different slot list." },
      { title: "Follow-up", body: "Reminders are sent from memory after the visit." },
      { title: "Front desk", body: "The inbox is the schedule." },
    ],
    solutions: [
      { title: "Appointment record", body: "One schedule for phone, web, and WhatsApp." },
      { title: "Notifications", body: "Confirmations and reminders tied to the appointment." },
      { title: "AI assistant", body: "Patients can ask what is open or confirm a visit. Clinical decisions stay with staff." },
    ],
    ai: "The assistant can check availability and send a confirmation. It does not give clinical advice or change a treatment plan.",
    workflow: ["Request", "Availability", "Appointment", "Reminder", "Follow-up"],
    cta: "Build your appointment system.",
  },
  "professional-services": {
    hero: "Leads, client work, and reporting for firms that still reconcile the week in a spreadsheet.",
    problems: [
      { title: "Leads", body: "A new enquiry is a chat until someone remembers to log it." },
      { title: "Client work", body: "Status lives in email between the team and the client." },
      { title: "Reporting", body: "The partner asks for a view nobody can produce without copying." },
    ],
    solutions: [
      { title: "Lead management", body: "Enquiry to owner, with the next step visible." },
      { title: "Client portal", body: "The client sees status without a status meeting." },
      { title: "Automation", body: "Reminders and handoffs that already have a known path." },
    ],
    ai: "An assistant can qualify a lead and answer from your service information. Proposals and exceptions stay with the team.",
    workflow: ["Lead", "Qualification", "Proposal", "Delivery", "Report"],
    cta: "Build the system your practice runs.",
  },
};

export const systemNodes = [
  {
    id: "website",
    label: "Website",
    detail: "A visitor asks for a course, a room, or a quote. The request is captured as a record, not left in a form inbox.",
  },
  {
    id: "mobile",
    label: "Mobile",
    detail: "Staff and customers follow the same rules from a phone — attendance, orders, bookings, or approvals.",
  },
  {
    id: "agent",
    label: "AI Agent",
    detail: "AI that can understand, decide, and act inside a list of actions you have already named.",
  },
  {
    id: "crm",
    label: "CRM",
    detail: "Customers, leads, conversations, and business data in the record the team already trusts.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "A message can capture a lead, answer from your information, and notify the owner of the next step.",
  },
  {
    id: "automation",
    label: "Automation",
    detail: "Workflows that move information and trigger actions, with exceptions left visible.",
  },
  {
    id: "data",
    label: "Business Data",
    detail: "The shared records — students, guests, orders, tickets — that every channel reads and writes.",
  },
] as const;

export const comparisonRows = [
  ["Website", "Business system"],
  ["Features", "Workflow"],
  ["Separate tools", "Connected systems"],
  ["AI chatbot", "AI that can take action"],
  ["Launch", "Long-term partnership"],
] as const;
