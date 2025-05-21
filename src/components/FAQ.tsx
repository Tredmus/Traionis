import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does it typically take to see results?",
    answer: "Most clients start seeing measurable improvements within the first 30-60 days. However, significant growth typically occurs within 3-6 months as we optimize and refine our strategies based on data-driven insights."
  },
  {
    question: "Do you work with businesses in any industry?",
    answer: "While we have experience across many sectors, we specialize in B2B, SaaS, e-commerce, and professional services. Our approach is tailored to each client's specific industry challenges and opportunities."
  },
  {
    question: "What makes your AI solutions different?",
    answer: "We don't just implement AI for the sake of it. We focus on practical applications that directly impact your bottom line - whether that's automating repetitive tasks, improving customer service, or optimizing operations."
  },
  {
    question: "How do you measure success?",
    answer: "We establish clear KPIs at the start of each engagement, typically including metrics like revenue growth, lead generation, conversion rates, and time saved through automation. We provide regular reports and analytics dashboards to track progress."
  },
  {
    question: "What's your pricing structure?",
    answer: "We offer flexible engagement models tailored to your needs and budget. Projects typically start from $2,500, with ongoing services available through monthly retainers. We'll provide a detailed quote after understanding your specific requirements."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100 pb-6'
                    : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;