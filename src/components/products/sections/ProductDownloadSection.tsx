"use client";

import { motion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";
import type { ProductData } from "@/data/products";

interface Props {
  downloads: ProductData["downloads"];
}

const typeConfig: Record<string, { label: string; color: string; dot: string }> = {
  PDF: {
    label: "PDF",
    color: "text-rose-500",
    dot: "bg-rose-500",
  },
  DWG: {
    label: "DWG",
    color: "text-amber-500",
    dot: "bg-amber-500",
  },
  "DWG/PDF": {
    label: "DWG / PDF",
    color: "text-amber-500",
    dot: "bg-amber-500",
  },
  IES: {
    label: "IES",
    color: "text-violet-500",
    dot: "bg-violet-500",
  },
};

const fallbackConfig = {
  label: "FILE",
  color: "text-slate-400",
  dot: "bg-slate-400",
};

export default function ProductDownloadSection({ downloads }: Props) {
  return (
    <section className="relative bg-white py-10 lg:py-16 overflow-hidden">

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="text-sky-500 text-xs font-semibold tracking-[0.2em] uppercase">
              Technical Resources
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-[20px] sm:text-3xl font-bold text-black tracking-tight leading-snug"
          >
            Downloads &amp; Documentation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-[12px] md:text-sm leading-5 md:leading-6 text-slate-500 max-w-md mx-auto"
          >
            Datasheets, CAD drawings, photometric files, and certificates — everything you need, ready to download.
          </motion.p>
        </div>

        {/* Table-style list */}
        <div className="border-t border-slate-200">
          {downloads.map((file, index) => {
            const cfg = typeConfig[file.type] ?? fallbackConfig;

            return (
              <motion.a
                key={index}
                href={file.url}
                download
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group relative flex flex-row items-center justify-between gap-3 py-3.5 px-3 border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200 rounded-none-none"
              >
                {/* Left: type badge + title */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Type pill */}
                  <div className="flex-shrink-0 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-none-none ${cfg.dot}`} />
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Divider */}
                  <span className="hidden sm:block h-3.5 w-px bg-slate-200 flex-shrink-0" />

                  {/* Title */}
                  <span className="text-slate-700 font-medium text-xs sm:text-sm truncate group-hover:text-slate-900 transition-colors duration-150">
                    {file.title}
                  </span>
                </div>

                {/* Right: size + CTA */}
                <div className="flex items-center gap-4 flex-shrink-0 pl-0 sm:pl-2">
                  {file.size && (
                    <span className="text-slate-400 text-xs tabular-nums hidden sm:block">
                      {file.size}
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 text-sky-500 font-semibold text-xs group-hover:text-sky-600 transition-colors duration-150">
                    <span className="inline">Download</span>
                    <span className="relative flex items-center justify-center w-7 h-7 rounded-none-none border border-sky-200 group-hover:border-sky-400 group-hover:bg-sky-50 transition-all duration-200">
                      <Download size={12} className="hidden group-hover:block absolute transition-all duration-150" />
                      <ArrowUpRight size={12} className="block group-hover:hidden absolute transition-all duration-150" />
                    </span>
                  </div>
                </div>

                {/* Hover left accent bar */}
                <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-sky-500 group-hover:h-8 transition-all duration-300 rounded-none-none" />
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}