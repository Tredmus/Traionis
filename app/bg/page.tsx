import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { resolveCopy } from "@/lib/content";

const bg = resolveCopy("bg");

/** The whole site in Bulgarian, server-rendered so Google indexes it as such. */
export const metadata: Metadata = {
  title: { absolute: bg.meta.title },
  description: bg.meta.description,
  alternates: {
    canonical: "/bg",
    languages: { en: "/", bg: "/bg", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Traionis",
    locale: "bg_BG",
    alternateLocale: ["en_US"],
    url: "/bg",
    title: bg.meta.ogTitle,
    description: bg.meta.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: bg.meta.ogTitle,
    description: bg.meta.ogDescription,
  },
};

export default function Page() {
  return <HomePage />;
}
