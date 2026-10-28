import type { Metadata } from "next";

const description =
  "Selected projects by Denislav Dimitrov, a design-driven developer.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects - Denislav Dimitrov",
    description,
    url: "/projects",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Denislav Dimitrov - Design-Driven Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Denislav Dimitrov",
    description,
    images: ["/api/og"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
