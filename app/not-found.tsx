import type { Metadata } from "next";

import { NotFoundView } from "@/components/NotFoundView";
import { en } from "@/lib/content";

export const metadata: Metadata = {
  title: en.notFound.title,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
