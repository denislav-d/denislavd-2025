"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// ! Fix this with different markdown structures

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ElementReveal({
  children,
  animateOnScroll = false,
  delay = 0,
  linesClass,
}: {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  linesClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement[]>([]);
  const splitRef = useRef<SplitText[]>([]);
  const lines = useRef<HTMLDivElement[]>([]);
  const mediaElements = useRef<HTMLElement[]>([]);

  const isMediaElement = (element: Element): boolean => {
    return element.tagName === "IMG" || element.tagName === "VIDEO";
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];
      mediaElements.current = [];

      let elements = [];
      if (containerRef.current.hasAttribute("data-reveal-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        if (isMediaElement(element)) {
          mediaElements.current.push(element as HTMLElement);
        } else {
          elementRef.current?.push(element as HTMLDivElement);

          const split = SplitText.create(element, {
            type: "lines",
          });

          splitRef.current?.push(split);

          split.lines.forEach((line) => {
            if (linesClass && linesClass.trim().length > 0) {
              // Apply provided classes to each created line so styles persist
              linesClass
                .trim()
                .split(/\s+/)
                .forEach((cls) => line.classList.add(cls as string));
            }
            const mask = document.createElement("div");
            mask.className = "overflow-hidden";
            // Fix the overflow issue on long letters
            mask.style.marginBottom = "-0.15em";
            mask.style.paddingBottom = "0.15em";

            line.parentNode?.insertBefore(mask, line);
            mask.appendChild(line);
          });

          lines.current.push(...(split.lines as HTMLDivElement[]));
        }
      });

      gsap.set(lines.current, {
        y: "115%",
      });

      gsap.set(mediaElements.current, {
        opacity: 0,
        scale: 0.95,
      });

      const textAnimationProps = {
        y: "0%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      const mediaAnimationProps = {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "cubic-bezier(.175,.885,.32,1.275)",
        delay: delay,
      };

      if (animateOnScroll) {
        if (lines.current.length > 0) {
          gsap.to(lines.current, {
            ...textAnimationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          });
        }

        if (mediaElements.current.length > 0) {
          gsap.to(mediaElements.current, {
            ...mediaAnimationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          });
        }
      } else {
        if (lines.current.length > 0) {
          gsap.to(lines.current, textAnimationProps);
        }
        if (mediaElements.current.length > 0) {
          gsap.to(mediaElements.current, mediaAnimationProps);
        }
      }

      return () => {
        splitRef.current?.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    },
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(
      children as React.ReactElement,
      {
        ref: containerRef,
        className: `${
          ((children as React.ReactElement).props as { className?: string })
            .className || ""
        }`.trim(),
      } as React.RefAttributes<HTMLDivElement>,
    );
  }

  return (
    <div ref={containerRef} data-reveal-wrapper="true">
      {children}
    </div>
  );
}
