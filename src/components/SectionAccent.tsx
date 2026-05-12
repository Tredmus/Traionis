'use client';

export type SectionAccentVariant = 'teal' | 'soft' | 'coast' | 'lagoon' | 'deep' | 'tidal';

type SectionAccentProps = {
  variant?: SectionAccentVariant;
};

/**
 * Full-bleed ambient mesh + top wash / hairline.
 * Wavy **section boundaries** are handled by `SectionWaveDivider` at the bottom of each `<section>`.
 */
export default function SectionAccent({ variant = 'teal' }: SectionAccentProps) {
  const mesh = (() => {
    switch (variant) {
      case 'soft':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  'radial-gradient(ellipse 75% 55% at 18% 85%, rgb(from var(--color-main) r g b / 0.06), transparent 52%)',
              }}
            />
          </>
        );
      case 'coast':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e2244] via-navy to-[#0a162c]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 95% 65% at 50% -5%, rgb(from var(--color-main) r g b / 0.14), transparent 58%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 50% at 0% 70%, rgb(from var(--color-accent) r g b / 0.11), transparent 55%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(ellipse 40% 35% at 100% 90%, rgb(from var(--color-main) r g b / 0.07), transparent 60%)',
              }}
            />
          </>
        );
      case 'lagoon':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0c1f3e] to-[#081426]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 85% 60% at 100% 15%, rgb(from var(--color-accent) r g b / 0.16), transparent 58%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 0% 85%, rgb(from var(--color-main) r g b / 0.09), transparent 55%)',
              }}
            />
          </>
        );
      case 'deep':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b182f] via-navy to-[#0a1528]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 90% 55% at 50% 110%, rgb(from var(--color-main) r g b / 0.07), transparent 55%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.07] bg-grid-pattern bg-[length:40px_40px]"
            />
          </>
        );
      case 'tidal':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c203c] via-[#0a1830] to-[#081222]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 100% 70% at 50% -15%, rgb(from var(--color-main) r g b / 0.13), transparent 60%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 65% 55% at 15% 55%, rgb(from var(--color-accent) r g b / 0.12), transparent 58%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 45% at 92% 75%, rgb(from var(--color-main) r g b / 0.08), transparent 55%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-80" />
          </>
        );
      case 'teal':
      default:
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 100% 75% at 50% 0%, rgb(from var(--color-main) r g b / 0.11), transparent 58%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  'radial-gradient(ellipse 55% 50% at 100% 100%, rgb(from var(--color-accent) r g b / 0.08), transparent 55%)',
              }}
            />
          </>
        );
    }
  })();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {mesh}

      {/* Top band + hairline */}
      <div className="absolute inset-x-0 top-0 h-40 overflow-visible md:h-44">
        <div
          className={`absolute inset-x-0 top-0 mx-auto h-full max-w-5xl opacity-95 ${
            variant === 'soft'
              ? 'bg-[radial-gradient(ellipse_85%_90%_at_50%_-30%,rgba(255,255,255,0.07),transparent_72%)]'
              : variant === 'deep'
                ? 'bg-[radial-gradient(ellipse_85%_90%_at_50%_-35%,rgb(from_var(--color-main)_r_g_b_/_0.08),transparent_75%)]'
                : 'bg-[radial-gradient(ellipse_85%_90%_at_50%_-30%,rgb(from_var(--color-main)_r_g_b_/_0.12),transparent_72%)]'
          }`}
        />
        <div className="absolute inset-x-6 top-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/22 to-transparent" />
      </div>
    </div>
  );
}
