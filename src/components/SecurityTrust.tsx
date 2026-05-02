import { Shield, Lock, Server, FileCheck } from 'lucide-react';
import { FadeIn } from './motion/FadeIn';
import { Stagger, StaggerItem } from './motion/Stagger';

const items = [
  {
    icon: Shield,
    title: 'Минимизираме повърхността на атака',
    body: 'Няма „супер админ“ линкове в публичния сайт. Панелите са зад автентикация. Права по роли, когато има екип.',
  },
  {
    icon: Lock,
    title: 'HTTPS и съвременни практики',
    body: 'Транспортно криптиране, сигурни бисквитки където е нужно, без да съхраняваме излишни лични данни „за всеки случай“.',
  },
  {
    icon: Server,
    title: 'Хостинг, който не е случаен избор',
    body: 'Препоръчваме среди с мониторинг и резервни копия. Пускането не е краят — обсъждаме как да не останете без сайт в лош ден.',
  },
  {
    icon: FileCheck,
    title: 'Договор и яснота за данни',
    body: 'Ако обработваме лични данни във вашия проект, подреждаме какво се пази, къде и колко дълго — в синхрон с реалното ви използване.',
  },
];

export default function SecurityTrust() {
  return (
    <section id="security" className="py-20 md:py-28 bg-slate-900 text-white border-t border-slate-800">
      <div className="container mx-auto px-6">
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <p className="text-secondary font-semibold tracking-wide uppercase text-sm mb-3">Сигурност и доверие</p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">
            Не продаваме „военна криптография“. Продаваме смислен минимум.
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Повечето проблеми идват от лоша конфигурация, остарели зависимости и липса на процес — не от липса на маркетингови значки.
          </p>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-slate-700 bg-slate-800/40 p-6 md:p-8 hover:border-secondary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="font-display font-bold text-xl">{item.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
