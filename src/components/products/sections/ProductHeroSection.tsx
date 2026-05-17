"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import type { ProductData } from "@/data/products";

interface Props {
  product: Pick<ProductData, "title" | "category" | "description" | "heroImage" | "keySpecs">;
}

export default function ProductHeroSection({ product }: Props) {
  return (
    <section className="relative min-h-[88vh] flex items-center pt-[100px] sm:pt-[150px]  pb-24 overflow-hidden bg-[#001a33] text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={product.heroImage}
          alt={product.title}
          fill
          className="object-cover opacity-25 scale-110"
          priority
        />
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#001a33] via-[#001a33]/90 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.12)_0%,transparent_65%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none-none bg-sky-400/10 border border-sky-400/20 text-sky-400 text-[9px] font-bold uppercase tracking-widest mb-8">
              <Info size={10} />
              {product.category}
            </div>

            <h1 className="text-2xl text-white lg:text-4xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              {product.title}
            </h1>

            <p className="text-sm text-white/65 mb-10 max-w-xl leading-relaxed">
              {product.description}
            </p>

            {/* Key Specs strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 border-t border-white/10 pt-8">
              {product.keySpecs.map((spec, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">
                    {spec.label}
                  </span>
                  <span className="text-xs font-bold text-white">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 rounded-none-none bg-sky-500 hover:bg-sky-400 h-14 px-9 text-base font-bold shadow-lg shadow-sky-500/20 transition-all duration-300 group w-full sm:w-auto">
                Request Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 rounded-none-none border border-white/20 text-white hover:bg-white/10 h-14 px-9 text-base font-bold transition-all duration-300 w-full sm:w-auto">
                Contact Specialist
              </button>
            </div>
          </motion.div>

          {/* Right: Product image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative aspect-[4/3] lg:h-[520px] w-full rounded-none-none overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] border border-white/10"
          >
            <Image
              src={product.heroImage}
              alt={product.title}
              fill
              className="object-cover"
            />
            {/* Subtle inner glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}