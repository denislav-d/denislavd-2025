"use client";

import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { getAllProjects, type Project } from "@/data/slides";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface PlaceholderItem {
  id: string;
  isPlaceholder: true;
}

type GridItem = Project | PlaceholderItem;

export default function Projects() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);
  const baseProjects = getAllProjects();

  // Memoize the projects array to prevent unnecessary recalculations
  const projects = useMemo((): GridItem[] => {
    const placeholder = (id: string): PlaceholderItem => ({
      id,
      isPlaceholder: true,
    });

    // Fixed pattern based on the commented code
    const gridItems: GridItem[] = [
      baseProjects[1], // Detaile
      placeholder("placeholder-1"),
      baseProjects[4], // Vetemòre
      placeholder("placeholder-2"),
      placeholder("placeholder-3"),
      placeholder("placeholder-4"),
      baseProjects[0], // Dutch Design Week 2025
      placeholder("placeholder-5"),
      placeholder("placeholder-6"),
      baseProjects[2], // Spotlight
      placeholder("placeholder-7"),
      placeholder("placeholder-8"),
      placeholder("placeholder-9"),
      baseProjects[3], // Strijp-S AI Assistant
      placeholder("placeholder-10"),
    ];

    const infiniteGridItems = [gridItems[gridItems.length - 1], ...gridItems];
    //!TODO FIX: Create multiple cycles for infinite scrolling
    return Array.from({ length: 5 }, (_, cycleIndex) =>
      infiniteGridItems.map((item, itemIndex) => ({
        ...item,
        id: `${item.id}-cycle-${cycleIndex}-${itemIndex}`,
      })),
    ).flat();
  }, [baseProjects]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || isInitializedRef.current) return;

    let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;
    let currentColumnCount: number | null = null;

    const baseLag = 0.1;
    const lagIncrement = 0.2;

    // Initial appear animation
    const animateInitialAppear = () => {
      const items = grid.querySelectorAll(".grid__item");

      gsap.set(items, {
        opacity: 0,
        scale: 0.9,
        y: 50,
      });

      gsap.to(items, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: {
          amount: 1.2,
          from: "start",
        },
        delay: 0.5,
      });
    };

    const getColumnCount = (): number => {
      const styles = getComputedStyle(grid);
      const templateColumns = styles.getPropertyValue("grid-template-columns");
      return templateColumns.split(" ").filter(Boolean).length;
    };

    const applyDirectLagEffects = (
      scrollSmoother: ReturnType<typeof ScrollSmoother.create>,
    ) => {
      const items = grid.querySelectorAll(".grid__item");
      const colCount = getColumnCount();

      items.forEach((item, index) => {
        const columnIndex = index % colCount;
        const lag = baseLag + columnIndex * lagIncrement;

        try {
          scrollSmoother.effects(item as HTMLElement, {
            speed: 1,
            lag: lag,
          });
        } catch {}
      });
    };

    const init = () => {
      try {
        // Quick validation - elements should be ready by useEffect
        const items = grid.querySelectorAll(".grid__item");
        if (items.length === 0) return;

        const colCount = getColumnCount();
        if (colCount === 0) return;

        currentColumnCount = colCount;

        if (smoother) {
          smoother.kill();
          smoother = null;
        }

        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
          normalizeScroll: true,
        });

        applyDirectLagEffects(smoother);
        animateInitialAppear();
        isInitializedRef.current = true;
      } catch {
        isInitializedRef.current = false;
        if (smoother) {
          smoother.kill();
          smoother = null;
        }
      }
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      if (!isInitializedRef.current) return;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newColumnCount = getColumnCount();
        if (newColumnCount !== currentColumnCount && newColumnCount > 0) {
          isInitializedRef.current = false;
          init();
        }
      }, 100);
    };

    init();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);

      if (smoother) {
        try {
          smoother.kill();
        } catch {}
        smoother = null;
      }

      isInitializedRef.current = false;
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="px-4 pt-30 lg:px-16">
          <div
            ref={gridRef}
            className="grid grid-cols-3 gap-x-10 gap-y-16 sm:grid-cols-4 lg:grid-cols-5 lg:gap-x-32"
          >
            {projects.map((item) => {
              // Render placeholder items
              if ("isPlaceholder" in item && item.isPlaceholder) {
                return (
                  <div
                    key={item.id}
                    className="grid__item flex flex-col gap-y-2 opacity-0"
                  >
                    <figure className="relative aspect-[0.8/1] bg-zinc-400/20 blur-sm" />
                    <h4 className="font-plus-jakarta-sans text-xs font-semibold tracking-[-0.01em]">
                      ???
                    </h4>
                  </div>
                );
              }

              // Render actual projects
              const project = item as Project;
              return (
                <Link
                  key={project.id}
                  href={`/${project.slug}`}
                  className="grid__item group group flex flex-col gap-y-2 opacity-0"
                >
                  <figure className="relative aspect-[1.1/1.51] transition-transform duration-500 group-hover:scale-95">
                    <Image
                      src={project.slide.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      priority={projects.indexOf(project) < 15}
                    />
                  </figure>
                  <h4 className="font-plus-jakarta-sans text-xs font-semibold tracking-[-0.01em] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-95">
                    {project.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
