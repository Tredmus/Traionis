import { FadeIn } from './motion/FadeIn';

const INTEGRATIONS = [
  'Next.js',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'REST & Webhooks',
  'Stripe',
  'Resend',
  'Vercel',
  'Netlify',
  'Cloudflare',
  'Google Analytics',
  'Meta Pixel',
  'WordPress (headless)',
  'Sanity',
  'Contentful',
  'HubSpot',
  'Make',
  'Zapier',
];

export default function IntegrationsMarquee() {
  const row = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section id="integrations" className="py-14 md:py-16 bg-white border-y border-slate-200 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <FadeIn className="max-w-2xl">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">Интеграции и стек</h2>
          <p className="mt-2 text-slate-600">
            Работим с инструменти, които имат документация и поддръжка — не с „секретна платформа“, която само ние познаваме.
          </p>
        </FadeIn>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="mx-3 shrink-0 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-800 tracking-tight"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex w-max animate-marquee-slow mt-4 hover:[animation-play-state:paused]" aria-hidden>
          {[...row].reverse().map((label, i) => (
            <span
              key={`r-${label}-${i}`}
              className="mx-3 shrink-0 rounded-full border border-slate-200/80 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 tracking-tight"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
