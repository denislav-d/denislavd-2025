import type { Metadata } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import { GradientProvider } from "@/providers/GradientContext";
import { Analytics } from "@vercel/analytics/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "Denislav Dimitrov",
  description:
    "A visionary in search of meaningful innovation. Design-Driven Developer interested in digital identity, fashion, design principles, art, & artificial intelligence.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Denislav Dimitrov",
    description:
      "A visionary in search of meaningful innovation. Design-Driven Developer interested in digital identity, fashion, design principles, art, & artificial intelligence.",
    type: "website",
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
    title: "Denislav Dimitrov",
    description:
      "A visionary in search of meaningful innovation. Design-Driven Developer interested in digital identity, fashion, design principles, art, & artificial intelligence.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${ebGaramond.variable} bg-light text-dark preload antialiased`}
      >
        <GradientProvider>
          <Navigation />
          <SmoothScroll>{children}</SmoothScroll>
        </GradientProvider>

        <Analytics />
      </body>
    </html>
  );
}
