"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import type { ProductData } from "@/data/products";

interface Props {
  accessories: ProductData["accessories"];
}

export default function ProductAccessoriesTab({ accessories }: Props) {
  return (
    <section className="relative bg-white py-10 lg:py-20 overflow-hidden">

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="text-sky-500 text-xs font-semibold tracking-[0.2em] uppercase">
              System Compatibility
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-[22px] leading-[30px] sm:text-3xl font-bold tracking-tight text-black"
          >
            Optional Accessories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 sm:mt-4 text-[12px] md:text-sm leading-5 md:leading-6 text-slate-500 max-w-xl mx-auto"
          >
            Expand and customize your setup with compatible accessories designed for seamless integration.
          </motion.p>
        </div>

        {/* 2-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {accessories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              {/* Icon box */}
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50">
                <Package size={18} className="text-indigo-400" />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 leading-snug mb-1">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}