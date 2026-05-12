import Logo from './Logo';

const SERVICES = [
  { href: '#services', label: 'Websites' },
  { href: '#services', label: 'Web Applications' },
  { href: '#services', label: 'Automations & AI' },
];

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative mt-6 rounded-t-[2rem] border-x border-t border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent text-white md:rounded-t-[2.25rem]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-main/25 to-transparent" aria-hidden />
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Logo variant="alt" />
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              Websites and web applications built right. Clear scope, real deadlines, yours to keep.
            </p>
            <a
              href="mailto:info@traionis.com"
              className="mt-4 inline-block text-main text-sm font-semibold hover:text-white transition-colors"
            >
              info@traionis.com
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Services</p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Navigation</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-5">Get In Touch</p>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Have a project? Tell us what you need and we&apos;ll get back to you directly.
            </p>
            <a
              href="#contact"
              className="btn-cta-gradient inline-flex items-center rounded-full px-5 py-2.5 text-sm font-bold text-navy"
            >
              Start a Project →
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-sm">
            © 2026 Traionis. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-white/25 text-sm cursor-default">Privacy Policy</span>
            <span className="text-white/25 text-sm cursor-default">Terms of Service</span>
          </div>
        </div>

      </div>
      <div
        className="h-1 w-full bg-gradient-to-r from-main via-accent to-[#38bdf8] opacity-90"
        aria-hidden
      />
    </footer>
  );
}