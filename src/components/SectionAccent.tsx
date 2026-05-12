/**
 * Soft top wash + hairline so stacked navy sections read as distinct bands without flat merge.
 */
export default function SectionAccent({ variant = 'teal' }: { variant?: 'teal' | 'soft' }) {
  const wash =
    variant === 'teal'
      ? 'bg-[radial-gradient(ellipse_85%_90%_at_50%_-30%,rgb(from_var(--color-main)_r_g_b_/_0.14),transparent_72%)]'
      : 'bg-[radial-gradient(ellipse_85%_90%_at_50%_-30%,rgba(255,255,255,0.06),transparent_72%)]';

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden" aria-hidden>
      <div
        className={`absolute inset-x-0 top-0 mx-auto h-full max-w-5xl opacity-90 ${wash}`}
      />
      <div className="absolute inset-x-6 top-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
