import type { Metadata } from "next";
import HeroCarousel from "@/components/products/HeroCarousel";
import ProductsCard from "@/components/products/ProductsCard";

export const metadata: Metadata = {
  title: "Professional Visual Hardware & Solutions Catalog | Axion Technology",
  description: "Explore Axion Technology's range of high-performance LED display systems, interactive LCD kiosks, professional audio & lighting, and reliable power distribution solutions.",
  keywords: [
    "LED Display Systems",
    "LCD Screens",
    "Interactive Kiosks",
    "Professional Lighting",
    "Stage Lighting",
    "Professional Audio Systems",
    "Power Distribution",
    "Cabling Solutions",
    "B2B AV Hardware",
    "Axion Technology"
  ],
  openGraph: {
    title: "Professional Visual Hardware & Solutions Catalog | Axion Technology",
    description: "Explore Axion Technology's range of high-performance LED display systems, interactive LCD kiosks, professional audio & lighting, and reliable power distribution solutions.",
    type: "website",
    url: "https://axion-tech.com/products",
  }
};

export default function ProductsPage() {
  return (
    <div className="bg-[#ffff]">
      <HeroCarousel />
      <ProductsCard />
    </div>
  );
}

