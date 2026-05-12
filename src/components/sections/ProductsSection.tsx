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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[300px]">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-slate-900 flex flex-col justify-end p-8",
                product.className
              )}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 block">
                      {product.category}
                    </span>
                    <h3 className={cn(
                      "font-sora font-bold text-white tracking-tight leading-tight",
                      index === 0 ? "text-3xl" : "text-xl"
                    )}>
                      {product.title}
                    </h3>
                  </div>
                  <Link
                    href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                  >
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </Link>
                </div>
                {index === 0 && (
                  <p className="text-white/60 text-sm max-w-md leading-relaxed mt-4 hidden sm:block">
                    {product.description}
                  </p>
                )}
              </div>
              
              {/* 1px inner stroke effect */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

