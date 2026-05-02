import Logo from './Logo';

const serviceLinks = [
  { href: '#services', label: 'Уеб и приложения' },
  { href: '#services', label: 'Автоматизации' },
  { href: '#why-us', label: 'Защо ние' },
  { href: '#work', label: 'Проекти' },
];

const pageLinks = [
  { href: '#process', label: 'Процес' },
  { href: '#security', label: 'Сигурност' },
  { href: '#faq', label: 'Въпроси' },
  { href: '#contact', label: 'Контакт' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-slate-900 text-white relative pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-[min(120%,800px)] h-auto absolute -right-20 -bottom-32">
          <path
            d="M169.7,-208.9C215.2,-166,244.8,-110.2,259.3,-52.5C273.9,5.3,273.3,65,250.5,115.7C227.7,166.3,182.8,207.9,129.4,232C76,256.1,14.1,262.7,-39.8,247.9C-93.7,233.1,-139.5,196.9,-184.4,153.3C-229.3,109.7,-273.2,58.7,-282.8,-0.2C-292.4,-59.1,-267.6,-126,-224.7,-171.1C-181.7,-216.2,-120.5,-239.5,-61.2,-242.1C-1.9,-244.7,56.4,-226.7,111.1,-215.5C165.9,-204.3,219.2,-200,258.1,-169.6C297,-139.3,321.6,-82.9,328.1,-23.9C334.7,35.1,323.3,96.8,295.9,149.9C268.5,203.1,225.1,247.8,171.1,265.8C117.2,283.8,52.7,275,2.1,270.8C-48.4,266.6,-85,266.9,-135.2,255.6C-185.3,244.2,-249,221.2,-270.8,178.5C-292.5,135.8,-272.4,73.4,-271.9,13.1C-271.4,-47.2,-290.6,-106.5,-270.3,-149.3C-250,-192.1,-190.2,-218.5,-134.9,-236.9C-79.6,-255.3,-28.7,-265.7,16.7,-257C62,-248.3,101.7,-220.6,140.1,-198.3"
            transform="translate(400 400)"
            fill="none"
            strokeWidth="10"
            stroke="white"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-6">
              <Logo variant="alt" />
            </div>
            <p className="text-slate-200/90 leading-relaxed mb-6">
              Изработка на уебсайтове и софтуер за български компании. Ясни договори, стабилен код, директна комуникация.
            </p>
            <a
              href="mailto:info@traionis.com"
              className="inline-flex font-semibold text-secondary hover:text-white transition-colors"
            >
              info@traionis.com
            </a>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Услуги</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-200/90 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-200/90 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Контакт</h3>
            <ul className="space-y-3 text-slate-200/90">
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Форма за запитване
                </a>
              </li>
              <li>Имейл: info@traionis.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-slate-200/80">
          <div>&copy; {new Date().getFullYear()} Traionis. Всички права запазени.</div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="cursor-default">Поверителност (скоро)</span>
            <span className="cursor-default">Общи условия (скоро)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
