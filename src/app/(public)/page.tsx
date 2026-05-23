import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import CTASection from "@/components/sections/CTASection";
import { query } from "@/lib/db-helpers";

// CHANGED FROM: export const dynamic = 'force-dynamic';
// TO: export const revalidate = 60; 
// This tells Next.js to cache the page and only hit the DB once every 60 seconds.
// This is critical for Hostinger shared hosting to prevent connection pool exhaustion.
export const revalidate = 60;

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
    // We fetch data in parallel to reduce overall DB waiting time
    const [heroRows, expertiseRows, ctaRows, productsRows] = await Promise.all([
      query<any[]>('SELECT * FROM homepage_hero WHERE is_active = 1 LIMIT 1'),
      query<any[]>('SELECT * FROM homepage_expertise WHERE is_active = 1 LIMIT 1'),
      query<any[]>('SELECT * FROM global_cta WHERE is_active = 1 LIMIT 1'),
      query<any[]>('SELECT * FROM homepage_products WHERE is_active = 1 ORDER BY sort_order ASC')
    ]);

    return {
      hero: heroRows[0] || null,
      expertise: expertiseRows[0] || null,
      cta: ctaRows[0] || null,
      products: productsRows || []
    };
  } catch (error: any) {
    console.error("Error fetching homepage data:", error.message || error);
    // Return nulls gracefully so the page STILL renders even if DB fails
    return { hero: null, expertise: null, cta: null, products: [] };
  }
}

export default async function Home() {
  const data = await getHomepageData();

  return (
    <>
      <HeroSection data={data.hero} />
      <ProductsSection data={data.products} />
      <ExpertiseSection data={data.expertise} />
      <CTASection data={data.cta} />
    </>
  );
}
