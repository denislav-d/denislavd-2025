import type { Metadata } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import { GradientProvider } from "@/providers/GradientContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  sameAs,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/data/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle: "Design-Driven Developer",
  image: `${siteUrl}/api/og`,
  sameAs,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s - Denislav Dimitrov",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName,
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
    title: siteTitle,
    description: siteDescription,
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

        <script type="application/ld+json">
          {JSON.stringify(personJsonLd)}
        </script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
