import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView } from "@/components/work/CaseStudyView";
import { caseStudySlugs, getCaseStudy } from "@/lib/work";

export function generateStaticParams() {
  return caseStudySlugs().map((slug) => ({ slug }));
}

// Next 16: params is a Promise on every route file.
export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getCaseStudy(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — Traionis`,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  return <CaseStudyView project={project} />;
}
