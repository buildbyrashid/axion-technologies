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
    <section className="relative bg-[#0a0f1e] py-10 lg:py-20 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
                        <span className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Technical Resources
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-[25px] lg:text-5xl text-center font-bold text-white tracking-tight max-w-xl leading-[1.15] text-nowrap"

          >
            Downloads &amp; Documentation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 sm:mt-4 text-[12px] md:text-sm leading-5  md:leading-6 text-white"
          >
            Datasheets, CAD drawings, photometric files, and certificates — everything you need, ready to download.
          </motion.p>
        </div>

        {/* Table-style list */}
        <div className="border-t border-white/10">
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
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-5 border-b border-white/10 hover:bg-white/[0.03] transition-colors duration-200 rounded-sm"
              >
                {/* Left: type badge + title */}
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  {/* Type pill */}
                  <div className="flex-shrink-0 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Divider */}
                  <span className="hidden sm:block h-4 w-px bg-white/10 flex-shrink-0" />

                  {/* Title */}
                  <span className="text-white/90 font-medium text-sm sm:text-base truncate group-hover:text-white transition-colors duration-150">
                    {file.title}
                  </span>
                </div>

                {/* Right: size + CTA */}
                <div className="flex items-center gap-6 flex-shrink-0 pl-0 sm:pl-4">
                  {file.size && (
                    <span className="text-slate-500 text-xs font-medium tabular-nums hidden sm:block">
                      {file.size}
                    </span>
                  )}

                  <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm group-hover:text-sky-300 transition-colors duration-150">
                    <span className="hidden sm:inline">Download</span>
                    <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-sky-500/30 group-hover:border-sky-400/60 group-hover:bg-sky-500/10 transition-all duration-200">
                      <Download size={14} className="hidden group-hover:block absolute transition-all duration-150" />
                      <ArrowUpRight size={14} className="block group-hover:hidden absolute transition-all duration-150" />
                    </span>
                  </div>
                </div>

                {/* Hover left accent bar */}
                <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-sky-500 group-hover:h-10 transition-all duration-300 rounded-full" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}