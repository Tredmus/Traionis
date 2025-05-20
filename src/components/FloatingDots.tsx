import React from 'react';

const FloatingDots: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 10 + 5; // Single size value for both width and height
        return (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: size + 'px',
              height: size + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingDots;