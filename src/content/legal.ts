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
        `This notice describes how ${siteConfig.name} handles information submitted through this website. It is a practical template. Have it reviewed for your business before the site goes live.`,
        `You can reach us at ${siteConfig.email} or ${siteConfig.phoneDisplay}. An office address is not listed.`,
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
        "We use the enquiry to understand your request and reply. We do not use this website template for advertising profiles or for selling contact lists.",
      ],
    },
    {
      heading: "Where it goes",
      paragraphs: [
        "If email is configured, the enquiry is sent through SMTP to the inbox set for this deployment. If a webhook address is configured, the same enquiry is posted as JSON so it can be forwarded to a CRM, a spreadsheet or a messaging workflow. If neither is configured, the enquiry is written to the server log and the form says that delivery is not connected.",
        "The host of this website, the email provider and the webhook destination can see the fields you submit. Replace this sentence with the specific providers, where the data is stored, and who on your team can read enquiries before the site goes live.",
      ],
    },
    {
      heading: "How long it is kept",
      paragraphs: [
        "Set a retention period before launch. Until that decision is written here, keep enquiries only for as long as you need them to respond and keep a record of the conversation.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        `To ask about an enquiry you sent, email ${siteConfig.email}. If you are in India, you may also have rights under the Digital Personal Data Protection Act, 2023. Confirm the process with counsel before you publish a rights request address.`,
      ],
    },
  ];
}

export function termsSections(): LegalSection[] {
  return [
    {
      heading: "Using this website",
      paragraphs: [
        `This website is operated by ${siteConfig.name}. By using it you agree to these terms. They are a template and should be reviewed before launch.`,
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
        "Case studies marked as placeholders are examples of the kind of work the site is structured to present. They are not claims about a named client or a measured result.",
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
        "Governing law and venue should be confirmed before launch. Do not treat this template as a choice of court.",
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
        "When you allow analytics and a measurement ID is set, Google Analytics 4 receives page visits so the operator can see which public pages are used. The script is loaded from Google. IP anonymisation is requested. There is no advertising cookie and no social pixel in this template.",
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
        `Questions about cookies can be sent to ${siteConfig.email}. Review this notice before launch if your deployment adds any measurement or marketing tools.`,
      ],
    },
  ];
}
