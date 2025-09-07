import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/data/slides";
import PrevNextProjectButton from "@/components/PrevNextProjectButton";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectSection from "@/components/project/ProjectSection";

// ! TODO Add fullscreen video option

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Project({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const previousProject =
    currentIndex > 0
      ? allProjects[currentIndex - 1]
      : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return (
    <main>
      <ProjectHero
        title={project.title}
        description={project.description}
        metadata={project.metadata}
        heroImage={project.heroImage}
      />

      {project.content.blocks.map((block, index) => (
        <ProjectSection key={index} {...block} />
      ))}

      <footer className="flex items-center justify-center pb-8 sm:pb-16">
        <div className="flex w-full max-w-prose justify-between max-sm:px-4">
          <PrevNextProjectButton project={previousProject} side="prev" />
          <PrevNextProjectButton project={nextProject} side="next" />
        </div>
      </footer>
    </main>
  );
}
