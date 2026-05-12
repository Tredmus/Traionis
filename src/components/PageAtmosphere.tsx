/**
 * Site-wide ambient depth (Easyweb-style): large soft gradient orbs + vignette on the navy canvas.
 * Sky accent reads as “space light”; teal orb reinforces the brand. Normal blend — keeps text crisp.
 */
export default function PageAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -top-[18%] left-1/2 h-[min(88vh,920px)] w-[min(130vw,1100px)] -translate-x-1/2 rounded-full opacity-[0.55] blur-[90px]"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 40%, rgb(from var(--color-accent) r g b / 0.35) 0%, rgba(59, 130, 246, 0.12) 42%, transparent 72%)',
        }}
      />
      <div
        className="absolute top-[22%] -right-[12%] h-[min(72vh,720px)] w-[min(72vw,640px)] rounded-full opacity-[0.5] blur-[100px]"
        style={{
          background:
            'radial-gradient(circle at 40% 45%, rgb(from var(--color-main) r g b / 0.28) 0%, rgb(from var(--color-main) r g b / 0.08) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[-8%] left-[-18%] h-[min(65vh,620px)] w-[min(85vw,760px)] rounded-full opacity-[0.45] blur-[95px]"
        style={{
          background:
            'radial-gradient(circle at 55% 40%, rgb(from var(--color-accent) r g b / 0.28) 0%, rgba(15, 32, 64, 0.06) 50%, transparent 72%)',
        }}
      />
      <div
        className="absolute left-1/2 top-[48%] h-[min(90vh,900px)] w-[min(100vw,900px)] -translate-x-1/2 rounded-full opacity-[0.35] blur-[120px]"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.9]"
        style={{
          background:
            'radial-gradient(ellipse 88% 72% at 50% 42%, transparent 0%, rgba(4, 10, 22, 0.72) 100%)',
        }}
      />
    </div>
  );
}
