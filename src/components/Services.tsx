'use client';

import { useState } from 'react';
import { LineChart, Monitor, Bot } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from './motion/FadeIn';

type ServiceTab = {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  offerings: string[];
};

const services: ServiceTab[] = [
  {
    id: 'growth',
    icon: <LineChart className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    label: 'Позициониране',
    title: 'Намират ви. Разбират ви. Свързват се.',
    description:
      'Лендинг страници, структура на съдържанието и основи на видимостта — без да ви продаваме „10x растеж за седмица“. Първо стабилна основа, после мащабиране.',
    offerings: [
      'Ясно послание и структура на страниците',
      'Скорост и мобилно изживяване (реални метрики)',
      'Връзка с аналитика и конверсии',
      'Подготовка за реклами, когато продуктът е готов',
    ],
  },
  {
    id: 'web',
    icon: <Monitor className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    label: 'Уеб и приложения',
    title: 'Сайт или приложение — изградено да издържа.',
    description:
      'От фирмен сайт до вътрешни панели и клиентски портали. TypeScript, модерен стек, код под ваш контрол. Не ви заключваме в платформа, която после не можете да напуснете.',
    offerings: [
      'Фирмени сайтове и многостранични проекти',
      'Уеб приложения и администрации',
      'Интеграции с CRM, плащания, склад и др.',
      'Хостинг и пускане в продукция с мониторинг',
    ],
  },
  {
    id: 'automation',
    icon: <Bot className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />,
    label: 'Автоматизации',
    title: 'По-малко ръчна работа. Повече време за клиенти.',
    description:
      'Връзваме форми, имейли, таблици, уведомления и вътрешни процеси. Без да „слагаме ИИ“ навсякъде само за да звучи модерно — автоматизацията следва реалния ви поток.',
    offerings: [
      'Автоматични нотификации и маршрутизиране на запитвания',
      'Синхронизация между системи (където има API)',
      'Шаблони и проверки преди изпращане към клиент',
      'Документация как работи — не магия в главата на един човек',
    ],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('web');
  const activeService = services.find((s) => s.id === activeTab);

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight">
            Какво правим — накратко
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Три направления. Един начин на работа: измеримо, предвидимо, без излишни усложнения.
          </p>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-sm mb-8">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                    activeTab === service.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md scale-[1.02]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={activeTab === service.id ? 'text-white' : 'text-primary'}>{service.icon}</span>
                  <span className={activeTab === service.id ? 'font-semibold' : 'font-medium'}>{service.label}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-section p-6 sm:p-10 md:p-12 min-h-[320px]">
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
                    {activeService.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-3xl">
                    {activeService.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.offerings.map((offering) => (
                      <li
                        key={offering}
                        className="flex items-start gap-3 rounded-xl bg-slate-900 text-white px-4 py-3.5 text-sm sm:text-base leading-snug"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                        <span>{offering}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
