import type { SiteCopy } from "./types";

/**
 * English — the populated source of truth.
 *
 * Every claim here is checkable. Nothing asserts a client, a metric, a
 * testimonial, or a capability that does not exist. If a fact is missing it
 * is marked TODO rather than filled with something plausible.
 */
export const en: SiteCopy = {
  meta: {
    title: "Traionis — Web development studio in Varna, Bulgaria",
    description:
      "Traionis is a web development and digital automation agency based in Varna, Bulgaria. We build custom websites and web applications — you talk to the person who builds it.",
    ogTitle: "Traionis — Custom websites, built for the business",
    ogDescription:
      "A web development studio in Varna, Bulgaria building custom websites and web applications. You talk to the person who builds it.",
  },

  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
    cta: "Start a project",
    skipToContent: "Skip to content",
    localeLabel: "Language",
  },

  hero: {
    brand: "Traionis",
    headline: "Want a website built for your business — not a template?",
    lead: "Custom websites and web applications from scratch. You talk to the person who builds it. Traionis is a web development and digital automation agency based in Varna, Bulgaria.",
    ctaPrimary: "I'm ready to start",
    ctaSecondary: "See what we've built",
    ctaContinue: "Continue",
  },

  offerings: {
    zoneLabel: "SHALLOWS",
    heading: "Two problems worth paying properly to solve",
    intro:
      "Not a service list. If neither of these is your situation, we are probably not the right studio, and it is better to know that now.",
    problems: [
      {
        id: "operation",
        question: "Do you need an application that runs the business?",
        label: "THE OPERATION",
        title: "The application that runs the business",
        body: "Bookings, listings, accounts, dashboards, internal tools. The hard part is not the interface, it is the model underneath it.",
        deliverables: [
          "Roles and permissions modelled before a screen is drawn",
          "The admin side built, not just the customer side",
          "Payments, notifications and automation wired in, not bolted on",
        ],
        proof: {
          href: "/work/parkqui",
          label: "See how this worked on ParkQui",
        },
        disqualifier: "Not this if an off-the-shelf tool already fits.",
      },
      {
        id: "site",
        question: "Do you need a site that has to earn its place?",
        label: "THE SITE",
        title: "The site that has to earn its place",
        body: "Your website is doing commercial work. It is the thing a prospect judges you by before they ever speak to you.",
        deliverables: [
          "Built from scratch, no theme, no page builder, no plugin stack",
          "Measured on a mid-range phone, not the machine it was built on",
          "Structure and copy written to persuade, not to fill a layout",
        ],
        proof: {
          // Orvyx case page not published yet — index until it is.
          href: "/work",
          label: "See how this worked on Orvyx LifePod",
        },
        disqualifier: "Not this if you need it live next week.",
      },
    ],
  },

  process: {
    heading: "How we work",
    intro:
      "Four steps, and the same person is on all four. There is no account manager, because there is no account management layer to put one in.",
    steps: [
      {
        id: "call",
        title: "A call with the person who will build it",
        body: "Thirty to forty-five minutes working out what the thing actually has to do, and whether we're the right people to do it. If we aren't, we'll say so on that call.",
      },
      {
        id: "scope",
        title: "A written scope and a fixed price",
        body: "Before anything is built you get the scope, the timeline and the cost in writing. What's included is written down, and so is what isn't.",
      },
      {
        id: "build",
        title: "Built where you can see it",
        body: "You get a working link from the first week and it stays current. Progress is something you check, not something you're told about.",
      },
      {
        id: "handover",
        title: "Handed over properly",
        body: "The repository, the hosting accounts, the domain, and a walkthrough of how the thing works. You leave the engagement able to hire anyone you like next.",
      },
    ],
  },

  work: {
    heading: "What we've built",
    intro:
      "One project, explained properly, tells you more than a wall of thumbnails. Here's the decision-making, not the screenshots.",
    readMore: "Read the full breakdown",
    viewAll: "All projects",
  },

  capabilities: {
    heading: "What that actually involves",
    intro:
      "The part a template can't reach. This is where most of the engineering time goes, and it's the reason the work costs what it costs.",
    items: [
      {
        id: "data",
        title: "Data modelling and access control",
        body: "Accounts, roles, permissions, and the schema underneath them. Get this wrong at the start and every feature after it is more expensive.",
      },
      {
        id: "geo",
        title: "Maps and geospatial queries",
        body: "Interactive maps backed by real location data — searching, filtering, and rendering results without the interface falling over.",
      },
      {
        id: "admin",
        title: "Admin and moderation systems",
        body: "The screens the owner uses, not the customer. Listings, approvals, and the day-to-day operations that decide whether a product is actually usable.",
      },
      {
        id: "automation",
        title: "Integrations and automation, built in",
        body: "Payment providers, booking assistants, notifications and internal tooling wired into the product itself rather than bolted on as a separate service.",
      },
      {
        id: "performance",
        title: "Performance as a requirement",
        body: "Bundle size, scroll behaviour and first paint treated as part of the build rather than something to look at afterwards. This site is the demonstration.",
      },
    ],
  },

  founder: {
    heading: "Who you're working with",
    name: "Miroslav Todorov",
    role: "Founder — Traionis",
    // TODO(bio): placeholder. Three written directions pending Miroslav's choice.
    // Needs: background, years working, what he's best at, why he works this way.
    body: [
      "TODO(bio): first paragraph — who he is and what he actually does day to day.",
      "TODO(bio): second paragraph — why the studio is structured this way.",
    ],
  },

  contact: {
    heading: "Start a project",
    intro:
      "Tell us what you're building. You'll get a straight answer on whether we're the right fit and what it would take — not a brochure.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@company.com" },
      company: { label: "Company", placeholder: "Company name", optional: "Optional" },
      project: {
        label: "What you're building",
        placeholder:
          "What it needs to do, who uses it, and what's driving the timing.",
        help: "Rough notes are fine. Detail here saves a round of emails.",
      },
      timeline: { label: "Timeline", placeholder: "When you'd like it live" },
      budget: {
        label: "Budget range",
        help: "So we can tell you quickly whether we're a fit.",
        options: [
          { value: "2-5k", label: "€2,000 – €5,000" },
          { value: "5-15k", label: "€5,000 – €15,000" },
          { value: "15k-plus", label: "€15,000+" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
    },
    submit: "Send project brief",
    submitting: "Sending…",
    success: "Thanks — we'll come back to you within two working days.",
    errorRequired: "This field is required.",
    errorEmail: "Enter a valid email address.",
    exclusionsHeading: "What we don't take on",
    exclusions:
      "WordPress theme installs, template customisation, and five-page brochure sites. If that's what you need, you'll get it faster and cheaper somewhere else — and we'd rather say so now.",
  },

  footer: {
    description:
      "Traionis is a web development and digital automation agency based in Varna, Bulgaria, building custom websites and web applications.",
    location: "Varna, Bulgaria",
    rights: "All rights reserved.",
    columns: [
      {
        heading: "Site",
        links: [
          { label: "Work", href: "/work" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
};
