import type { Metadata } from "next";
import { Archivo, Instrument_Sans, Literata, Newsreader, Roboto_Flex } from "next/font/google";

import { DepthRail } from "@/components/depth/DepthRail";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

/**
 * Three families, each with exactly one job.
 *
 * Archivo carries the display voice via its width axis - wide and structural,
 * reading as signage rather than fashion. Deliberately not a high-contrast
 * serif, which is the default look for this kind of page and would undercut
 * the engineering claim.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Long-form only. Case studies should read as documents, not as marketing. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  display: "swap",
});

/**
 * Cyrillic companions. None of the three families above has Cyrillic, so
 * these sit second in each stack and set only the Bulgarian letters; Latin
 * keeps its own faces. Cyrillic subset only and not preloaded: the English
 * page never downloads them (the browser fetches a face only when a
 * character in its unicode-range appears).
 *
 * Roboto Flex carries a width axis like Archivo's, so the stretched display
 * voice survives in Bulgarian; Literata has optical sizes like Newsreader.
 */
const robotoFlex = Roboto_Flex({
  variable: "--font-cyr-sans",
  subsets: ["cyrillic"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
});

const literata = Literata({
  variable: "--font-cyr-serif",
  subsets: ["cyrillic"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://traionis.com"),
  title: {
    default: "Traionis - Custom websites & applications, Varna, Bulgaria",
    template: "%s - Traionis",
  },
  description:
    "Traionis is a web development studio in Varna, Bulgaria. We design and build custom websites and web and mobile applications from the ground up.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Traionis",
    locale: "en",
    url: "/",
    title: "Traionis - You bring the idea. We build the product.",
    description:
      "Custom websites and web and mobile applications, designed and built from the ground up by a studio in Varna, Bulgaria.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traionis - You bring the idea. We build the product.",
    description:
      "Custom websites and web and mobile applications, designed and built from the ground up by a studio in Varna, Bulgaria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Next 16 no longer overrides scroll-behavior on navigation; this opts
      // back in, so route changes stay instant while in-page anchors glide.
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${instrumentSans.variable} ${newsreader.variable} ${robotoFlex.variable} ${literata.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <LocaleProvider>
          <SkipLink />
          <SiteHeader />
          <DepthRail />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
