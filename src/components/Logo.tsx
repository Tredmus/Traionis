import React from 'react';

interface LogoProps {
  variant?: 'default' | 'alt';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  const logoSrc = variant === 'alt' 
    ? 'https://snipboard.io/1Mzou2.jpg'
    : 'https://snipboard.io/XD46ZL.jpg';

  return (
    <div className="flex items-center">
      <img 
        src={logoSrc}
        alt="Traionis Logo" 
        className="h-12 w-auto"
      />
    </div>
  );
};

export default Logo;