import { FadeIn } from './motion/FadeIn';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 mb-4">Отзиви от клиенти</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Тук ще публикуваме реални отзиви с име и контекст на проекта. В момента не показваме placeholder цитати —
            това би било шум.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="max-w-3xl mx-auto rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 md:p-14 text-center">
            <p className="font-display font-semibold text-slate-800 text-lg md:text-xl leading-relaxed">
              Очаквайте казуси и отзиви след следващите ни публични референции.
            </p>
            <p className="mt-4 text-slate-500 text-sm md:text-base">
              Ако сте клиент и искате да споделите впечатления — пишете ни след приключване на проекта.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
