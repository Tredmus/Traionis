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
        {/*
          The direction this band was built to. Emitted as a real HTML comment
          (not a JSX one, which the compiler strips) so it survives the
          production build and can be audited against the render.
        */}
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
impeccable:direction — work gallery (MID band)
THESIS: evidence you have to find. The portfolio refuses the grid of equal thumbnails; the work hangs in the water column and resolves only where the lamp falls.
OWN-WORLD: the descent's own five flat bands, cyan bioluminescent accent, hairlines, Archivo on its width axis. No new palette, no new components.
STORY: three real builds, each labelled with what it honestly proves; the visitor sweeps the light, finds them, and follows one out to the live site.
FIRST VIEWPORT: heading and one line at the measure, then the nearest plate at full width, dark, with the lamp already lit and trailing the cursor.
FORM: a column of unequal plates receding by width and by ambient light; extension of an established surface, so no concept tournament was run.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->` ,
          }}
        />
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
