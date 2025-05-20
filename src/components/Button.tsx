import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-light text-white hover:shadow-lg',
    secondary: 'bg-teal-500 hover:bg-teal-600 text-white hover:shadow-lg',
    outline: 'bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-1.5',
    md: 'px-6 py-2.5',
    lg: 'text-lg px-8 py-3',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;