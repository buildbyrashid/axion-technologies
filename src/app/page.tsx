import HeroSection from "@/components/sections/HeroSection";
import LogoCarousel from "@/components/ui/LogoCarousel";
import TechnicalAuthority from "@/components/sections/TechnicalAuthority";
import ProductsSection from "@/components/sections/ProductsSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import NetworkSection from "@/components/sections/NetworkSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <TechnicalAuthority />
      <ProductsSection />
      <ExpertiseSection />
      <IndustriesSection />
      <NetworkSection />
      <CTASection />
    </>
  );
}
