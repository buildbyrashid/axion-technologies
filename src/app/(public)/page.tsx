import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Axion Technology | Enterprise Visual Hardware & Systems Engineering",
  description: "Axion Technology engineers robust, professional B2B visual infrastructure including advanced LED Display Systems, LCD screens, interactive kiosks, professional audio, lighting systems, and custom power distribution.",
  keywords: [
    "Axion Technology",
    "B2B Visual Systems",
    "AV Infrastructure Engineering",
    "LED Video Walls",
    "Interactive Kiosks",
    "Professional Audio reinforcement",
    "Stage Lighting Solutions",
    "Power Distribution Units",
    "Enterprise Integration"
  ],
  openGraph: {
    title: "Axion Technology | Enterprise Visual Hardware & Systems Engineering",
    description: "Axion Technology engineers robust, professional B2B visual infrastructure including advanced LED Display Systems, LCD screens, interactive kiosks, professional audio, lighting systems, and custom power distribution.",
    type: "website",
    url: "https://axion-tech.com",
  }
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <ExpertiseSection />
      <CTASection />
    </>
  );
}
