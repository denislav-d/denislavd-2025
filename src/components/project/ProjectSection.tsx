import ElementReveal from "@/components/ElementReveal";
import { ContentBlock } from "@/data/slides";
import Image from "next/image";
import { cn } from "@/utils/utils";
import RendererMDX from "@/components/RendererMDX";

export default function ProjectSection(block: ContentBlock) {
  switch (block.type) {
    case "text":
      return (
        <section className="mx-auto flex max-w-prose flex-col gap-y-12 py-8">
          <ElementReveal animateOnScroll>
            <RendererMDX description={block.content || ""} />
          </ElementReveal>
        </section>
      );

    case "image":
      return (
        <section className="mx-auto flex max-w-prose flex-col gap-y-12 py-8">
          <figure
            className={cn(
              "relative",
              block.orientation === "portrait"
                ? "aspect-[0.8/1]"
                : "aspect-[16/10]",
            )}
          >
            <ElementReveal animateOnScroll>
              <Image
                fill
                src={block.src || ""}
                alt={block.alt || ""}
                className="w-full object-cover"
              />
            </ElementReveal>
          </figure>
        </section>
      );

    case "video":
      return (
        <section className="mx-auto flex max-w-prose flex-col gap-y-12 py-8">
          <ElementReveal animateOnScroll>
            <video
              src={block.src}
              className="w-full max-w-prose"
              autoPlay
              loop
              muted
              playsInline
            />
          </ElementReveal>
        </section>
      );

    case "gallery":
      return (
        <section className="mx-auto flex flex-col gap-y-12 py-8">
          <div className="grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-3">
            {block.images?.map((image, index) => (
              <div className="relative aspect-[0.8/1]" key={index}>
                <ElementReveal animateOnScroll>
                  <Image
                    fill
                    src={image}
                    alt={block.alt || ""}
                    className="object-cover"
                  />
                </ElementReveal>
              </div>
            ))}
          </div>
        </section>
      );

    default:
      return null;
  }
}
