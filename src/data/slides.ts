import { GradientScheme } from "@/utils/gradients";

interface Slide {
  image: string;
  url: string;
  title: string;
  subtitle: string;
  gradientScheme: GradientScheme;
}

export const slides: Slide[] = [
  {
    image: "/images/ddw.png",
    url: "/dutch-design-week-2025",
    title: "Dutch Design Week 2025",
    subtitle: "Virtual Hugs",
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgba(251, 146, 60, 0.3)",
      to: "rgba(236, 72, 153, 0.3)",
    },
  },
  {
    image: "/images/detaile.png",
    url: "/detaile",
    title: "Detaile",
    subtitle: "Perfect Outfits",
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgb(228, 228, 231)",
      to: "rgb(214, 211, 209)",
    },
  },
  {
    image: "/images/spotlight.png",
    url: "/spotlight",
    title: "Spotlight",
    subtitle: "Event Recommendations",
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgba(186, 230, 253, 0.5)",
      to: "rgba(147, 197, 253, 0.5)",
    },
  },
  {
    image: "/images/strijp-s-ai-assistant.png",
    url: "/strijp-s-ai-assistant",
    title: "Strijp-S AI Assistant",
    subtitle: "Accessible Information",
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgba(186, 230, 253, 0.5)",
      to: "rgba(147, 197, 253, 0.5)",
    },
  },
  {
    image: "/images/vetemore.png",
    url: "/vetemore",
    title: "Vetemòre",
    subtitle: "Thoughtful Fashion",
    gradientScheme: {
      from: "rgb(245, 245, 245)",
      via: "rgb(255, 230, 233, 0.3)",
      to: "rgba(254, 215, 170, 0.4)",
    },
  },
];
