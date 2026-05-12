// Header.tsx
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
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'border-b border-white/10 bg-navy/95 py-3 backdrop-blur-md md:mx-8 md:rounded-b-2xl md:border-x md:shadow-xl md:shadow-black/25'
          : 'bg-transparent py-5'
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
              className="font-medium text-white/80 hover:text-white transition-colors relative group text-sm tracking-wide"
            >
              {item.label}
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-main transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="btn-cta-gradient rounded-full px-6 py-2.5 text-sm font-bold text-navy"
          >
            Start a Project
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden text-white p-2 -mr-2"
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