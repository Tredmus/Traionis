import type { Metadata } from "next";

import { AboutView } from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Traionis is a web development and digital automation agency based in Varna, Bulgaria. You talk to the person who builds it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
