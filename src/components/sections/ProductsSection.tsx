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
  },
  {
    title: "Interactive Kiosks",
    category: "Engagement",
    description: "Multi-touch interactive displays and digital signage kiosks.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Lighting Systems",
    category: "Atmosphere",
    description: "Professional architectural and stage lighting solutions.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Professional Audio",
    category: "Infrastructure",
    description: "Enterprise-grade sound reinforcement systems.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Power Solutions",
    category: "Integration",
    description: "Robust power distribution and custom cabling.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80",
    className: "lg:col-span-1 lg:row-span-1",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block"
          >
            Product Categories
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
            className="text-slate-500 mt-4 max-w-2xl"
          >
            Precision-built technology systems designed for performance and reliability in demanding environments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px] sm:auto-rows-[350px]">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-white border border-slate-100 flex flex-col p-0 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
                product.className
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
                {/* Subtle gradient to ensure text readability if needed, but keeping it light */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 mt-auto p-8 w-full">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2 block">
                      {product.category}
                    </span>
                    <h3 className={cn(
                      "font-sora font-bold text-primary tracking-tight leading-tight",
                      index === 0 ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                    )}>
                      {product.title}
                    </h3>
                    {index === 0 && (
                      <p className="text-slate-500 text-xs sm:text-sm max-w-sm leading-relaxed mt-4 hidden sm:block line-clamp-2 lg:line-clamp-none">
                        {product.description}
                      </p>
                    )}
                  </div>
                  
                  <Link
                    href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

