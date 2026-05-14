"use client";

import { motion } from "framer-motion";
import type { ProductData } from "@/data/products";

interface Props {
  specifications: ProductData["specifications"];
}

export default function ProductSpecificationsTab({ specifications }: Props) {
  return (
    <section className="bg-slate-50 py-10 lg:py-20">
      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="text-sky-500 text-xs font-semibold tracking-[0.2em] uppercase">
              Technical Data
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-[20px] leading-[28px] sm:text-3xl uppercase font-bold tracking-tight text-black tracking-[4px]"
          >
            Detailed Specifications
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-[12px] md:text-sm leading-5 md:leading-6 text-slate-600"
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
          className="rounded-xl overflow-hidden border border-slate-200 shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900">
                <th className="py-3 px-4 w-2/5 border-r border-white/10">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Parameter
                  </span>
                </th>
                <th className="py-3 px-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white">
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
                  } hover:bg-[#0a1628]/5`}
                >
                  <td className="py-3 px-4 border-r border-slate-200 w-2/5 align-top">
                    <span className="text-slate-800 font-semibold text-xs leading-snug group-hover:text-[#0a1628] transition-colors duration-150">
                      {spec.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <span className="text-slate-600 text-xs leading-snug tabular-nums group-hover:text-slate-800 transition-colors duration-150">
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