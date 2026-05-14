"use client";

import { motion } from "framer-motion";
import type { ProductData } from "@/data/products";

interface Props {
  specifications: ProductData["specifications"];
}

export default function ProductSpecificationsTab({ specifications }: Props) {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="block h-px w-8 bg-sky-500" />
            <span className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">
              Technical Data
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            Detailed Specifications
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-4 text-slate-500 text-base max-w-lg leading-relaxed"
          >
            Full technical parameters and performance data for engineering and procurement reference.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900">
                <th className="py-4 px-6 w-2/5 border-r border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Parameter
                  </span>
                </th>
                <th className="py-4 px-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    Value / Range
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {specifications.map((spec, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className={`group border-t border-slate-200 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                  } hover:bg-sky-50`}
                >
                  <td className="py-4 px-6 border-r border-slate-200 w-2/5 align-top">
                    <span className="text-slate-800 font-semibold text-sm leading-snug group-hover:text-sky-700 transition-colors duration-150">
                      {spec.label}
                    </span>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <span className="text-slate-600 text-sm leading-snug tabular-nums group-hover:text-slate-800 transition-colors duration-150">
                      {spec.value}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
}