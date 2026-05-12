'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import SectionEyebrow from './SectionEyebrow';

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const parseMainRgb = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--color-main').trim();
      const m = /^#?([0-9a-f]{6})$/i.exec(hex);
      if (!m) return { r: 0, g: 196, b: 180 };
      const n = Number.parseInt(m[1], 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };
    const mainRgb = parseMainRgb();

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${mainRgb.r}, ${mainRgb.g}, ${mainRgb.b}, ${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-90"
    />
  );
}

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

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

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
      if (!response.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Failed to send.');
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-main/40 focus:border-main/60 transition-all disabled:opacity-50';

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#081a2e] via-navy to-navy py-28 md:py-36"
    >
      {/* Floating teal particles */}
      <ParticleCanvas />

      {/* Radial teal glow center */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgb(from var(--color-main) r g b / 0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionEyebrow centered>Get in touch</SectionEyebrow>
          <h2
            className="font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Have a project in mind<span className="text-main">?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Tell us what you need. We&apos;ll tell you if we can build it and what it&apos;ll cost. No commitment.
          </p>
          <p className="mt-3 text-main font-semibold">
            info@traionis.com
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/35 ring-1 ring-inset ring-white/10 backdrop-blur-md md:p-12">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-14 w-14 text-main mx-auto mb-4" />
                <h3 className="font-extrabold text-white text-2xl mb-2">Message sent.</h3>
                <p className="text-white/50 mb-8 leading-relaxed">
                  We&apos;ll review it and get back to you by email within one business day.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', company: '', message: '' }); }}
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-main/60 hover:bg-white/5"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <p className="rounded-2xl border border-red-500/20 bg-red-900/30 px-4 py-3 text-sm text-red-300">
                    {error}
                  </p>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    required disabled={isSubmitting}
                    className={inputClass} placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    required disabled={isSubmitting}
                    className={inputClass} placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-white/70 mb-1.5">
                    Company <span className="text-white/30 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text" id="company" name="company"
                    value={formData.company} onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClass} placeholder="Your company or brand"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white/70 mb-1.5">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    required rows={5} disabled={isSubmitting}
                    className={`${inputClass} resize-y min-h-[120px]`}
                    placeholder="What should we build? Timeline? Budget range?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cta-gradient flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-bold text-navy disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
                  ) : (
                    'Send Message →'
                  )}
                </button>

                <p className="text-xs text-white/30 text-center">
                  By submitting you agree to be contacted regarding your inquiry.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}