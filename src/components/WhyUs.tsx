import { Check, X } from 'lucide-react';
import { FadeIn } from './motion/FadeIn';
import SectionHeading from './SectionHeading';
import SectionAccent from './SectionAccent';

const ROWS: { label: string; us: boolean; them: boolean }[] = [
  { label: 'Written scope and price before you pay', us: true, them: false },
  { label: 'You own all code and access — always', us: true, them: false },
  { label: 'Direct communication, no middlemen', us: true, them: false },
  { label: 'Milestones with real deadlines', us: true, them: false },
  { label: 'Built on modern, maintained stack', us: true, them: false },
  { label: 'No recurring fees unless you want support', us: true, them: false },
  { label: 'Generic templates sold as custom', us: false, them: true },
  { label: 'Surprise costs after contract', us: false, them: true },
];

function Cell({ ok, highlight }: { ok: boolean; highlight?: boolean }) {
  return (
    <div
      className={`flex justify-center py-4 px-3 ${
        highlight ? 'bg-main/10' : 'bg-white/[0.03]'
      }`}
    >
      {ok ? (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/25 text-primary">
          <Check className="h-5 w-5" strokeWidth={2.5} aria-label="Да" />
        </span>
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/45">
          <X className="h-5 w-5" strokeWidth={2.5} aria-label="Не" />
        </span>
      )}
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 md:py-36">
      <SectionAccent variant="teal" />
      <div className="container relative z-10 mx-auto px-6">
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <SectionHeading words={['Us', 'vs.', 'The', 'Alternative']} tealDot />
          <p className="mt-4 text-lg text-white/60 leading-relaxed">
            You have options. Here&apos;s how they stack up.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl shadow-black/30 ring-1 ring-inset ring-white/5">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="bg-navy-deep text-white border-b border-white/10">
                  <th className="py-4 px-4 md:px-6 font-display font-bold text-sm md:text-base w-[40%]">
                    Criteria
                  </th>
                  <th className="py-4 px-4 md:px-6 font-display font-bold text-sm md:text-base text-center w-[30%] border-l border-white/10">
                    Traionis
                  </th>
                  <th className="py-4 px-4 md:px-6 font-display font-bold text-sm md:text-base text-center w-[30%] border-l border-white/10 text-white/85">
                    Other Agencies
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-white/10">
                    <td className="py-4 px-4 md:px-6 text-white/90 font-medium text-sm md:text-base bg-white/[0.02]">
                      {row.label}
                    </td>
                    <td className="border-l border-white/10 p-0">
                      <Cell ok={row.us} highlight />
                    </td>
                    <td className="border-l border-white/10 p-0">
                      <Cell ok={row.them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-white/45 max-w-2xl">
            &quot;Other agencies&quot; refers to the low-entry-price, high-addon model — not every competitor operates this way. Always ask for written scope, timeline, and what you own after the project ends.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
