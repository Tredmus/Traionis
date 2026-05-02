'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './motion/FadeIn';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'С колко започва един фирмен сайт?',
    answer:
      'Зависи от обема: брой езици, страници, интеграции, админ панел и т.н. След кратък разговор ви изпращаме оферта с разбивка — без „започва от 500 лв“ и после десет приложения.',
  },
  {
    question: 'Работите ли само в София?',
    answer:
      'Не. Работим с фирми от цяла България. Срещи онлайн или на място, когато има смисъл за проекта.',
  },
  {
    question: 'Получавам ли кода и достъпите?',
    answer:
      'Да — това е част от стандарта ни. Вие държите хранилището, хостинг акаунта и ключовете, освен ако изрично не сме уговорили друго за поддръжка.',
  },
  {
    question: 'Колко време отнема изработката?',
    answer:
      'Малък сайт често е 2–6 седмици при готови текстове и снимки. По-големи системи — по етапи, с дати в офертата.',
  },
  {
    question: 'Помагате ли с текстове и снимки?',
    answer:
      'Можем да оформим структура и да редактираме ваши текстове. За специализиран копирайтинг и фотография препоръчваме партньори — или вие доставяте материалите.',
  },
  {
    question: 'Какви са условията за плащане?',
    answer:
      'Обикновено аванс при старт и междинни плащания по етапи, финал при приемане. Точният график е в договора.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-t border-slate-200/80">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 mb-4">Въпроси</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Директни отговори. Ако нещо липсва — питайте в формата за контакт.
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isPrimary = index % 2 === 0;
            return (
              <FadeIn key={faq.question} delay={index * 0.03}>
                <div
                  className={`rounded-2xl overflow-hidden border ${
                    isPrimary ? 'border-primary/25' : 'border-secondary/30'
                  } shadow-sm`}
                >
                  <button
                    type="button"
                    className={`w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors ${
                      isPrimary ? 'bg-primary text-white' : 'bg-secondary text-slate-900'
                    }`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-base md:text-lg leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden bg-slate-50"
                      >
                        <p className="px-6 py-5 text-slate-700 leading-relaxed border-t border-slate-200/80">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
