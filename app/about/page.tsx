import type { Metadata } from "next";

import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import OurStory from "./components/OurStory";
import StatsSection from "./components/StatsSection";
import TeamSection from "./components/TeamSection";
import ValuesSection from "./components/ValuesSection";

// 🔥 SEO Metadata for About Page
export const metadata: Metadata = {
  title: "About Us - EcomStore",
  description:
    "Learn more about EcomStore – our mission, values, team, and journey. We're committed to providing exceptional online shopping experiences.",
  keywords: [
    "about EcomStore",
    "EcomStore mission",
    "EcomStore team",
    "EcomStore story",
    "online shopping company",
  ],
  openGraph: {
    title: "About Us - EcomStore",
    description:
      "Learn more about EcomStore – our mission, values, team, and journey.",
    type: "website",
    url: "https://yourdomain.com/about", // ⛳ Replace with your actual domain
    images: [
      {
        url: "/about-og.jpg", // 👈 Put this in your /public folder
        width: 1200,
        height: 630,
        alt: "Team working at EcomStore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - EcomStore",
    description: "Meet the EcomStore team and discover our mission and values.",
    images: ["/about-og.jpg"], // Same image as OpenGraph
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OurStory />
      <MissionSection />
      <StatsSection />
      <TeamSection />
      <ValuesSection />
    </div>
  );
}
