'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import SectionAccent from './SectionAccent';
import SectionEyebrow from './SectionEyebrow';
import SectionWaveDivider from './SectionWaveDivider';

const FAQS = [
  {
    question: 'How much does a project cost?',
    answer:
      'It depends on scope — number of pages, languages, integrations, admin panel, and so on. After a short conversation we send you a detailed quote with a breakdown.',
  },
  {
    question: 'How long does it take?',
    answer:
      'A small website is typically 1–3 weeks with content ready. Larger builds are scoped with milestone dates in the contract. We don\'t give estimates before we understand what you\'re building.',
  },
  {
    question: 'Do I own the code?',
    answer:
      'Yes — always. You get all credentials, hosting access, and the full codebase. Everything is yours from day one.',
  },
  {
    question: 'What do I need to prepare before we start?',
    answer:
      'Ideally: a clear idea of what you want, your logo, and any content you already have. No worries if it\'s not ready - we\'ll guide you through what\'s needed in the discovery call.',
  },
  {
    question: 'Can you work with my existing website?',
    answer:
      'Depends on how it\'s built. If it\'s on a modern stack we can work with it. If it\'s outdated or locked to a platform, we\'ll tell you honestly — sometimes a rebuild is faster and cheaper than fighting old code.',
  },
  {
    question: 'Do you do ongoing support?',
    answer:
      'Yes, if you want it. We offer support retainers for updates, monitoring, and improvements. If you don\'t want support, we hand over everything and you\'re completely free to manage it yourself or hire anyone else.',
  },
  {
    question: 'What about automations — can you help?',
    answer:
      'Yes. Chatbots, booking assistants, workflow automation, tool integrations. Tell us what you\'re trying to automate and we\'ll tell you if and how we can build it.',
  },
  {
    question: 'What are the payment terms?',
    answer:
      'Typically a deposit at start, milestone payments during build, and final payment at handover. The exact schedule is in the contract before work begins.',
  },
];

const LEFT_FAQS = FAQS.slice(0, 4);
const RIGHT_FAQS = FAQS.slice(4, 8);

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl border px-2 transition-colors md:px-3 ${
        isOpen
          ? 'border-main/35 bg-main/[0.06] shadow-[0_0_40px_-12px_rgb(from_var(--color-main)_r_g_b_/_0.25)]'
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
      }`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="group flex w-full items-center justify-between gap-4 rounded-xl px-3 py-5 text-left md:px-4 md:py-5"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base md:text-lg leading-snug transition-colors duration-200 ${
          isOpen ? 'text-main' : 'text-white group-hover:text-main'
        }`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown
            className={`h-5 w-5 transition-colors duration-200 ${
              isOpen ? 'text-main' : 'text-white/40 group-hover:text-main'
            }`}
            aria-hidden
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-3 pb-5 text-sm leading-relaxed text-white/60 md:px-4 md:pb-5 md:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQColumn({ faqs, offset = 0, openIndex, onToggle }: {
  faqs: typeof FAQS;
  offset?: number;
  openIndex: number | null;
  onToggle: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {faqs.map((faq, i) => (
        <FAQItem
          key={faq.question}
          faq={faq}
          index={i + offset}
          isOpen={openIndex === i + offset}
          onToggle={() => onToggle(i + offset)}
        />
      ))}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="relative overflow-hidden pb-0 pt-28 md:pt-36">
      <SectionAccent variant="deep" />
      <div className="container relative z-10 mx-auto px-6 pb-8 md:pb-10">

        {/* Heading */}
        <div className="mb-14">
          <SectionEyebrow>Common questions</SectionEyebrow>
          <SectionHeading words={['Questions']} tealDot />
          <motion.p
            className="mt-4 text-lg text-white/60 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Direct answers. If something&apos;s missing — ask in the contact form.
          </motion.p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:gap-8">
          <FAQColumn
            faqs={LEFT_FAQS}
            offset={0}
            openIndex={openIndex}
            onToggle={handleToggle}
          />
          <FAQColumn
            faqs={RIGHT_FAQS}
            offset={4}
            openIndex={openIndex}
            onToggle={handleToggle}
          />
        </div>

      </div>

      <SectionWaveDivider to="contact" />
    </section>
  );
}