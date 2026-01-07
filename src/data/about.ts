export interface ExternalLink {
  label: string;
  href: string;
}

export interface ColorItem {
  label: string;
  hex: string;
}

export interface AboutData {
  sections: {
    usefulLinks: ExternalLink[];
    techStack: ExternalLink[];
    inspiration: string[];
    typography: ExternalLink[];
    colorPalette: ColorItem[];
  };
  footerText: string;
}

export const aboutData: AboutData = {
  sections: {
    usefulLinks: [
      { label: "GitHub", href: "https://github.com/denislav-d" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/denislavd/" },
    ],
    techStack: [
      { label: "Next.js", href: "https://nextjs.org/" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
      { label: "GSAP", href: "https://gsap.com/" },
      { label: "THREE.js", href: "https://threejs.org/" },
      { label: "Lenis", href: "https://lenis.darkroom.engineering/" },
    ],
    inspiration: ["Swiss Design", "Archival Fashion", "Brutalist Architecture"],
    typography: [
      {
        label: "Plus Jakarta Sans",
        href: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
      },
      {
        label: "EB Garamond",
        href: "https://fonts.google.com/specimen/EB+Garamond",
      },
    ],
    colorPalette: [
      { label: "Light", hex: "#f7f7f2" },
      { label: "Dark", hex: "#111111" },
      { label: "Secondary", hex: "#71717b" },
    ],
  },
  footerText: "© 2026 Denislav Dimitrov",
};
