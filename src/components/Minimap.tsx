import { cn } from "@/utils/utils";

interface MinimapProps {
  activeIndex: number;
  realTimePosition: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  className?: string;
}

export default function Minimap({
  activeIndex,
  realTimePosition,
  totalSlides,
  onNavigate,
  className,
}: MinimapProps) {
  const indicatorY = realTimePosition * 16;

  const projects = Array.from({ length: totalSlides }, (_, i) => ({
    name: i + 1,
    index: i,
  }));

  const getItemOpacity = (itemIndex: number) => {
    const indicatorCenter = indicatorY + 8;
    const itemCenter = itemIndex * 16 + 5;
    const distance = Math.abs(indicatorCenter - itemCenter);

    return distance < 12 ? "opacity-75" : "opacity-20";
  };

  const handleProjectClick = (projectIndex: number) => {
    if (projectIndex !== activeIndex) {
      onNavigate(projectIndex);
    }
  };

  return (
    <nav className={cn("relative", className)}>
      <ul className="flex flex-col gap-y-1.5">
        {projects.map((project, index) => (
          <li key={project.name} className="group w-3.5 cursor-pointer">
            <button
              onClick={() => handleProjectClick(project.index)}
              className={cn(
                "block h-2.5 w-full cursor-pointer rounded-xs border transition-opacity duration-300 group-hover:opacity-75",
                getItemOpacity(index),
              )}
            />
          </li>
        ))}
      </ul>
      <div
        className="absolute -top-1 -left-2 rounded-xs border px-3.5 py-2 opacity-75"
        style={{
          transform: `translate3d(0, ${indicatorY}px, 0)`,
        }}
      />
    </nav>
  );
}
