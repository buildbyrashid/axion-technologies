"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import type { ProductData } from "@/data/products";

interface Props {
  gallery: ProductData["gallery"];
}

export default function ProductApplicationGallery({ gallery }: Props) {
  return (
    <section className="bg-white py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#0a1628] font-bold tracking-widest uppercase text-xs mb-3">
            Case Studies
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Application Gallery
          </h2>
          <p className="mt-3 sm:mt-4 text-[12px] md:text-sm leading-5  md:leading-6 text-black">
            Real-world installations across concerts, corporate environments, retail, and control rooms.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-end p-6 backdrop-blur-[1px]">
                <ZoomIn size={28} className="text-white mb-3 opacity-80" />
                <span className="text-white font-bold text-sm tracking-wide">{item.caption}</span>
              </div>

              {/* Always-visible caption bar */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white/80 text-xs font-medium">{item.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
