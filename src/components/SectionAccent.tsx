'use client';

export type SectionAccentVariant = 'teal' | 'soft' | 'coast' | 'lagoon' | 'deep' | 'tidal';

type SectionAccentProps = {
  variant?: SectionAccentVariant;
};

/**
 * Full-bleed ambient mesh (no top highlight band — avoids a horizontal “rule” under stacked sections).
 * Wavy **section boundaries** are handled by `SectionWaveDivider` at the bottom of each `<section>`.
 */
export default function SectionAccent({ variant = 'teal' }: SectionAccentProps) {
  const mesh = (() => {
    switch (variant) {
      case 'soft':
        return (
          <>
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
          </>
        );
      case 'teal':
      default:
        return (
          <>
            {/* Solid base so wave fill (#0f2040) and section read as one plane under translucent radials */}
            <div className="absolute inset-0 bg-[#0f2040]" />
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
    </div>
  );
}
