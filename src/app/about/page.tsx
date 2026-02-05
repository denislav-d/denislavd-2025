import ElementReveal from "@/components/ElementReveal";
import ImageTrail from "@/components/ImageTrail";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { cn } from "@/utils/utils";

export default function About() {
  return (
    <main className="flex min-h-dvh flex-col">
      <ImageTrail
        images={[
          "/media/personal/personal-1.png",
          "/media/personal/personal-2.png",
          "/media/personal/personal-3.png",
          "/media/personal/personal-4.png",
          "/media/personal/personal-5.png",
          "/media/personal/personal-6.png",
        ]}
        className="font-eb-garamond mt-30 flex flex-col gap-y-8 px-4 text-lg leading-[1.1em] tracking-[-0.02em] sm:max-w-[75%] md:text-xl lg:text-2xl xl:text-3xl"
      >
        <ElementReveal>
          <p>
            <span className="pl-8 sm:pl-16">Denislav Dimitrov</span> is a
            Design-Driven Developer interested in ideas surrounding digital
            identity, fashion, design principles, art, & artificial
            intelligence. Currently pursuing a university degree in the
            Netherlands and doing an internship at Build in Amsterdam.
          </p>
        </ElementReveal>

        <ElementReveal delay={0.2}>
          <p>
            This is his minimal environment where he displays his creative
            projects and contributions. A visionary in search of meaningful
            innovation, emphasizing on distinctive visualisation.
          </p>
        </ElementReveal>

        <ElementReveal delay={0.4}>
          <p>
            As a person, he has always been impressed by good design -
            regardless of whether it originates from a human or nature. The
            creations which inspire you by observing their{" "}
            <span className="whitespace-nowrap">
              <span className="inline text-zinc-500 blur-[0.8px]">(im)</span>
              perfections.
            </span>
          </p>
        </ElementReveal>
      </ImageTrail>

      <ElementReveal delay={0.6}>
        <p
          className={cn(
            "font-eb-garamond px-4 pt-6 text-center text-sm tracking-[-0.01em] text-zinc-500 sm:text-left lg:text-base",
          )}
        >
          <span className="pointer-coarse:inline! pointer-fine:hidden!">
            Tap on
          </span>
          <span className="pointer-coarse:hidden! pointer-fine:inline!">
            Hover over
          </span>{" "}
          the paragraphs
        </p>
      </ElementReveal>

      <section className="font-plus-jakarta-sans grid grid-cols-2 gap-y-8 px-4 pt-12 pb-20 text-xs font-semibold tracking-[-0.01em] sm:grid-cols-3 md:grid-cols-5 md:pt-32 lg:pt-40">
        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.2}>
            <h4 className="text-zinc-500">Useful Links</h4>
          </ElementReveal>
          <ul>
            {aboutData.sections.usefulLinks.map((link, i) => (
              <ElementReveal key={link.label} delay={0.25 + i * 0.05}>
                <li>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="transition-opacity duration-400 hover:opacity-50"
                  >
                    {link.label}
                  </Link>
                </li>
              </ElementReveal>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.4}>
            <h4 className="text-zinc-500">Tech Stack</h4>
          </ElementReveal>
          <ul>
            {aboutData.sections.techStack.map((link, i) => (
              <ElementReveal key={link.label} delay={0.45 + i * 0.05}>
                <li>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="transition-opacity duration-400 hover:opacity-50"
                  >
                    {link.label}
                  </Link>
                </li>
              </ElementReveal>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.6}>
            <h4 className="text-zinc-500">Inspiration</h4>
          </ElementReveal>
          <ul>
            {aboutData.sections.inspiration.map((item, i) => (
              <ElementReveal key={item} delay={0.7 + i * 0.1}>
                <li>{item}</li>
              </ElementReveal>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.8}>
            <h4 className="text-zinc-500">Typography</h4>
          </ElementReveal>
          <ul>
            {aboutData.sections.typography.map((link, i) => (
              <ElementReveal key={link.label} delay={0.9 + i * 0.1}>
                <li>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="transition-opacity duration-400 hover:opacity-50"
                  >
                    {link.label}
                  </Link>
                </li>
              </ElementReveal>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={1.0}>
            <h4 className="text-zinc-500">Color Palette</h4>
          </ElementReveal>
          <ul>
            {aboutData.sections.colorPalette.map((c, i) => (
              <ElementReveal
                key={c.label}
                delay={1.1 + i * 0.1}
                linesClass="leading-[1.5]"
              >
                <li>
                  {c.label}:{" "}
                  <span
                    className={cn(
                      "text-light border border-zinc-300",
                      c.hex.toLowerCase() === "#f7f7f2" && "text-dark",
                    )}
                    style={{ backgroundColor: c.hex }}
                  >
                    {c.hex}
                  </span>
                </li>
              </ElementReveal>
            ))}
          </ul>
        </div>
      </section>

      <footer className="font-plus-jakarta-sans mt-auto px-4 pb-4 text-[10px] font-semibold tracking-[-0.01em] opacity-50">
        <h5>{aboutData.footerText}</h5>
      </footer>
    </main>
  );
}
