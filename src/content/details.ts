import type { UiIconName } from "@/components/icons";
import { bannerFor } from "@/content/new-images";

/*
 * Solution and industry detail pages. One template, plain English,
 * everyday Indian examples. No invented numbers, clients or results.
 * Every walkthrough is a labelled sample.
 */

export type DetailKind = "solution" | "industry";

export type DetailPage = {
  slug: string;
  kind: DetailKind;
  /** Short name used in menus, cards and breadcrumbs. */
  name: string;
  icon: UiIconName;
  /** Page <h1>. */
  heading: string;
  /** One or two plain sentences under the heading. Also the meta description. */
  intro: string;
  photo: { src: string; alt: string; width?: number; height?: number };
  /** Who this is for, shown as chips in the header. */
  forWho: string[];
  problems: { problem: string; fix: string }[];
  builds: { title: string; body: string }[];
  sample: { title: string; steps: { title: string; body: string }[] };
  faqs: { q: string; a: string }[];
  cta: { title: string; description: string };
  /** Solution slugs shown under "Often used together". */
  related: string[];
  /** For sub-industries such as schools under education. */
  parent?: { slug: string; name: string };
};

type DetailInput = Omit<DetailPage, "photo">;

const solutionInput: DetailInput[] = [
  {
    slug: "web-development",
    kind: "solution",
    name: "Websites",
    icon: "globe",
    heading: "Websites that bring you enquiries, not just visitors.",
    intro: "A clear, fast website for your school, hotel, clinic or business in Visakhapatnam or anywhere in India, with forms and WhatsApp buttons that send every enquiry straight to your team.",
    forWho: ["Schools and colleges", "Hotels", "Clinics", "Factories", "Small businesses"],
    problems: [
      { problem: "The website looks old and parents or customers call to ask basic questions.", fix: "Fees, timings, courses, room types or products are easy to find on any phone." },
      { problem: "Enquiry forms go to an email inbox nobody checks.", fix: "Every form reaches the right person on WhatsApp or email, and is saved in a list." },
      { problem: "Updating the website needs a developer every time.", fix: "Your staff can change notices, prices and photos themselves." },
    ],
    builds: [
      { title: "Business and institution websites", body: "Home, about, courses or services, gallery and contact pages that load quickly on mobile." },
      { title: "Online forms", body: "Admission, booking, appointment and quotation forms that check details before they are sent." },
      { title: "Portals and logins", body: "Parent, student, customer or dealer logins to see fees, bookings, orders or documents." },
      { title: "Search-friendly pages", body: "Clear page titles and descriptions so people find you on Google when they search for your area." },
    ],
    sample: {
      title: "A parent fills the admission form at night",
      steps: [
        { title: "Form filled on mobile", body: "A parent opens the school website on their phone and fills the Class 1 admission form." },
        { title: "Details checked", body: "The form checks the phone number and asks for any missing detail before sending." },
        { title: "Saved and shared", body: "The enquiry is saved in the admission list and the office gets a WhatsApp alert." },
        { title: "Parent gets a reply", body: "The parent receives a thank-you message with the next steps and office timings." },
      ],
    },
    faqs: [
      { q: "Can you redesign our existing website?", a: "Yes. We can keep your domain and content, and rebuild the design so it works well on mobile." },
      { q: "Will we be able to update it ourselves?", a: "Yes. We set up simple editing for notices, prices, photos and pages, and show your staff how to use it." },
      { q: "Can the website connect to our software later?", a: "Yes. Forms and logins can connect to the software you use now, or to software we build for you later." },
    ],
    cta: { title: "Planning a new website?", description: "Tell us what you want visitors to do on it, and we will suggest a simple plan." },
    related: ["mobile-applications", "whatsapp-automation", "business-software"],
  },
  {
    slug: "mobile-applications",
    kind: "solution",
    name: "Mobile apps",
    icon: "smartphone",
    heading: "Mobile apps your staff and customers will actually use.",
    intro: "Simple Android and iPhone apps for parents, students, guests, field staff or customers, built around the few things they need to do every day.",
    forWho: ["Schools and coaching", "Hotels", "Factories", "Sales and field teams"],
    problems: [
      { problem: "Staff mark attendance or visits on paper and someone types it in later.", fix: "Staff mark it on the app, and the office sees it at once." },
      { problem: "Parents or customers keep calling for the same updates.", fix: "They check fees, homework, bookings or order status on the app." },
      { problem: "Field staff send photos and updates on personal WhatsApp groups.", fix: "Photos, visits and notes are saved in one place with date and location." },
    ],
    builds: [
      { title: "Parent and student apps", body: "Homework, attendance, fee dues, circulars and results in one app." },
      { title: "Staff and field apps", body: "Attendance, visit reports, order taking and photo uploads, even with weak network." },
      { title: "Customer apps", body: "Bookings, order tracking, payments and support requests." },
      { title: "Notifications", body: "Alerts for fee dues, order updates or new circulars, sent from your software." },
    ],
    sample: {
      title: "A sales person books an order at a shop",
      steps: [
        { title: "Visit logged", body: "The sales person opens the app at the shop, and the visit is saved with time and location." },
        { title: "Order taken", body: "Items and quantities are picked from the product list. No paper slip." },
        { title: "Office sees it", body: "The order appears in the office software and the stock team is told." },
        { title: "Shop gets an update", body: "The shop owner gets a WhatsApp message when the order is dispatched." },
      ],
    },
    faqs: [
      { q: "Android, iPhone or both?", a: "Usually both, from one codebase. If your users are mostly on Android, we can start there." },
      { q: "Will it work with poor internet?", a: "Field apps can save entries on the phone and send them when the network returns." },
      { q: "Do we need to publish it on the Play Store?", a: "For customer or parent apps, yes, and we handle that. Staff-only apps can also be shared privately." },
    ],
    cta: { title: "Have an app idea?", description: "Tell us who will use it and the three things they should be able to do. We will take it from there." },
    related: ["business-software", "web-development", "cloud-devops"],
  },
  {
    slug: "business-software",
    kind: "solution",
    name: "Business software",
    icon: "blocks",
    heading: "Software built around how your business already runs.",
    intro: "Custom software for admissions, fees, bookings, orders, stock or sales, so your team stops juggling registers, Excel sheets and WhatsApp chats.",
    forWho: ["Schools and coaching", "Hotels", "Factories", "Clinics", "Small businesses"],
    problems: [
      { problem: "The same customer or student details are typed into three different sheets.", fix: "Details are entered once and used everywhere they are needed." },
      { problem: "Ready-made software forces you to change the way you work.", fix: "Screens and steps are designed around your current process." },
      { problem: "The owner has to call people to know today's position.", fix: "A simple dashboard shows enquiries, collections, orders or bookings for the day." },
    ],
    builds: [
      { title: "Management software", body: "Student, fee and exam management, booking management, or order and stock tracking." },
      { title: "CRM for enquiries and sales", body: "Every lead with its source, owner and next follow-up date." },
      { title: "Owner's dashboard", body: "Today's numbers from your own data, on desktop and mobile." },
      { title: "Bills and documents", body: "GST invoices, receipts, quotations and reports generated from the data you already have." },
    ],
    sample: {
      title: "A coaching centre collects a fee instalment",
      steps: [
        { title: "Due date arrives", body: "The software sees that a student's second instalment is due today." },
        { title: "Reminder sent", body: "A WhatsApp reminder with the amount and payment link goes to the parent." },
        { title: "Payment received", body: "When the parent pays, the fee record updates on its own." },
        { title: "Receipt and report", body: "A receipt is sent, and the day's collection report is ready for the owner." },
      ],
    },
    faqs: [
      { q: "Why custom software and not a ready-made package?", a: "Ready-made software works if your process matches it. Custom software fits the way your team already works, and you only pay for what you use." },
      { q: "Can you import our old Excel data?", a: "Yes. We clean and import your existing sheets so you do not start from zero." },
      { q: "Can it work with Tally?", a: "We can usually export or sync invoices and payments in a format your accountant can use in Tally. We confirm this after seeing your setup." },
    ],
    cta: { title: "Tired of Excel and registers?", description: "Show us how the work happens today. We will suggest what the first version of your software should do." },
    related: ["business-automation", "mobile-applications", "cloud-devops"],
  },
  {
    slug: "ai-agents",
    kind: "solution",
    name: "AI assistants",
    icon: "bot",
    heading: "AI assistants that answer your customers, using your own information.",
    intro: "A helper on WhatsApp or your website that replies to common questions at any hour, from your fees, timings, rates or stock, and hands anything important to your staff.",
    forWho: ["Schools and coaching", "Hotels", "Clinics", "Shops and small businesses"],
    problems: [
      { problem: "The same ten questions come in all day: fees, timings, location, availability.", fix: "The assistant answers them instantly, using information you approve." },
      { problem: "Messages after office hours wait until next morning.", fix: "People get an answer at night, and your staff see the chat in the morning." },
      { problem: "A chatbot that gives wrong or made-up answers is worse than none.", fix: "It only answers from your information. If it is not sure, it passes the chat to a person." },
    ],
    builds: [
      { title: "WhatsApp assistant", body: "Replies on your WhatsApp Business number and saves each enquiry." },
      { title: "Website chat", body: "A chat box that answers questions and collects name and number." },
      { title: "Simple actions", body: "Share a form link, check a room or slot, or tell someone the status of an application or order." },
      { title: "Hand-over to staff", body: "Anything about discounts, refunds, complaints or decisions goes to your team with the full chat." },
    ],
    sample: {
      title: "A guest asks about a room late at night",
      steps: [
        { title: "Question arrives", body: "\"Do you have a family room for 2 nights from Friday?\" comes in at 11 PM." },
        { title: "Checks the room list", body: "The assistant looks at today's availability, not a fixed answer." },
        { title: "Replies with options", body: "It shares the room type, price and a link to book or pay." },
        { title: "Front desk sees it", body: "The chat and booking request are waiting for the front desk in the morning." },
      ],
    },
    faqs: [
      { q: "Will it make up answers?", a: "It is set up to answer only from information you give it. When it does not know, it says so and passes the chat to your staff." },
      { q: "Can it reply in Hindi, Telugu or other languages?", a: "Many Indian languages can be supported. We test the languages your customers use before going live." },
      { q: "Can it give discounts or change bookings?", a: "Only if you allow a specific, simple action. Discounts, refunds and exceptions stay with your team by default." },
    ],
    cta: { title: "Want an assistant for your WhatsApp?", description: "Send us the questions you get most often. We will show you how the assistant would answer them." },
    related: ["whatsapp-automation", "voice-ai", "business-software"],
  },
  {
    slug: "voice-ai",
    kind: "solution",
    name: "Phone assistant",
    icon: "audio",
    heading: "A phone assistant for calls your staff cannot pick up.",
    intro: "An AI voice assistant that answers routine calls, such as appointment bookings, status checks and timings, and passes other calls to your team.",
    forWho: ["Clinics", "Hotels", "Coaching centres", "Service businesses"],
    problems: [
      { problem: "The reception phone rings all day and calls are missed during busy hours.", fix: "The assistant answers routine calls so staff can focus on people in front of them." },
      { problem: "Callers ask the same things: timings, address, fees, availability.", fix: "These are answered from your information, in a clear voice." },
      { problem: "Missed calls are never called back.", fix: "Each call is noted with the caller's number and request, so your team can follow up." },
    ],
    builds: [
      { title: "Call answering", body: "Greets callers, understands what they want and answers simple questions." },
      { title: "Bookings by phone", body: "Books an open slot for an appointment, a demo class or a table." },
      { title: "Call notes", body: "Saves a short summary of every call for your team." },
      { title: "Transfer to staff", body: "Sends the call or a callback request to a person when needed." },
    ],
    sample: {
      title: "A patient calls to book an OPD appointment",
      steps: [
        { title: "Call answered", body: "The assistant picks up and asks which doctor and day the patient wants." },
        { title: "Slot checked", body: "It checks the doctor's open OPD slots for that day." },
        { title: "Booked", body: "The patient picks a time and gets an SMS or WhatsApp confirmation." },
        { title: "Reception informed", body: "The booking appears in the clinic's appointment list." },
      ],
    },
    faqs: [
      { q: "Will callers know it is an assistant?", a: "Yes. It introduces itself clearly, and callers can ask to speak to a person." },
      { q: "Which languages can it speak?", a: "English and several Indian languages can be supported. We test your callers' languages before launch." },
      { q: "Does it give medical or legal advice?", a: "No. It handles bookings and routine questions only. Anything else goes to your staff." },
    ],
    cta: { title: "Missing too many calls?", description: "Tell us what most callers ask for. We will show you which calls the assistant can handle." },
    related: ["ai-agents", "whatsapp-automation", "business-software"],
  },
  {
    slug: "whatsapp-automation",
    kind: "solution",
    name: "WhatsApp automation",
    icon: "message",
    heading: "WhatsApp messages that go out on their own, at the right time.",
    intro: "Fee reminders, booking confirmations, appointment reminders and order updates sent automatically from your software on WhatsApp Business — a common request from Vizag schools, hotels and clinics.",
    forWho: ["Schools and coaching", "Hotels", "Clinics", "Factories", "Shops"],
    problems: [
      { problem: "Staff send reminders one by one from their own phones.", fix: "Reminders go out automatically from your official number." },
      { problem: "Messages are forgotten on busy days.", fix: "They are sent based on dates and status in your software, every time." },
      { problem: "Replies are lost in personal chats.", fix: "Every reply comes back to one shared inbox your team can see." },
    ],
    builds: [
      { title: "Reminders", body: "Fee dues, appointment day, payment pending, document missing." },
      { title: "Confirmations", body: "Booking, admission, order or payment confirmations with details." },
      { title: "Updates", body: "Order dispatched, report ready, class rescheduled, room ready." },
      { title: "Shared team inbox", body: "Your team replies from one WhatsApp Business number, with chat history." },
    ],
    sample: {
      title: "A school sends fee reminders",
      steps: [
        { title: "Dues checked", body: "On the 5th of the month, the software lists students with fees pending." },
        { title: "Reminder sent", body: "Each parent gets a WhatsApp message with the amount and a payment link." },
        { title: "Paid", body: "Parents who pay are marked paid and get a receipt on WhatsApp." },
        { title: "Gentle follow-up", body: "Parents who have not paid get one more reminder a few days later." },
      ],
    },
    faqs: [
      { q: "Is this the official WhatsApp Business API?", a: "Yes. We set up messages through an approved WhatsApp Business provider, so your number is not blocked for bulk sending." },
      { q: "Do we need new software for this?", a: "Not always. We can connect to your current software or sheets, or build a simple one if needed." },
      { q: "Is there a cost per message?", a: "WhatsApp charges per conversation, based on its current pricing. We explain the expected cost for your volume before starting." },
    ],
    cta: { title: "Want reminders to send themselves?", description: "Tell us which messages your team sends by hand today. We will suggest which ones to automate first." },
    related: ["ai-agents", "business-automation", "business-software"],
  },
  {
    slug: "business-automation",
    kind: "solution",
    name: "Automation",
    icon: "workflow",
    heading: "Automate the boring, repeated steps in your daily work.",
    intro: "We find the copy-paste and follow-up work your team does every day, such as entering enquiries, making invoices or sending reports, and make it happen on its own.",
    forWho: ["Factories", "Schools and coaching", "Hotels", "Small businesses"],
    problems: [
      { problem: "Someone copies data from email or WhatsApp into Excel every day.", fix: "The data is picked up and saved automatically." },
      { problem: "Invoices and reports are made by hand at the end of the day.", fix: "They are created on their own and sent to the right people." },
      { problem: "Approvals wait because the manager did not see the message.", fix: "The manager gets an approval request on mobile and approves in one tap." },
    ],
    builds: [
      { title: "Data entry automation", body: "Enquiries, orders and forms saved to your software without typing." },
      { title: "Documents on their own", body: "GST invoices, receipts, quotations and certificates created from your data." },
      { title: "Approvals on mobile", body: "Purchase, discount or leave approvals sent to the right manager." },
      { title: "Scheduled reports", body: "Daily or weekly reports sent to owners on email or WhatsApp." },
    ],
    sample: {
      title: "A purchase order moves through a factory",
      steps: [
        { title: "Order arrives", body: "A customer's purchase order arrives by email and is saved as a new order." },
        { title: "Stock checked", body: "Available raw material is checked and any shortage is flagged." },
        { title: "Approved on mobile", body: "The manager gets a request on the phone and approves the order." },
        { title: "Invoice sent", body: "After dispatch, the GST invoice is created and emailed to the customer." },
      ],
    },
    faqs: [
      { q: "What should we automate first?", a: "The step that is repeated most often and causes the most mistakes or delays. We help you find it in the first call." },
      { q: "Will automation replace our staff?", a: "No. It takes away repeated typing and follow-ups, so your staff can spend time on customers and decisions." },
      { q: "What if something goes wrong?", a: "Each automatic step is logged. If something fails, your team is alerted and can finish it by hand." },
    ],
    cta: { title: "Which task does your team repeat most?", description: "Tell us about it. We will show you how it could run on its own." },
    related: ["business-software", "whatsapp-automation", "cloud-devops"],
  },
  {
    slug: "cloud-devops",
    kind: "solution",
    name: "Hosting and support",
    icon: "cloud",
    heading: "Hosting, security and support, so your software keeps running.",
    intro: "We put your website and software online on secure cloud servers, keep backups, watch for problems and fix them, so you do not need your own IT team.",
    forWho: ["Any business running software or a website"],
    problems: [
      { problem: "The website or software goes down and nobody knows why.", fix: "It is monitored, and we are alerted when something goes wrong." },
      { problem: "There is no backup if data is deleted by mistake.", fix: "Regular backups are kept so data can be restored." },
      { problem: "Every small change needs the original developer.", fix: "Changes are tracked and released safely by our team." },
    ],
    builds: [
      { title: "Secure cloud hosting", body: "Your software runs on reliable cloud servers with proper access control." },
      { title: "Backups", body: "Regular backups of your data, with a way to restore it." },
      { title: "Monitoring and alerts", body: "We watch uptime and errors, and act when there is a problem." },
      { title: "Updates and support", body: "Security updates, small changes and help for your team." },
    ],
    sample: {
      title: "A school website stays up on result day",
      steps: [
        { title: "Busy day expected", body: "Before result day, the server is prepared for more visitors." },
        { title: "Watched live", body: "Speed and errors are monitored through the day." },
        { title: "Problem caught", body: "If pages slow down, our team is alerted and fixes it." },
        { title: "Backup kept", body: "Data is backed up before and after the results are published." },
      ],
    },
    faqs: [
      { q: "Can you host software built by someone else?", a: "Often yes. We first review the code and setup, then suggest how to host and support it." },
      { q: "Where is our data stored?", a: "On cloud servers, with an Indian region preferred where available. We confirm the location with you." },
      { q: "Who owns the code and data?", a: "You do. Ownership is written into our agreement." },
    ],
    cta: { title: "Worried about your current hosting?", description: "Tell us what you run today. We will check it and suggest what to improve." },
    related: ["business-software", "web-development", "business-automation"],
  },
];

const industryInput: DetailInput[] = [
  {
    slug: "education",
    kind: "industry",
    name: "Education",
    icon: "graduation",
    heading: "Software for schools, colleges and coaching centres.",
    intro: "From the first admission enquiry to fee receipts, attendance and parent updates — built by our Visakhapatnam team for education offices across India.",
    forWho: ["Schools", "Colleges", "Coaching centres", "Training institutes"],
    problems: [
      { problem: "Admission enquiries come from the website, WhatsApp, calls and walk-ins, and some are never followed up.", fix: "All enquiries go into one admission list with a follow-up date." },
      { problem: "Fee dues are tracked in a register and reminders are sent by hand.", fix: "Reminders and receipts go out on WhatsApp on their own." },
      { problem: "Parents call the office for attendance, homework and circulars.", fix: "Parents see them on an app or get a WhatsApp update." },
    ],
    builds: [
      { title: "Admission management", body: "Enquiries, applications, documents and seat status in one list." },
      { title: "Fees and receipts", body: "Fee structures, instalments, online payments and receipts." },
      { title: "Attendance and academics", body: "Attendance, timetables, batches, exams and report cards." },
      { title: "Parent communication", body: "Circulars, reminders and updates on WhatsApp or a parent app." },
    ],
    sample: {
      title: "An admission enquiry becomes a student",
      steps: [
        { title: "Enquiry saved", body: "A parent's WhatsApp enquiry is saved with the child's name and class." },
        { title: "Counsellor follows up", body: "The counsellor gets a reminder to call, and notes the outcome." },
        { title: "Form and fee", body: "The parent fills the online form and pays the admission fee." },
        { title: "Student created", body: "The child's record moves into the student list, ready for class allotment." },
      ],
    },
    faqs: [
      { q: "Can it handle multiple branches?", a: "Yes. Each branch can have its own staff and data, and the management can see all branches together." },
      { q: "Do teachers need training?", a: "Screens are kept simple. We train your staff and give short guides in plain language." },
      { q: "Can parents pay fees online?", a: "Yes. We connect a payment gateway such as Razorpay so parents can pay by UPI or card." },
    ],
    cta: { title: "Running a school, college or coaching centre?", description: "Tell us where your office spends the most time. We will suggest the first thing to fix." },
    related: ["business-software", "whatsapp-automation", "ai-agents", "mobile-applications"],
  },
  {
    slug: "schools",
    kind: "industry",
    name: "Schools",
    icon: "graduation",
    parent: { slug: "education", name: "Education" },
    heading: "Software for schools: admissions, fees and parent updates.",
    intro: "Help your school office answer parents faster, collect fees on time and keep every student's details in one place.",
    forWho: ["CBSE, ICSE and State Board schools", "Pre-schools", "School groups"],
    problems: [
      { problem: "Admission season brings hundreds of calls and WhatsApp messages.", fix: "Each enquiry is saved and answered, with reminders for the counsellor." },
      { problem: "Class teachers send homework and notices on personal WhatsApp groups.", fix: "Notices go out from the school's official number or parent app." },
      { problem: "Transport, fee and attendance questions keep the office phone busy.", fix: "Parents can check these themselves." },
    ],
    builds: [
      { title: "Admissions", body: "Enquiry list, online forms, document upload and seat tracking." },
      { title: "Fees", body: "Term and monthly fees, concessions recorded by the office, online payment and receipts." },
      { title: "Daily school work", body: "Attendance, homework, circulars and report cards." },
      { title: "Parent app or WhatsApp", body: "One official channel for every update to parents." },
    ],
    sample: {
      title: "A circular reaches every parent",
      steps: [
        { title: "Circular written", body: "The office writes a holiday notice once in the software." },
        { title: "Sent to parents", body: "It goes to all parents of the chosen classes on WhatsApp or the app." },
        { title: "Questions answered", body: "Common replies, like \"Is the bus running?\", get an answer from the school's information." },
        { title: "Office sees replies", body: "Other replies wait in one inbox for the office to answer." },
      ],
    },
    faqs: [
      { q: "Can concessions and sibling discounts be handled?", a: "Yes. The office records them, and fees and receipts are calculated correctly." },
      { q: "Is student data safe?", a: "Each staff member sees only what they need, with secure logins and regular backups." },
      { q: "Can we start with only admissions?", a: "Yes. Many schools start with admissions or fees and add more later." },
    ],
    cta: { title: "Want a calmer school office?", description: "Tell us which parent questions take most of your office's time." },
    related: ["business-software", "whatsapp-automation", "mobile-applications"],
  },
  {
    slug: "colleges",
    kind: "industry",
    name: "Colleges",
    icon: "graduation",
    parent: { slug: "education", name: "Education" },
    heading: "Software for colleges: admissions, departments and student services.",
    intro: "Manage admissions, departments, attendance, exams and student requests without chasing files between offices.",
    forWho: ["Degree colleges", "Engineering and professional colleges", "Universities"],
    problems: [
      { problem: "Admission applications and documents are checked by hand across departments.", fix: "Applications and documents are reviewed online, with status for each student." },
      { problem: "Students queue at the office for certificates and fee details.", fix: "Students request certificates and check dues online." },
      { problem: "Each department keeps its own attendance and marks sheets.", fix: "One system for attendance, internal marks and exam records." },
    ],
    builds: [
      { title: "Admission portal", body: "Online applications, document checks, merit lists and seat allotment." },
      { title: "Student portal", body: "Fees, timetables, results and certificate requests." },
      { title: "Department tools", body: "Attendance, internal marks and faculty workload." },
      { title: "Student help desk", body: "An assistant that answers common questions about courses, fees and dates." },
    ],
    sample: {
      title: "A student requests a bonafide certificate",
      steps: [
        { title: "Request made", body: "The student requests the certificate on the student portal." },
        { title: "Checked", body: "The office sees the student's details and fee status in one screen." },
        { title: "Approved", body: "The authorised person approves it with one click." },
        { title: "Ready", body: "The student gets a message that the certificate is ready to collect or download." },
      ],
    },
    faqs: [
      { q: "Can it follow university rules for marks and attendance?", a: "Yes. Rules are set up to match your university or board after we study them with you." },
      { q: "Can we connect our existing ERP?", a: "Often yes. We check what your current ERP allows and connect to it where possible." },
      { q: "Can students log in on mobile?", a: "Yes. The student portal works on any phone." },
    ],
    cta: { title: "Running a college office?", description: "Tell us which process causes the longest queues. We will start there." },
    related: ["business-software", "web-development", "ai-agents"],
  },
  {
    slug: "coaching",
    kind: "industry",
    name: "Coaching centres",
    icon: "graduation",
    parent: { slug: "education", name: "Education" },
    heading: "Software for coaching centres: enquiries, batches and fees.",
    intro: "Turn more enquiries into admissions, manage batches and collect instalments on time, across one or many centres.",
    forWho: ["JEE, NEET and foundation coaching", "Competitive exam coaching", "Tuition and skill centres"],
    problems: [
      { problem: "Enquiries from ads and walk-ins are noted in a book and forgotten.", fix: "Every enquiry gets a follow-up reminder until it is closed." },
      { problem: "Two counsellors tell the same parent different fees or dates.", fix: "Everyone answers from the same course and fee details." },
      { problem: "Instalments are missed and chased late.", fix: "Instalment reminders go out on time with a payment link." },
    ],
    builds: [
      { title: "Enquiry and counselling", body: "Lead list with source, counsellor and follow-up dates." },
      { title: "Batches and timetables", body: "Batches, faculty, rooms and class schedules." },
      { title: "Fees and instalments", body: "Instalment plans, reminders, online payment and receipts." },
      { title: "Tests and results", body: "Test schedules, marks and progress updates for parents." },
    ],
    sample: {
      title: "A demo class enquiry becomes an admission",
      steps: [
        { title: "Enquiry comes in", body: "A student asks about the NEET batch on WhatsApp." },
        { title: "Demo booked", body: "The assistant shares batch timings and books a demo class." },
        { title: "Counsellor call", body: "After the demo, the counsellor gets a reminder to call the parent." },
        { title: "Admission done", body: "The parent pays the first instalment online and the student joins the batch." },
      ],
    },
    faqs: [
      { q: "Can it track leads from Facebook or Google ads?", a: "Yes. Ad form leads can come straight into your enquiry list." },
      { q: "Can we manage several centres?", a: "Yes. Each centre has its own batches and staff, with a combined view for the owner." },
      { q: "Can parents see test results?", a: "Yes, through WhatsApp updates or a parent app." },
    ],
    cta: { title: "Want more enquiries to become admissions?", description: "Tell us how enquiries are handled today. We will find where they slip away." },
    related: ["business-software", "whatsapp-automation", "ai-agents"],
  },
  {
    slug: "hospitality",
    kind: "industry",
    name: "Hotels and hospitality",
    icon: "hotel",
    heading: "Software for hotels, resorts and restaurants.",
    intro: "Answer every booking enquiry quickly, avoid double bookings and keep guests informed from booking to check-out.",
    forWho: ["Hotels", "Resorts", "Homestays", "Restaurants and banquet halls"],
    problems: [
      { problem: "Booking enquiries on WhatsApp and calls are answered late, especially at night.", fix: "Guests get an instant reply with current availability and rates." },
      { problem: "The same room is promised twice because availability is in someone's head.", fix: "Everyone checks one room list before confirming." },
      { problem: "Guests keep calling to ask check-in time, directions and bills.", fix: "They get these details on WhatsApp at the right time." },
    ],
    builds: [
      { title: "Booking management", body: "Room or table availability, bookings, advance payments and cancellations." },
      { title: "Guest messages", body: "Confirmations, directions, check-in details and feedback requests." },
      { title: "Front-desk dashboard", body: "Today's arrivals, departures, pending payments and requests." },
      { title: "WhatsApp booking assistant", body: "Answers room and rate questions and holds bookings for the desk to confirm." },
    ],
    sample: {
      title: "A weekend booking from enquiry to check-in",
      steps: [
        { title: "Enquiry", body: "A guest asks for a deluxe room for Saturday night on WhatsApp." },
        { title: "Availability", body: "The assistant checks the room list and shares the rate and photos." },
        { title: "Advance paid", body: "The guest pays an advance through a payment link and the room is blocked." },
        { title: "Before arrival", body: "On Friday, the guest gets directions, check-in time and the front desk number." },
      ],
    },
    faqs: [
      { q: "Can it work with Booking.com or MakeMyTrip?", a: "It depends on the channel manager you use. We check what your setup allows and connect where possible." },
      { q: "Can restaurants and banquet halls use it?", a: "Yes. Table and hall bookings follow the same pattern." },
      { q: "Will guests know they are talking to an assistant?", a: "Yes. The assistant is clearly named, and guests can ask for a person at any time." },
    ],
    cta: { title: "Losing bookings to slow replies?", description: "Tell us how enquiries reach you today. We will suggest a faster way to answer them." },
    related: ["ai-agents", "whatsapp-automation", "web-development"],
  },
  {
    slug: "hotels",
    kind: "industry",
    name: "Hotels",
    icon: "hotel",
    parent: { slug: "hospitality", name: "Hospitality" },
    heading: "Software for hotels: bookings, guests and the front desk.",
    intro: "A simple setup that helps your front desk answer enquiries, confirm bookings and look after guests without missing messages.",
    forWho: ["Business hotels", "Heritage and boutique hotels", "Hotel groups"],
    problems: [
      { problem: "Shift changes mean the next person does not know what the last one promised.", fix: "Every booking and guest request is written down in one place." },
      { problem: "Corporate and group bookings are tracked in email threads.", fix: "Group bookings have their own list with rooms, dates and payments." },
      { problem: "Guest feedback is never collected.", fix: "A short feedback message goes out after check-out." },
    ],
    builds: [
      { title: "Reservations", body: "Room calendar, rates, advances and cancellations." },
      { title: "Guest requests", body: "Early check-in, extra bed or airport pickup, assigned to the right staff." },
      { title: "Group and corporate bookings", body: "Room blocks, guest lists and billing details." },
      { title: "Feedback", body: "Simple post-stay feedback and review requests." },
    ],
    sample: {
      title: "A guest asks for an airport pickup",
      steps: [
        { title: "Request", body: "A booked guest asks for an airport pickup on WhatsApp." },
        { title: "Assigned", body: "The request is added to the booking and sent to the transport desk." },
        { title: "Confirmed", body: "The guest gets the driver's name and pickup time." },
        { title: "Billed", body: "The pickup charge is added to the guest's bill." },
      ],
    },
    faqs: [
      { q: "Do we need to replace our hotel software?", a: "Not necessarily. We can often connect to your current system and add only what is missing." },
      { q: "Can multiple properties use one system?", a: "Yes, with separate front desks and a combined owner view." },
      { q: "Can guests pay online?", a: "Yes, through a payment link by UPI or card." },
    ],
    cta: { title: "Want a smoother front desk?", description: "Tell us where guest requests get lost today." },
    related: ["ai-agents", "whatsapp-automation", "business-software"],
  },
  {
    slug: "manufacturing",
    kind: "industry",
    name: "Manufacturing",
    icon: "factory",
    heading: "Software for factories and manufacturers.",
    intro: "Track every order from purchase order to dispatch, know your stock, and keep customers updated without calling the floor.",
    forWho: ["Small and mid-size factories", "Job-work units", "Textile, engineering and food units"],
    problems: [
      { problem: "Orders are tracked in Excel and WhatsApp, and nobody knows the exact stage.", fix: "Each order shows its stage: material, production, quality, dispatch." },
      { problem: "Raw material runs out because stock is counted by hand.", fix: "Stock is updated as material is used, with alerts when it runs low." },
      { problem: "Customers call sales to ask about delivery dates.", fix: "Customers get a WhatsApp update when their order moves." },
    ],
    builds: [
      { title: "Order tracking", body: "Purchase orders, sales orders, job cards and production stages." },
      { title: "Stock and materials", body: "Raw material, finished goods, reorder levels and purchase requests." },
      { title: "Dispatch and invoices", body: "Delivery challans, e-way bill details and GST invoices." },
      { title: "Owner's dashboard", body: "Pending orders, delays and today's dispatches at a glance." },
    ],
    sample: {
      title: "An order goes from PO to dispatch",
      steps: [
        { title: "PO received", body: "The customer's purchase order is entered once." },
        { title: "Material checked", body: "The software checks raw material and raises a purchase request if short." },
        { title: "Production stages", body: "Supervisors update each stage from a phone on the floor." },
        { title: "Dispatched", body: "The invoice is created and the customer gets a dispatch message." },
      ],
    },
    faqs: [
      { q: "Is this an ERP?", a: "It can grow into one, but we start with the part that hurts most, such as order tracking or stock." },
      { q: "Can supervisors use it on the floor?", a: "Yes. Simple mobile screens with big buttons, built for quick updates." },
      { q: "Can it work with Tally?", a: "We can usually share invoices and stock data in a format your accountant can use in Tally. We confirm this after seeing your setup." },
    ],
    cta: { title: "Want to know where every order stands?", description: "Show us how an order moves through your factory today." },
    related: ["business-software", "business-automation", "mobile-applications"],
  },
  {
    slug: "healthcare",
    kind: "industry",
    name: "Clinics and hospitals",
    icon: "heart",
    heading: "Software for clinics, hospitals and diagnostic centres.",
    intro: "Make OPD booking easy, send reminders before visits, and reduce the calls your reception handles. Medical decisions always stay with your doctors.",
    forWho: ["Clinics", "Hospitals", "Diagnostic centres", "Dental and eye clinics"],
    problems: [
      { problem: "The reception phone is busy all day with appointment calls.", fix: "Patients book or change OPD slots on WhatsApp or online." },
      { problem: "Patients forget appointments and follow-up visits.", fix: "Reminders go out the day before and on the follow-up date." },
      { problem: "Patients call again and again to ask if reports are ready.", fix: "They get a message when the report is ready." },
    ],
    builds: [
      { title: "OPD appointments", body: "Doctor-wise slots, online booking, walk-in tokens and cancellations." },
      { title: "Reminders", body: "Visit reminders, follow-up reminders and what-to-bring messages." },
      { title: "Report-ready messages", body: "A message when lab or scan reports are ready to collect or download." },
      { title: "Reception dashboard", body: "Today's appointments, waiting patients and pending calls." },
    ],
    sample: {
      title: "A patient books and attends an OPD visit",
      steps: [
        { title: "Booking", body: "A patient books a slot with the orthopaedic doctor on WhatsApp." },
        { title: "Reminder", body: "The day before, they get a reminder with time and what to bring." },
        { title: "Visit", body: "At reception, the booking is already in the list, so check-in is quick." },
        { title: "Follow-up", body: "A reminder goes out on the follow-up date the doctor set." },
      ],
    },
    faqs: [
      { q: "Does the assistant give medical advice?", a: "No. It only handles bookings, timings and routine questions. Medical questions go to your staff or doctors." },
      { q: "Is patient data kept private?", a: "Messages carry only what is needed, such as time and place. Access is by role, with secure logins, and we follow the Digital Personal Data Protection Act, 2023." },
      { q: "Will it replace our hospital software?", a: "No. We add booking, reminders and messages around the hospital software you already use." },
    ],
    cta: { title: "Want fewer calls at reception?", description: "Tell us how patients book today. We will suggest a simpler way." },
    related: ["voice-ai", "whatsapp-automation", "web-development"],
  },
  {
    slug: "corporate-smes",
    kind: "industry",
    name: "Small businesses",
    icon: "briefcase",
    heading: "Software for small and growing businesses.",
    intro: "Track leads, send quotations and GST invoices, get approvals on mobile and see your daily numbers, without adding more staff for paperwork.",
    forWho: ["Traders and distributors", "Service companies", "Retail chains", "Growing teams"],
    problems: [
      { problem: "Leads come from calls, WhatsApp and IndiaMART and many are never followed up.", fix: "Every lead is saved with an owner and a follow-up date." },
      { problem: "Quotations and invoices are typed again from chats and emails.", fix: "They are created from the order in one click." },
      { problem: "The owner finds out about problems only at month end.", fix: "A daily summary shows sales, dues and pending work." },
    ],
    builds: [
      { title: "Lead and sales tracking", body: "Leads, follow-ups, quotations and orders in one list." },
      { title: "Quotations and GST invoices", body: "Made from your products and prices, sent by email or WhatsApp." },
      { title: "Approvals on mobile", body: "Discounts, purchases and expenses approved from the phone." },
      { title: "Daily owner report", body: "Sales, collections and pending tasks, every evening." },
    ],
    sample: {
      title: "A lead becomes a paid order",
      steps: [
        { title: "Lead saved", body: "An IndiaMART enquiry is saved and given to a sales person." },
        { title: "Quotation sent", body: "The sales person sends a quotation from the software in a minute." },
        { title: "Discount approved", body: "A special discount is approved by the owner on mobile." },
        { title: "Invoice and payment", body: "The GST invoice goes out and a payment reminder follows if needed." },
      ],
    },
    faqs: [
      { q: "We are a small team. Is this too much for us?", a: "No. We start small, with one or two screens your team needs most." },
      { q: "Can it work with our accountant's Tally?", a: "We can usually share invoices and payments in a Tally-friendly format. We confirm after seeing your setup." },
      { q: "Can leads from IndiaMART or our website come in on their own?", a: "Often yes. We check what each source allows and connect it where possible." },
    ],
    cta: { title: "Growing faster than your paperwork?", description: "Tell us which job eats most of your team's day." },
    related: ["business-software", "business-automation", "whatsapp-automation"],
  },
  {
    slug: "professional-services",
    kind: "industry",
    name: "Professional services",
    icon: "briefcase",
    heading: "Software for consultants, agencies and service firms.",
    intro: "Keep track of enquiries, client work, documents and billing, so clients get updates without having to ask.",
    forWho: ["CA and tax firms", "Consultants", "Agencies", "Legal and design firms"],
    problems: [
      { problem: "Client documents arrive on WhatsApp and email and are hard to find later.", fix: "Each client has one folder with every document and message." },
      { problem: "Clients call to ask \"what is the status?\".", fix: "They see the status on a client portal or get an update." },
      { problem: "Billing is done at month end from memory.", fix: "Work and fees are recorded as you go, and invoices are created from them." },
    ],
    builds: [
      { title: "Enquiries to clients", body: "New enquiries, proposals and onboarding in one place." },
      { title: "Client portal", body: "Clients upload documents and see the status of their work." },
      { title: "Task tracking", body: "Deadlines, assignments and reminders for your team." },
      { title: "Billing", body: "Invoices and payment reminders from recorded work." },
    ],
    sample: {
      title: "A CA firm collects documents for a GST filing",
      steps: [
        { title: "Reminder", body: "Before the due date, clients get a WhatsApp message listing the documents needed." },
        { title: "Upload", body: "Clients upload documents to their portal from the phone." },
        { title: "Work assigned", body: "The filing task is assigned to a team member with the deadline." },
        { title: "Done and billed", body: "The client is told it is filed, and the invoice is sent." },
      ],
    },
    faqs: [
      { q: "Is client data kept confidential?", a: "Yes. Each client sees only their own portal, and your team's access is controlled by role." },
      { q: "Can it remind us about statutory due dates?", a: "Yes. Due dates you set are tracked, and the team and clients get reminders." },
      { q: "Can we use it on mobile?", a: "Yes, for both your team and your clients." },
    ],
    cta: { title: "Want clients to stop asking for status?", description: "Tell us how client work is tracked today." },
    related: ["business-software", "web-development", "business-automation"],
  },
];

// Every detail page uses a client-supplied banner from public/newImages.
function withPhoto(page: DetailInput): DetailPage {
  const photo = bannerFor(page.slug);
  if (!photo) throw new Error(`No banner image for ${page.slug}`);
  return { ...page, photo };
}

const solutionPages = solutionInput.map(withPhoto);
const industryPages = industryInput.map(withPhoto);

const bySlug = {
  solution: new Map(solutionPages.map((page) => [page.slug, page])),
  industry: new Map(industryPages.map((page) => [page.slug, page])),
};

export function getDetail(kind: DetailKind, slug: string) {
  return bySlug[kind].get(slug);
}

export function listDetails(kind: DetailKind) {
  return kind === "solution" ? solutionPages : industryPages;
}

export function detailLinks(kind: DetailKind, slugs: string[]) {
  return slugs.flatMap((slug) => {
    const page = bySlug[kind].get(slug);
    return page ? [{ href: `/${kind === "solution" ? "solutions" : "industries"}/${slug}`, title: page.name, description: page.intro, icon: page.icon }] : [];
  });
}
