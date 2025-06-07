import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services do you actually offer?",
    answer:
      "We design clean, high-converting websites. We help businesses get more clients through smart marketing. And we automate repetitive tasks using modern tools and AI — so you can save time and scale faster.",
  },
  {
    question: "How much does a project usually cost?",
    answer:
      "It depends on what you need. A landing page starts lower, while full websites or complex marketing funnels cost more. After a quick chat, we’ll send you a custom quote — no surprises.",
  },
  {
    question: "How long does it take to deliver?",
    answer:
      "Most projects are ready in 1–3 weeks. For larger or more advanced setups, we’ll give you a clear timeline upfront so you always know what to expect.",
  },
  {
    question: "Do you offer ongoing support or marketing after launch?",
    answer:
      "Yes. We offer support, updates, and marketing services after launch — either as one-offs or monthly retainers. We’re here for the long run, not just to build and disappear.",
  },
  {
    question: "Can you help me bring more clients in?",
    answer:
      "Absolutely. We don’t just build websites — we help you get more traffic, leads, and conversions through ads, landing pages, and automation.",
  },
  {
    question: "How do we get started?",
    answer:
      "It begins with a quick call or chat to understand your goals. Then we send you a clear plan, pricing, and — once you're in — we get to work.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questionColors = ['bg-primary text-white', 'bg-secondary text-white'];
  const answerColors = ['bg-primary-light', 'bg-secondary-light'];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Got Questions?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are some quick answers about our services, process, and how we help you grow.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isPrimary = index % 2 === 0;
            const questionColor = questionColors[isPrimary ? 0 : 1];
            const answerColor = answerColors[isPrimary ? 0 : 1];
            const textColor = 'text-white';

            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-md transition-all duration-300"
              >
                <button
                  className={`w-full px-6 py-5 flex items-center justify-between focus:outline-none ${questionColor}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${answerColor} ${textColor} ${
                    openIndex === index
                      ? 'max-h-96 opacity-100 pb-6 pt-4'
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
