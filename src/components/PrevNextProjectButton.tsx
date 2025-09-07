import { Project } from "@/data/slides";
import { cn } from "@/utils/utils";

export default function PrevNextProjectButton({
  project,
  side,
}: {
  project: Project;
  side: "prev" | "next";
}) {
  return (
    <button
      className={cn(
        "flex flex-col gap-y-2",
        side === "prev" ? "items-start" : "items-end",
      )}
    >
      <h4 className="font-plus-jakarta-sans text-xs font-semibold tracking-[-0.01em]">
        {side === "prev" ? "Previous" : "Next"} Project
      </h4>
      <a
        href={`/${project.slug}`}
        className="font-eb-garamond text-xl tracking-[-0.01em] transition-colors hover:text-zinc-600"
      >
        {project.title}
      </a>
    </button>
  );
}
