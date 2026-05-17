import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductHeroSection from "@/components/products/sections/ProductHeroSection";
import ProductFeaturesSection from "@/components/products/sections/ProductFeaturesSection";
import ProductSpecificationsTab from "@/components/products/sections/ProductSpecificationsTab";
import ProductAccessoriesTab from "@/components/products/sections/ProductAccessoriesTab";
import ProductDownloadSection from "@/components/products/sections/ProductDownloadSection";
import ProductApplicationGallery from "@/components/products/sections/ProductApplicationGallery";
import ProductInquirySection from "@/components/products/sections/ProductInquirySection";
import ProductTabNav from "@/components/products/sections/ProductTabNav";
import { ProductData } from "@/data/products";

interface Props {
  params: Promise<{ slug: string; subcategorySlug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subcategorySlug, productSlug } = await params;
  const subCategoryName = subcategorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const productName = productSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const title = `${productName} ${subCategoryName} | Axion Technology`;
  const description = `Discover specifications, dynamic key features, flight cases, user manuals, and downloads for ${productName} ${subCategoryName}. Engineered by Axion Technology.`;
  
  return {
    title,
    description,
    keywords: [
      productName,
      subCategoryName,
      `${productName} ${subCategoryName}`,
      "B2B AV Hardware",
      "Professional Display Solutions",
      "Axion Technology Specifications",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://axion-tech.com/products/${slug}/${subcategorySlug}/${productSlug}`,
    }
  };
}

// Generate dynamic data for the product
function getDynamicProduct(subcategorySlug: string, productSlug: string): ProductData {
  const subCategoryName = subcategorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const productName = productSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const fullTitle = `${productName} ${subCategoryName}`;

  return {
    slug: `${subcategorySlug}/${productSlug}`,
    title: fullTitle,
    category: subCategoryName,
    description: `The ${productName} ${subCategoryName} delivers unparalleled performance, reliability, and precision engineered for demanding professional environments.`,
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    keySpecs: [
      { label: "Performance", value: "Ultra High" },
      { label: "Reliability", value: "99.99% Uptime" },
      { label: "Build Quality", value: "Industrial Grade" },
      { label: "Warranty", value: "3 Years" },
    ],
    features: [
      {
        title: "Advanced Engineering",
        description: `The ${productName} series utilizes cutting-edge components to deliver best-in-class performance.`,
      },
      {
        title: "Seamless Integration",
        description: "Designed for immediate deployment with universal compatibility and industry standard protocols.",
      },
      {
        title: "Robust Durability",
        description: "Built to withstand rigorous environments with reinforced enclosures and thermal management.",
      },
      {
        title: "Intuitive Operation",
        description: "Streamlined interfaces and smart management software reduce operational complexity.",
      },
      {
        title: "Energy Efficient",
        description: "Optimized power consumption minimizes operating costs without compromising output.",
      },
      {
        title: "Global Support",
        description: "Backed by our international service network for rapid response and minimal downtime.",
      },
    ],
    specifications: [
      { label: "Product Series", value: productName },
      { label: "Category", value: subCategoryName },
      { label: "Operating Temperature", value: "-10°C ~ 55°C" },
      { label: "Power Requirements", value: "110-240V AC, 50/60Hz" },
      { label: "Certifications", value: "CE, FCC, RoHS" },
      { label: "Installation", value: "Plug and Play / Professional Rigging" },
    ],
    accessories: [
      { label: "Flight Cases", value: "Custom ATA-rated protective cases" },
      { label: "Mounting Kits", value: "Professional suspension and floor-mount hardware" },
      { label: "Cabling", value: "High-grade shielded signal and power cables" },
      { label: "Control Modules", value: "Advanced processing and control units" },
    ],
    downloads: [
      { title: "Product Datasheet", type: "PDF", size: "2.1 MB", url: "#" },
      { title: "User Manual", type: "PDF", size: "5.4 MB", url: "#" },
      { title: "Installation Guide", type: "PDF", size: "3.2 MB", url: "#" },
      { title: "Certifications", type: "ZIP", size: "4.5 MB", url: "#" },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", caption: "Professional Application" },
      { src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800", caption: "Live Environment" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Event Setup" },
      { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800", caption: "Commercial Space" },
    ],
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug, subcategorySlug, productSlug } = await params;
  
  const product = getDynamicProduct(subcategorySlug, productSlug);

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
