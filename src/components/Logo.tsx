import Image from 'next/image';

type LogoProps = {
  variant?: 'default' | 'alt';
};

const SRC = {
  default: 'https://snipboard.io/XD46ZL.jpg',
  alt: 'https://snipboard.io/1Mzou2.jpg',
} as const;

export default function Logo({ variant = 'default' }: LogoProps) {
  return (
    <div className="flex items-center">
      <Image
        src={SRC[variant]}
        alt="Traionis"
        width={200}
        height={48}
        className="h-10 md:h-12 w-auto"
        priority={variant === 'default'}
      />
    </div>
  );
}
