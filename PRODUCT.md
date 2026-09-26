# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing scaffold, confirmed by the repository: Next.js 16.3 (App Router), React 19.2, TypeScript, Tailwind v4, PostCSS. Motion (`motion` v13, imported from `motion/react`) is installed and in use. No backend, no database, no API routes — a static marketing site by deliberate constraint.

The contact form POSTs to a third-party form endpoint so the submit stays inside the page. The URL lives in `NEXT_PUBLIC_CONTACT_ENDPOINT` (public by nature, not a secret); see `.env.example`. With the variable unset the form renders in full but disables its submit and says it is not connected — it never accepts a brief it cannot deliver.

## Users

Primary: **founders, business owners and companies commissioning serious web work** — a €2,000–3,000+ website, or an expensive software idea they need turned into a product. They cannot read code, so they judge technical competence by proxy: the craft of the site they are standing on is the evidence they actually use.

The test every page is judged against:

> A buyer with a serious project lands on this site. Within a minute he thinks: "those are the guys — they can get the job done."

**Premium signal, open door.** The site is written and designed for the high-value buyer and never speaks down-market. It also never turns anyone away: there is no price floor, no bracket, no filter. A €300–500 job that arrives through the contact form is welcome. Filtering the cheap end is a future decision, made when volume justifies it — not now.

Market: English is primary; buyers are international and European. Early clients realistically come from Bulgaria (personal network, sales partners, local search), so Bulgarian is a first-class second language, not an afterthought. The studio is based in Varna, Bulgaria.

## Product Purpose

Traionis is a web and software development studio. The website's job is to make a serious buyer believe the studio can execute at the level their project needs, and to convert that belief into a conversation.

The site is simultaneously the sales instrument **and the primary portfolio piece**. It should be a structural and visual showpiece — exceptional design, engineering and motion — because for a buyer who cannot audit code, the precision of this site *is* the technical credential. Craft is a functional requirement.

Success = enquiries from buyers who arrive already convinced, with a project to describe.

## Positioning

The positioning spine, which every copy and design decision must serve:

> **Engineered, not assembled.**

Everything Traionis delivers is built from the ground up — no themes, no page builders, no plugin stacks, no resold templates — and the site the buyer is standing on is the proof.

- This is a claim about **the work**, not about who the buyer talks to. It stays true whether the first conversation is with the founder or with a sales partner.
- The site does not frame the studio by team size in either direction. It never claims a headcount, a team, or departments it does not have, and it never draws attention to being a one-person operation.
- Rebuilds follow the same principle: an existing site is not patched or reskinned, it is rebuilt from the ground up. No WordPress work. The site never disparages the buyer's current site (the "mansion vs. old hut" image is for sales calls, not the page — the reader owns the hut); it states the approach and removes the risk: domain, content and search rankings carry over.

The previous spine ("you talk to the person who builds it") is retired. It was not always true (sales partners handle some conversations), buyers do not weigh it heavily, and it foregrounded a small operation.

## Operating Context

- Buyers compare against agencies and freelance marketplaces, usually with several proposals in hand, in a brutally competitive market. Speed is a selling point; stated timelines are short but not so short they devalue the work.
- Some buyers first speak with a **sales partner**, not the founder. The site never promises who the first conversation is with.
- **Pricing never appears on the site** — no prices, no "from €X", no tiers, no packages. It is discussed on the call. The site also does not justify the absence of a price.
- **No budget-bracket dropdown on the contact form.** Scope is captured in prose — what it needs to do, who uses it, what is driving the timing.
- Traffic skews substantially mobile.
- The site ranks in Google and appears in Google AI Overview. **Preserving search performance is a hard requirement.**
- Live deployment: **traionis.com**. DNS is managed by Vercel (nameservers `ns1/ns2.vercel-dns.com`); the domain is registered at Namecheap.

**Site structure — two pages, one per language**

- `/` — English. `/bg` — Bulgarian. Each is the complete single-page site, cross-linked with `hreflang` alternates.
- Header navigation links to **sections on the same page** (`#work`, `#process`, `#contact`, …), never to other routes.
- Previously indexed paths `/work`, `/contact`, `/about` and `/work/[slug]` are **301-redirected** to the matching section of `/` so their ranking consolidates onto the homepage. They must never return 404.
- Case-study depth (ParkQui) lives inside the homepage work section — expandable in place — rather than on its own route.

## Capabilities and Constraints

**What the studio builds — two offerings**

1. **Websites** — custom-built sites that do commercial work for the business.
2. **Applications and custom software** — web and mobile applications and bespoke systems for whatever the business runs on: operations, bookings, marketplaces, fleets, internal tools. A web application often needs a mobile companion, so mobile is part of this offering rather than a separate one.

The range is wide on purpose (from fleet management to a delivery marketplace), but specific examples like these are internal context, not pitches — the site does not name imaginary product types as if it had built them.

AI and automation are **not** a third offering. They appear as capabilities built into projects — assistants, integrations, automated workflows, internal tooling — never as a headline pillar.

Mobile is offered, but there is no shipped mobile work yet, so no mobile proof is claimed.

Offerings are framed as outcomes and capability, never as a flat services list.

**Timelines (stated on the site)**

- Websites: **1–3 weeks**.
- Applications: **a first working release in 2–5 weeks**, scope-dependent.
- A working link from the first week, kept current — progress is something the client checks, not something they are told about.

**After launch (stated on the site, FAQ only)**

- **Full handover, always included:** code repository, hosting, and domain — in the client's name and the client's own accounts. The client owns everything.
- **30-day warranty:** bug fixes for 30 days after launch, included.
- **Optional monthly care plan:** hosting management, updates, small changes, monitoring. Presented as something that exists; no price. Mentioned in the FAQ only.

**Voice**

First person plural — "we build", "we work". Traionis presents as a studio, and resolves at the end to a named founder (see Brand Commitments).

- Confident and factual. State what is built and how; skip superlatives.
- **Not defensive.** No disqualifiers ("not this if…", "we are probably not the right studio"), no justifying price or cost, no arguing with a cheap buyer. Defining the studio against templates is allowed once, as a fact — not as a recurring theme.
- **Minimal negation.** Copy says what the studio is and does. Repeated "not X, not Y" constructions read as insecurity.

**Work section: a modular gallery**

A **gallery that holds 3–5 projects and accepts a new one as a content-layer change only** — no layout rework, no single case the page's composition depends on. It must read as intentional at two entries and at five.

**Technical constraints**

- No backend, no database, no API routes.
- All user-facing copy lives as typed content objects in `lib/`, never hardcoded in JSX.
- Per-route metadata exports, OpenGraph, semantic HTML.
- **Bilingual SEO:** Bulgarian must be indexable. The current client-side EN/BG toggle means Google only ever sees English; it is replaced by the server-rendered `/bg` page, with the EN/BG toggle becoming a link between `/` and `/bg`. Each language carries its own search phrase.
- Fully responsive; the motion system must hold 60fps on mobile or be reconsidered.
- `prefers-reduced-motion` fully respected — the site remains coherent with all motion disabled.

**Open / undecided**

- **Search phrase.** The old required phrase ("web development and digital automation agency based in Varna, Bulgaria") is being replaced. Candidate: *"custom web development studio in Varna, Bulgaria — websites, web applications and custom software."* Final wording waits on Google Search Console query data for traionis.com, so the new phrase is chosen from real ranking queries. A Bulgarian equivalent is needed for the BG routes.
- Bulgarian translations.
- **The form endpoint URL** — the mechanism is built; the endpoint still has to be created and `NEXT_PUBLIC_CONTACT_ENDPOINT` set in the deploy environment.

## Brand Commitments

- Name: **Traionis**. Studio, based in Varna, Bulgaria. Registered company (ТРАЙОНИС ЕООД), **est. 2023** — verifiable in the Bulgarian trade register. Live at traionis.com.
- Founder: **Miroslav Todorov, Founder & Lead Engineer.** Named in a short closing section. No photo, no CV.

**Founder section — what it may say:**

- Name and title.
- Two or three sentences on how he approaches building.
- "Traionis, est. 2023."
- Enterprise background, stated precisely: previously built front-end for a European enterprise healthcare platform; trained at Endava.

**What it does not say:** years of experience, number of clients, or non-development roles. Domain knowledge from running day-to-day operations for a 70-truck logistics fleet is true and valuable, but it belongs on calls with logistics buyers, not on the site.

**Explicitly forbidden on the site:**

- Any stated price, price floor, "from €X", pricing tiers or package cards.
- Defensive stat bars ("0 hidden costs", "100% code ownership").
- Fabricated clients, logos, testimonials, metrics, team members or headcount.
- An FAQ led by "How much does it cost", or any FAQ entry justifying the absence of prices.
- Disqualifying copy that turns buyers away.

## Evidence on Hand

**Orvyx — LifePod 72. Shipped, paid client work. Live at https://orvyx.tech/.**

Orvyx sells **LifePod 72**, a hard-case system built to keep someone alive for 72 hours in an emergency — modular kits inside a single IP67, impact-resistant case. Traionis built the product site. Client nameable, site linkable.

- Real paid client work; the fee is never mentioned.
- What it is honestly evidence of: **shipped, live, paid, and visually strong** — nothing more. The build was not technically hard (largely generated video plus small tweaks). It is never written up as an engineering case study and never carries invented decisions, constraints or difficulty. A short, plain, honest treatment.

**ParkQui — marketplace platform. Live at https://park-qui.vercel.app/ (map view behind authentication).**

Full-stack parking marketplace: interactive maps, authentication, listing management, admin dashboard, built for a 2,000-member Bulgarian community.

- Built **for a founder**, for that community. It is described that way — "built for a founder" is true — without claiming a fee or calling it paid client work. The commercial arrangement and how it ended stay off the site.
- **The only evidence of engineering depth.** It carries the case-study structure: problem → decisions and why → what it does now.

**PopWrists — in-house product concept. Live at https://popwrists.vercel.app/.**

A launch and waitlist page for an unofficial AP × Swatch wrist adapter. Traionis's own concept, shown as an in-house build. Claims no client, fee or outcome.

**Not published:** Morion Stones (link and source lost — an entry with no evidence behind it is worth less than an empty slot).

**Does not exist, and must not be invented:** testimonials, client logos, named references, case-study metrics, press, awards, photos of the founder or a team, shipped mobile apps. The work section is designed so the absence of testimonials is not conspicuous.

The honest evidence position: **one shipped client site, one deep platform build, one in-house product, and the site itself.** Depth of explanation compensates for quantity.

## Product Principles

1. **Premium signal, open door.** Written and designed for the serious buyer; never turns a smaller one away. No filters, no floors, no brackets.
2. **The artifact is the argument.** The buyer cannot audit code, so this site's execution is the technical credential. It should be a showpiece. Craft defects are credibility defects.
3. **Engineered, not assembled.** Every section should demonstrate engineering, not describe it. A section that could appear on any agency's site is a failed section.
4. **Confidence without defensiveness.** State facts. Never justify, apologise, or argue with an imagined cheap buyer.
5. **Never inflate.** Nothing is claimed that could not survive being asked about on a call. Specificity — named systems, real decisions — does the persuading testimonials would otherwise do.
6. **Grows by content, not by rebuild.** The work gallery, the copy layer and the language layer take new material as data.

## Accessibility & Inclusion

- Real visible focus states, semantic landmarks, full keyboard navigation through the entire scroll experience.
- `prefers-reduced-motion` fully honoured; all content and structure remain coherent with motion disabled.
- Bilingual EN/BG support, indexable in both languages (`/` and `/bg`).
