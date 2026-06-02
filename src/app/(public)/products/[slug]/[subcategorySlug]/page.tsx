import type { Metadata } from "next";
import ProductsCard from "@/components/products/ProductsCard";

interface Props {
  params: Promise<{ slug: string; subcategorySlug: string }>;
}

export async function generateStaticParams() {
  return [
    // LED DISPLAY SYSTEMS
    { slug: "led-display-systems", subcategorySlug: "indoor-rental-led-displays" },
    { slug: "led-display-systems", subcategorySlug: "outdoor-rental-led-displays" },
    { slug: "led-display-systems", subcategorySlug: "fine-pitch-led-displays" },
    { slug: "led-display-systems", subcategorySlug: "cob-led-displays" },
    
    // LCD SCREENS & INTERACTIVE KIOSKS
    { slug: "lcd-screens-interactive-kiosks", subcategorySlug: "interactive-touch-screens" },
    { slug: "lcd-screens-interactive-kiosks", subcategorySlug: "digital-signage-displays" },
    { slug: "lcd-screens-interactive-kiosks", subcategorySlug: "interactive-kiosks" },
    { slug: "lcd-screens-interactive-kiosks", subcategorySlug: "oled-displays" },

    // LIGHTING SYSTEMS
    { slug: "lighting-systems", subcategorySlug: "moving-head-lights" },
    { slug: "lighting-systems", subcategorySlug: "beam-lights" },
    { slug: "lighting-systems", subcategorySlug: "wash-lights" },
    { slug: "lighting-systems", subcategorySlug: "hybrid-fixtures" },

    // PROFESSIONAL AUDIO SYSTEMS
    { slug: "professional-audio-systems", subcategorySlug: "line-array-systems" },
    { slug: "professional-audio-systems", subcategorySlug: "subwoofers" },
    { slug: "professional-audio-systems", subcategorySlug: "stage-monitors" },
    { slug: "professional-audio-systems", subcategorySlug: "amplifiers-processors" },

    // POWER DISTRIBUTION & CABLE SOLUTIONS
    { slug: "power-distribution-cable-solutions", subcategorySlug: "power-distros" },
    { slug: "power-distribution-cable-solutions", subcategorySlug: "heavy-duty-cables" },
    { slug: "power-distribution-cable-solutions", subcategorySlug: "signal-distribution" },
    { slug: "power-distribution-cable-solutions", subcategorySlug: "cable-management-solutions" }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subcategorySlug } = await params;
  const categoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const subcategoryName = subcategorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const title = `${subcategoryName} | ${categoryName} | Axion Technology`;
  const description = `Discover our range of professional ${subcategoryName} under the ${categoryName} category. Premium systems engineered by Axion Technology.`;
  
  return {
    title,
    description,
    keywords: [subcategoryName, categoryName, `${subcategoryName} ${categoryName}`, "B2B Visual Solutions"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://axion-tech.com/products/${slug}/${subcategorySlug}`,
    }
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { slug, subcategorySlug } = await params;

  return (
    <div className="bg-[#ffff] pt-24 lg:pt-32">
      <ProductsCard initialCategorySlug={slug} initialSubcategorySlug={subcategorySlug} />
    </div>
  );
}
