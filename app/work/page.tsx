import type { Metadata } from "next";

import { WorkIndex } from "@/components/work/WorkIndex";

/**
 * `/work` is an indexed URL on the live site and must keep resolving with
 * real content — not a redirect to a homepage anchor.
 */
export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects built by Traionis, a web development and digital automation agency based in Varna, Bulgaria. The decisions behind each build, not just the screenshots.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkIndex />;
}
