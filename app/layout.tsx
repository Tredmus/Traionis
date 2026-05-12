import type { Metadata, Viewport } from 'next';
import { Archivo, DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Traionis | Уебсайтове и приложения за българския бизнес',
  description:
    'Изработка на уебсайтове, уеб приложения и автоматизации за фирми в България. Ясни срокове, стабилен код, директна комуникация.',
  metadataBase: new URL('https://traionis.com'),
  openGraph: {
    title: 'Traionis | Уебсайтове и приложения за българския бизнес',
    description:
      'Инженерен подход към уеб разработка и дигитални продукти за местни компании.',
    url: 'https://traionis.com/',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0f2040',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${archivo.variable}`}>
      <body className="font-sans antialiased bg-navy text-white">{children}</body>
    </html>
  );
}
