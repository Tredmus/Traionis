/**
 * Case studies.
 *
 * EVIDENCE RULES - these are load-bearing, not stylistic:
 *  - No invented clients, logos, testimonials, metrics, or outcomes.
 *  - Anything not yet supplied is TODO, never filled with something plausible.
 *  - `status` decides how a project is labelled. A build that no client ever
 *    adopted is never described as client work.
 *
 * This list is the gallery's content layer. Adding a project here adds a plate
 * to the descent - no layout work, no component surgery. The homepage shows
 * every entry with `inColumn`, in this order.
 *
 * MEDIA - `loop` and `phone` are captured from the live site itself (see
 * public/work/PROVENANCE.md), never mocked up.
 */

export type ProjectStatus =
  | "client"
  | "self-initiated"
  | "unadopted"
  /** Built, shipped, commercial arrangement not yet confirmed by Miroslav. */
  | "unconfirmed";

export interface CaseDecision {
  title: string;
  body: string;
}

/** A real capture of the real thing. Never a mock-up, never a rendering. */
export interface ProjectShot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** A short silent screen recording of the live site, and its first frame. */
export interface ProjectLoop {
  src: string;
  poster: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  name: string;
  /** One line. What it is, for whom. */
  summary: string;
  /**
   * What this build honestly proves - different for each one, and the reason
   * a three-item gallery is not three of the same thing. Kept short enough to
   * read in the beam.
   */
  proves: string;
  status: ProjectStatus;
  /** Rendered label. Must match reality exactly. */
  statusLabel: string;
  year: string | null;
  stack: readonly string[];
  /** Public URL, when the thing is actually live and linkable. */
  live: { href: string; label: string } | null;
  shot: ProjectShot | null;
  /** What kind of build it is, in two or three words. Shown on the plate. */
  kind: string;
  loop: ProjectLoop | null;
  /** The live site's first screen on a phone. */
  phone: ProjectShot | null;
  /** Shown on the homepage gallery. */
  inColumn: boolean;
  /** Whether `/work/<slug>` has a real breakdown behind it. */
  caseStudy: boolean;
  /** The problem → decisions → what it does now structure. */
  problem: readonly string[];
  decisions: readonly CaseDecision[];
  outcome: readonly string[];
  /** TODO slots. Rendered only when populated - never as empty scaffolding. */
  metrics: readonly { label: string; value: string }[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "orvyx",
    name: "Orvyx",
    summary:
      "Product site for LifePod 72 - a sealed IP67 hard case built to keep someone alive for 72 hours.",
    // Confirmed by Miroslav: nothing about this build was technically hard.
    // It must never be written up as an engineering case study, and it carries
    // no invented decisions, constraints, or difficulty.
    proves:
      "A launch site in the client's own dark, engineered brand, shipped fast and live today.",
    status: "client",
    statusLabel: "Client project - live",
    year: null, // TODO(year): confirm the delivery date.
    stack: [],
    live: { href: "https://orvyx.tech/", label: "orvyx.tech" },
    kind: "Product site",
    loop: {
      src: "/work/orvyx-loop-v2.mp4",
      poster: "/work/orvyx-poster-v2.webp",
      width: 1280,
      height: 800,
    },
    phone: {
      src: "/work/orvyx-phone-v2.webp",
      width: 780,
      height: 1688,
      alt: "The Orvyx site on a phone: “Seventy-two hours. One case.” above the request-availability and open-the-case actions, with the sealed LifePod 72 case below.",
    },
    shot: {
      src: "/work/orvyx-poster-v2.webp",
      width: 1280,
      height: 800,
      alt: "The Orvyx site: “Seventy-two hours. One case.” beside the sealed LifePod 72 case, which a scan line passes over before the case opens to show its eight modules.",
    },
    inColumn: true,
    // Deliberately no breakdown page. There is no engineering story to tell
    // here, and inventing one would be the exact failure this file guards.
    caseStudy: false,
    problem: [],
    decisions: [],
    outcome: [],
    metrics: [],
  },
  {
    slug: "fastcat",
    name: "FastCat",
    summary:
      "A multi-app food delivery platform, built for a local delivery business in Gabrovo, Bulgaria.",
    proves:
      "Four apps on one backend: ordering on iOS, Android and web, a restaurant app, a driver app and an admin dashboard, with live tracking on a map.",
    // Facts supplied by Miroslav (2026-09-30). Not a signed client: the
    // business has not decided whether to use it, so it is described as
    // "built for", never as client work. No users, orders or revenue claimed.
    // Card payments are not connected: never claim online payments.
    status: "unconfirmed",
    statusLabel: "Built for a local delivery business",
    year: null,
    stack: ["TypeScript", "Turborepo", "Expo (React Native)", "Next.js", "Supabase", "OpenStreetMap"],
    live: { href: "https://fastcat-customer.vercel.app/", label: "fastcat-customer.vercel.app" },
    shot: {
      src: "/work/fastcat-poster.webp",
      width: 1280,
      height: 800,
      alt: "The FastCat customer app: “Gabrovo's favourite food, at your door” on a purple header, with dish categories, offers and the restaurants in Gabrovo below.",
    },
    kind: "Delivery platform",
    loop: {
      src: "/work/fastcat-loop.mp4",
      poster: "/work/fastcat-poster.webp",
      width: 1280,
      height: 800,
    },
    phone: {
      src: "/work/fastcat-phone.webp",
      width: 780,
      height: 1688,
      alt: "FastCat on a phone: “What are we eating today?” with the delivery address, restaurant search, dish categories and the app's bottom tab bar.",
    },
    inColumn: true,
    caseStudy: true,
    problem: [
      "A local delivery business in Gabrovo was about to sign up for subscription delivery software: a recurring fee, for a platform they would never own. FastCat was built as the alternative - their own platform, under their own brand.",
    ],
    decisions: [
      {
        title: "Four apps, one backend",
        body: "Customers order on iOS, Android and the web from a single Expo codebase. Restaurants run their own app, built to work on Android POS terminals too; drivers have theirs; the business runs everything from a Next.js admin. All four share one Supabase backend and one design system.",
      },
      {
        title: "Dispatch inside the database",
        body: "A scheduled job every ten seconds runs the order timers and offers each order to drivers whose location is fresh, never re-offering it to a driver who just declined. There is no separate dispatch server to keep alive.",
      },
      {
        title: "Security where the data lives",
        body: "Row-level security on every table and the business logic in database functions, covered by 79 automated database tests. And the whole platform is white-label: a new brand is a config file, not a fork.",
      },
    ],
    outcome: [
      "Working end to end on live infrastructure within days of the first commit: a customer's order is accepted by the restaurant, dispatched to a driver automatically and tracked live on the map. Cash on delivery works end to end. In final polish, with demo restaurants and no real orders yet; card payments and app store publishing are next.",
    ],
    metrics: [],
  },
  {
    slug: "parkqui",
    name: "ParkQui",
    summary:
      "A full-stack parking marketplace for a 2,000-member community in Bulgaria.",
    proves:
      "Accounts and roles, map search over live listings, and the admin side that keeps a marketplace running.",
    // Confirmed by Miroslav: built for a founder, unpaid. Never labelled paid
    // client work; the arrangement and how it ended stay off the site.
    status: "unconfirmed",
    statusLabel: "Built for a founder",
    year: null, // TODO(year)
    stack: ["Next.js", "TypeScript", "Supabase", "Mapbox"],
    live: { href: "https://park-qui.vercel.app/", label: "park-qui.vercel.app" },
    kind: "Marketplace platform",
    loop: {
      src: "/work/parkqui-loop.mp4",
      poster: "/work/parkqui-poster.webp",
      width: 1280,
      height: 800,
    },
    phone: {
      src: "/work/parkqui-phone-390.webp",
      width: 780,
      height: 1688,
      alt: "ParkQui on a phone: “Your parking spot is waiting”, with find and offer actions and the 2 min, 100%, 24/7 panel.",
    },
    shot: {
      src: "/work/parkqui.webp",
      width: 1400,
      height: 641,
      alt: "The ParkQui site: a deep blue marketplace landing page in Bulgarian, with search and listing actions.",
    },
    // Out of the gallery since 2026-09-30: the project has stopped. The entry
    // stays so /work/parkqui keeps resolving until it is redirected.
    inColumn: false,
    caseStudy: true,
    // Facts confirmed by Miroslav (Facebook groups before; Supabase + Mapbox)
    // or visible on the live site itself (the two roles and what each can
    // do). Nothing here claims usage numbers or outcomes.
    problem: [
      "A 2,000-member community was finding and offering parking through Facebook group posts. Posts scroll away within hours, and nothing shows what is actually free near where you need to be.",
    ],
    decisions: [
      {
        title: "One platform, two roles",
        body: "Drivers and space owners share one account system, each with their own side of the product: owners publish slots and set when they are available, drivers find and book them in advance.",
      },
      {
        title: "Search on a real map",
        body: "Listings sit on a Mapbox map, so a driver searches by the place they need to be rather than scrolling a feed of posts.",
      },
      {
        title: "Accounts and data on Supabase",
        body: "Sign-in, profiles and the listings database run on one managed backend, which kept the build small without cutting corners on authentication.",
      },
    ],
    outcome: [
      "Live at park-qui.vercel.app. The public site is open to anyone; search, listings and the map sit behind sign-in.",
    ],
    metrics: [
      // TODO(metrics): leave empty unless real numbers exist. An empty array
      // renders nothing, which is correct. Do not invent percentages.
    ],
  },
  {
    slug: "popwrists",
    name: "PopWrists",
    // Both lines below are descriptions of what the live page itself says and
    // shows. Nothing here claims a client, a fee, or an outcome.
    summary:
      "Launch and waitlist site for an unofficial wrist adapter for the AP × Swatch Royal Pop.",
    proves:
      "Carried by type and colour, with one action: join the waitlist.",
    // Confirmed by Miroslav: in-house product concept.
    status: "self-initiated",
    statusLabel: "In-house product",
    year: null,
    stack: [],
    live: { href: "https://popwrists.vercel.app/", label: "popwrists.vercel.app" },
    kind: "Launch page",
    loop: {
      src: "/work/popwrists-loop.mp4",
      poster: "/work/popwrists-poster.webp",
      width: 1280,
      height: 800,
    },
    phone: {
      src: "/work/popwrists-phone-390.webp",
      width: 780,
      height: 1688,
      alt: "PopWrists on a phone: “The Royal Pop. Now on your wrist.” above the waitlist field and colourway dots.",
    },
    shot: {
      src: "/work/popwrists.webp",
      width: 1400,
      height: 641,
      alt: "The PopWrists site: oversized black and gradient type on a warm off-white ground, above a waitlist field.",
    },
    inColumn: true,
    caseStudy: false,
    problem: [],
    decisions: [],
    outcome: [],
    metrics: [],
  },
  // Morion Stones - built, never adopted. Its link and source are lost, so it
  // is not published rather than published without evidence. Restore it here
  // if either turns up; the gallery takes it without a layout change.
];

/** The homepage column, in declared order. */
export const COLUMN_PROJECTS = CASE_STUDIES.filter((project) => project.inColumn);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((project) => project.slug === slug);
}

/** Only projects with a real breakdown get a route. */
export function caseStudySlugs(): string[] {
  return CASE_STUDIES.filter((project) => project.caseStudy).map(
    (project) => project.slug,
  );
}

// ── Bulgarian ─────────────────────────────────────────────────────────────
// The same claims as above, in Bulgarian. Only the words change: status,
// media and links stay shared, so a translation can never drift from what
// the English says a project is.

type ProjectText = Pick<CaseStudy, "summary" | "proves" | "kind" | "problem" | "decisions" | "outcome"> & {
  shotAlt?: string;
  phoneAlt?: string;
};

const WORK_BG: Record<string, ProjectText> = {
  orvyx: {
    kind: "Продуктов сайт",
    summary:
      "Продуктов сайт за LifePod 72 - запечатан куфар с IP67 защита, създаден да опази човек жив в продължение на 72 часа.",
    proves:
      "Сайт за пускането на продукта в собствената тъмна, инженерна визия на клиента - изграден бързо и работещ и днес.",
    problem: [],
    decisions: [],
    outcome: [],
    shotAlt:
      "Сайтът на Orvyx: „Seventy-two hours. One case.“ до запечатания куфар LifePod 72, над който преминава сканираща линия, преди куфарът да се отвори и да покаже осемте си модула.",
    phoneAlt:
      "Сайтът на Orvyx на телефон: „Seventy-two hours. One case.“ над бутоните за запитване и отваряне на куфара, със запечатания LifePod 72 отдолу.",
  },
  fastcat: {
    kind: "Платформа за доставки",
    summary:
      "Платформа за доставка на храна от няколко приложения, изградена за местен бизнес за доставки в Габрово.",
    proves:
      "Четири приложения върху един бекенд: поръчки за iOS, Android и уеб, приложение за ресторанти, приложение за шофьори и админ панел, със следене на поръчката на живо върху карта.",
    problem: [
      "Местен бизнес за доставки в Габрово щеше да се абонира за софтуер за доставки: абонаментна такса за платформа, която никога нямаше да притежава. FastCat беше изграден като алтернатива - собствена платформа, под собствената им марка.",
    ],
    decisions: [
      {
        title: "Четири приложения, един бекенд",
        body: "Клиентите поръчват от iOS, Android и уеб от един общ код на Expo. Ресторантите имат свое приложение, което работи и на Android POS терминали; шофьорите имат свое; бизнесът управлява всичко от админ панел на Next.js. И четирите споделят един бекенд в Supabase и обща дизайн система.",
      },
      {
        title: "Разпределението е в базата данни",
        body: "Задача на всеки десет секунди управлява таймерите на поръчките и предлага всяка поръчка на шофьори с актуална локация, без да я предлага отново на шофьор, който току-що е отказал. Няма отделен сървър за разпределяне, който да се поддържа.",
      },
      {
        title: "Сигурност там, където са данните",
        body: "Защита на ниво ред във всяка таблица и бизнес логика във функции на базата данни, покрити от 79 автоматизирани теста. А цялата платформа е white-label: нова марка е един конфигурационен файл, а не нов проект.",
      },
    ],
    outcome: [
      "Работи от край до край върху реална инфраструктура само дни след първия ред код: поръчката на клиента се приема от ресторанта, разпределя се автоматично към шофьор и се следи на живо върху картата. Плащането с наложен платеж работи изцяло. Във финална доработка, с демо ресторанти и все още без реални поръчки; следващи са плащанията с карта и публикуването в магазините за приложения.",
    ],
    shotAlt:
      "Клиентското приложение на FastCat: „Gabrovo's favourite food, at your door“ върху лилав хедър, с категории ястия, оферти и ресторантите в Габрово отдолу.",
    phoneAlt:
      "FastCat на телефон: „What are we eating today?“ с адреса за доставка, търсене на ресторанти, категории ястия и долната лента с раздели на приложението.",
  },
  parkqui: {
    kind: "Платформа-маркетплейс",
    summary: "Пълноценна платформа за паркоместа за общност от 2000 души в България.",
    proves:
      "Акаунти и роли, търсене по карта в реални обяви и админ частта, която поддържа платформата в движение.",
    problem: [
      "Общност от 2000 души търсеше и предлагаше паркоместа чрез публикации във Facebook групи. Публикациите потъват за часове, а нищо не показва какво реално е свободно близо до мястото, където трябва да бъдете.",
    ],
    decisions: [
      {
        title: "Една платформа, две роли",
        body: "Шофьорите и собствениците на паркоместа използват една система за акаунти, всеки със своята част от продукта: собствениците публикуват места и задават кога са свободни, шофьорите ги намират и резервират предварително.",
      },
      {
        title: "Търсене върху истинска карта",
        body: "Обявите са върху карта на Mapbox, така че шофьорът търси по мястото, където трябва да бъде, вместо да превърта поток от публикации.",
      },
      {
        title: "Акаунти и данни в Supabase",
        body: "Вписването, профилите и базата с обяви работят върху един управляван бекенд, което запази проекта компактен, без компромиси с удостоверяването.",
      },
    ],
    outcome: [
      "На живо на park-qui.vercel.app. Публичният сайт е отворен за всички; търсенето, обявите и картата са достъпни след вход.",
    ],
    shotAlt:
      "Сайтът на ParkQui: тъмносиня начална страница на маркетплейс за паркоместа, с търсене и действия за обяви.",
    phoneAlt:
      "ParkQui на телефон: „Вашето паркомясто Ви очаква“, с бутони за търсене и предлагане и панел 2 мин, 100%, 24/7.",
  },
  popwrists: {
    kind: "Страница за пускане",
    summary:
      "Сайт за пускане и списък с чакащи за неофициален адаптер за китка за AP × Swatch Royal Pop.",
    proves: "Разчита изцяло на типографията и цвета, с едно действие: запишете се в списъка.",
    problem: [],
    decisions: [],
    outcome: [],
    shotAlt:
      "Сайтът на PopWrists: едър черен и преливащ шрифт върху топъл светъл фон, над поле за списъка с чакащи.",
    phoneAlt:
      "PopWrists на телефон: „The Royal Pop. Now on your wrist.“ над полето за списъка и точките с цветове.",
  },
};

/** A project in the given language. English is the source; others overlay it. */
export function localizeProject(project: CaseStudy, locale: "en" | "bg"): CaseStudy {
  if (locale !== "bg") return project;
  const t = WORK_BG[project.slug];
  if (!t) return project;
  return {
    ...project,
    kind: t.kind,
    summary: t.summary,
    proves: t.proves,
    problem: t.problem.length ? t.problem : project.problem,
    decisions: t.decisions.length ? t.decisions : project.decisions,
    outcome: t.outcome.length ? t.outcome : project.outcome,
    shot: project.shot && t.shotAlt ? { ...project.shot, alt: t.shotAlt } : project.shot,
    phone: project.phone && t.phoneAlt ? { ...project.phone, alt: t.phoneAlt } : project.phone,
  };
}
