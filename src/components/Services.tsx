'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { Globe, LayoutDashboard, Sparkles, type LucideIcon } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionAccent from './SectionAccent';
import SectionWaveDivider from './SectionWaveDivider';
import SectionEyebrow from './SectionEyebrow';

type ServiceAccent = 'teal' | 'sky';

type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  accent: ServiceAccent;
  description: string;
  offerings: string[];
  badge?: string;
};

const SERVICES: Service[] = [
  {
    id: 'websites',
    title: 'Websites',
    icon: Globe,
    accent: 'teal',
    badge: 'Core offering',
    description:
      'Your online presence built to convert. Fast, responsive, and optimized - not just pretty. Visitors understand what you do in seconds and know exactly how to reach you.',
    offerings: [
      'Business sites & landing pages',
      'Responsive across all devices',
      'Built to convert visitors to contacts',
      'You own the code and the domain',
    ],
  },
  {
    id: 'web-apps',
    title: 'Web Applications',
    icon: LayoutDashboard,
    accent: 'teal',
    description:
      "If you can describe it, we can build it. Custom platforms, admin dashboards, client portals, booking systems - built on a modern stack you won't outgrow.",
    offerings: [
      'Custom platforms & dashboards',
      'Client portals & booking systems',
      'CRM, payment & API integrations',
      'Scalable architecture from day one',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automations',
    icon: Sparkles,
    accent: 'sky',
    description:
      'Need a booking bot, an AI assistant, or a custom tool built into your site? We scope it, build it, and keep it practical -  just what actually helps your business.',
    offerings: [
      'AI chatbots & booking assistants',
      'Workflow & notification automation',
      'Tool integrations where APIs exist',
      "Scoped per project - ask us what's possible",
    ],
  },
];

function ServiceIconBadge({ Icon, featured }: { Icon: LucideIcon; featured?: boolean }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0f1a2c] shadow-md shadow-black/20 ring-1 ring-white/10 ${
        featured ? 'h-16 w-16' : 'h-12 w-12'
      }`}
    >
      <div className="absolute inset-0 rounded-2xl bg-main/5 blur-lg opacity-80" aria-hidden />
      <Icon
        className={`relative text-main ${featured ? 'h-8 w-8' : 'h-6 w-6'}`}
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

function FeaturedDetailContent({
  service,
  hovered,
  onHover,
}: {
  service: Service;
  hovered: boolean;
  onHover: (v: boolean) => void;
}) {
  const Icon = service.icon;
  const isSky = service.accent === 'sky';
  const barClass = isSky
    ? 'from-accent via-accent/80 to-transparent'
    : 'from-main via-main/80 to-transparent';
  const dotClass = isSky
    ? 'bg-accent shadow-accent/60'
    : 'bg-main shadow-[0_0_8px_rgb(from_var(--color-main)_r_g_b_/_0.8)]';
  const glowOrb = isSky ? 'bg-accent/20' : 'bg-main/15';

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col gap-6 overflow-hidden p-8 lg:p-12"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <motion.div
        className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-2xl ${glowOrb}`}
        animate={{ opacity: hovered ? 0.55 : 0.35, scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.45 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isSky
            ? 'linear-gradient(135deg, rgb(from var(--color-accent) r g b / 0.14) 0%, transparent 50%, rgb(from var(--color-accent) r g b / 0.1) 100%)'
            : 'linear-gradient(135deg, rgb(from var(--color-main) r g b / 0.14) 0%, transparent 50%, rgb(from var(--color-accent) r g b / 0.08) 100%)',
        }}
        animate={{ opacity: hovered ? 1 : 0.65 }}
        transition={{ duration: 0.4 }}
      />

      <div className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b ${barClass} opacity-90`} />

      <motion.div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: isSky
            ? 'linear-gradient(90deg, transparent, rgb(from var(--color-accent) r g b / 0.75), transparent)'
            : 'linear-gradient(90deg, transparent, rgb(from var(--color-main) r g b / 0.7), transparent)',
        }}
        animate={{ opacity: hovered ? 1 : 0.45 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <ServiceIconBadge Icon={Icon} featured />
        {service.badge ? (
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
              isSky
                ? 'border-accent/40 bg-accent/10 text-[#b8eeff]'
                : 'border-main/35 bg-main/10 text-main'
            }`}
          >
            {service.badge}
          </span>
        ) : null}
      </div>

      <motion.h3
        className="relative text-3xl font-extrabold leading-tight text-white lg:text-4xl"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {service.title}
      </motion.h3>

      <p className="relative max-w-md text-lg leading-relaxed text-white/65">{service.description}</p>

      <div className="relative rounded-full border-t border-white/15" />

      <ul className="relative mt-auto space-y-4">
        {service.offerings.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-transparent px-1 py-0.5 text-base text-white/75 transition-colors duration-200 hover:border-white/[0.06] hover:bg-white/[0.03]"
          >
            <motion.span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`}
              animate={{ scale: hovered ? 1.35 : 1 }}
              transition={{ duration: 0.2 }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturedSlot({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(false);
  }, [service.id]);

  return (
    <div className="relative flex h-full min-h-[28rem] items-stretch lg:min-h-[36rem]">
      <div
        className="flex h-full min-h-0 w-full flex-1 flex-col rounded-3xl p-px shadow-[0_20px_50px_-28px_rgb(from_var(--color-main)_r_g_b_/_0.18)]"
        style={{
          background:
            'linear-gradient(135deg, rgb(from var(--color-main) r g b / 0.42) 0%, rgba(255,255,255,0.08) 45%, rgb(from var(--color-accent) r g b / 0.35) 100%)',
        }}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4375rem] border border-white/[0.09] bg-[#0c1624] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div key={service.id} role="group" aria-label={service.title} className="flex min-h-0 w-full flex-1 flex-col">
            <FeaturedDetailContent service={service} hovered={hovered} onHover={setHovered} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactServiceCard({
  service,
  onSelect,
}: {
  service: Service;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  const isSky = service.accent === 'sky';
  const accentStyles = isSky
    ? {
        bar: 'from-accent via-accent/80 to-transparent',
        glow: 'bg-accent/20',
        borderHover: 'hover:border-accent/40',
      }
    : {
        bar: 'from-main via-main/70 to-transparent',
        glow: 'bg-main/15',
        borderHover: 'hover:border-main/40',
      };

  return (
    <button
      type="button"
      className={`group relative w-full overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c1624] p-8 text-left shadow-[0_16px_40px_-24px_rgba(0,0,0,0.65)] transition-[border-color,box-shadow] duration-300 ${accentStyles.borderHover} hover:shadow-[0_18px_44px_-20px_rgb(from_var(--color-main)_r_g_b_/_0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-main/50`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(service.id)}
      aria-label={`Show ${service.title} details`}
    >
      <motion.div
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl ${accentStyles.glow} opacity-60`}
        animate={{ opacity: hovered ? 0.65 : 0.35 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isSky
            ? 'linear-gradient(135deg, rgb(from var(--color-accent) r g b / 0.12) 0%, transparent 55%)'
            : 'linear-gradient(135deg, rgb(from var(--color-main) r g b / 0.12) 0%, transparent 55%)',
        }}
      />

      <div className={`absolute bottom-6 left-0 top-20 w-1 rounded-r-full bg-gradient-to-b ${accentStyles.bar} opacity-90`} />

      <div className="relative flex items-start gap-4">
        <ServiceIconBadge Icon={Icon} />
        <span className="ml-auto rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/45 transition-colors group-hover:border-main/30 group-hover:text-main/80">
          View
        </span>
      </div>

      <motion.h3
        className="relative mt-4 text-xl font-extrabold leading-tight text-white md:text-2xl"
        animate={{ x: hovered ? 2 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {service.title}
      </motion.h3>

      <p className="relative mt-2 line-clamp-3 text-sm leading-relaxed text-white/55 md:text-base">
        {service.description}
      </p>

      <div className="relative my-5 rounded-full border-t border-white/12" />

      <ul className="relative space-y-2.5">
        {service.offerings.slice(0, 3).map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-white/70">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_6px_rgb(from_var(--color-main)_r_g_b_/_0.5)] ${
                isSky ? 'bg-accent shadow-accent/40' : 'bg-main'
              }`}
            />
            <span className="line-clamp-1">{item}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

export default function Services() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  const selectService = useCallback((id: string) => {
    if (id === activeId) return;
    setActiveId(id);
  }, [activeId]);

  const active = SERVICES.find((s) => s.id === activeId)!;
  const compact = SERVICES.filter((s) => s.id !== activeId);

  return (
    <section id="services" className="relative overflow-hidden pb-0 pt-28 md:pt-36">
      <SectionAccent variant="coast" />

      <div className="container relative z-10 mx-auto px-6 pb-8 md:pb-10">
        <div className="mb-12 md:mb-16">
          <SectionEyebrow>Our services</SectionEyebrow>
          <SectionHeading words={['What', 'We', 'Build']} tealDot />
          <motion.p
            className="mt-4 max-w-xl text-lg leading-relaxed text-white/65"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Three services. One way of working - clear scope, real deadlines, no surprises. Tap a card to explore.
          </motion.p>
        </div>

        <div className="relative overflow-visible rounded-[2rem] border border-white/[0.08] bg-[#080f18] p-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.05] md:p-8">
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-30"
            style={{
              background:
                'linear-gradient(145deg, rgb(from var(--color-main) r g b / 0.06) 0%, transparent 42%, rgb(from var(--color-accent) r g b / 0.05) 100%)',
            }}
            aria-hidden
          />
          <div className="relative grid grid-cols-1 items-stretch gap-6 overflow-visible lg:grid-cols-2 lg:gap-8">
            <FeaturedSlot service={active} />
            <div className="flex min-h-0 flex-col gap-6">
              {compact.map((service) => (
                <CompactServiceCard key={service.id} service={service} onSelect={selectService} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="btn-cta-gradient inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-navy"
          >
            Start a Project →
          </a>
        </motion.div>
      </div>

      <SectionWaveDivider to="work" />
    </section>
  );
}
