import { newImages } from "../../content/new-images";
import { caseStudies } from "../../content/case-studies";
import { listDetails } from "../../content/details";
import {
  homeFaq,
  homeIndustries,
  homeProblems,
  homeReasons,
  homeSafety,
  homeServices,
  homeSteps,
  homeTools,
  sampleFlows,
} from "../../content/home-page";
import { industries } from "../../content/industries";
import {
  cookieSections,
  legalEffectiveDate,
  privacySections,
  termsSections,
} from "../../content/legal";
import {
  companyLinks,
  footerHubLinks,
  legalLinks,
  primaryNav,
  resourceLinks,
} from "../../content/navigation";
import { services, solutionGroups } from "../../content/services";
import { siteConfig } from "../../content/site";
import { stats } from "../../content/stats";
import type { CmsBundle } from "./types";

export function cmsDefaults(): CmsBundle {
  const details = [...listDetails("solution"), ...listDetails("industry")];

  return {
    site: {
      ...siteConfig,
      social: [...siteConfig.social],
      brand: { ...siteConfig.brand },
    },
    chrome: {
      skipLabel: "Skip to content",
      header: {
        solutionsLabel: "Solutions",
        industriesLabel: "Industries",
        ctaLabel: "Talk to us",
        ctaHref: "/contact",
        contactLabel: "Contact",
        megaUnsureTitle: "Not sure what you need?",
        megaUnsureBody: "Tell us the problem. We will suggest what fits.",
        allSolutionsLabel: "All solutions",
        allIndustriesLabel: "All industries",
      },
      footer: {
        solutionsTitle: "Solutions",
        industriesTitle: "Industries",
        companyTitle: "Company",
        resourcesTitle: "Resources",
        legalTitle: "Legal",
      },
      dock: {
        talkLabel: "Talk to us",
        whatsappLabel: "Chat with us on WhatsApp (opens in a new tab)",
        backToTopLabel: "Back to top",
      },
      cta: {
        defaultTitle: "Have a workflow you want to improve?",
        defaultDescription:
          "Tell us how the work happens today. We will reply with whether it is a fit and what a first version would cover.",
        primaryLabel: "Talk to us",
        whatsappLabel: "WhatsApp us",
        exploreLabel: "Explore Solutions",
      },
      detail: {
        talkLabel: "Talk to us",
        whatsappLabel: "WhatsApp us",
        problems: {
          eyebrow: "Problems we fix",
          title: "Sound familiar?",
          intro: "Three common problems we hear, and what changes once the right software is in place.",
        },
        builds: {
          eyebrow: "What we build",
          title: "What we can build for you",
          intro: "Start with the one that saves the most time. The rest can be added later.",
        },
        sampleEyebrow: "Sample walkthrough",
        sampleIntro: "An example of how this could work, step by step. It is an illustration, not a client result.",
        faqTitle: "Questions people ask",
        relatedTitle: "Often used together",
        fixLabel: "What changes",
      },
    },
    home: {
      hero: {
        titleBefore: "Software that does the ",
        titleHighlight: "follow-up work",
        titleAfter: " for you.",
        subtitle:
          "Websites, apps, WhatsApp automation and AI assistants for schools, hotels, factories, clinics and growing businesses.",
        primaryLabel: "Talk to us",
        primaryHref: "/contact",
        secondaryLabel: "See what we build",
        secondaryHref: "#what-we-build",
        photo: newImages.home,
        markSrc: siteConfig.brand.mark,
      },
      problems: {
        eyebrow: "Problems we fix",
        title: "Everyday problems we fix for Indian businesses.",
        intro: "Most of these are small jobs done by hand, many times a day. Software can do them on time, every time.",
        items: homeProblems,
      },
      services: {
        eyebrow: "What we build",
        title: "Five things we build, alone or together.",
        intro: "Start with one. Each piece shares the same information, so you never type the same detail twice.",
        items: homeServices,
        toolsTitle: "Works with the tools you already use",
        tools: [...homeTools],
      },
      industries: {
        eyebrow: "Who we work with",
        title: "Built for the way your kind of business runs.",
        intro: "Pick your field to see the jobs we usually take off your team's hands.",
        items: homeIndustries,
      },
      sample: {
        eyebrow: "How it works",
        title: "See one job, step by step.",
        intro:
          "A sample of what happens after a message arrives. Pick an example. These are illustrations, not client results.",
        moreHref: "/case-studies",
        flows: sampleFlows,
      },
      steps: {
        eyebrow: "How we work with you",
        title: "Four simple steps, from first call to go-live.",
        intro: "You always know what is being built, what it costs and when it will be ready.",
        items: homeSteps,
      },
      why: {
        eyebrow: "Why choose us",
        title: "Why owners and principals work with us.",
        intro: "A small, hands-on team in Visakhapatnam. You talk directly to the people who build your software.",
        items: homeReasons,
        safetyTitle: "Your data stays safe and stays yours",
        safetyIntro: "Built into every project, switched on to suit your work.",
        safety: homeSafety,
      },
      faq: {
        eyebrow: "FAQ",
        title: "Common questions",
        intro: "Did not find your answer? Call or WhatsApp us, we are happy to explain.",
        items: homeFaq,
      },
      cta: {
        title: "Tell us one job you want off your team's plate.",
        description:
          "A short call with no obligation. We listen, suggest a simple first step, and send you a written plan with cost and timeline.",
        primaryLabel: "Talk to us",
      },
    },
    about: {
      metaTitle: "About",
      metaDescription: `${siteConfig.name} is a Visakhapatnam-based team building websites, software, WhatsApp automation and AI assistants for Indian schools, hotels, factories and small businesses.`,
      header: {
        eyebrow: "About us",
        title: "A small Visakhapatnam team that builds practical software.",
        description: `${siteConfig.name} builds websites, apps, business software, WhatsApp automation and AI assistants for schools, hotels, factories, clinics and growing businesses across India.`,
        photo: newImages.about,
      },
      story: {
        eyebrow: "Our story",
        title: "Why we started",
        paragraphs: [
          "Most businesses we meet already have tools: a website, a WhatsApp number, a few Excel sheets, maybe accounting software. The trouble is the work in between. Someone copies an enquiry into a sheet, someone else sends a reminder by hand, and the owner calls around to know the day's position.",
          "We build software that does those in-between steps for you, so your team spends less time typing and chasing, and more time with students, guests and customers.",
          `${siteConfig.name} stands for ${siteConfig.nameMeaning}.`,
        ],
        photo: newImages.aboutStory,
      },
      beliefs: {
        eyebrow: "How we think",
        title: "Four things we believe",
        intro: "These shape every project, big or small.",
        items: [
          {
            title: "Start with the problem, not the technology",
            body: "We first ask what your team does by hand every day. Only then do we suggest a website, an app, an assistant or nothing at all.",
          },
          {
            title: "Small first version, then improve",
            body: "We build the one part that saves the most time, let your team use it, and add more based on what they tell us.",
          },
          {
            title: "Plain language, no jargon",
            body: "You will always know what we are building, why, and what it will cost, in words your whole team understands.",
          },
          {
            title: "People stay in charge",
            body: "Software and AI handle routine steps. Decisions about money, refunds, admissions or health stay with your staff.",
          },
        ],
      },
      team: {
        show: false,
        eyebrow: "The team",
        title: "Who you will work with",
        photo: newImages.aboutTeam,
        people: [
          { name: "Naresh Sanapathi", role: "Founder" },
          { name: "Nageswara Rao", role: "Co-founder" },
        ],
        expectTitle: "What you can expect",
        promises: [
          "The founders are on your project from the first call to after launch.",
          "You see working screens early, not only at the end.",
          "We explain costs before work starts.",
          "We stay on for support and the next improvement.",
        ],
        contactLead: "Want to speak to us directly?",
      },
      sectorsTitle: "Who we work with",
      cta: {
        title: "Tell us how your team works today.",
        description: "A short call with no obligation. We will tell you honestly whether we can help.",
        primaryLabel: "Talk to us",
      },
    },
    contact: {
      metaTitle: "Contact",
      metaDescription: `Call, WhatsApp or write to ${siteConfig.name} in Visakhapatnam about a website, app, software, WhatsApp automation or AI assistant.`,
      eyebrow: "Contact",
      title: "Tell us what you need.",
      description:
        "For example: admission enquiries, hotel bookings, an order sheet or a busy reception phone. Only your name, email, need and a short note are required.",
      photo: newImages.contact,
      offers: ["Websites and apps", "Business software", "WhatsApp and AI", "Hosting and support"],
      replyNote: "We reply to the email you enter.",
      nextTitle: "What happens next",
      nextSteps: [
        {
          title: "We read your message",
          body: "We read every message ourselves. If something is unclear, we ask a question or two by email or WhatsApp.",
        },
        {
          title: "A short call",
          body: "You tell us how the work happens today and where it gets stuck. We listen and ask simple questions.",
        },
        {
          title: "A simple written plan",
          body: "You get a plain-English plan for the first version and a cost estimate. No obligation to go ahead.",
        },
      ],
      form: {
        labels: {
          name: "Name",
          company: "Company",
          email: "Email",
          phone: "Phone / WhatsApp",
          industry: "Industry",
          need: "What do you need?",
          budget: "Budget",
          message: "Tell us a little about the work.",
        },
        hints: {
          name: "The person we should reply to.",
          company: "Your business, school, hotel or clinic.",
          email: "Where the reply is sent.",
          phone: "A mobile number is enough.",
          industry: "The sector this work is for.",
          need: "Pick the closest option.",
          budget: "A range is enough.",
          message: "What happens today, what tools you use, and what you would like to change.",
        },
        needOptions: [
          "Website",
          "Mobile app",
          "Business software",
          "AI assistant",
          "WhatsApp automation",
          "Automation",
          "Hosting and support",
          "Not sure yet",
        ],
        submitLabel: "Send enquiry",
      },
    },
    solutionsHub: {
      metaTitle: "Solutions",
      metaDescription:
        "Websites, mobile apps, business software, AI assistants, WhatsApp automation and hosting, explained in plain English.",
      header: {
        eyebrow: "Solutions",
        title: "What we build, in plain words.",
        description:
          "Pick the problem you want to solve. Each page explains what we build, shows a sample of how it works and answers common questions.",
        photo: newImages["business-software"],
      },
      cta: {
        title: "Not sure which one you need?",
        description: "Tell us the problem in your own words. We will tell you what fits, even if it is something small.",
        primaryLabel: "Talk to us",
      },
    },
    industriesHub: {
      metaTitle: "Industries",
      metaDescription:
        "Software and automation for schools, colleges, coaching centres, hotels, factories, clinics and small businesses in India.",
      header: {
        eyebrow: "Industries",
        title: "Built for the way your sector works.",
        description:
          "A school, a hotel and a factory have very different days. Choose yours to see the problems we fix and a sample of how it works.",
        photo: newImages.industries,
      },
      cta: {
        title: "Do not see your industry?",
        description:
          "The same problems show up everywhere: missed enquiries, manual reminders, scattered data. Tell us about yours.",
        primaryLabel: "Talk to us",
      },
    },
    caseStudies: {
      metaTitle: "Examples",
      metaDescription:
        "Sample scenarios for a school, a hotel, a factory, a clinic and a consultant: the problem, what we would build, and what changes. Illustrations, not client results.",
      header: {
        eyebrow: "Examples",
        title: "Sample projects: the problem, what we build, what changes.",
        description:
          "Everyday situations we hear about often. These are samples to show how we think, not real client projects, and they make no claims about results.",
        photo: newImages.caseStudies,
      },
      todayLabel: "Today",
      afterLabel: "After",
      builtLabel: "What we would build",
      sampleTag: "Sample",
      items: caseStudies,
      cta: {
        title: "Does one of these sound like you?",
        description: "Tell us what your version looks like. Every business is a little different.",
        primaryLabel: "Talk to us",
      },
    },
    aiAutomation: {
      metaTitle: "AI & Automation",
      metaDescription:
        "AI assistants, phone assistants, WhatsApp messages and automation explained simply: what they can do, what they should not do, and a sample of how they work.",
      header: {
        eyebrow: "AI & Automation",
        title: "AI that does real work, with your team in charge.",
        description:
          "An AI assistant is useful when it finishes a job, like booking a slot or sending a reminder, and passes everything else to a person.",
        photo: newImages["ai-agents"],
      },
      canTitle: "It can",
      cannotTitle: "It will not",
      canIntro: "We set these limits on every assistant we build.",
      can: [
        "Answer common questions from your own fees, rates, timings or stock",
        "Collect a name, number and requirement, and save it",
        "Book an open slot, share a form or a payment link",
        "Send reminders and updates on time, every time",
        "Pass a chat or call to your staff with the full history",
      ],
      cannot: [
        "Make up prices, offers or answers you have not approved",
        "Give discounts, refunds or exceptions on its own",
        "Give medical, legal or financial advice",
        "Replace the people who make decisions in your business",
      ],
      tools: {
        eyebrow: "Options",
        title: "Four ways to use AI and automation",
        intro: "Each page has a sample and common questions.",
      },
      sample: {
        id: "ai",
        label: "WhatsApp assistant",
        title: "A parent asks about bus timings",
        steps: [
          {
            title: "Message arrives",
            body: "\"What time does the bus reach Kukatpally?\" comes in at 7 AM on the school's WhatsApp.",
          },
          {
            title: "Looks up the answer",
            body: "The assistant checks the bus route list the school has shared, not the internet.",
          },
          { title: "Replies", body: "It sends the stop time and the driver's helpline number." },
          {
            title: "Not sure? Hands over",
            body: "If the parent asks something new, such as a route change, the transport desk gets the chat.",
          },
        ],
      },
      sampleEyebrow: "Sample walkthrough",
      sampleIntro: "An example of an assistant at work. It is an illustration, not a client result.",
      faqs: [
        {
          q: "Is AI safe to use with my customers?",
          a: "Yes, when it is set up to answer only from information you approve and to hand over anything else. We test it with your real questions before it goes live.",
        },
        {
          q: "What is the difference between AI and automation?",
          a: "Automation follows fixed rules, such as sending a reminder on the 5th. AI understands a written or spoken question and picks the right answer or step.",
        },
        {
          q: "Do I need a big budget to start?",
          a: "No. Most businesses start with one assistant or a few automatic reminders, and add more once they see it working.",
        },
      ],
      faqTitle: "Questions about AI",
      cta: {
        title: "Want to try AI on one small job?",
        description: "Send us the questions your team answers most. We will show you how an assistant would handle them.",
        primaryLabel: "Talk to us",
      },
    },
    insights: {
      metaTitle: "Safety and quality",
      metaDescription:
        "How we keep your data safe, test software before it goes live, and look after it afterwards, in plain English.",
      header: {
        eyebrow: "Safety and quality",
        title: "How we keep your software safe and working.",
        description:
          "You are trusting us with your students', guests' or customers' details. Here is what we do at each stage, in plain words.",
        photo: newImages.insights,
      },
      stages: {
        eyebrow: "Our practice",
        title: "Safety at every stage",
        intro: "From the first line of code to years after launch.",
        items: [
          {
            icon: "shield",
            title: "While we build",
            points: [
              "We test on sample data, never on your live student, guest or customer records.",
              "Each person on your team gets a role, so a teacher does not see fee reports and a receptionist does not see salaries.",
              "AI assistants are given a short list of things they may do, and nothing more.",
            ],
          },
          {
            icon: "check",
            title: "Before going live",
            points: [
              "Your team tries the software with real tasks and tells us what is confusing.",
              "We test the assistant with the actual questions your customers ask.",
              "We agree on what should happen when something fails, and who gets told.",
            ],
          },
          {
            icon: "cloud",
            title: "After launch",
            points: [
              "Regular backups, with a way to restore data if something is deleted by mistake.",
              "We watch for errors and slow pages, and fix them.",
              "Security updates are applied, and changes are tracked so they can be undone.",
            ],
          },
        ],
      },
      checklist: {
        eyebrow: "Checklist",
        title: "Six questions to ask any software company",
        intro: "Ask us these too. A good partner should answer each one clearly before you sign anything.",
        items: [
          "Who will own the code and the data?",
          "Where will our data be stored, and who can see it?",
          "What happens if your team is not available?",
          "How do we get our data out if we stop using the software?",
          "What will the AI do when it does not know an answer?",
          "What are the monthly costs after launch?",
        ],
      },
      faqs: [
        {
          q: "Do you follow Indian data protection law?",
          a: "We design software with the Digital Personal Data Protection Act, 2023 in mind: collect only what is needed, limit who can see it, and delete it when it is no longer needed.",
        },
        { q: "Who owns the software you build?", a: "You do. Ownership of the code and data is written into our agreement." },
        { q: "Can we see what the AI assistant said to customers?", a: "Yes. Every conversation is saved so your team can review it." },
      ],
      faqTitle: "Questions about safety",
      notesTitle: "Read more on our blog",
      cta: {
        title: "Have a question about safety?",
        description: "Ask us anything about how your data would be handled. We are happy to explain.",
        primaryLabel: "Talk to us",
      },
    },
    blog: {
      metaTitle: "Blog",
      metaDescription: `Simple, practical articles from ${siteConfig.name} on AI assistants, WhatsApp automation and business software for Indian businesses.`,
      header: {
        eyebrow: "Blog",
        title: "Practical articles for business owners.",
        description:
          "Short, jargon-free reads on AI assistants, WhatsApp automation and software, with everyday examples from schools, hotels and small businesses.",
        photo: newImages.blog,
      },
      emptyTitle: "Nothing published yet",
      emptyBody: "When the first notes are ready, they will appear here.",
      ctaLabel: "Talk to us",
    },
    notFound: {
      eyebrow: "404",
      title: "Sorry, we could not find that page.",
      description: "The link may be old or mistyped. Try one of the pages below, or tell us what you were looking for.",
      homeLabel: "Back to home",
      contactLabel: "Talk to us",
      links: [
        { href: "/solutions", label: "Solutions" },
        { href: "/industries", label: "Industries" },
        { href: "/ai-automation", label: "AI & Automation" },
        { href: "/case-studies", label: "Examples" },
        { href: "/contact", label: "Contact" },
      ],
    },
    legal: {
      effectiveDate: legalEffectiveDate,
      privacy: {
        metaTitle: "Privacy Policy",
        metaDescription: `How ${siteConfig.name} collects and uses personal data from the contact form, analytics consent and related services.`,
        eyebrow: "Privacy",
        title: "Privacy Policy",
        description: `How ${siteConfig.name} handles information submitted through this website.`,
        sections: privacySections(),
      },
      terms: {
        metaTitle: "Terms & Conditions",
        metaDescription: `Terms for using the ${siteConfig.name} website and engaging us for software, automation and related services — including scope, payments, support and liability.`,
        eyebrow: "Terms",
        title: "Terms & Conditions",
        description: `Website use and service engagement terms for ${siteConfig.name}.`,
        sections: termsSections(),
      },
      cookies: {
        metaTitle: "Cookie Policy",
        metaDescription: `Cookie notice for the ${siteConfig.name} website. The site does not set advertising cookies.`,
        eyebrow: "Cookies",
        title: "Cookie Policy",
        description: "What this website stores in the browser, and what it does not.",
        sections: cookieSections(),
      },
    },
    stats,
    services: services.map((item) => ({ ...item })),
    solutionGroups: solutionGroups.map((group) => ({
      id: group.id,
      title: group.title,
      description: group.description,
      slugs: [...group.slugs],
    })),
    industries: industries.map((item) => ({ ...item, solutions: [...item.solutions] })),
    details,
    navigation: {
      primary: [...primaryNav],
      company: [...companyLinks],
      resources: [...resourceLinks],
      legal: [...legalLinks],
      hubs: {
        solutions: { ...footerHubLinks.solutions },
        industries: { ...footerHubLinks.industries },
      },
      footerServiceSlugs: [
        "ai-agents",
        "voice-ai",
        "whatsapp-automation",
        "business-automation",
        "web-development",
        "mobile-applications",
        "business-software",
        "cloud-devops",
      ],
    },
  };
}
