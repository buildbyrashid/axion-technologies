import HeroSection from "@/components/sections/HeroSection";
import LogoCarousel from "@/components/ui/LogoCarousel";
import ProductsSection from "@/components/sections/ProductsSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <ProductsSection />
      <ExpertiseSection />
      <CTASection />
    </>
  );
}
