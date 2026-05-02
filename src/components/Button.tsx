import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled'>;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const baseStyles =
    'rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center tracking-tight';

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-light text-white hover:shadow-lg shadow-sm',
    secondary: 'bg-teal-500 hover:bg-teal-600 text-white hover:shadow-lg',
    outline:
      'bg-transparent border-2 border-secondary text-primary hover:bg-secondary/15 hover:border-primary',
  };

  const sizeStyles = {
    sm: 'text-sm px-4 py-1.5',
    md: 'px-6 py-2.5',
    lg: 'text-lg px-8 py-3.5',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
