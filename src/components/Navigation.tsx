"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/utils/utils";
import ElementReveal from "@/components/ElementReveal";

export default function Navigation() {
  const pathname = usePathname();

  // Remove preload class after component mounts to enable transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove("preload");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="font-plus-jakarta-sans fixed top-4 z-50 flex w-full justify-between px-4 text-xs leading-tight font-semibold tracking-[-0.01em] text-white mix-blend-difference sm:grid sm:grid-cols-2 md:grid-cols-3">
      <ElementReveal delay={0.1}>
        <Link href="/" className="w-fit">
          Denislav <span className="xs:inline-block hidden">Dimitrov</span>
        </Link>
      </ElementReveal>

      <div className="flex justify-end gap-x-4 md:justify-center">
        <ElementReveal delay={0.1}>
          <Link
            href="/thoughts"
            className={cn(
              "underline-animation relative inline-block transition-transform duration-600 ease-in-out after:bottom-[2.5px]!",
              pathname === "/" || pathname === "/projects"
                ? "translate-x-0"
                : "translate-x-2",
              pathname?.startsWith("/thoughts") && "is-active",
            )}
          >
            Thoughts
          </Link>
        </ElementReveal>

        <div className="relative grid overflow-hidden">
          {/* Projects Link */}
          <div className="grid-area origin-[50%_50%_0]">
            <ElementReveal delay={0.12}>
              <Link
                href="/"
                className={cn(
                  "inline-block w-full text-center transition-all duration-600 ease-in-out",
                  pathname === "/" || pathname === "/projects"
                    ? "pointer-events-none translate-y-full scale-95"
                    : "translate-y-0 scale-100",
                )}
              >
                Projects
              </Link>
            </ElementReveal>
          </div>

          <div className="grid-area origin-[50%_50%_0]">
            <span
              className={cn(
                "inline-block w-full transition-all duration-600 ease-in-out",
                pathname === "/" || pathname === "/projects"
                  ? "translate-y-0 scale-100"
                  : "pointer-events-none -translate-y-full scale-95",
              )}
            >
              <ElementReveal delay={0.14}>
                <Link
                  href="/"
                  className={cn(
                    "underline-animation relative inline-block transition-all duration-600 ease-in-out",
                    pathname !== "/" && pathname !== "/projects"
                      ? "translate-x-1 scale-95"
                      : "scale-100",
                    pathname === "/" && "is-active",
                  )}
                >
                  Slider
                </Link>
              </ElementReveal>{" "}
              <ElementReveal delay={0.16}>
                <span
                  className={cn(
                    "inline-block transition-all duration-600 ease-in-out",
                    pathname !== "/" && pathname !== "/projects"
                      ? "-translate-x-0.5 scale-95"
                      : "scale-100",
                  )}
                >
                  /
                </span>
              </ElementReveal>{" "}
              <ElementReveal delay={0.18}>
                <Link
                  href="/projects"
                  className={cn(
                    "underline-anim relative inline-block transition-all duration-600 ease-in-out",
                    pathname !== "/" && pathname !== "/projects"
                      ? "-translate-x-1 scale-95"
                      : "scale-100",
                    pathname === "/projects" && "is-active",
                  )}
                >
                  Grid
                </Link>
              </ElementReveal>
            </span>
          </div>
        </div>

        <ElementReveal delay={0.2}>
          <Link
            href="/about"
            className={cn(
              "underline-animation relative inline-block transition-transform duration-600 ease-in-out after:bottom-[2.5px]!",
              pathname === "/" || pathname === "/projects"
                ? "translate-x-0"
                : "-translate-x-2",
              pathname === "/about" && "is-active",
            )}
          >
            About
          </Link>
        </ElementReveal>
      </div>

      <ElementReveal delay={0.4}>
        <span className="hidden text-right md:block">
          Design-Driven Developer
        </span>
      </ElementReveal>
    </nav>
  );
}
