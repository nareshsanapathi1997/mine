import { siteConfig } from "@/content/site";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

/** Shown on legal pages as the public effective date. */
export const legalEffectiveDate = "21 October 2026";

export function privacySections(): LegalSection[] {
  return [
    {
      heading: "Who this notice is for",
      paragraphs: [
        `This Privacy Policy describes how ${siteConfig.name} (“we”, “us”) handles personal information collected through ${siteConfig.url} and related contact channels.`,
        `It applies to website visitors, prospective clients and anyone who contacts us. We are based in ${siteConfig.location}. Contact: ${siteConfig.email} or ${siteConfig.phoneDisplay}. For support matters you may also use ${siteConfig.supportEmail}.`,
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "Contact form: name, company, email, phone, what you need help with, and message. Only name, email, need and message are required; other fields are optional.",
        "Technical notes: we may keep a hashed form of the visitor IP for spam control, a short user-agent string, the page you submitted from, and the time of submission.",
        "The form includes a hidden field that people are not asked to fill. It exists only to reduce automated spam.",
        "Browser preference: if you use Cookie settings, we store your analytics choice in this browser’s localStorage so we remember Accept or Reject. That preference is not an advertising cookie.",
      ],
    },
    {
      heading: "Why we collect it",
      paragraphs: [
        "We use enquiry details to understand your request, reply to you, prepare proposals, and keep a record of the conversation. We do not sell or rent contact details and we do not build advertising profiles from form data.",
        "If Google Analytics 4 is configured and you have accepted analytics cookies, we use aggregated page-view data to understand which public pages are used.",
      ],
    },
    {
      heading: "Where it goes and who sees it",
      paragraphs: [
        "Enquiries are stored in our enquiry database when database access is configured, and/or delivered to our team inbox by email. They may also be copied to internal tools we use to track conversations (for example a CRM or shared sheet).",
        `Only ${siteConfig.name} staff who handle enquiries can read them. Hosting, database and email providers process data on our behalf only to run those services.`,
        "Analytics data, when enabled by you, is processed by Google under Google’s terms for Google Analytics 4.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep enquiries for as long as needed to respond and to maintain a reasonable business record, and no longer than 24 months after our last contact unless a signed project agreement requires a longer retention period. You can ask us to delete an enquiry sooner.",
        "Server and spam-control logs are kept only as long as needed for security and abuse prevention.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        `Email ${siteConfig.email} to access, correct or delete personal data you sent through this site, or to withdraw consent where applicable, in line with India’s Digital Personal Data Protection Act, 2023. We will respond within a reasonable time.`,
        "You can change or withdraw analytics consent at any time using Cookie settings in the footer.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        `We may update this notice when our practices or tools change. The effective date at the top of the page shows when it was last revised. Continued use of the site after an update means you have read the revised notice.`,
      ],
    },
  ];
}

export function termsSections(): LegalSection[] {
  return [
    {
      heading: "Who we are",
      paragraphs: [
        `These Terms & Conditions govern use of the website operated by ${siteConfig.name} at ${siteConfig.url} and related public pages. We are based in ${siteConfig.location}. Contact: ${siteConfig.email}, ${siteConfig.supportEmail}, ${siteConfig.phoneDisplay}.`,
        "By browsing or using this website you agree to these terms. If you do not agree, please do not use the site.",
      ],
    },
    {
      heading: "Services described on this site",
      paragraphs: [
        "Pages describing websites, apps, business software, WhatsApp automation, AI assistants, cloud hosting and related work are general descriptions of services we offer.",
        "They are not a binding offer for a specific feature set, price, timeline or outcome for your organisation until we confirm those details in a written proposal, statement of work or contract that both parties accept.",
      ],
    },
    {
      heading: "Enquiries and project scope",
      paragraphs: [
        "Sending the contact form, emailing us or messaging on WhatsApp starts a conversation. It does not create a project, support retainer or obligation to begin paid work.",
        "Project scope (deliverables, assumptions, exclusions, timelines and acceptance criteria) is defined only in a written agreement. Work outside that scope may be quoted separately and needs written approval before it begins.",
      ],
    },
    {
      heading: "Fees and payments",
      paragraphs: [
        "Fees, payment milestones, taxes and billing currency are set in the written agreement or invoice for each engagement.",
        "Unless the agreement says otherwise, invoices are due as stated on the invoice. Late payment may pause scheduled work or support until the outstanding amount is cleared.",
        "Deposits and milestone payments already paid are generally non-refundable once the related work has started, except where the agreement or applicable law requires otherwise.",
      ],
    },
    {
      heading: "Cancellations and changes",
      paragraphs: [
        "Either party may pause or end an active project as described in the written agreement. If you cancel after work has started, you remain responsible for fees for work completed and approved expenses up to the cancellation date.",
        "If we cannot continue for reasons within our control, we will notify you promptly and discuss a fair wind-down, including handover of completed deliverables already paid for.",
        "Schedule or scope changes requested by you may affect fees and timelines; we will confirm material changes in writing before proceeding.",
      ],
    },
    {
      heading: "Support",
      paragraphs: [
        `After launch, support coverage (hours, response targets, included changes and out-of-scope work) is defined in your agreement or a separate support plan. Day-to-day support requests can be sent to ${siteConfig.supportEmail}.`,
        "Website hosting, third-party APIs, WhatsApp Business providers, cloud accounts and licences you own remain your responsibility unless we explicitly manage them under contract.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        `The website design, copy, original graphics and brand assets on this site are owned by ${siteConfig.name} unless a page says otherwise. You may link to public pages. You may not copy the site design or content for a competing commercial site without permission.`,
        "For client projects, ownership of custom software, designs and content we create for you is transferred or licensed as stated in the written agreement, usually after full payment of related invoices. Pre-existing tools, libraries, frameworks and our internal methods remain ours or their respective owners’.",
        "You are responsible for the legality of content, data and third-party materials you provide for a project.",
      ],
    },
    {
      heading: "Illustrative content",
      paragraphs: [
        "Case studies and sample scenarios on this site are illustrative. They describe the kind of systems we build and are not claims about a named client or a measured commercial result. Sample numbers in product illustrations are not real customer data.",
      ],
    },
    {
      heading: "Acceptable use of the website",
      paragraphs: [
        "You must not misuse the site: do not attempt unauthorised access, overload our systems, submit spam through the contact form, or use automated scraping in a way that harms the service.",
        "We may suspend access or ignore abusive submissions.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "The website is provided for general information. To the extent Indian law allows, we are not liable for decisions you make solely from reading these pages, for temporary downtime while the site is updated, or for losses caused by factors outside our reasonable control.",
        "For paid project work, any liability caps, warranties and remedies are those set out in the written agreement for that work.",
        "Nothing in these terms limits liability that cannot legally be limited (including for fraud or personal injury caused by negligence where the law forbids such a limit).",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Courts in Visakhapatnam, Andhra Pradesh have exclusive jurisdiction over disputes arising from use of this website, subject to any different venue agreed in a signed project contract.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        `We may update these terms when our services or legal requirements change. The effective date on this page shows the current version. Material updates will be reflected here; continued use of the website after an update constitutes acceptance of the revised terms.`,
      ],
    },
  ];
}

export function cookieSections(): LegalSection[] {
  return [
    {
      heading: "What this site uses",
      paragraphs: [
        "Essential: the site needs basic browser storage to remember your theme preference and, after you choose, your cookie preferences. These are required for the site to work as designed and are not used for advertising.",
        "Analytics (optional): Google Analytics 4 loads only when a measurement ID is configured for the deployment and you choose Accept or turn analytics on in Cookie settings. Until you choose, no analytics script is requested.",
        "Your analytics choice is stored in this browser as a site preference (localStorage), not as an advertising cookie. Reading pages and sending the contact form do not require accepting analytics.",
      ],
    },
    {
      heading: "What analytics does",
      paragraphs: [
        "When you allow analytics and a measurement ID is set, Google Analytics 4 receives page visits so we can see which public pages are used. The script is loaded from Google. IP anonymisation is requested. This site does not set advertising cookies and does not use a social media pixel.",
        "If you reject analytics, or turn it off later, further page loads do not request the script. If a script was already running in the open tab, refresh the page so it is dropped. You can reopen Cookie settings from the footer at any time.",
      ],
    },
    {
      heading: "How to control cookies",
      paragraphs: [
        "Use Cookie settings in the footer to accept, reject or change analytics. You can also block or delete cookies and site data in your browser. Blocking storage does not stop you from reading public pages, but your choice may not be remembered and the notice may appear again.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about cookies or this notice: ${siteConfig.email}. We will update this page before adding any other measurement or marketing tools.`,
      ],
    },
  ];
}
