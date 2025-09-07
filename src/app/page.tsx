"use client";

import { useEffect, useRef, useState } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  LinearFilter,
  DoubleSide,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
} from "three";
import { vertexShaderSlider, fragmentShaderSlider } from "@/utils/shaders";
import Minimap from "@/components/Minimap";
import Link from "next/link";
import { slides } from "@/data/slides";
import { getInterpolatedGradient } from "@/utils/gradients";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("text", "0.5, 1, 0.89, 1");

// ! TODO: fix links if early click
// ! TODO: pixels between images in the slider

export default function Slider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectTitleRef = useRef<HTMLHeadingElement>(null);
  const projectSubtitleRef = useRef<HTMLHeadingElement>(null);
  const projectLinkRef = useRef<HTMLAnchorElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [realTimePosition, setRealTimePosition] = useState(0);
  const lastRealTimePositionRef = useRef(0);
  const navigationFunctionRef = useRef<((index: number) => void) | null>(null);
  const [planeDimensions, setPlaneDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [touchMoved, setTouchMoved] = useState(false);
  const [isSliderMoving, setIsSliderMoving] = useState(false);
  const [currentGradient, setCurrentGradient] = useState({
    from: slides[0].gradientScheme.from,
    via: slides[0].gradientScheme.via,
    to: slides[0].gradientScheme.to,
  });
  const sceneRef = useRef<{
    scene?: Scene;
    camera?: PerspectiveCamera;
    renderer?: WebGLRenderer;
    animationId?: number;
    cleanup?: () => void;
  }>({});

  useEffect(() => {
    if (
      !containerRef.current ||
      !projectTitleRef.current ||
      !projectSubtitleRef.current ||
      !projectLinkRef.current
    )
      return;

    const container = containerRef.current;
    const projectTitle = projectTitleRef.current;
    const projectSubtitle = projectSubtitleRef.current;
    const projectLink = projectLinkRef.current;

    // Initialize project title, subtitle and link
    projectTitle.textContent = slides[0].title;
    projectSubtitle.textContent = slides[0].subtitle;
    projectLink.href = slides[0].url;

    // WebGL state variables
    let scrollIntensity = 0;
    let targetScrollIntensity = 0;
    const maxScrollIntensity = 1.0;
    const scrollSmoothness = 0.5;

    let scrollPosition = 0;
    let targetScrollPosition = 0;
    const scrollPositionSmoothness = 0.06;

    let isMoving = false;
    const movementThreshold = 0.005;
    let isSnapping = false;
    let lastInteractionTime = 0;

    let stableCurrentIndex = 0;
    let stableNextIndex = 1;
    let isStable = false;

    let titleHidden = false;
    let titleAnimating = false;
    let currentProjectIndex = 0;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    sceneRef.current = { scene, camera, renderer };

    const calculatePlaneDimensions = () => {
      const fov = camera.fov * (Math.PI / 180);
      const viewportHeight = 1.5 * Math.tan(fov / 2) * camera.position.z;
      const viewportWidth = viewportHeight * camera.aspect;

      // Responsive scaling
      let widthFactor;
      if (window.innerWidth < 400) {
        widthFactor = 0.8;
      } else if (window.innerWidth < 600) {
        widthFactor = 0.7;
      } else if (window.innerWidth < 900) {
        widthFactor = 0.5;
      } else if (window.innerWidth < 1024) {
        widthFactor = 0.4;
      } else if (window.innerWidth < 1200) {
        widthFactor = 0.35;
      } else {
        widthFactor = 0.3;
      }

      const planeWidth = viewportWidth * widthFactor;
      const planeHeight = planeWidth * (330 / 230);

      // Convert 3D world coordinates to screen pixels
      // Use correct viewport calculation for accurate coordinate conversion
      const correctViewportHeight = 2 * Math.tan(fov / 2) * camera.position.z;
      const correctViewportWidth = correctViewportHeight * camera.aspect;
      const screenWidth =
        (planeWidth / correctViewportWidth) * window.innerWidth;
      const screenHeight =
        (planeHeight / correctViewportHeight) * window.innerHeight;

      // Update state for CSS anchor positioning
      setPlaneDimensions({ width: screenWidth, height: screenHeight });

      return {
        width: planeWidth,
        height: planeHeight,
        screenWidth,
        screenHeight,
      };
    };

    const dimensions = calculatePlaneDimensions();

    const loadTextures = () => {
      const textureLoader = new TextureLoader();

      return slides.map((slide) => {
        const texture = textureLoader.load(
          slide.image,
          undefined,
          undefined,
          () => {
            console.log("using fallback for", slide.image);
          },
        );

        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        return texture;
      });
    };

    const textures = loadTextures();

    function preloadAllTextures() {
      textures.forEach((texture) => {
        texture.needsUpdate = true;
      });
    }

    preloadAllTextures();

    const geometry = new PlaneGeometry(
      dimensions.width,
      dimensions.height,
      32,
      32,
    );

    const material = new ShaderMaterial({
      vertexShader: vertexShaderSlider,
      fragmentShader: fragmentShaderSlider,
      side: DoubleSide,
      uniforms: {
        uScrollIntensity: { value: scrollIntensity },
        uScrollPosition: { value: scrollPosition },
        uCurrentTexture: { value: textures[0] },
        uNextTexture: { value: textures[1] },
      },
    });

    const plane = new Mesh(geometry, material);
    scene.add(plane);

    gsap.set(container, {
      clipPath: "polygon(40% 35%, 60% 35%, 60% 65%, 40% 65%)",
      scale: 0.4,
    });

    gsap.set([projectTitle, projectSubtitle], {
      y: 100,
    });

    gsap.to(container, {
      scale: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.4,
      ease: "hop",
    });

    gsap.to(projectTitle, {
      y: 0,
      duration: 1,
      delay: 0.8,
      ease: "text",
      opacity: 1,
    });

    gsap.to(projectSubtitle, {
      y: 0,
      duration: 1,
      delay: 0.9,
      opacity: 1,
      ease: "text",
    });

    function determineTextureIndices(position: number) {
      const totalImages = slides.length;

      // Clamp position to valid range
      const clampedPosition = Math.max(0, Math.min(totalImages - 1, position));

      const baseIndex = Math.floor(clampedPosition);
      const nextIndex = Math.min(baseIndex + 1, totalImages - 1);

      // Calculate normalized position within current slide transition
      const normalizedPosition = clampedPosition - baseIndex;

      return {
        currentIndex: baseIndex,
        nextIndex: nextIndex,
        normalizedPosition: normalizedPosition,
      };
    }

    function updateTextureIndices() {
      if (isStable) {
        material.uniforms.uCurrentTexture.value = textures[stableCurrentIndex];
        material.uniforms.uNextTexture.value = textures[stableNextIndex];
        return;
      }

      const indices = determineTextureIndices(scrollPosition);

      material.uniforms.uCurrentTexture.value = textures[indices.currentIndex];
      material.uniforms.uNextTexture.value = textures[indices.nextIndex];
    }

    function snapToNearestImage() {
      const now = Date.now();
      // Prevent rapid snap calls and ensure minimum time between snaps
      if (!isSnapping && now - lastInteractionTime > 100) {
        isSnapping = true;
        const roundedPosition = Math.max(
          0,
          Math.min(slides.length - 1, Math.round(scrollPosition)),
        );
        targetScrollPosition = roundedPosition;

        const indices = determineTextureIndices(roundedPosition);
        stableCurrentIndex = indices.currentIndex;
        stableNextIndex = indices.nextIndex;

        currentProjectIndex = indices.currentIndex;
        setCurrentSlideIndex(indices.currentIndex);

        showTitle();
      }
    }

    function navigateToSlide(targetIndex: number) {
      if (targetIndex >= 0 && targetIndex < slides.length) {
        // Track interaction time
        lastInteractionTime = Date.now();

        const currentPos = scrollPosition;
        const distance = targetIndex - currentPos;
        const direction = distance > 0 ? 1 : -1;

        const intensityMultiplier = Math.min(Math.abs(distance) * 0.3, 0.8);
        targetScrollIntensity += direction * intensityMultiplier;

        // Clamp intensity to maximum values
        targetScrollIntensity = Math.max(
          -maxScrollIntensity,
          Math.min(maxScrollIntensity, targetScrollIntensity),
        );

        targetScrollPosition = targetIndex;
        isSnapping = false;
        isStable = false;
        isMoving = true;
        hideTitle();
      }
    }

    // Store navigation function in ref for external access
    navigationFunctionRef.current = navigateToSlide;

    function hideTitle() {
      if (!titleHidden && !titleAnimating) {
        titleAnimating = true;

        gsap.killTweensOf([projectTitle, projectSubtitle]);

        gsap.to([projectTitle, projectSubtitle], {
          y: 100,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            titleAnimating = false;
            titleHidden = true;
          },
        });
      }
    }

    function showTitle() {
      if (titleHidden && !titleAnimating) {
        projectTitle.textContent = slides[currentProjectIndex].title;
        projectSubtitle.textContent = slides[currentProjectIndex].subtitle;
        projectLink.href = slides[currentProjectIndex].url;

        titleAnimating = true;

        gsap.killTweensOf([projectTitle, projectSubtitle]);

        gsap.set([projectTitle, projectSubtitle], {
          y: 100,
        });

        gsap.to(projectTitle, {
          y: 0,
          duration: 0.7,
          ease: "text",
        });

        gsap.to(projectSubtitle, {
          y: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "text",
          onComplete: () => {
            titleAnimating = false;
            titleHidden = false;
          },
        });
      }
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const newDimensions = calculatePlaneDimensions();
      plane.geometry.dispose();
      plane.geometry = new PlaneGeometry(
        newDimensions.width,
        newDimensions.height,
        32,
        32,
      );
    };

    // Touch and mouse handling for mobile and desktop
    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;
    let lastTouchY = 0;
    let isTouching = false;
    let isDragging = false;

    // Mouse handling for desktop
    let mouseStartY = 0;
    let mouseStartX = 0;
    let mouseStartTime = 0;
    let lastMouseY = 0;
    let isMouseDown = false;
    let isMouseDragging = false;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartY = touch.clientY;
      touchStartX = touch.clientX;
      lastTouchY = touch.clientY;
      touchStartTime = Date.now();
      lastInteractionTime = touchStartTime;
      isTouching = true;
      isDragging = false;
      setTouchMoved(false);

      isSnapping = false;
      isStable = false;
      isMoving = true;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isTouching) return;

      const touch = event.touches[0];
      const deltaY = touch.clientY - lastTouchY;
      const totalDeltaY = Math.abs(touch.clientY - touchStartY);
      const totalDeltaX = Math.abs(touch.clientX - touchStartX);

      // Determine if this is a drag gesture (movement > 10px)
      if (totalDeltaY > 10 || totalDeltaX > 10) {
        setTouchMoved(true);
        isDragging = true;
        event.preventDefault();
        hideTitle();
      }

      if (isDragging) {
        lastTouchY = touch.clientY;

        // Convert touch movement to scroll values
        const touchSensitivity = 0.005;
        targetScrollIntensity += -deltaY * touchSensitivity;
        targetScrollIntensity = Math.max(
          -maxScrollIntensity,
          Math.min(maxScrollIntensity, targetScrollIntensity),
        );

        targetScrollPosition += -deltaY * touchSensitivity;
        // Clamp scroll position to carousel boundaries
        targetScrollPosition = Math.max(
          0,
          Math.min(slides.length - 1, targetScrollPosition),
        );
        isMoving = true;

        // Ensure responsive updates during dragging
        isStable = false;
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      isDragging = false;

      // Ensure animation continues after touch ends on mobile
      if (!sceneRef.current.animationId) {
        animate();
      }

      setTimeout(() => {
        setTouchMoved(false);
      }, 50);
    };

    const handleMouseDown = (event: MouseEvent) => {
      mouseStartY = event.clientY;
      mouseStartX = event.clientX;
      lastMouseY = event.clientY;
      mouseStartTime = Date.now();
      lastInteractionTime = mouseStartTime;
      isMouseDown = true;
      isMouseDragging = false;
      setTouchMoved(false);

      isSnapping = false;
      isStable = false;
      isMoving = true;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaY = event.clientY - lastMouseY;
      const totalDeltaY = Math.abs(event.clientY - mouseStartY);
      const totalDeltaX = Math.abs(event.clientX - mouseStartX);

      // Determine if this is a drag gesture (movement > 10px)
      if (totalDeltaY > 10 || totalDeltaX > 10) {
        setTouchMoved(true);
        isMouseDragging = true;
        event.preventDefault();
        hideTitle();
      }

      if (isMouseDragging) {
        lastMouseY = event.clientY;

        // Convert mouse movement to scroll values (same sensitivity as touch)
        const mouseSensitivity = 0.005;
        targetScrollIntensity += -deltaY * mouseSensitivity;
        targetScrollIntensity = Math.max(
          -maxScrollIntensity,
          Math.min(maxScrollIntensity, targetScrollIntensity),
        );

        targetScrollPosition += -deltaY * mouseSensitivity;
        // Clamp scroll position to carousel boundaries
        targetScrollPosition = Math.max(
          0,
          Math.min(slides.length - 1, targetScrollPosition),
        );
        isMoving = true;

        isStable = false;
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      isMouseDragging = false;

      // Ensure animation continues after mouse ends
      if (!sceneRef.current.animationId) {
        animate();
      }

      setTimeout(() => {
        setTouchMoved(false);
      }, 50);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      isSnapping = false;
      isStable = false;

      hideTitle();

      targetScrollIntensity += event.deltaY * 0.001;
      targetScrollIntensity = Math.max(
        -maxScrollIntensity,
        Math.min(maxScrollIntensity, targetScrollIntensity),
      );

      targetScrollPosition += event.deltaY * 0.001;
      // Clamp scroll position to carousel boundaries
      targetScrollPosition = Math.max(
        0,
        Math.min(slides.length - 1, targetScrollPosition),
      );

      isMoving = true;
    };

    function animate() {
      scrollIntensity +=
        (targetScrollIntensity - scrollIntensity) * scrollSmoothness;
      material.uniforms.uScrollIntensity.value = scrollIntensity;

      scrollPosition +=
        (targetScrollPosition - scrollPosition) * scrollPositionSmoothness;

      // Clamp scroll position to carousel boundaries
      scrollPosition = Math.max(0, Math.min(slides.length - 1, scrollPosition));

      const clampedScrollPosition = scrollPosition;

      // Only update state if position changed significantly
      if (
        Math.abs(clampedScrollPosition - lastRealTimePositionRef.current) > 0.01
      ) {
        setRealTimePosition(clampedScrollPosition);
        lastRealTimePositionRef.current = clampedScrollPosition;
      }

      // Update moving state for minimap
      setIsSliderMoving(isMoving);

      // Calculate normalized position for shader (position within current slide transition)
      const indices = determineTextureIndices(scrollPosition);

      if (isStable) {
        material.uniforms.uScrollPosition.value = 0;
      } else {
        material.uniforms.uScrollPosition.value = indices.normalizedPosition;
      }

      // Always update texture indices during movement, ignore stable state during touch/mouse interactions
      if (
        isTouching ||
        isDragging ||
        isMouseDown ||
        isMouseDragging ||
        isMoving
      ) {
        // Force real-time texture updates during touch/mouse interactions
        material.uniforms.uCurrentTexture.value =
          textures[indices.currentIndex];
        material.uniforms.uNextTexture.value = textures[indices.nextIndex];
      } else {
        updateTextureIndices();
      }

      const baseScale = 1.0;
      const scaleIntensity = 0.1;

      if (scrollIntensity > 0) {
        const scale = baseScale + scrollIntensity * scaleIntensity;
        plane.scale.set(scale, scale, 1);
      } else {
        const scale = baseScale - Math.abs(scrollIntensity) * scaleIntensity;
        plane.scale.set(scale, scale, 1);
      }

      targetScrollIntensity *= 0.98;

      const scrollDelta = Math.abs(targetScrollPosition - scrollPosition);

      if (scrollDelta < movementThreshold) {
        if (isMoving && !isSnapping) {
          snapToNearestImage();
        }

        if (scrollDelta < 0.001) {
          if (!isStable) {
            isStable = true;
            scrollPosition = Math.round(scrollPosition);
            targetScrollPosition = scrollPosition;
          }

          isMoving = false;
          isSnapping = false;
        }
      }

      // Fallback: ensure text appears at boundaries or when movement stops
      if (!isMoving && titleHidden && !titleAnimating) {
        const clampedPosition = Math.max(
          0,
          Math.min(slides.length - 1, scrollPosition),
        );
        const roundedPosition = Math.round(clampedPosition);

        // Force show text if we're at boundaries or stable position
        if (
          clampedPosition <= 0.1 ||
          clampedPosition >= slides.length - 1.1 ||
          Math.abs(clampedPosition - roundedPosition) < 0.1
        ) {
          const indices = determineTextureIndices(roundedPosition);
          currentProjectIndex = indices.currentIndex;
          setCurrentSlideIndex(indices.currentIndex);
          showTitle();
        }
      }

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Touch events for mobile - attach to document to capture events even when starting on link overlay
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd);

    // Mouse events for desktop - attach to document to capture events even when starting on link overlay
    document.addEventListener("mousedown", handleMouseDown, {
      passive: false,
    });
    document.addEventListener("mousemove", handleMouseMove, {
      passive: false,
    });
    document.addEventListener("mouseup", handleMouseUp);

    sceneRef.current.cleanup = () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);

      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      geometry.dispose();
      material.dispose();
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return sceneRef.current.cleanup;
  }, []);

  useEffect(() => {
    const interpolatedGradient = getInterpolatedGradient(
      realTimePosition,
      slides.map((slide) => slide.gradientScheme),
    );
    setCurrentGradient(interpolatedGradient);
  }, [realTimePosition]);

  const handleNavigateToSlide = (index: number) => {
    if (navigationFunctionRef.current) {
      navigationFunctionRef.current(index);
    }
  };

  return (
    <div
      className="slider-page relative grid max-h-dvh min-h-dvh w-screen overflow-hidden transition-all duration-300 ease-out"
      style={{
        background: `linear-gradient(to bottom, ${currentGradient.from} 75%, ${currentGradient.via} 90%, ${currentGradient.to} 100%)`,
      }}
    >
      <section className="grid-area relative flex w-full items-center justify-center">
        <div
          id="container"
          ref={containerRef}
          className="relative size-full max-sm:-ml-16"
        />

        <Minimap
          activeIndex={currentSlideIndex}
          realTimePosition={realTimePosition}
          totalSlides={slides.length}
          onNavigate={handleNavigateToSlide}
          isMoving={isSliderMoving}
          className="max-sm:-ml-8"
          style={{
            height: `${planeDimensions.height}px`,
            top: `calc(50% - ${planeDimensions.height / 2}px)`,
            left: `calc(50% + ${planeDimensions.width / 2}px + 40px)`,
          }}
        />
      </section>

      <section
        className="pointer-events-none absolute flex flex-col justify-start max-sm:-ml-8"
        style={{
          top: `calc(50% + ${planeDimensions.height / 2}px + 10px)`,
          left: `calc(50% - ${planeDimensions.width / 2}px)`,
          width: `${planeDimensions.width}px`,
        }}
      >
        <div className="overflow-hidden">
          <h2
            id="project-title"
            ref={projectTitleRef}
            className="text-light font-plus-jakarta-sans relative text-sm font-semibold tracking-[-0.03em] opacity-0 mix-blend-difference will-change-transform backface-hidden"
          ></h2>
        </div>
        <div className="mt-0.5 overflow-hidden">
          <h3
            ref={projectSubtitleRef}
            className="font-plus-jakarta-sans relative text-xs font-medium tracking-[-0.01em] text-zinc-500 opacity-0"
          ></h3>
        </div>
      </section>

      <Link
        id="project-link"
        ref={projectLinkRef}
        href={slides[currentSlideIndex].url}
        draggable={false}
        aria-label="Open project"
        className="pointer-events-auto absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center select-none [user-drag:none]"
        style={{
          width: `${planeDimensions.width}px`,
          height: `${planeDimensions.height}px`,
        }}
        onClick={(e) => {
          // Prevent navigation if user was dragging
          if (touchMoved) {
            e.preventDefault();
            return false;
          }
        }}
      ></Link>
    </div>
  );
}
