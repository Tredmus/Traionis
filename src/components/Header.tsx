'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import Link from 'next/link';

const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
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

  const isCompact = isScrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isCompact ? 'px-4 pt-3 pb-0 md:px-6 md:pt-4' : 'px-0 py-5'
      }`}
    >
      {/* Wide: full-bleed row with roomier horizontal padding. Scrolled: morphs to max-w-7xl pill (CSS transitions). */}
      <div
        className={`mx-auto flex w-full items-center justify-between ease-[cubic-bezier(0.22,1,0.36,1)] transition-[max-width,gap,border-radius,background-color,box-shadow,backdrop-filter,padding-top,padding-bottom,padding-left,padding-right] duration-500 motion-reduce:transition-none motion-reduce:duration-0 ${
          isCompact
            ? 'max-w-7xl gap-5 rounded-2xl bg-navy/95 py-2.5 px-6 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] backdrop-blur-md md:gap-8 md:rounded-[1.25rem] md:py-3 lg:px-8'
            : 'max-w-full gap-0 rounded-none bg-transparent py-0 px-5 shadow-none backdrop-blur-0 sm:px-6 md:px-8 lg:px-10'
        }`}
      >        <Link href="/" className="shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-medium text-white/80 hover:text-white transition-colors relative group text-sm tracking-wide"
            >
              {item.label}
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-main transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="btn-cta-gradient rounded-full px-6 py-2.5 text-sm font-bold text-navy whitespace-nowrap"
          >
            Start a Project
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden text-white p-2 shrink-0"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-navy transition-transform duration-300 ease-out pt-24 px-6 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <button
          type="button"
          className="absolute right-6 top-6 rounded-full border border-white/20 p-2 text-white"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xl font-semibold text-white py-4 border-b border-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-cta-gradient mt-8 flex items-center justify-center rounded-2xl px-6 py-4 text-lg font-bold text-navy"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start a Project
          </a>
        </nav>
      </div>
    </header>
  );
}
