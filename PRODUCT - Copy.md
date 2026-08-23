# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing scaffold, confirmed by the repository: Next.js 16.3 (App Router), React 19.2, TypeScript, Tailwind v4, PostCSS. No backend, no database, no API routes — a static marketing site by deliberate constraint.

To be added: Framer Motion (current npm package name `motion`, imported from `motion/react`).

Deliberately excluded by the client: Supabase, any database, any API route, any third-party form service.

## Users

Primary: **business owners and decision-makers commissioning custom web work**, budget range €2,000–15,000 per project. They arrive evaluating whether to commission a build. They cannot read code, so they judge technical competence by proxy — the craft of the site they are standing on is the evidence they actually use.

Market: English is primary; buyers are international and European. Bulgarian is a required second language via a manual header toggle (EN/BG). The studio is based in Varna, Bulgaria (Black Sea coast).

The site is explicitly **not** a lead-volume instrument. It filters. Reducing unqualified enquiries is a success condition, not a cost.

## Product Purpose

Traionis is a web and app development studio. The website's job is to convert a qualified visitor into a discovery call, and to deflect unqualified ones.

The site is simultaneously the sales instrument **and the primary portfolio piece**. Because the buyer cannot evaluate source code, execution precision on this site is the proof of engineering capability. This makes craft a functional requirement, not a preference.

Success = a small number of well-scoped enquiries from buyers already in the €2k+ range, each arriving with a project brief already articulated.

## Positioning

The positioning spine, which every copy decision must serve:

> **"You talk to the person who builds it — and what gets built is real engineering, not a template resold."**

- An agency cannot truthfully claim the first half — account managers, junior developers, outsourcing.
- A cheap freelancer cannot truthfully claim the second half.
- Traionis occupies the gap between them.

This is a claim about **structure**, not quality, which is why it survives having a short client list.

## Operating Context

- Buyers evaluate by comparing against agencies and freelance marketplaces, usually with several proposals in hand.
- Pricing is discussed **only on the discovery call**. No price or price floor appears anywhere on the site.
- The single filtering mechanism is a required budget-bracket field on the contact form, framed as a normal scoping question rather than a gate.
- Enquiry brackets in use: €2–5k / €5–15k / €15k+ / Not sure yet.
- Explicitly out of scope, and stated on the site: WordPress theme installs, template customization, cheap five-page brochure sites.
- Traffic skews substantially mobile.
- The site currently ranks in Google and appears in Google AI Overview. **Preserving existing search performance is a hard requirement.** Indexed paths `/work` and `/contact` must continue to resolve.
- Live deployment: **traionis.com**. The rebuild is a **total overhaul** — the existing design and copy are explicitly not a reference and must not be carried over or mined for tone. Only URL structure and crawlable-phrase requirements survive.

## Capabilities and Constraints

**What the studio builds**

**Two** headline offerings, both websites and web applications. Confirmed decision: AI and automation is **not** a third service. Three offerings reads as a services list; two reads as a point of view, and a third AI pillar would place the studio in a saturated category where it cannot make the deepest claim — diluting the engineering positioning it is meant to support.

AI and automation remains a real capability and appears only as **evidence inside project work** — booking assistants, integrations, internal tooling — described as functionality built into a build. No headline slot, no service card, no overclaimed depth.

Offerings are framed as **problems solved**, never as a services list. "Websites" is a commodity word.

**Voice**

First person plural — "we build", "we work". Traionis presents as a studio. Confirmed by the client, and deliberately reversible: because all copy lives as typed objects in `lib/`, switching voice later is a content change, not a refactor.

"We" must never imply account managers, sales staff, or handoffs. The person the buyer speaks with is the person who builds.

**Technical constraints**

- No backend, no database, no API routes. Contact form is client-side only, with the submission endpoint left as a marked TODO.
- All user-facing copy must live as typed content objects in `lib/`, never hardcoded in JSX, so Bulgarian can be populated without refactoring.
- Ship with English populated and Bulgarian stubbed with explicit TODOs.
- Per-route metadata exports, OpenGraph, semantic HTML.
- The exact phrase **"web development and digital automation agency based in Varna, Bulgaria"** must appear in crawlable content.
- Fully responsive; motion system must hold 60fps on mobile or be reconsidered.
- `prefers-reduced-motion` fully respected — the site must remain coherent with all motion disabled.

**Open / undecided**

- Short bio for **Miroslav Todorov** in the "who you're working with" section — name confirmed, biographical facts not yet supplied. No photo.
- **What Orvyx actually is** — what it does, who it was built for, and what was technically hard about it. Confirmed as a separate project from ParkQui. No technical specifics are published against Orvyx until supplied; this is the single largest content gap on the site.
- Outcome metrics for Orvyx — not yet supplied.
- **ParkQui's commercial status** — self-initiated, unpaid, or a client build. Determines whether it can be labelled client work on `/work`.
- Bulgarian translations.
- Contact form submission endpoint.

## Brand Commitments

- Name: **Traionis**. Studio, based in Varna, Bulgaria. Live at traionis.com.
- Founder / lead: **Miroslav Todorov**. Named on the site in the closing section, in first person singular — the site speaks as "we" throughout and resolves to a named individual at the end, which is what makes the direct-builder-access claim concrete. No photo.
- Voice: first person plural, direct, no marketing inflation, no defensive claims.
- The SEO phrase uses the word "agency"; the brand voice uses "studio". The phrase is retained verbatim where crawlers need it, while body copy says studio.

**Explicitly forbidden on the site:**

- Any stated price or price floor.
- Pricing tiers or package cards.
- Defensive stat bars ("0 hidden costs", "100% code ownership") — these signal the cheap market.
- Fabricated clients, logos, testimonials, or metrics of any kind.
- An FAQ led by "How much does it cost."

## Evidence on Hand

**Real, usable — three distinct builds, confirmed by the client:**

- **Orvyx** — the one genuine **paid client project**. What it does is not yet supplied (see Open / undecided). Carries the homepage work zone alone, at full depth, because paid client work is the only evidence that answers "would someone hire you."
- **ParkQui** — full-stack parking marketplace: interactive maps, authentication, listing management, admin dashboard, built for a 2,000-member Bulgarian community. Confirmed as a **separate project from Orvyx**, and not the paid engagement. Commercial status to confirm before labelling. Technically the richest build on hand and the strongest case-study material regardless of whether money changed hands.
- **Morion Stones** — built but never adopted by a client. Presented honestly as a self-initiated build, never as a client success.

Placement: Orvyx alone on the homepage; ParkQui and Morion Stones on the `/work` index. This keeps the homepage a single deep case rather than a thin grid, while `/work` holds three real builds and never reads as a one-item list.

**Does not exist, and must not be invented:**

- Testimonials. One informal, secondhand remark exists ("he really liked it") from the person who sold the ParkQui engagement. It was never collected as a quote and is too thin to publish. The work section must be designed so the absence of testimonials is not conspicuous.
- Client logos, named references, case-study metrics, press, awards.
- Any photo of the founder or team.

The honest evidence position is: **one substantial client build, real self-initiated work, and the site itself.** Depth of explanation compensates for quantity — case studies are structured problem → decisions and why → what it does now, because demonstrated thinking is what a short client list can still prove.

## Product Principles

1. **Filter, don't funnel.** Every element is judged by whether it attracts the right buyer and repels the wrong one. Fewer, better-qualified enquiries beat volume.
2. **The artifact is the argument.** The buyer cannot audit code, so precision of execution on this site is the technical credential. Craft defects are credibility defects.
3. **Never inflate.** One real client project stated plainly outranks any invented proof. Nothing gets claimed that could not survive being asked about on the discovery call.
4. **Structure over adjectives.** The positioning is a fact about how the studio is organised — direct access to the builder. Assert the structure; skip the superlatives.
5. **Specificity is the proof.** Named systems, real technical decisions, and concrete constraints do the persuading that testimonials would otherwise do.

## Accessibility & Inclusion

- Real visible focus states, semantic landmarks, full keyboard navigation through the entire scroll experience.
- `prefers-reduced-motion` fully honoured; all content and structure remain coherent with motion disabled.
- Bilingual EN/BG support built into the content layer from the outset.
