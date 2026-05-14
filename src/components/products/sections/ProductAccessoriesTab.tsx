"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import type { ProductData } from "@/data/products";

interface Props {
  accessories: ProductData["accessories"];
}

export default function ProductAccessoriesTab({ accessories }: Props) {
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-28 xl:py-36 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0a0f1e 1px, transparent 1px), linear-gradient(to bottom, #0a0f1e 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-400/10 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-10 sm:mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="block h-px w-8 bg-sky-500" />
            <span className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">
              System Compatibility
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 tracking-tight max-w-xl leading-[1.15]"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Optional Accessories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-4 text-slate-500 text-base max-w-md leading-relaxed"
          >
            Expand and customize your setup with compatible accessories designed for seamless integration.
          </motion.p>
        </div>

        {/* Table-style list */}
        <div className="border-t border-slate-200">
          {accessories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-4 sm:py-6 px-3 sm:px-5 border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200 rounded-sm"
            >
              {/* Left: icon + label */}
              <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                {/* Icon */}
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white group-hover:border-sky-300 group-hover:bg-sky-50 transition-all duration-200">
                  <Package size={14} className="text-slate-400 group-hover:text-sky-600 transition-colors duration-200" />
                </div>

                {/* Divider */}
                <span className="hidden sm:block h-4 w-px bg-slate-200 flex-shrink-0" />

                {/* Label */}
                <span className="text-slate-800 font-semibold text-sm sm:text-base leading-snug group-hover:text-slate-900 transition-colors duration-150">
                  {item.label}
                </span>
              </div>

              {/* Right: value — indented under icon on mobile */}
              <div className="flex items-center pl-11 sm:pl-0 sm:flex-shrink-0 sm:justify-end">
                <span className="text-slate-500 text-sm leading-relaxed sm:text-right sm:max-w-xs">
                  {item.value}
                </span>
              </div>

              {/* Hover left accent bar */}
              <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-sky-500 group-hover:h-10 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-slate-400 text-xs text-center"
        >
          Contact your distributor for accessory availability and compatibility details.
        </motion.p>
      </div>
    </section>
  );
}