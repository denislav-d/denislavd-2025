"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/utils/utils";

export default function TopNavigation() {
  const pathname = usePathname();

  // Remove preload class after component mounts to enable transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove("preload");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // ! TODO: fix slider/all links, transform-none?

  return (
    <nav className="font-plus-jakarta-sans fixed top-4 z-50 flex w-full justify-between px-4 text-xs font-semibold tracking-[-0.01em] text-white mix-blend-difference sm:grid sm:grid-cols-2 md:grid-cols-3">
      <Link href="/">
        Denislav <span className="xs:inline-block hidden">Dimitrov</span>
      </Link>

      <div className="flex justify-end gap-x-4 md:justify-center">
        <Link
          href="/thoughts"
          className={cn(
            "inline-block transition-transform duration-600 ease-in-out",
            pathname === "/" ? "translate-x-0" : "translate-x-2",
          )}
        >
          Thoughts
        </Link>

        <div className="relative grid overflow-hidden">
          {/* Projects Link */}
          <div className="grid-area origin-[50%_50%_0]">
            <Link
              href={pathname === "/" ? "/" : "/"}
              className={cn(
                "inline-block w-full text-center transition-all duration-600 ease-in-out",
                pathname === "/"
                  ? "pointer-events-none translate-y-full scale-95"
                  : "translate-y-0 scale-100",
              )}
            >
              Projects
            </Link>
          </div>

          <div className="grid-area origin-[50%_50%_0]">
            <span
              className={cn(
                "inline-block w-full transition-all duration-600 ease-in-out",
                pathname === "/"
                  ? "translate-y-0 scale-100"
                  : "pointer-events-none -translate-y-full scale-95",
              )}
            >
              <Link
                href={pathname === "/" ? "" : "/"}
                className={cn(
                  "inline-block transition-all duration-600 ease-in-out",
                  pathname !== "/" ? "translate-x-1 scale-95" : "scale-100",
                )}
              >
                Slider
              </Link>{" "}
              <span
                className={cn(
                  "inline-block transition-all duration-600 ease-in-out",
                  pathname !== "/" ? "-translate-x-0.5 scale-95" : "scale-100",
                )}
              >
                /
              </span>{" "}
              <Link
                href="/projects"
                className={cn(
                  "inline-block transition-all duration-600 ease-in-out",
                  pathname !== "/" ? "-translate-x-1 scale-95" : "scale-100",
                )}
              >
                Grid
              </Link>
            </span>
          </div>
        </div>

        <Link
          href="/about"
          className={cn(
            "inline-block transition-transform duration-600 ease-in-out",
            pathname === "/" ? "translate-x-0" : "-translate-x-2",
          )}
        >
          About
        </Link>
      </div>

      <span className="hidden text-right md:block">
        Design-Driven Developer
      </span>
    </nav>
  );
}
