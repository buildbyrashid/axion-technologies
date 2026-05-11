import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import LogoCarousel from "@/components/ui/LogoCarousel";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import NetworkSection from "@/components/sections/NetworkSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <LogoCarousel />
      <AboutSection />
      <ProductsSection />
      <ExpertiseSection />
      <IndustriesSection />
      <NetworkSection />
      <CTASection />
    </>
  );
}
