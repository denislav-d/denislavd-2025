"use client";

import { cn } from "@/utils/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MinimapProps {
  activeIndex: number;
  realTimePosition: number;
  totalSlides: number;
  isMoving: boolean;
  className?: string;
  onNavigate: (index: number) => void;
  style?: React.CSSProperties;
}

export default function Minimap({
  activeIndex,
  realTimePosition,
  totalSlides,
  isMoving,
  className,
  onNavigate,
  style,
}: MinimapProps) {
  const minimapRef = useRef<HTMLElement>(null);
  const dashesPerSlide = 6;
  const totalDashes = (totalSlides - 1) * dashesPerSlide + 1;

  useEffect(() => {
    if (!minimapRef.current) return;

    const dashes = minimapRef.current.querySelectorAll("[data-dash]");
    const numbers = minimapRef.current.querySelectorAll("[data-number]");

    gsap.set(dashes, { opacity: 0 });
    gsap.set(numbers, {
      opacity: 0,
      transform: "scale(0)",
      transition: "none",
    });

    gsap.to(minimapRef.current, {
      opacity: 1,
      duration: 0.3,
      delay: 0.6,
      ease: "power2.out",
    });

    gsap.to(dashes, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      delay: 1,
      onComplete: () => {
        // Restore CSS transitions after animation completes
        gsap.set(dashes, {
          clearProps: "opacity",
        });
      },
    });

    gsap.to(numbers, {
      opacity: 1,
      transform: "scale(1)",
      duration: 0.5,
      stagger: 0.15,
      ease: "back.out(1.7)",
      delay: 1.4,
      onComplete: () => {
        // Restore CSS transitions after animation completes
        gsap.set(numbers, {
          transition: "all 500ms ease-out",
          clearProps: "transform, opacity",
        });
      },
    });
  }, []);

  const allDashes = Array.from({ length: totalDashes }, (_, i) => {
    const slidePosition = i / dashesPerSlide;
    const slideIndex = Math.floor(slidePosition);
    const dashIndexInSlide = i % dashesPerSlide;
    const isMainDash = dashIndexInSlide === 0 && slideIndex < totalSlides;

    return {
      index: i,
      slideIndex,
      dashIndexInSlide,
      isMainDash,
      slidePosition,
      label: isMainDash ? String(slideIndex + 1).padStart(2, "0") : null,
    };
  });

  const getDashScale = (dashIndex: number) => {
    const dashPosition = dashIndex / dashesPerSlide;
    const distance = Math.abs(realTimePosition - dashPosition);

    // When slider is snapped/stable, only show the exact slide dash at full scale
    if (!isMoving) {
      const currentSlideDashIndex = activeIndex * dashesPerSlide;
      return dashIndex === currentSlideDashIndex ? "scale-x-75" : "scale-x-25";
    }

    if (distance === 0) return "scale-x-90";
    if (distance <= 0.2) return "scale-x-80";
    if (distance <= 0.5) return "scale-x-65";
    if (distance <= 1) return "scale-x-50";
    if (distance <= 1.5) return "scale-x-35";
    return "scale-x-25";
  };

  const getDashOpacity = (dashIndex: number) => {
    const dashPosition = dashIndex / dashesPerSlide;
    const distance = Math.abs(realTimePosition - dashPosition);

    // When slider is snapped/stable, only show the exact slide dash with full opacity
    if (!isMoving) {
      const currentSlideDashIndex = activeIndex * dashesPerSlide;
      return dashIndex === currentSlideDashIndex ? "opacity-100" : "opacity-40";
    }

    if (distance === 0) return "opacity-100";
    if (distance <= 0.5) return "opacity-90";
    if (distance <= 1) return "opacity-80";
    return "opacity-40";
  };

  const handleProjectClick = (slideIndex: number) => {
    if (slideIndex < totalSlides) {
      onNavigate(slideIndex);
    }
  };

  return (
    <nav
      ref={minimapRef}
      className={cn(
        "absolute flex flex-col justify-between opacity-0",
        className,
      )}
      style={style}
    >
      <div className="flex h-full flex-col justify-between">
        {allDashes.map((dash) => (
          <div
            key={dash.index}
            className="group relative flex cursor-pointer items-center"
          >
            <button
              data-dash
              aria-label="Slider minimap dash"
              onClick={() => handleProjectClick(dash.slideIndex)}
              className={cn(
                "bg-dark h-[1px] w-3 origin-left cursor-default transition-all duration-500 ease-out",
                getDashScale(dash.index),
                getDashOpacity(dash.index),
                "group-hover:bg-dark/80",
              )}
            />
            {dash.isMainDash && (
              <button
                data-number
                aria-label={`Navigate to slide ${dash.label}`}
                onClick={() => handleProjectClick(dash.slideIndex)}
                className={cn(
                  "absolute left-8 cursor-pointer font-mono text-[10px] transition-all duration-500 select-none hover:scale-110",
                  // When snapped, only current active slide number has full opacity; when moving, use proximity
                  !isMoving
                    ? dash.slideIndex === activeIndex
                      ? "text-dark/90 opacity-100"
                      : "text-dark/50 opacity-70 hover:opacity-90"
                    : Math.abs(realTimePosition - dash.slideIndex) <= 1
                      ? "text-dark/90 opacity-100"
                      : "text-dark/50 opacity-70 hover:opacity-90",
                )}
              >
                {dash.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
