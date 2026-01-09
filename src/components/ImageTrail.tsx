"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
import { cn } from "@/utils/utils";

gsap.registerPlugin(CustomEase);

CustomEase.create("smoothIn", "0.25, 0.46, 0.45, 0.94");
CustomEase.create("smoothOut", "0.55, 0.06, 0.68, 0.19");
CustomEase.create("bounceIn", "0.68, -0.55, 0.265, 1.55");
CustomEase.create("elasticOut", "0.175, 0.885, 0.32, 1.275");

interface ImageTrailProps {
  children: React.ReactNode;
  images: string[];
  className?: string;
}

export default function ImageTrail({
  children,
  images,
  className,
}: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const currentImageIndexRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastImageTimeRef = useRef(0);

  const movementThreshold = 20;
  const delayBetween = 45;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isHovering) return;

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const now = Date.now();
      if (
        distance < movementThreshold ||
        now - lastImageTimeRef.current < delayBetween
      ) {
        return;
      }

      const gallery = document.querySelector(".image-gallery");
      if (!gallery) return;

      const galleryImages = gallery.querySelectorAll(".image-item");
      const currentImage = galleryImages[
        currentImageIndexRef.current
      ] as HTMLImageElement;

      if (!currentImage) return;

      const clonedImage = currentImage.cloneNode(true) as HTMLImageElement;
      clonedImage.style.cssText = `
         width: 120px;
         height: 160px;
         object-fit: cover;
         position: fixed;
         pointer-events: none;
         left: ${e.clientX - 60}px;
         top: ${e.clientY - 80}px;
         z-index: 9999;
         opacity: 0;
         transform-origin: center;
         image-rendering: -webkit-optimize-contrast;
         image-rendering: crisp-edges;
       `;

      document.body.appendChild(clonedImage);

      currentImageIndexRef.current =
        (currentImageIndexRef.current + 1) % galleryImages.length;

      gsap.fromTo(
        clonedImage,
        {
          scale: 0.8,
          opacity: 0,
          rotation: gsap.utils.random(-5, 5),
          y: 10,
          x: gsap.utils.random(-5, 5),
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.1,
          ease: "power2.out",
        },
      );

      gsap.to(clonedImage, {
        scale: 0.4,
        opacity: 0,
        y: -20,
        rotation: gsap.utils.random(-3, 3),
        duration: 1.2,
        delay: 0.2,
        ease: "smoothOut",
        onComplete: () => clonedImage.remove(),
      });

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      lastImageTimeRef.current = now;
    },
    [isHovering, movementThreshold, delayBetween],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <section ref={containerRef} className={cn("relative", className)}>
      {children}

      <div className="image-gallery hidden">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Trail image ${index + 1}`}
            width={240}
            height={320}
            priority={false}
            className="image-item h-40 w-[120px] object-cover"
          />
        ))}
      </div>
    </section>
  );
}
