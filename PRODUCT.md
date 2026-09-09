# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing scaffold, confirmed by the repository: Next.js 16.3 (App Router), React 19.2, TypeScript, Tailwind v4, PostCSS. Motion (Framer Motion's current package, `motion` v13, imported from `motion/react`) is installed and in use. No backend, no database, no API routes — a static marketing site by deliberate constraint.

Deliberately excluded by the client: Supabase, any database, any API route.

**One exclusion was reversed.** Third-party form services were originally ruled out alongside the rest. With no backend and no API route, the contact form had nowhere to send, and the alternatives were a `mailto:` handoff that loses anyone on webmail or a serverless route that breaks the no-API-routes rule. Confirmed decision: the brief POSTs to a third-party form endpoint, so the submit stays inside the page. The URL lives in `NEXT_PUBLIC_CONTACT_ENDPOINT` (public by nature — it accepts anonymous POSTs — and therefore not a secret); see `.env.example`.

## Users

Primary: **business owners and decision-makers commissioning custom web work.** They arrive evaluating whether to commission a build. They cannot read code, so they judge technical competence by proxy — the craft of the site they are standing on is the evidence they actually use.

**There is no price floor.** A €200–300 job that finishes in a day or two is worth taking. The €2,000–15,000 range is not a gate the site enforces; it is the level the site has to be *credible at*. The test the studio actually applies:

> A visitor with a €2,000 project lands on this site. Does he conclude "these guys can do the job"?

Everything on the site is judged against that sentence. Small, fast work still gets done — it simply arrives through personal connections rather than through the site.

Market: English is primary; buyers are international and European. Bulgarian is a required second language via a manual header toggle (EN/BG). The studio is based in Varna, Bulgaria (Black Sea coast).

## Product Purpose

Traionis is a web and app development studio. The website's job is to convince a serious buyer that this studio can execute at the level their project needs, and to convert that conviction into a discovery call.

The site is simultaneously the sales instrument **and the primary portfolio piece**. Because the buyer cannot evaluate source code, execution precision on this site is the proof of engineering capability. This makes craft a functional requirement, not a preference.

Success = enquiries from buyers who already believe the studio is capable, each arriving with a project brief already articulated.

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
- **No budget-bracket dropdown on the contact form.** Confirmed decision: scope is captured in prose — what it needs to do, who uses it, what is driving the timing — and money comes up on the call. A bracket selector reads as a gate, and there is no floor for it to enforce.
- Explicitly out of scope, and stated on the site: WordPress theme installs, template customization, cheap five-page brochure sites. This exclusions line stays; it is a statement about the kind of work, not about the price.
- Traffic skews substantially mobile.
- The site currently ranks in Google and appears in Google AI Overview. **Preserving existing search performance is a hard requirement.** Indexed paths `/work` and `/contact` must continue to resolve. `/about` and `/work/[slug]` also exist.
- Live deployment: **traionis.com**. The rebuild is a **total overhaul** — the existing design and copy are explicitly not a reference and must not be carried over or mined for tone. Only URL structure and crawlable-phrase requirements survive.

## Capabilities and Constraints

**What the studio builds**

**Two** headline offerings, both websites and web applications. Confirmed decision: AI and automation is **not** a third service. Three offerings reads as a services list; two reads as a point of view, and a third AI pillar would place the studio in a saturated category where it cannot make the deepest claim — diluting the engineering positioning it is meant to support.

AI and automation remains a real capability and appears only as **evidence inside project work** — booking assistants, integrations, internal tooling — described as functionality built into a build. No headline slot, no service card, no overclaimed depth.

Offerings are framed as **problems solved**, never as a services list. "Websites" is a commodity word.

**Voice**

First person plural — "we build", "we work". Traionis presents as a studio. Confirmed by the client, and deliberately reversible: because all copy lives as typed objects in `lib/`, switching voice later is a content change, not a refactor.

"We" must never imply account managers, sales staff, or handoffs. The person the buyer speaks with is the person who builds.

**Work section: a modular gallery**

Confirmed structural decision. The work section is built as a **gallery that holds 3–5 projects and accepts a new one as a content-layer change only** — no layout rework, no component surgery, and no single case that the page's composition depends on. Today exactly one entry is real client work (Orvyx). The design must therefore read as intentional at one entry and still read as intentional at five.

This replaces the earlier "one project carries the homepage at full depth" rule.

**Technical constraints**

- No backend, no database, no API routes. The contact form is client-side only and POSTs to a third-party form endpoint (see Stack). With the variable unset it renders in full but disables its submit and says it is not connected — it never accepts a brief it cannot deliver.
- All user-facing copy must live as typed content objects in `lib/`, never hardcoded in JSX, so Bulgarian can be populated without refactoring.
- Ship with English populated and Bulgarian stubbed with explicit TODOs.
- Per-route metadata exports, OpenGraph, semantic HTML.
- The exact phrase **"web development and digital automation agency based in Varna, Bulgaria"** must appear in crawlable content.
- Fully responsive; motion system must hold 60fps on mobile or be reconsidered.
- `prefers-reduced-motion` fully respected — the site must remain coherent with all motion disabled.

**Open / undecided**

- Short bio for **Miroslav Todorov** in the "who you're working with" section — name confirmed, biographical facts not yet supplied. No photo.
- **ParkQui's commercial status** — self-initiated, unpaid, or a client build. Determines whether it can be labelled client work.
- **What PopWrists is** — client work, self-initiated, or a test; and whether it stays in the gallery at all.
- **Morion Stones** — a live URL or the source, either of which would put it back in the gallery.
- Bulgarian translations.
- **The form endpoint URL itself** — the mechanism is built and the decision made; Miroslav still has to create the form-service endpoint and set `NEXT_PUBLIC_CONTACT_ENDPOINT` in the deploy environment.

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

**Orvyx — LifePod 72. Shipped, paid client work. Live at https://orvyx.tech/.**

The one real project. Orvyx sells **LifePod 72**, a hard-case system built to keep someone alive for 72 hours in an emergency — modular kits inside a single IP67, impact-resistant case: water purification and bio-defense, field tools, ignition, light, power, hydration. Traionis built the product site. Client nameable, site linkable.

- The lead arrived through a personal connection and the engagement was ~€300–400. It is real paid client work and is described as such; the fee is never mentioned.
- The client's own brand is dark, minimal and engineering-driven; its Bulgarian copy leans on autonomy, engineering, "system complete."
- **What it is honestly evidence of, confirmed by Miroslav:** nothing about the build was technically hard. It came out of essentially one prompt pass using generated video, plus two small tweaks afterward. The original brief's plan — a hand-coded scroll layer over real product photography, explicitly not AI video — is **not** what shipped.
- Therefore Orvyx proves *shipped, live, paid, and visually strong*, and nothing more. It must never be written up as an engineering case study, and it must never carry invented decisions, constraints, or difficulty. The problem → decisions → outcome structure does not apply to it; a short, plain, honest treatment does.
- **ParkQui remains the only evidence of engineering depth.** The two projects carry different halves of the positioning spine and must not be conflated.
- Assets that existed at the start: real product photography on a dark surface, an ORVYX wordmark, a Facebook page with ~19 followers, and no site.

**Other builds on hand — real, but not in active use.**

- **ParkQui** — full-stack parking marketplace: interactive maps, authentication, listing management, admin dashboard, built for a 2,000-member Bulgarian community. Live at https://park-qui.vercel.app/ (the map view sits behind authentication). Technically the richest build on hand and strong case-study material, but not in active use, and its commercial status is unconfirmed — so it is never labelled client work until that is settled.
- **PopWrists** — https://popwrists.vercel.app/. A launch and waitlist page for an unofficial AP × Swatch wrist adapter. Supplied by Miroslav as a stand-in third gallery entry; **what it actually is has not been confirmed**, so it carries the neutral label "Product site" and claims no client, fee, or outcome.
- **Morion Stones** — built but never adopted by the client it was made for. Its link and its source are both lost, so it is **not published**: an entry with no evidence behind it is worth less than an empty slot. Restore it to `lib/work.ts` if either turns up.

**Does not exist, and must not be invented:**

- Testimonials. One informal, secondhand remark exists ("he really liked it") from the person who sold the ParkQui engagement. It was never collected as a quote and is too thin to publish. The work section must be designed so the absence of testimonials is not conspicuous.
- Client logos, named references, case-study metrics, press, awards.
- Any photo of the founder or team.

The honest evidence position is: **one shipped client site, one deep self-initiated build, and the site itself.** Depth of explanation compensates for quantity — case studies are structured problem → decisions and why → what it does now, because demonstrated thinking is what a short client list can still prove.

## Product Principles

1. **Credible at €2k, not gated at €2k.** The site's job is to make a serious buyer conclude the studio can do the job. It never turns work away on price and never signals a minimum. Filtering happens through the kind of work described, not through a bracket.
2. **The artifact is the argument.** The buyer cannot audit code, so precision of execution on this site is the technical credential. Craft defects are credibility defects.
3. **Never inflate.** One real client project stated plainly outranks any invented proof. Nothing gets claimed that could not survive being asked about on the discovery call.
4. **Structure over adjectives.** The positioning is a fact about how the studio is organised — direct access to the builder. Assert the structure; skip the superlatives.
5. **Specificity is the proof.** Named systems, real technical decisions, and concrete constraints do the persuading that testimonials would otherwise do.
6. **Grows by content, not by rebuild.** The work gallery, the copy layer and the language layer all take new material as data. Adding a project or a translation is never a design task.

## Accessibility & Inclusion

- Real visible focus states, semantic landmarks, full keyboard navigation through the entire scroll experience.
- `prefers-reduced-motion` fully honoured; all content and structure remain coherent with motion disabled.
- Bilingual EN/BG support built into the content layer from the outset.
