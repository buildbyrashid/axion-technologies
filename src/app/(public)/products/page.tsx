import HeroCarousel from "@/components/products/HeroCarousel";
import ProductCard from "@/components/products/ProductCard";
import ProductFeaturesSection from "@/components/products/ProductFeaturesSection";
import ProductsCard from "@/components/products/ProductsCard";


export default function ProductsPage() {
  return (
    <div className="bg-[#ffff]">
      <HeroCarousel />
      <ProductsCard />
     {/* <ProductFeaturesSection/> */}
    </div>
  );
}

