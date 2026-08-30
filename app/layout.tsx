import type { Metadata } from "next";
import { Archivo, Instrument_Sans, Newsreader } from "next/font/google";

import { DepthRail } from "@/components/depth/DepthRail";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

/**
 * Three families, each with exactly one job.
 *
 * Archivo carries the display voice via its width axis — wide and structural,
 * reading as signage rather than fashion. Deliberately not a high-contrast
 * serif, which is the default look for this kind of page and would undercut
 * the engineering claim.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"], // latin-ext carries Bulgarian Cyrillic's neighbours
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

export const metadata: Metadata = {
  metadataBase: new URL("https://traionis.com"),
  title: {
    default: "Traionis — Web development studio in Varna, Bulgaria",
    template: "%s — Traionis",
  },
  description:
    "Traionis is a web development and digital automation agency based in Varna, Bulgaria. We build custom websites and web applications — you talk to the person who builds it.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Traionis",
    locale: "en",
    url: "/",
    title: "Traionis — You talk to the person who builds it",
    description:
      "A web development studio in Varna, Bulgaria building custom websites and web applications. Real engineering, not a template resold.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traionis — You talk to the person who builds it",
    description:
      "A web development studio in Varna, Bulgaria building custom websites and web applications.",
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
      className={`${archivo.variable} ${instrumentSans.variable} ${newsreader.variable} h-full`}
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
