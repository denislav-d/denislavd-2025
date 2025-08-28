"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextReveal({
  children,
  animateOnScroll = true,
  delay = 0,
}: {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement[]>([]);
  const splitRef = useRef<SplitText[]>([]);
  const lines = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRef.current?.push(element as HTMLDivElement);

        const split = SplitText.create(element, {
          type: "lines",
        });

        splitRef.current?.push(split);

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          }
          (element as HTMLElement).style.textIndent = "0";
        }

        split.lines.forEach((line) => {
          const mask = document.createElement("div");
          mask.className = "overflow-hidden";

          line.parentNode?.insertBefore(mask, line);
          mask.appendChild(line);
        });

        lines.current.push(...(split.lines as HTMLDivElement[]));
      });

      gsap.set(lines.current, {
        y: "100%",
      });

      const animationProps = {
        y: "0%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
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
        className:
          `${((children as React.ReactElement).props as { className?: string }).className || ""} overflow-hidden`.trim(),
      } as React.RefAttributes<HTMLDivElement>,
    );
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
