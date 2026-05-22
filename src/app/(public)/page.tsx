import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import CTASection from "@/components/sections/CTASection";
import { query } from "@/lib/db-helpers";

export const dynamic = 'force-dynamic';

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

async function getHomepageData() {
  try {
    const heroRows = await query<any[]>('SELECT * FROM homepage_hero WHERE is_active = 1 LIMIT 1');
    const expertiseRows = await query<any[]>('SELECT * FROM homepage_expertise LIMIT 1');
    const ctaRows = await query<any[]>('SELECT * FROM global_cta WHERE is_active = 1 LIMIT 1');

    return {
      hero: heroRows[0] || null,
      expertise: expertiseRows[0] || null,
      cta: ctaRows[0] || null
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return { hero: null, expertise: null, cta: null };
  }
}

export default async function Home() {
  const data = await getHomepageData();

  return (
    <>
      <HeroSection data={data.hero} />
      <ProductsSection />
      <ExpertiseSection data={data.expertise} />
      <CTASection data={data.cta} />
    </>
  );
}
