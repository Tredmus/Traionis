import { Search, Map, Code, Rocket } from 'lucide-react';
import { FadeIn } from './motion/FadeIn';

const steps = [
  {
    icon: Search,
    title: 'Разговор без ангажимент',
    description:
      'Кратък разговор: какво продавате, кой е клиентът, какво трябва да стане онлайн. Без презентации от 40 слайда.',
  },
  {
    icon: Map,
    title: 'Оферта с обхват и срок',
    description:
      'Връщаме се с ясно какво включваме, какво не включваме, краен срок по етапи и цена. Ако не сме подходящи — ще ви кажем.',
  },
  {
    icon: Code,
    title: 'Изпълнение с прегледи',
    description:
      'Строим на етапи с видим напредък. Виждате средовища за преглед преди пускане. Промени в рамките на договореното — по списък.',
  },
  {
    icon: Rocket,
    title: 'Пускане и предаване',
    description:
      'Хостинг, домейн, аналитика, резервни копия — каквото е уговорено. Получавате достъпите и кратка документация как да работите със системата.',
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="py-20 md:py-28 bg-white border-t border-slate-200/80">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 mb-4">Процесът</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Без „агилни“ церемонии. Четири стъпки, които можете да обясните на счетоводителя си.
          </p>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

          <div className="space-y-10 md:space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <FadeIn key={step.title} delay={index * 0.05}>
                  <div className="md:hidden flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white shrink-0">
                      <Icon className="h-6 w-6 text-secondary" aria-hidden />
                    </div>
                    <div>
                      <span className="inline-block font-display font-extrabold text-secondary text-lg mb-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display font-bold text-xl text-slate-900">{step.title}</h3>
                      <p className="text-slate-600 mt-2 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:grid md:grid-cols-2 md:gap-6 md:items-center relative">
                    {isEven ? (
                      <>
                        <div className="md:text-right md:pr-16">
                          <span className="inline-block font-display font-extrabold text-secondary text-2xl mb-2">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-display font-bold text-2xl text-slate-900">{step.title}</h3>
                          <p className="text-slate-600 mt-3 leading-relaxed md:ml-auto md:max-w-md">
                            {step.description}
                          </p>
                        </div>
                        <div aria-hidden />
                      </>
                    ) : (
                      <>
                        <div aria-hidden />
                        <div className="md:pl-16">
                          <span className="inline-block font-display font-extrabold text-secondary text-2xl mb-2">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-display font-bold text-2xl text-slate-900">{step.title}</h3>
                          <p className="text-slate-600 mt-3 leading-relaxed md:max-w-md">{step.description}</p>
                        </div>
                      </>
                    )}

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white shadow-lg border-4 border-white">
                        <Icon className="h-8 w-8 text-secondary" aria-hidden />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
