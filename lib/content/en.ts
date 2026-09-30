import type { SiteCopy } from "./types";

/**
 * English - the populated source of truth.
 *
 * Every claim here is checkable. Nothing asserts a client, a metric, a
 * testimonial, or a capability that does not exist. Voice rules live in
 * PRODUCT.md: confident, factual, no disqualifiers, minimal negation.
 */
export const en: SiteCopy = {
  meta: {
    title: "Traionis - Custom websites & applications, Varna, Bulgaria",
    description:
      "Traionis is a web development studio in Varna, Bulgaria. We design and build custom websites and web and mobile applications from the ground up.",
    ogTitle: "Traionis - You bring the idea. We build the product.",
    ogDescription:
      "Custom websites and web and mobile applications, designed and built from the ground up by a studio in Varna, Bulgaria.",
  },

  nav: {
    services: "Services",
    work: "Work",
    process: "Process",
    contact: "Contact",
    cta: "Start a project",
    skipToContent: "Skip to content",
    localeLabel: "Language",
    primaryLabel: "Primary",
    introLabel: "Introduction",
  },

  hero: {
    brand: "Traionis",
    eyebrow: "Web development studio · Varna, Bulgaria · Est. 2023",
    headline: "You bring the idea. We build the product.",
    lead: "Websites and web & mobile applications, designed and built from the first line of code.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See the work",
    ctaContinue: "Dive in",
  },

  offerings: {
    heading: "What we build",
    intro: "Designed and built from scratch, around how your business actually works.",
    offerings: [
      {
        id: "site",
        title: "Websites that do commercial work",
        body: "The site a prospect judges you by before they ever speak to you. Designed around what it has to sell, coded from scratch, and tuned for the phone most of your visitors are holding.",
        // Anchors are layers of the exploded page, bottom to top.
        callouts: [
          { anchor: "foundation", text: "Code, hosting and domain in your name" },
          { anchor: "structure", text: "Structured for Google and AI search answers" },
          { anchor: "content", text: "Bilingual when your market is" },
          { anchor: "design", text: "Custom design, built from scratch for your brand" },
          { anchor: "interaction", text: "Fast on every phone - tested on real devices" },
        ],
        proof: { href: "#plate-orvyx", label: "See Orvyx" },
        timeline: "Live in 1-3 weeks",
      },
      {
        id: "app",
        title: "Applications the business runs on",
        body: "Booking systems, marketplaces, client portals, operations and internal tools - web and mobile, built around how your business actually works.",
        // Anchors are parts of the system diagram.
        callouts: [
          { anchor: "admin", text: "Admin dashboards and moderation" },
          { anchor: "maps", text: "Maps and location search" },
          { anchor: "integrations", text: "Payments, notifications and third-party integrations" },
          { anchor: "automation", text: "Automation and AI assistants, built into the product" },
          { anchor: "data", text: "Data modelling, accounts, roles and permissions" },
        ],
        proof: { href: "#plate-fastcat", label: "See FastCat" },
        timeline: "First working release in 2-3 weeks",
      },
    ],
    rebuild:
      "Already have a site? We rebuild it from the foundations - and your domain, your content and your search rankings come with it.",
  },

  process: {
    heading: "How a project runs",
    intro: "Four stages, each ending with something you can hold.",
    steps: [
      {
        id: "call",
        title: "Discovery call",
        body: "Thirty to forty-five minutes on what it has to do, who uses it, and what's driving the timing. You leave with a clear next step.",
      },
      {
        id: "scope",
        title: "Scope and fixed price",
        body: "Scope, timeline and cost in writing before any code is written. What's included is on paper, and so is what isn't.",
      },
      {
        id: "build",
        title: "Built in the open",
        body: "A working link from the first week, updated as we build. You check progress whenever you like.",
      },
      {
        id: "handover",
        title: "Launch and handover",
        body: "Code, hosting and domain in your name, plus a walkthrough of how it all fits together. Thirty days of fixes included.",
      },
    ],
  },

  work: {
    heading: "Selected work",
    intro: "Live and linkable. Open any of them on your phone.",
    readMore: "How we built it",
    readLess: "Close the breakdown",
    breakdown: {
      problem: "The problem",
      decisions: "The decisions",
      outcome: "Where it stands",
    },
    viewAll: "All projects",
    visitLive: "Visit the live site",
  },

  faq: {
    heading: "Before you ask",
    intro: "The questions that usually come up on the first call.",
    items: [
      {
        id: "timeline",
        question: "How long does a project take?",
        answer: [
          "Websites take one to three weeks. Applications reach a first working release in two to three weeks, and we build on it from there. The exact timeline goes into the written scope.",
        ],
      },
      {
        id: "ownership",
        question: "Who owns the code?",
        answer: [
          "You do. The repository, hosting and domain sit in your own accounts from launch day.",
        ],
      },
      {
        id: "after-launch",
        question: "What happens after launch?",
        answer: [
          "Every project includes thirty days of fixes. After that, you can keep us on a monthly care plan - hosting, updates, monitoring and small changes - or take the project anywhere you like.",
        ],
      },
      {
        id: "rebuild",
        question: "Can you rebuild our existing site?",
        answer: [
          "Yes - from the foundations. We don't patch old sites or work in WordPress; a clean rebuild is faster and holds up longer. You keep your domain and content, and we carry your search rankings over through the move.",
        ],
      },
      {
        id: "mobile",
        question: "Do you build mobile apps?",
        answer: [
          "Yes, as part of application work. When a product needs to live on the phone, the mobile app is built alongside the web platform, on the same backend.",
        ],
      },
      {
        id: "international",
        question: "Do you work with clients outside Bulgaria?",
        answer: ["Yes. We work remotely, in English and Bulgarian."],
      },
    ],
    more: { prompt: "Something else?", link: "Ask it in your brief" },
  },

  founder: {
    heading: "Behind the work",
    name: "Miroslav Todorov",
    role: "Founder & Lead Engineer",
    statement: "Every project we ship is held to the standard of the site you're reading now.",
    body: [
      "I started Traionis in 2023 to bring the standard of enterprise software teams to businesses of any size, after working inside one myself. Today we build the whole stack, from the interface your customers see to the database behind it.",
    ],
    facts: "Est. 2023 · Varna, Bulgaria · English / Bulgarian",
  },

  contact: {
    heading: "Start a project",
    intro:
      "Tell us what you're building. We'll reply within two working days with next steps.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@company.com" },
      project: {
        label: "What are you building?",
        placeholder: "What it needs to do, who will use it, and when you'd like it live.",
        help: "A few rough lines are enough.",
      },
    },
    submit: "Send brief",
    submitting: "Sending…",
    successHeading: "Brief received.",
    success: "We'll be in touch within two working days.",
    errorRequired: "This field is required.",
    errorEmail: "Enter a valid email address.",
    errorSubmit: "That didn't go through. Please try again in a moment.",
    // TODO(endpoint): remove once NEXT_PUBLIC_CONTACT_ENDPOINT is set in the
    // deploy environment. Visible on purpose - a form that silently accepts a
    // brief and drops it is the worst bug this site could ship.
    errorUnconfigured: "This form isn't connected yet.",
    next: {
      heading: "What happens next",
      steps: [
        "We read your brief.",
        "You get a reply within two working days.",
        "A short call to scope it - then a written scope and a fixed price.",
      ],
    },
    direct: {
      heading: "Prefer to talk first?",
      email: "Write to us directly",
      call: "Book a 30-minute call",
      phone: "Or call",
      hours: "Mon-Fri, 9:00-18:00",
    },
  },

  footer: {
    description:
      "Traionis is a web development studio in Varna, Bulgaria, building custom websites and web and mobile applications.",
    legalName: "Traionis EOOD",
    location: "Varna, Bulgaria",
    rights: "All rights reserved.",
    columns: [
      {
        heading: "Site",
        links: [
          { label: "Services", href: "offerings" },
          { label: "Work", href: "work" },
          { label: "Process", href: "process" },
          { label: "Contact", href: "contact" },
        ],
      },
    ],
  },

  notFound: {
    title: "Page not found",
    heading: "Nothing down here.",
    body: "This page drifted off, or it never existed. Everything that does is one click up.",
    cta: "Back to the surface",
  },
};
