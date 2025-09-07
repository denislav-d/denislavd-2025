import ElementReveal from "@/components/ElementReveal";
import { Project } from "@/data/slides";

export default function ProjectMetadata({
  metadata,
}: {
  metadata: Project["metadata"];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {[
        { label: "Category", value: metadata.category },
        {
          label: "Technologies",
          value: metadata.technologies.join(", "),
        },
        { label: "Role", value: metadata.role },
        { label: "Year", value: metadata.year },
      ].map((item, index) => (
        <ElementReveal key={index} animateOnScroll>
          <ul>
            <li>
              <h4 className="font-plus-jakarta-sans text-xs font-semibold tracking-[-0.01em] text-zinc-500">
                {item.label}
              </h4>
              <p className="font-eb-garamond text-lg tracking-[-0.01em]">
                {item.value}
              </p>
            </li>
          </ul>
        </ElementReveal>
      ))}
    </div>
  );
}
