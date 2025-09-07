import ElementReveal from "@/components/ElementReveal";
import Link from "next/link";

// !TODO Add and update hover colours, underline hover animations, .map() through data in data.ts about object, colour palette copy functionality

export default function About() {
  return (
    <main className="flex min-h-dvh flex-col">
      <section className="font-eb-garamond flex flex-col gap-y-8 px-4 pt-30 text-lg leading-[1.1em] tracking-[-0.02em] sm:max-w-4/5 md:text-xl lg:text-2xl xl:text-3xl">
        <ElementReveal>
          <p>
            <span className="pl-8 sm:pl-16">Denislav Dimitrov</span> is a
            Design-Driven Developer interested in ideas surrounding digital
            identity, fashion, design principles, art, & artificial
            intelligence. Currently pursuing a university degree in the
            Netherlands and working at Gewest13.
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
            <span>
              <span className="inline text-zinc-500 blur-[0.8px]">(im)</span>
              perfections
            </span>
            .
          </p>
        </ElementReveal>
      </section>

      <section className="font-plus-jakarta-sans grid grid-cols-2 gap-y-8 px-4 py-20 text-xs font-semibold tracking-[-0.01em] sm:grid-cols-3 md:grid-cols-5 md:pt-32 lg:pt-40">
        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.2}>
            <h4 className="text-zinc-500">Useful Links</h4>
          </ElementReveal>
          <ul>
            <ElementReveal delay={0.25}>
              <li>
                <Link href="https://github.com/denislav-d" target="_blank">
                  GitHub
                </Link>
              </li>
            </ElementReveal>
            <ElementReveal delay={0.3}>
              <li>
                <Link
                  href="https://www.linkedin.com/in/denislavd/"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </li>
            </ElementReveal>
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.4}>
            <h4 className="text-zinc-500">Tech Stack</h4>
          </ElementReveal>
          <ul>
            <ElementReveal delay={0.45}>
              <li>
                <Link href="https://nextjs.org/" target="_blank">
                  Next.js
                </Link>
              </li>
            </ElementReveal>
            <ElementReveal delay={0.5}>
              <li>
                <Link href="https://tailwindcss.com/" target="_blank">
                  Tailwind CSS
                </Link>
              </li>
            </ElementReveal>
            <ElementReveal delay={0.55}>
              <li>
                <Link href="https://gsap.com/" target="_blank">
                  GSAP
                </Link>
              </li>
            </ElementReveal>
            <ElementReveal delay={0.6}>
              <li>
                <Link href="https://threejs.org/" target="_blank">
                  THREE.js
                </Link>
              </li>
            </ElementReveal>
            <ElementReveal delay={0.65}>
              <li>
                <Link
                  href="https://lenis.darkroom.engineering/"
                  target="_blank"
                >
                  Lenis
                </Link>
              </li>
            </ElementReveal>
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.6}>
            <h4 className="text-zinc-500">Inspiration</h4>
          </ElementReveal>
          <ul>
            <ElementReveal delay={0.7}>
              <li>Swiss Design</li>
            </ElementReveal>
            <ElementReveal delay={0.8}>
              <li>Archival Fashion</li>
            </ElementReveal>
            <ElementReveal delay={0.9}>
              <li>Brutalist Architecture</li>
            </ElementReveal>
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={0.8}>
            <h4 className="text-zinc-500">Typography</h4>
          </ElementReveal>
          <ul>
            <ElementReveal delay={0.9}>
              <li>
                <Link
                  href="https://fonts.google.com/specimen/Plus+Jakarta+Sans"
                  target="_blank"
                >
                  Plus Jakarta Sans
                </Link>
              </li>
            </ElementReveal>

            <ElementReveal delay={1.0}>
              <li>
                <Link
                  href="https://fonts.google.com/specimen/EB+Garamond"
                  target="_blank"
                >
                  EB Garamond
                </Link>
              </li>
            </ElementReveal>
          </ul>
        </div>

        <div className="flex flex-col gap-y-8 lg:gap-y-12">
          <ElementReveal delay={1.0}>
            <h4 className="text-zinc-500">Color Palette</h4>
          </ElementReveal>
          <ul>
            <ElementReveal delay={1.1}>
              <li>
                Light:{" "}
                <span className="border border-zinc-300 bg-[#f7f7f2]">
                  #f7f7f2
                </span>
              </li>
            </ElementReveal>
            <ElementReveal delay={1.2}>
              <li>
                Dark:{" "}
                <span className="text-light border border-zinc-300 bg-[#111111]">
                  #111111
                </span>
              </li>
            </ElementReveal>
            <ElementReveal delay={1.3}>
              <li>
                Secondary:{" "}
                <span className="border border-zinc-300 bg-[#afaba0]">
                  #afaba0
                </span>
              </li>
            </ElementReveal>
            {/* ! Add hover, too */}
          </ul>
        </div>
      </section>

      <footer className="font-plus-jakarta-sans mt-auto px-4 pb-4 text-[10px] font-semibold tracking-[-0.01em] text-zinc-400">
        <h5>© 2025 Denislav Dimitrov</h5>
      </footer>
    </main>
  );
}
