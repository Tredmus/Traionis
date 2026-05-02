import { Check, X } from 'lucide-react';
import { FadeIn } from './motion/FadeIn';

const ROWS: { label: string; us: boolean; them: boolean }[] = [
  { label: 'Писмен обхват и цена преди старт', us: true, them: false },
  { label: 'Код и достъпи — ваши, не „на агенцията“', us: true, them: false },
  { label: 'Комуникация на български, без посредник', us: true, them: false },
  { label: 'Срокове с етапи и приемане', us: true, them: false },
  { label: 'Готови шаблони + „уникален“ сайт за 48 часа', us: false, them: true },
  { label: 'Скрити такси след подписване', us: false, them: true },
];

function Cell({ ok, highlight }: { ok: boolean; highlight?: boolean }) {
  return (
    <div
      className={`flex justify-center py-4 px-3 ${
        highlight ? 'bg-primary/[0.06]' : 'bg-white'
      }`}
    >
      {ok ? (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/25 text-primary">
          <Check className="h-5 w-5" strokeWidth={2.5} aria-label="Да" />
        </span>
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <X className="h-5 w-5" strokeWidth={2.5} aria-label="Не" />
        </span>
      )}
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 leading-tight">
            Защо не сме „още една агенция“
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Не се сравняваме с всеки на пазара — но ако сте виждали договор без ясни граници и сметка, която расте,
            тази таблица е за вас.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-4 md:px-6 font-display font-bold text-sm md:text-base w-[40%]">
                    Критерий
                  </th>
                  <th className="py-4 px-4 md:px-6 font-display font-bold text-sm md:text-base text-center w-[30%] border-l border-white/15">
                    Traionis
                  </th>
                  <th className="py-4 px-4 md:px-6 font-display font-bold text-sm md:text-base text-center w-[30%] border-l border-white/15 text-white/85">
                    Типична „пакетна“ агенция
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-slate-200">
                    <td className="py-4 px-4 md:px-6 text-slate-800 font-medium text-sm md:text-base bg-slate-50/80">
                      {row.label}
                    </td>
                    <td className="border-l border-slate-200 p-0">
                      <Cell ok={row.us} highlight />
                    </td>
                    <td className="border-l border-slate-200 p-0">
                      <Cell ok={row.them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500 max-w-2xl">
            „Типична агенция“ е обобщение за модела „ниска входна цена — после доплащания“. Не всеки конкурент е такъв;
            затова винаги питайте за обхват, срок и какво точно притежавате след края на проекта.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
