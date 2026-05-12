import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /** Site canvas — change in one place via CSS variable in globals.css */
        navy: {
          DEFAULT: '#0f2040',
          deep: '#0c1a33',
        },
        /**
         * Single hex per token in globals.css (`--color-main`, `--color-accent`).
         * Relative-color syntax keeps opacity modifiers (`text-main/50`) in sync with the hex.
         */
        main: 'rgb(from var(--color-main) r g b / <alpha-value>)',
        accent: 'rgb(from var(--color-accent) r g b / <alpha-value>)',
        primary: {
          DEFAULT: '#1A6986',
          light: '#227998',
        },
        secondary: {
          DEFAULT: '#40E0D0',
          light: '#2FD0C0',
        },
      },
      boxShadow: {
        section: '0 24px 80px -20px rgba(26, 105, 134, 0.12)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
