"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getAllProjects, type Project } from "@/data/slides";

gsap.registerPlugin(ScrollTrigger);

interface ItemPosition {
  x: number;
  y: number;
  left: number;
  top: number;
}

interface ItemDimensions {
  width: number;
  height: number;
}

function getColumnCount(grid: HTMLElement): number {
  const styles = getComputedStyle(grid);
  const templateColumns = styles.getPropertyValue("grid-template-columns");
  return templateColumns.split(" ").filter(Boolean).length;
}

function formatProjectIndex(index: number): string {
  return index < 10 ? `0${index}` : `${index}`;
}

function expandProjectsWithGridImages(baseProjects: Project[]): Project[] {
  return baseProjects.flatMap((project) => [
    project,
    ...project.gridImages.map((image, index) => ({
      ...project,
      id: `${project.id}-img${index + 1}`,
      slideImage: image,
    })),
  ]);
}

export default function Projects() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);
  const currentColumnCountRef = useRef<number | null>(null);

  const baseProjects = getAllProjects();
  const projects = useMemo(
    () => expandProjectsWithGridImages(baseProjects),
    [baseProjects],
  );

  const animateInitialAppear = useCallback(
    (grid: HTMLElement, items: NodeListOf<HTMLElement>) => {
      if (items.length === 0) return;

      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      gsap.set(grid, { position: "relative", overflow: "visible" });
      gsap.set(document.documentElement, { overflowY: "scroll" });
      gsap.set(items, { opacity: 0 });

      const originalPositions: ItemPosition[] = Array.from(items).map(
        (item) => {
          const rect = item.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            left: rect.left,
            top: rect.top,
          };
        },
      );

      const textElements = grid.querySelectorAll("h2, h3, h4");
      gsap.set(textElements, { opacity: 0 });

      const itemRect = items[0].getBoundingClientRect();
      const itemDimensions: ItemDimensions = {
        width: itemRect.width,
        height: itemRect.height,
      };

      gsap.set(items, {
        position: "fixed",
        left: screenCenterX,
        top: screenCenterY,
        xPercent: -50,
        yPercent: -50,
        width: itemDimensions.width,
        height: itemDimensions.height,
        scale: 0,
        opacity: 1,
        zIndex: (index) => index + 1,
        rotation: 0,
        transformOrigin: "center center",
      });

      gsap.to(items, {
        scale: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.2,
        onComplete: () => {
          setTimeout(() => {
            items.forEach((item, index) => {
              const targetX = originalPositions[index].x - screenCenterX;
              const targetY = originalPositions[index].y - screenCenterY;

              gsap.to(item, {
                x: targetX,
                y: targetY,
                scale: 1,
                rotation: 0,
                duration: 0.9,
                ease: "power3.inOut",
                delay: index * 0.02,
                onComplete: () => {
                  const itemText = item.querySelectorAll("h2, h3, h4");
                  gsap.to(itemText, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                    delay: 0.05,
                  });

                  gsap.delayedCall(0.5, () => {
                    gsap.set(item, {
                      position: "static",
                      left: "auto",
                      top: "auto",
                      x: 0,
                      y: 0,
                      xPercent: 0,
                      yPercent: 0,
                      width: itemDimensions.width,
                      height: itemDimensions.height,
                    });
                  });
                },
              });
            });
          }, 100);
        },
      });
    },
    [],
  );

  const initializeGrid = useCallback(() => {
    const grid = gridRef.current;
    if (!grid || isInitializedRef.current) return;

    const items = grid.querySelectorAll(
      ".grid__item",
    ) as NodeListOf<HTMLElement>;
    if (items.length === 0) return;

    const colCount = getColumnCount(grid);
    if (colCount === 0) return;

    currentColumnCountRef.current = colCount;

    requestAnimationFrame(() => {
      animateInitialAppear(grid, items);
    });

    isInitializedRef.current = true;
  }, [animateInitialAppear]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    isInitializedRef.current = false;

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      if (!isInitializedRef.current) return;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newColumnCount = getColumnCount(grid);
        if (
          newColumnCount !== currentColumnCountRef.current &&
          newColumnCount > 0
        ) {
          isInitializedRef.current = false;
          initializeGrid();
        }
      }, 100);
    };

    const initTimer = setTimeout(initializeGrid, 50);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      isInitializedRef.current = false;
    };
  }, [projects, initializeGrid]);

  const getProjectDisplayIndex = useCallback(
    (projectId: string): string => {
      const baseProjectId = projectId.split("-img")[0];
      const projectIndex =
        baseProjects.findIndex((p) => p.id === baseProjectId) + 1;
      return formatProjectIndex(projectIndex);
    },
    [baseProjects],
  );

  return (
    <main className="pb-4">
      <div className="flex items-center justify-center px-4 pt-30 md:px-8 xl:px-16">
        <div
          ref={gridRef}
          className="grid w-full grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-3 sm:gap-x-16 sm:gap-y-14 md:grid-cols-4 md:gap-x-24 md:gap-y-16 lg:grid-cols-5 lg:gap-x-12 lg:gap-y-18 xl:gap-x-36 xl:gap-y-24"
        >
          {projects.map((project) => {
            const isAdditionalImage = project.id.includes("-img");
            const displayIndex = getProjectDisplayIndex(project.id);

            return (
              <Link
                key={project.id}
                href={`/${project.slug}`}
                target="_top"
                className="grid__item group flex max-w-[35vw] flex-col gap-y-2 opacity-0"
              >
                <figure className="bg-card-background relative aspect-[1.1/1.51] max-w-[35vw] overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] will-change-transform [backface-visibility:hidden] group-hover:scale-95">
                  <Image
                    src={project.slideImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] will-change-transform [backface-visibility:hidden] group-hover:scale-[1.0526]"
                    sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    // priority={projects.indexOf(project) < 15}
                  />
                </figure>

                <div className="group flex flex-col">
                  <h4 className="font-plus-jakarta-sans mb-1 text-[11px] font-semibold tracking-[-0.01em] transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:-translate-y-1 group-hover:scale-95">
                    {displayIndex}.
                  </h4>
                  {!isAdditionalImage && (
                    <>
                      <h2 className="font-plus-jakarta-sans text-[11px] font-semibold tracking-[-0.01em] transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:-translate-y-2 group-hover:scale-95">
                        {project.title}
                      </h2>
                      <h3 className="font-plus-jakarta-sans text-[9px] font-medium tracking-[-0.01em] text-zinc-500 transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:-translate-y-2 group-hover:scale-95">
                        {project.subtitle}
                      </h3>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
