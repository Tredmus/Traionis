'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import Link from 'next/link';

const NAV = [
  { href: '#services', label: 'Услуги' },
  { href: '#why-us', label: 'Защо ние' },
  { href: '#work', label: 'Проекти' },
  { href: '#process', label: 'Процес' },
  { href: '#security', label: 'Сигурност' },
  { href: '#faq', label: 'Въпроси' },
  { href: '#contact', label: 'Контакт' },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5 md:py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-medium text-slate-800 hover:text-primary transition-colors relative group text-sm tracking-tight"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-full flex items-center text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            Запитване
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden text-slate-900 p-2 -mr-2"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Затвори меню' : 'Отвори меню'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-out pt-24 px-6 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg font-semibold text-slate-900 py-4 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-6 bg-primary text-white px-6 py-4 rounded-2xl flex items-center justify-center font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Запитване
            <ChevronRight className="ml-1 h-5 w-5" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
