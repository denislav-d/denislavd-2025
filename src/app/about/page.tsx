import TextReveal from "@/components/TextReveal";
import Link from "next/link";
import { slides } from "@/data/slides";

export default function About() {
  const gradientScheme =
    slides[Math.floor(Math.random() * slides.length)].gradientScheme;

  return (
    <main
      className="h-dvh"
      style={{
        background: `linear-gradient(to bottom, ${gradientScheme.from}, ${gradientScheme.via}, ${gradientScheme.to})`,
      }}
    >
      <section className="font-plus-jakarta-sans grid grid-cols-1 gap-x-8 gap-y-10 px-4 pt-20 text-sm font-semibold tracking-[-0.01em] lg:grid-cols-3 lg:pt-24">
        <div className="grid grid-cols-3">
          <TextReveal delay={0.2}>
            <h3 className="text-xs font-medium text-zinc-500">The person</h3>
          </TextReveal>
          <TextReveal delay={0.3}>
            <p className="col-span-2">
              Denislav Dimitrov is a Design-Driven Developer interested in ideas
              surrounding digital identity, fashion, design principles, art, &
              artificial intelligence. A visionary in search of meaningful
              innovation, emphasizing on distinctive visualisation.
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-3">
          <TextReveal delay={0.4}>
            <h3 className="text-xs font-medium text-zinc-500">The vision</h3>
          </TextReveal>
          <TextReveal delay={0.5}>
            <p className="col-span-2">
              This is my minimal environment where I display my creative
              projects and contributions. As a person, I have always been
              impressed by good design - regardless of whether it originates
              from a human or nature. The creations which inspire you by
              observing their{" "}
              <span>
                {" "}
                <span className="inline text-zinc-500 blur-[0.8px]">(im)</span>
                perfections
              </span>
              .
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-3 gap-y-10">
          <TextReveal delay={0.6}>
            <h3 className="text-xs font-medium text-zinc-500">The journey</h3>
          </TextReveal>
          <TextReveal delay={0.7}>
            <p className="col-span-2">
              Currently pursuing a university degree in the Netherlands and
              working at Gewest13.
            </p>
          </TextReveal>
          <TextReveal delay={0.8}>
            <h3 className="text-xs font-medium text-zinc-500">The Links</h3>
          </TextReveal>

          <div className="col-span-2 flex flex-col">
            <TextReveal delay={0.9}>
              <Link href="https://github.com/denislav-d" className="w-fit">
                GitHub
              </Link>
            </TextReveal>
            <TextReveal delay={1}>
              <Link
                href="https://www.linkedin.com/in/denislavd"
                className="w-fit"
              >
                LinkedIn
              </Link>
            </TextReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
