"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    title: "LED Display Systems",
    category: "Visual Hardware",
    description: "High-performance indoor and outdoor LED solutions with industry-leading refresh rates and pixel pitch precision.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
    className: "lg:col-span-2 lg:row-span-2",
    href: "/products/led-display-systems",
  },
  {
    title: "Interactive Kiosks",
    category: "Engagement",
    description: "Multi-touch interactive displays and digital signage kiosks.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
    href: "/products/lcd-screens-interactive-kiosks",
  },
  {
    title: "Lighting Systems",
    category: "Atmosphere",
    description: "Professional architectural and stage lighting solutions.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
    href: "/products/lighting-systems",
  },
  {
    title: "Professional Audio",
    category: "Infrastructure",
    description: "Enterprise-grade sound reinforcement systems.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
    href: "/products/professional-audio-systems",
  },
  {
    title: "Power Solutions",
    category: "Integration",
    description: "Robust power distribution and custom cabling.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
    href: "/products/power-distribution-cable-solutions",
  },
];

export default function ProductsSection({ data }: { data?: any[] }) {
  const displayProducts = data && data.length > 0 ? data : products;

  return (
    <section id="products" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block"
          >
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-sora font-extrabold text-primary tracking-tighter"
          >
            Engineered Visual Hardware
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-4 max-w-2xl text-lg"
          >
            Precision-built technology systems designed for performance and reliability in demanding environments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 auto-rows-[250px] sm:auto-rows-[300px] lg:auto-rows-[210px] xl:auto-rows-[240px] 2xl:auto-rows-[270px]">
          {displayProducts.map((product, index) => {
            const gridClass = index === 0 ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1 lg:row-span-1";
            return (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden bg-white border border-slate-100 flex flex-col p-0 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
                  gridClass
                )}
              >
                {/* Image Container */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Dark gradient to ensure white text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 mt-auto p-6 sm:p-8 w-full">
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2 block">
                        {product.category}
                      </span>
                      <h3 className={cn(
                        "font-sora font-bold text-white tracking-tight leading-tight",
                        index === 0 ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                      )}>
                        {product.title}
                      </h3>
                    </div>

                    <Link
                      href={product.href}
                      className="h-10 w-10 bg-primary text-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

