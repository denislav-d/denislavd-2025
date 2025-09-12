import ElementReveal from "@/components/ElementReveal";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col">
      <section className="font-eb-garamond flex flex-col gap-y-8 px-4 pt-30 text-lg leading-[1.1em] tracking-[-0.02em] sm:max-w-4/5 md:text-xl lg:text-2xl xl:text-3xl">
        <ElementReveal>
          <p>
            <span className="pl-8 sm:pl-16">Page not found</span>
          </p>
        </ElementReveal>

        <ElementReveal delay={0.2}>
          <p>
            Don&apos;t worry, happens to the best of us. Looks like you are
            lost, you can go{" "}
            <Link href="/" className="inline text-zinc-500 blur-[0.8px]">
              home
            </Link>
            .
          </p>
        </ElementReveal>
      </section>
    </main>
  );
}
