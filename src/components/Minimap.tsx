import { cn } from "@/utils/utils";

interface MinimapProps {
  activeIndex: number;
  realTimePosition: number;
  totalSlides: number;
  height: number;
  isMoving: boolean;
  className?: string;
  onNavigate: (index: number) => void;
}

export default function Minimap({
  activeIndex,
  realTimePosition,
  totalSlides,
  height,
  isMoving,
  className,
  onNavigate,
}: MinimapProps) {
  const dashesPerSlide = 6;
  const totalDashes = (totalSlides - 1) * dashesPerSlide + 1;

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
      className={cn(
        "relative mr-[26rem] flex flex-col justify-between py-8",
        className,
      )}
      style={{ height: `${height + 64}px` }}
    >
      <div className="flex h-full flex-col justify-between">
        {allDashes.map((dash) => (
          <div
            key={dash.index}
            className="group relative flex cursor-pointer items-center"
          >
            <button
              onClick={() => handleProjectClick(dash.slideIndex)}
              className={cn(
                "bg-dark h-[1px] w-3 origin-left transition-all duration-500 ease-out",
                getDashScale(dash.index),
                getDashOpacity(dash.index),
                "group-hover:bg-dark/80",
              )}
            />
            {dash.isMainDash && (
              <button
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
