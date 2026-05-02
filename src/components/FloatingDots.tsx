'use client';

const DOTS = [
  { left: '8%', top: '12%', size: 7, delay: '-2s', duration: '22s' },
  { left: '22%', top: '68%', size: 5, delay: '-5s', duration: '28s' },
  { left: '78%', top: '18%', size: 9, delay: '-1s', duration: '24s' },
  { left: '88%', top: '72%', size: 6, delay: '-7s', duration: '30s' },
  { left: '45%', top: '40%', size: 4, delay: '-3s', duration: '26s' },
  { left: '62%', top: '55%', size: 8, delay: '-4s', duration: '20s' },
  { left: '15%', top: '42%', size: 5, delay: '-6s', duration: '32s' },
  { left: '92%', top: '38%', size: 7, delay: '-8s', duration: '25s' },
  { left: '33%', top: '22%', size: 6, delay: '-2.5s', duration: '27s' },
  { left: '55%', top: '12%', size: 5, delay: '-5.5s', duration: '29s' },
];

export default function FloatingDots() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {DOTS.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/15"
          style={{
            width: d.size,
            height: d.size,
            left: d.left,
            top: d.top,
            animation: `float ${d.duration} linear infinite`,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}
