'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import FloatingDots from './FloatingDots';
import { FadeIn } from './motion/FadeIn';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Неуспешно изпращане.');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Грешка при изпращане.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError(null);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden border-t border-slate-200/80">
      <FloatingDots />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 mb-4">Контакт</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Опишете накратко какво трябва да се случи. Отговаряме с яснота — не с автоматични „благодарим ви“ имейли без
            смисъл.
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-section border border-slate-200/80 p-6 md:p-10">
            {isSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="h-14 w-14 text-secondary mx-auto mb-4" aria-hidden />
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">Съобщението е изпратено</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Ще го прегледаме и ще се свържем по имейл, освен ако не сте оставили нужда от обаждане в текста.
                </p>
                <Button onClick={resetForm} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Ново съобщение
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <p className="rounded-xl bg-red-50 text-red-800 text-sm px-4 py-3 border border-red-100" role="alert">
                    {error}
                  </p>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Име
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    autoComplete="name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all disabled:bg-slate-100"
                    placeholder="Име и фамилия"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Имейл
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all disabled:bg-slate-100"
                    placeholder="you@firma.bg"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Фирма (по желание)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all disabled:bg-slate-100"
                    placeholder="ЕООД / име на марката"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Съобщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all disabled:bg-slate-100 resize-y min-h-[120px]"
                    placeholder="Какво трябва да има сайтът/приложението? Срок? Бюджетен диапазон?"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-primary to-secondary border-0 shadow-md disabled:opacity-70`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" aria-hidden />
                      Изпращане…
                    </>
                  ) : (
                    'Изпрати'
                  )}
                </Button>
                <p className="text-xs text-slate-500 text-center">
                  Изпращайки формата, приемате да се свържем с вас по предоставения имейл относно запитването.
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
