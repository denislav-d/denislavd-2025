import ElementReveal from "@/components/ElementReveal";
import ProjectMetadata from "@/components/project/ProjectMetadata";
import { Project } from "@/data/slides";
import { cn } from "@/utils/utils";
import Image from "next/image";

export default function ProjectHero({
  title,
  description,
  metadata,
  hero,
}: {
  title: Project["title"];
  description: Project["description"];
  metadata: Project["metadata"];
  hero: Project["hero"];
}) {
  return (
    <section className="mx-auto flex w-full max-w-prose flex-col gap-y-16 pt-30 pb-8 max-md:px-4">
      <div className="flex flex-col gap-y-10">
        <ElementReveal animateOnScroll>
          <h1 className="font-eb-garamond text-center text-3xl leading-[1.1em] tracking-[-0.02em] lg:text-4xl xl:text-5xl">
            {title}
          </h1>
        </ElementReveal>

        <ElementReveal animateOnScroll>
          <h3 className="font-plus-jakarta-sans text-sm font-semibold tracking-[-0.01em]">
            {description}
          </h3>
        </ElementReveal>
      </div>

      <ProjectMetadata metadata={metadata} />

      <figure
        className={cn(
          "relative select-none",
          hero.orientation === "portrait" ? "aspect-[0.8/1]" : "aspect-16/10",
        )}
      >
        <ElementReveal animateOnScroll>
          {hero.type === "image" ? (
            <Image
              fill
              src={hero.src}
              alt={hero.alt || title}
              className="w-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 640px, 640px"
              priority
              quality={90}
            />
          ) : (
            <video
              src={hero.src}
              className="w-full"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          )}
        </ElementReveal>
      </figure>
    </section>
  );
}
