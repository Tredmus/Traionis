import type { Metadata } from "next";

import { DepthZone } from "@/components/depth/DepthZone";
import { Contact } from "@/components/sections/Contact";

/**
 * `/contact` is an indexed URL on the live site. It resolves with the same
 * project-brief form as the floor of the homepage rather than redirecting,
 * so the indexed path keeps its own crawlable content.
 */
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Traionis, a web development and digital automation agency based in Varna, Bulgaria. Tell us what you're building and you'll get a straight answer on fit.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <DepthZone zone="abyss" padding="none" className="pb-32 pt-40 sm:pb-44 sm:pt-48">
      <Contact />
    </DepthZone>
  );
}
