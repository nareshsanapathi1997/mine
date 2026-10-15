import { siteConfig } from "@/content/site";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export function privacySections(): LegalSection[] {
  return [
    {
      heading: "Who this notice is for",
      paragraphs: [
        `This notice describes how ${siteConfig.name} handles information submitted through this website. It applies to visitors, prospective clients and anyone who contacts us through the site.`,
        `You can reach us at ${siteConfig.email} or ${siteConfig.phoneDisplay}. We are based in ${siteConfig.location}.`,
      ],
    },
    {
      heading: "What the contact form collects",
      paragraphs: [
        "If you send an enquiry, we collect the details you enter: name, company, email, phone, industry, what you need help with, budget range and message.",
        "The form also includes a hidden field that people are not asked to fill. It is there to reduce automated spam.",
      ],
    },
    {
      heading: "Why it is collected",
      paragraphs: [
        "We use the enquiry to understand your request, reply to you, and keep a record of the conversation. We do not build advertising profiles from it and we do not sell or rent contact details.",
      ],
    },
    {
      heading: "Where it goes",
      paragraphs: [
        "Your enquiry is stored in our enquiry database and delivered to our team inbox. It may also be forwarded to the internal tools we use to track conversations, such as a CRM or a shared spreadsheet.",
        "Only the people at ${siteConfig.name} who handle enquiries can read them. Our hosting, database and email providers process the data on our behalf and only to run those services.",
      ],
    },
    {
      heading: "How long it is kept",
      paragraphs: [
        "We keep enquiries for as long as we need them to respond and to keep a reasonable record of our conversation, and no longer than 24 months after our last contact unless a project agreement requires otherwise. You can ask us to delete an enquiry sooner.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        `To ask about an enquiry you sent, email ${siteConfig.email}. You can ask us to access, correct or delete the personal data you sent, or withdraw consent, in line with the Digital Personal Data Protection Act, 2023. We will respond within a reasonable time.`,
      ],
    },
  ];
}

export function termsSections(): LegalSection[] {
  return [
    {
      heading: "Using this website",
      paragraphs: [
        `This website is operated by ${siteConfig.name}. By using it you agree to these terms.`,
        "The pages describe services we offer. They are not a promise that a particular feature, timeline or outcome applies to your organization until we agree that in writing.",
      ],
    },
    {
      heading: "Enquiries are not a contract",
      paragraphs: [
        "Sending the contact form starts a conversation. It does not create a project, a support agreement or an obligation to begin work. Scope, fees and responsibilities are set in a separate proposal or contract.",
      ],
    },
    {
      heading: "Information on the site",
      paragraphs: [
        "Case studies and sample scenarios on this site are illustrative. They describe the kind of system we build and are not claims about a named client or a measured result. Sample record numbers shown in product illustrations are not real data.",
        "We may update pages as services change. The version you see is the current public description, not a standing offer.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        `The site design, copy and original graphics are owned by ${siteConfig.name} unless a page says otherwise. You may not copy them for your own commercial site. You may share links to public pages.`,
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "The website is provided for general information. To the extent the law allows, we are not liable for decisions you make solely from reading these pages, or for interruptions while the site is updated.",
        "Nothing here limits liability that cannot legally be limited.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. Courts in Hyderabad, Telangana have jurisdiction over any dispute arising from the use of this website.",
      ],
    },
  ];
}

export function cookieSections(): LegalSection[] {
  return [
    {
      heading: "What this site uses",
      paragraphs: [
        "This site can load Google Analytics 4 only when two things are true: a measurement ID is configured for the deployment, and you choose Accept or turn analytics on in Cookie settings. Until you choose, no analytics script is requested.",
        "Your choice is stored in this browser as a site preference (localStorage), not as an analytics cookie. It remembers Accept, Reject or the analytics switch so the question is not repeated on every page. Reading the pages and sending the contact form do not require that choice.",
      ],
    },
    {
      heading: "What analytics does",
      paragraphs: [
        "When you allow analytics and a measurement ID is set, Google Analytics 4 receives page visits so the operator can see which public pages are used. The script is loaded from Google. IP anonymisation is requested. There is no advertising cookie and no social media pixel on this site.",
        "If you reject analytics, or turn it off later, further page loads do not request the script. If a script was already running in the open tab, refresh the page so it is dropped. You can reopen Cookie settings from the footer at any time.",
      ],
    },
    {
      heading: "How to control cookies",
      paragraphs: [
        "Use Cookie settings in the footer to accept, reject or change analytics. You can also block or delete cookies in your browser. Blocking cookies does not stop you from reading the public pages. If the browser blocks localStorage, the choice cannot be remembered and the notice may appear again.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about cookies can be sent to ${siteConfig.email}. We will update this notice before adding any other measurement or marketing tools.`,
      ],
    },
  ];
}
