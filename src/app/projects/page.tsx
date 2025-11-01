"use client";

import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getAllProjects, type Project } from "@/data/slides";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);
  const baseProjects = getAllProjects();

  const projects = useMemo((): Project[] => {
    // Create additional project entries for grid images
    const allProjects: Project[] = [];

    baseProjects.forEach((project) => {
      // Add the main project
      allProjects.push(project);

      // Add additional images as separate project entries
      project.gridImages.forEach((image, index) => {
        allProjects.push({
          ...project,
          id: `${project.id}-img${index + 1}`,
          slug: `${project.slug}`,
          title: project.title,
          subtitle: project.subtitle,
          slideImage: image,
          description: project.description,
          metadata: project.metadata,
          hero: project.hero,
          content: project.content,
          gradientScheme: project.gradientScheme,
          gridImages: project.gridImages,
        });
      });
    });

    return allProjects;
  }, [baseProjects]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Reset initialization to allow re-initialization when dependencies change
    isInitializedRef.current = false;

    let currentColumnCount: number | null = null;

    // Initial appear animation - smooth card stacking from center to grid positions
    const animateInitialAppear = () => {
      const items = grid.querySelectorAll(
        ".grid__item",
      ) as NodeListOf<HTMLElement>;
      if (items.length === 0) return;

      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      // Ensure grid container maintains its layout during animation
      gsap.set(grid, {
        position: "relative",
        overflow: "visible",
      });

      // Force scrollbar to appear and reserve its space
      const html = document.documentElement;
      gsap.set(html, {
        overflowY: "scroll",
      });

      gsap.set(items, { opacity: 0 });

      const originalPositions: Array<{
        x: number;
        y: number;
        left: number;
        top: number;
      }> = [];
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        originalPositions.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          left: rect.left,
          top: rect.top,
        });
      });

      const textElements = grid.querySelectorAll("h2, h3, h4");
      gsap.set(textElements, { opacity: 0 });

      // Get actual grid item dimensions to match exactly
      const firstItem = items[0];
      const itemRect = firstItem.getBoundingClientRect();
      const actualWidth = itemRect.width;
      const actualHeight = itemRect.height;

      // Store dimensions for consistent sizing throughout animation
      const itemDimensions = { width: actualWidth, height: actualHeight };

      // Set all items to have consistent dimensions from the start
      gsap.set(items, {
        width: itemDimensions.width,
        height: itemDimensions.height,
      });

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
                  // Show text when item reaches final position
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
    };

    const getColumnCount = (): number => {
      const styles = getComputedStyle(grid);
      const templateColumns = styles.getPropertyValue("grid-template-columns");
      return templateColumns.split(" ").filter(Boolean).length;
    };

    const init = () => {
      try {
        const items = grid.querySelectorAll(
          ".grid__item",
        ) as NodeListOf<HTMLElement>;
        if (items.length === 0) return;

        const colCount = getColumnCount();
        if (colCount === 0) return;

        currentColumnCount = colCount;

        requestAnimationFrame(() => {
          animateInitialAppear();
        });
        isInitializedRef.current = true;
      } catch {
        isInitializedRef.current = false;
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

    const initTimer = setTimeout(init, 50);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);

      isInitializedRef.current = false;
    };
  }, [projects]);

  // ! FIX MOBILE GRID
  return (
    <main className="pb-4">
      <div className="flex items-center justify-center px-4 pt-30 md:px-8 xl:px-16">
        <div
          ref={gridRef}
          className="grid w-full grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-3 sm:gap-x-16 sm:gap-y-14 md:grid-cols-4 md:gap-x-24 md:gap-y-16 lg:grid-cols-5 lg:gap-x-12 lg:gap-y-18 xl:gap-x-36 xl:gap-y-24"
        >
          {projects.map((project) => {
            const isAdditionalImage = project.id.includes("-img");

            return (
              <Link
                key={project.id}
                href={`/${project.slug}`}
                target="_top"
                className="grid__item group flex max-w-[35vw] flex-col gap-y-2 opacity-0"
              >
                <figure className="relative aspect-[1.1/1.51] max-w-[35vw] overflow-hidden bg-[#e4e4e4] transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:scale-95">
                  <Image
                    src={project.slideImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:scale-[1.0526]"
                    sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    // priority={projects.indexOf(project) < 15}
                  />
                </figure>

                <div className="group flex flex-col">
                  <h4 className="font-plus-jakarta-sans mb-1 text-[11px] font-semibold tracking-[-0.01em] transition-transform duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:-translate-y-2 group-hover:scale-95">
                    {(() => {
                      const baseProjectId = project.id.split("-img")[0];
                      const projectIndex =
                        baseProjects.findIndex((p) => p.id === baseProjectId) +
                        1;
                      return projectIndex < 10
                        ? `0${projectIndex}`
                        : `${projectIndex}`;
                    })()}
                    .
                  </h4>
                  {!isAdditionalImage && (
                    <>
                      <h2 className="font-plus-jakarta-sans text-[11px] font-semibold tracking-[-0.01em] transition-transform delay-30 duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:-translate-y-2 group-hover:scale-95">
                        {project.title}
                      </h2>
                      <h3 className="font-plus-jakarta-sans text-[9px] font-medium tracking-[-0.01em] text-zinc-500 transition-transform delay-30 duration-700 ease-[cubic-bezier(0.22,_-0.01,_0.13,_0.99)] group-hover:-translate-y-2 group-hover:scale-95">
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
