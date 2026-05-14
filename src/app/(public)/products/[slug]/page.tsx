import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs } from "@/data/products";

import ProductHeroSection from "@/components/products/sections/ProductHeroSection";
import ProductFeaturesSection from "@/components/products/sections/ProductFeaturesSection";
import ProductSpecificationsTab from "@/components/products/sections/ProductSpecificationsTab";
import ProductAccessoriesTab from "@/components/products/sections/ProductAccessoriesTab";
import ProductDownloadSection from "@/components/products/sections/ProductDownloadSection";
import ProductApplicationGallery from "@/components/products/sections/ProductApplicationGallery";
import ProductInquirySection from "@/components/products/sections/ProductInquirySection";
import ProductTabNav from "@/components/products/sections/ProductTabNav";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.title} | Axion Technology`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  console.log("************",slug)

  if (!product) notFound();

  return (
    <main>
      {/* 1. Hero Section */}
      <ProductHeroSection
        product={{
          title: product.title,
          category: product.category,
          description: product.description,
          heroImage: product.heroImage,
          keySpecs: product.keySpecs,
        }}
      />

      {/* Sticky tab navigation */}
      <ProductTabNav activeSection="features" />

      {/* 2. Features Section */}
      <div id="section-features">
        <ProductFeaturesSection features={product.features} />
      </div>

      {/* 3. Specifications Tab */}
      <div id="section-specs">
        <ProductSpecificationsTab specifications={product.specifications} />
      </div>

      {/* 4. Accessories Tab */}
      <div id="section-accessories">
        <ProductAccessoriesTab accessories={product.accessories} />
      </div>

      {/* 5. Download Section */}
      <div id="section-downloads">
        <ProductDownloadSection downloads={product.downloads} />
      </div>

      {/* 6. Application Gallery */}
      <div id="section-applications">
        <ProductApplicationGallery gallery={product.gallery} />
      </div>

      {/* 7. Inquiry Section */}
      <ProductInquirySection />
    </main>
  );
}
