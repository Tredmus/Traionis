# Site migration checklist

For every rebuild of a client's existing site. The promise on traionis.com is
that **the domain, the content and the search rankings come with it** — this
is how we keep it.

**The one idea behind all of it:** Google ranks *pages* (URLs), not websites.
A ranking survives a rebuild when the page's address still resolves and the
content that earned the ranking is still there. The domain carries trust and
backlinks, but it does not carry rankings on its own.

---

## 1. Before the build — know what must not break

- [ ] **Search Console access.** Ask the client to add us as a user, or verify
      the domain ourselves (DNS TXT record at whoever runs their DNS).
- [ ] **Export the last 16 months** from Search Console → Performance:
  - [ ] Top **pages** (clicks, impressions)
  - [ ] Top **queries**
- [ ] **Backlinks:** Search Console → Links → *Top linked pages*. Pages other
      sites link to carry the most weight — they must keep an address.
- [ ] **Full URL list of the old site** — their `sitemap.xml`, or crawl it
      (Screaming Frog, free up to 500 URLs). Include images and PDFs that rank.
- [ ] For every page with traffic or backlinks, save:
  - [ ] `<title>` and meta description
  - [ ] H1 and main headings
  - [ ] The body text (copy it — the old site will be gone)
  - [ ] Image alt texts on ranking images
- [ ] Note existing **structured data** (business name, address, phone,
      opening hours, reviews) and the **Google Business Profile** link.
- [ ] Note anything the old site does that people search for: a price list, a
      menu, a downloadable PDF, a location page per city.
- [ ] Record the client's **current rankings** for their 5–10 most important
      queries (a screenshot of Search Console is enough) — the baseline we are
      measured against after launch.

## 2. During the build — keep the addresses and the content

- [ ] **Keep URLs identical wherever possible.** The cheapest redirect is the
      one you never need.
- [ ] Where a URL must change, write the **redirect map**: every old URL → its
      closest new equivalent. One row per URL, no exceptions.
  - [ ] Redirect to the *matching* page, not blanket to the homepage (a mass
        redirect to `/` is treated like a deleted page).
  - [ ] No chains (old → temp → new). Every redirect goes straight to the
        final URL.
- [ ] In Next.js the map lives in `next.config` `redirects()` with
      `permanent: true` (308 — Google treats it like a 301 and passes the
      ranking on).
- [ ] **Carry the ranking content over.** Rewrite and improve freely, but keep
      each page's topic, key phrases and heading structure. Never drop a page
      that brings traffic — merge it into another page and redirect it there.
- [ ] Carry over (or improve) titles and meta descriptions of ranking pages.
- [ ] Alt text on every meaningful image.
- [ ] Structured data (`LocalBusiness` or the right type) with the same name,
      address and phone as the Google Business Profile — they must match
      exactly.
- [ ] Bilingual sites: separate indexable URLs per language (`/bg/...`) with
      `hreflang` alternates. A client-side language toggle is invisible to
      Google.
- [ ] Every page has real, server-rendered text. A beautiful page that says
      nothing in HTML ranks for nothing.
- [ ] **Performance at least as good as the old site** on a mid-range phone
      (Lighthouse / PageSpeed Insights, mobile). A slower rebuild loses
      rankings on its own.

## 3. Launch day

- [ ] **Remove every `noindex`.** Staging and preview builds are usually
      blocked from indexing — forgetting this is the #1 way to vanish from
      Google. Check the page source and `robots.txt` on the live domain.
- [ ] `robots.txt` allows crawling and points to the sitemap.
- [ ] Domain points to the new site; **HTTPS** works on both `www` and bare
      domain, and one redirects to the other (pick one, never serve both).
- [ ] Test the redirect map: every old URL returns **308/301 → the right
      page** (spot-check the top 20 by hand, script the rest).
- [ ] Submit the new `sitemap.xml` in Search Console.
- [ ] Use **URL Inspection → Request indexing** for the homepage and the top
      5 pages.
- [ ] Check the Google Business Profile website link still resolves.

## 4. After launch — watch for 2–6 weeks

- [ ] Week 1: Search Console → Pages → **Not found (404)**. Every 404 that used
      to have traffic gets a redirect.
- [ ] Weekly: compare clicks and impressions with the baseline from step 1.
      A small dip in the first 1–3 weeks is normal while Google processes the
      redirects; it should recover.
- [ ] Check the top queries still land on the right pages.
- [ ] Keep the redirects **permanently** (at least a year; in practice,
      forever — they cost nothing).
- [ ] Send the client a short before/after note once rankings have settled.

---

## The classic mistakes

1. `noindex` carried over from staging.
2. URLs changed with no redirects, or everything redirected to the homepage.
3. Text-heavy pages replaced with visual pages that say very little.
4. Ranking pages deleted because "nobody reads them".
5. The new site is slower than the old one.
6. Domain or DNS changes made without keeping existing email (MX) records —
   the site survives, the client's email does not.
