import type { Metadata } from "next";
import HeroCarousel from "@/components/products/HeroCarousel";
import ProductsCard from "@/components/products/ProductsCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "led-display-systems" },
    { slug: "lcd-screens-interactive-kiosks" },
    { slug: "lighting-systems" },
    { slug: "professional-audio-systems" },
    { slug: "power-distribution-cable-solutions" }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const seoDataMap: Record<string, { title: string; description: string; keywords: string[] }> = {
    "led-display-systems": {
      title: "High-Performance LED Display Systems | Axion Technology",
      description: "Discover our industry-leading LED display solutions. From seamless indoor/outdoor rental panels to fine-pitch and creative custom screens, we engineer brilliant visuals.",
      keywords: ["LED Display Systems", "Rental LED Displays", "Fine Pitch LED Screen", "COB LED Displays", "Creative LED Screen", "B2B LED Solutions"]
    },
    "lcd-screens-interactive-kiosks": {
      title: "Interactive LCD Screens & Wayfinding Kiosks | Axion Technology",
      description: "Engage your customers with high-definition interactive touchscreens, smart digital signage, and premium wayfinding self-service kiosks designed for high-traffic environments.",
      keywords: ["Interactive Kiosks", "LCD Touchscreens", "Digital Signage Displays", "OLED Systems", "Self-Service Kiosks", "Wayfinding Screen"]
    },
    "lighting-systems": {
      title: "Professional Stage & Architectural Lighting Systems | Axion Technology",
      description: "Enterprise lighting solutions including moving head fixtures, high-intensity beams, color washes, architectural spotlights, and state-of-the-art DMX controllers.",
      keywords: ["Stage Lighting Systems", "Moving Head Lights", "Architectural IP Lighting", "DMX Lighting Controller", "Hybrid Fixtures", "Wash Lights"]
    },
    "professional-audio-systems": {
      title: "Professional Audio & Enterprise Sound Systems | Axion Technology",
      description: "Acoustically engineered sound reinforcement including high-power line arrays, subwoofers, professional stage speakers, multi-channel amplifiers, and advanced DSP modules.",
      keywords: ["Professional Audio Systems", "Line Array Speakers", "Subwoofers", "DSP Systems", "Conference Room Sound", "Amplifiers"]
    },
    "power-distribution-cable-solutions": {
      title: "Reliable Power Distribution & Custom Cabling | Axion Technology",
      description: "Secure and robust power solutions engineered for stability, featuring B2B power distribution units, event power setups, signal management systems, and premium custom cables.",
      keywords: ["Power Distribution Units", "Signal Distribution", "Heavy-Duty Power Cables", "Connectors and Accessories", "Cable Management", "AV Cabling"]
    }
  };

  const seo = seoDataMap[slug] || {
    title: "Professional AV Visual Hardware | Axion Technology",
    description: "Explore the range of high-performance B2B hardware and visual engineering products from Axion Technology.",
    keywords: ["AV Hardware", "Visual Solutions", "Enterprise Engineering", "Axion Technology"]
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `https://axion-tech.com/products/${slug}`,
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="bg-[#ffff]">
      <HeroCarousel />
      <ProductsCard initialCategorySlug={slug} />
    </div>
  );
}
