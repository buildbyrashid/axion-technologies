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
import { getProductBySlug } from "@/lib/db-helpers";

interface Props {
  params: Promise<{ slug: string; subcategorySlug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subcategorySlug, productSlug } = await params;

  // Try fetching from DB for accurate metadata
  let productName: string;
  let subCategoryName: string;
  try {
    const dbProduct = await getProductBySlug(productSlug);
    if (dbProduct) {
      productName = dbProduct.name;
      subCategoryName = dbProduct.category_name || subcategorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    } else {
      subCategoryName = subcategorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      productName = productSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  } catch {
    subCategoryName = subcategorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    productName = productSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  const title = `${productName} | Axion Technology`;
  const description = `Discover specifications, dynamic key features, flight cases, user manuals, and downloads for ${productName}. Engineered by Axion Technology.`;
  
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

// Generate dynamic fallback data for products not yet in the database
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
    downloads: [],
    gallery: [
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", caption: "Professional Application" },
      { src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800", caption: "Live Environment" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Event Setup" },
      { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800", caption: "Commercial Space" },
    ],
  };
}

/**
 * Map a MySQL product record to the ProductData format used by presentation components.
 */
function mapDbProductToProductData(dbProduct: any, subcategorySlug: string): ProductData {
  const subCategoryName = dbProduct.category_name || subcategorySlug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Map specifications - handle both object and array formats from DB
  let specifications: { label: string; value: string }[] = [];
  if (dbProduct.specifications) {
    if (Array.isArray(dbProduct.specifications)) {
      specifications = dbProduct.specifications.map((s: any) => ({
        label: s.spec_key || s.label || '',
        value: s.spec_value || s.value || '',
      }));
    } else if (typeof dbProduct.specifications === 'object') {
      specifications = Object.entries(dbProduct.specifications).map(([key, val]) => ({
        label: key,
        value: String(val),
      }));
    }
  }
  if (specifications.length === 0) {
    specifications = [
      { label: "Product Series", value: dbProduct.name },
      { label: "Category", value: subCategoryName },
      { label: "Operating Temperature", value: "-10°C ~ 55°C" },
      { label: "Power Requirements", value: "110-240V AC, 50/60Hz" },
      { label: "Certifications", value: "CE, FCC, RoHS" },
      { label: "Installation", value: "Plug and Play / Professional Rigging" },
    ];
  }

  // Map features
  let features: { title: string; description: string }[] = [];
  if (Array.isArray(dbProduct.features) && dbProduct.features.length > 0) {
    features = dbProduct.features.map((f: any) => ({
      title: f.title || f.name || 'Feature',
      description: f.description || f.detail || '',
    }));
  } else {
    features = [
      { title: "Advanced Engineering", description: `The ${dbProduct.name} utilizes cutting-edge components to deliver best-in-class performance.` },
      { title: "Seamless Integration", description: "Designed for immediate deployment with universal compatibility and industry standard protocols." },
      { title: "Robust Durability", description: "Built to withstand rigorous environments with reinforced enclosures and thermal management." },
      { title: "Intuitive Operation", description: "Streamlined interfaces and smart management software reduce operational complexity." },
      { title: "Energy Efficient", description: "Optimized power consumption minimizes operating costs without compromising output." },
      { title: "Global Support", description: "Backed by our international service network for rapid response and minimal downtime." },
    ];
  }

  // Map accessories
  let accessories: { label: string; value: string }[] = [];
  if (Array.isArray(dbProduct.accessories) && dbProduct.accessories.length > 0) {
    accessories = dbProduct.accessories.map((a: any) => ({
      label: a.label || a.name || 'Accessory',
      value: a.value || a.description || '',
    }));
  } else {
    accessories = [
      { label: "Flight Cases", value: "Custom ATA-rated protective cases" },
      { label: "Mounting Kits", value: "Professional suspension and floor-mount hardware" },
      { label: "Cabling", value: "High-grade shielded signal and power cables" },
      { label: "Control Modules", value: "Advanced processing and control units" },
    ];
  }

  // Map downloads
  let downloads: { title: string; type: string; size: string; url: string }[] = [];
  if (Array.isArray(dbProduct.downloads) && dbProduct.downloads.length > 0) {
    downloads = dbProduct.downloads.map((d: any) => {
      const url = d.url || d.file_url || '#';
      let docType = (d.type || d.document_type || '').toUpperCase();
      if (!['PDF', 'DWG', 'DWG/PDF', 'IES', 'ZIP'].includes(docType)) {
        const ext = url.split('.').pop()?.toUpperCase() || 'PDF';
        docType = ext;
      }
      return {
        title: d.name || d.title || 'Document',
        type: docType,
        size: d.size || '—',
        url: url,
      };
    });
  }

  // Map gallery
  let gallery: { src: string; caption: string }[] = [];
  if (Array.isArray(dbProduct.gallery) && dbProduct.gallery.length > 0) {
    gallery = dbProduct.gallery.map((g: any) => ({
      src: typeof g === 'string' ? g : (g.src || g.url || ''),
      caption: typeof g === 'string' ? 'Product Image' : (g.caption || g.alt || 'Product Image'),
    }));
  } else {
    gallery = [
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", caption: "Professional Application" },
      { src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800", caption: "Live Environment" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Event Setup" },
      { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800", caption: "Commercial Space" },
    ];
  }

  return {
    slug: dbProduct.slug,
    title: dbProduct.name,
    category: subCategoryName,
    description: dbProduct.full_description || dbProduct.short_description || `Professional ${dbProduct.name} engineered for global enterprise and commercial deployments.`,
    heroImage: dbProduct.featured_image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    keySpecs: specifications.slice(0, 4),
    features,
    specifications,
    accessories,
    downloads,
    gallery,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug, subcategorySlug, productSlug } = await params;
  
  let product: ProductData;

  try {
    // Try fetching from MySQL database
    const dbProduct = await getProductBySlug(productSlug);

    if (dbProduct) {
      product = mapDbProductToProductData(dbProduct, subcategorySlug);
    } else {
      // Fallback to dynamic mock product
      product = getDynamicProduct(subcategorySlug, productSlug);
    }
  } catch (error) {
    console.error('Error fetching product from database:', error);
    // Fallback to dynamic mock product on DB error
    product = getDynamicProduct(subcategorySlug, productSlug);
  }

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
      <ProductTabNav
        activeSection="features"
        hideTabs={product.downloads.length === 0 ? ['downloads'] : []}
      />

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

      {/* 5. Download Section — only shown when real documents exist */}
      {product.downloads.length > 0 && (
        <div id="section-downloads">
          <ProductDownloadSection downloads={product.downloads} />
        </div>
      )}

      {/* 6. Application Gallery */}
      <div id="section-applications">
        <ProductApplicationGallery gallery={product.gallery} />
      </div>

      {/* 7. Inquiry Section */}
      <ProductInquirySection />
    </main>
  );
}
