import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

const products = [
  {
    title: "LED Display Systems",
    category: "Visual Hardware",
    description: "High-performance indoor and outdoor LED solutions with industry-leading refresh rates and pixel pitch precision.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
  },
  {
    title: "LCD & Interactive Kiosks",
    category: "Engagement",
    description: "Multi-touch interactive displays and digital signage kiosks designed for high-traffic commercial and public environments.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
  },
  {
    title: "Lighting Systems",
    category: "Atmosphere",
    description: "Professional architectural and stage lighting solutions integrated with smart control protocols.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
  },
  {
    title: "Professional Audio",
    category: "Infrastructure",
    description: "Enterprise-grade sound reinforcement systems for corporate halls, stadiums, and performance venues.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
  },
  {
    title: "Power & Cable Solutions",
    category: "Integration",
    description: "Robust power distribution and custom cabling infrastructure designed for mission-critical visual systems.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="section-padding bg-slate-50">
      <div className="container-custom">
        <SectionHeader
          badge="Product Categories"
          title="Engineered Visual Hardware"
          subtitle="Precision-built technology systems designed for performance and reliability in demanding environments."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              index={index}
              {...product}
              isFeatured={index === 0 || index === 1}
              className={index === 0 ? "lg:col-span-2" : ""}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full px-10 border-primary text-primary hover:bg-primary hover:text-white transition-all">
            View All Product Categories
          </Button>
        </div>
      </div>
    </section>
  );
}
