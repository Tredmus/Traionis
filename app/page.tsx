import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { en } from "@/lib/content";

/** English, at the root. Its Bulgarian twin lives at /bg. */
export const metadata: Metadata = {
  title: { absolute: en.meta.title },
  description: en.meta.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", bg: "/bg", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Traionis",
    locale: "en_US",
    alternateLocale: ["bg_BG"],
    url: "/",
    title: en.meta.ogTitle,
    description: en.meta.ogDescription,
  },
};

export default function Page() {
  return <HomePage />;
}
