import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Download, Check, Cpu, LayoutGrid, ShieldCheck, Zap } from "lucide-react";
import { getProductBySlug } from "@/lib/db-helpers";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Axion Technology" };
  }

  return {
    title: `${product.name} | Axion Technology`,
    description: product.short_description || "Professional visual technology and AV engineering hardware.",
    openGraph: {
      title: product.name,
      description: product.short_description || "",
      images: product.featured_image ? [{ url: product.featured_image }] : [],
    }
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#ffff] min-h-screen pt-32 pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          <Link href="/" className="hover:text-[#0D95F0] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products/led-display-systems" className="hover:text-[#0D95F0] transition-colors">Products</Link>
          <ChevronRight size={12} />
          {product.category_name && (
            <>
              <span className="text-slate-300">{product.category_name}</span>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-[#0D95F0]">{product.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
        
        {/* Product Images */}
        <div className="space-y-6">
          <div className="relative aspect-[4/3] bg-slate-50 border border-black/5 overflow-hidden group">
            {product.featured_image ? (
              <Image 
                src={product.featured_image} 
                alt={product.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300 font-mono text-sm uppercase tracking-widest">
                No Image Available
              </div>
            )}
            
            {product.is_featured && (
              <div className="absolute top-6 left-6 bg-[#0D95F0] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2">
                Featured System
              </div>
            )}
          </div>
          
          {/* Gallery Thumbnails (if any) */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.slice(0, 4).map((img: any, i: number) => (
                <div key={i} className="relative aspect-square border border-black/5 bg-slate-50 overflow-hidden cursor-pointer hover:border-[#0D95F0] transition-colors">
                  <Image src={img.url || img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-[#0D95F0]" />
            <span className="text-[#0D95F0] text-xs font-black uppercase tracking-[0.3em]">
              Enterprise Hardware
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.1] tracking-tighter mb-8">
            {product.name}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12 max-w-2xl font-medium">
            {product.short_description || `Premium ${product.name} engineered for ultimate reliability and unparalleled visual fidelity in enterprise environments.`}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-12 pb-12 border-b border-black/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0D95F0]/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-[#0D95F0]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Durability</p>
                <p className="text-sm font-bold text-[#0A1628]">Enterprise Grade</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0D95F0]/10 flex items-center justify-center shrink-0">
                <Zap size={18} className="text-[#0D95F0]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Performance</p>
                <p className="text-sm font-bold text-[#0A1628]">Ultra High-Efficiency</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0D95F0]/10 flex items-center justify-center shrink-0">
                <LayoutGrid size={18} className="text-[#0D95F0]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Integration</p>
                <p className="text-sm font-bold text-[#0A1628]">Seamless Scalability</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0D95F0]/10 flex items-center justify-center shrink-0">
                <Cpu size={18} className="text-[#0D95F0]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Processing</p>
                <p className="text-sm font-bold text-[#0A1628]">Advanced DSP Engine</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-10 py-5 bg-[#0D95F0] text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-[#0A1628] transition-colors flex items-center justify-center gap-3"
            >
              Request Quote
              <ArrowRight size={16} />
            </Link>
            
            {product.downloads && product.downloads.length > 0 && (
              <a 
                href={product.downloads[0].file_url}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-10 py-5 border border-black/10 text-[#0A1628] text-sm font-black uppercase tracking-[0.2em] hover:border-[#0A1628] transition-colors flex items-center justify-center gap-3"
              >
                Datasheet
                <Download size={16} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Specifications & Features */}
      <section className="bg-slate-50 border-y border-black/5 py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Features Column */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-12">System Features</h2>
              
              <div className="space-y-6">
                {product.features && product.features.length > 0 ? (
                  product.features.map((feature: any, i: number) => (
                    <div key={i} className="bg-white p-8 border border-black/5 hover:border-[#0D95F0]/30 transition-colors group flex items-start gap-6">
                      <div className="w-12 h-12 bg-[#0D95F0]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D95F0] group-hover:text-white transition-colors">
                        <span className="font-mono font-bold text-sm text-[#0D95F0] group-hover:text-white">0{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#0A1628] tracking-tight mb-3">{feature.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white p-8 border border-black/5 flex items-start gap-4">
                        <Check size={20} className="text-[#0D95F0] mt-1 shrink-0" />
                        <div>
                          <h4 className="font-bold text-[#0A1628] mb-2 tracking-tight">Industry Standard Compliance</h4>
                          <p className="text-sm text-slate-500">Built to exceed rigorous B2B requirements for 24/7 continuous operation.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Column */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-12">Technical Specifications</h2>
              
              <div className="bg-white border border-black/5">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="divide-y divide-black/5">
                    {(Array.isArray(product.specifications) ? product.specifications : Object.entries(product.specifications)).map((spec: any, i: number) => {
                      const key = Array.isArray(product.specifications) ? spec.spec_key : spec[0];
                      const val = Array.isArray(product.specifications) ? spec.spec_value : spec[1];
                      return (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center py-5 px-8 hover:bg-slate-50/50 transition-colors">
                          <span className="sm:w-1/2 text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1 sm:mb-0">
                            {key}
                          </span>
                          <span className="sm:w-1/2 text-sm font-bold text-[#0A1628]">
                            {val}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-400 text-sm font-medium">
                    Detailed specifications are available upon request. Please contact our engineering team.
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Link href="/contact" className="text-[#0D95F0] text-sm font-black uppercase tracking-widest hover:text-[#0A1628] transition-colors flex items-center gap-2">
                  Contact Engineering Support <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
