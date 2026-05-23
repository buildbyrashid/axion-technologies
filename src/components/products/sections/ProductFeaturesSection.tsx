"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductData } from "@/data/products";

interface Props {
  features: ProductData["features"];
}

export default function ProductFeaturesSection({ features }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">
              Engineering Excellence
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.07 }}
            className="text-[26px] sm:text-4xl font-bold tracking-tight text-black"
          >
            Key Technical Advantages
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed"
          >
            Explore innovative engineering solutions designed to deliver superior
            performance, operational flexibility, and seamless industrial integration.
          </motion.p>
        </div>

        {/* Grid — desktop: 3 cols with dividers, mobile: slider */}

        {/* Mobile Slider */}
        <div className="sm:hidden relative">

          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4 px-1"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="min-w-[85%] snap-center flex flex-col items-center text-center px-6 py-10 border border-slate-100 bg-white rounded-none-none shadow-sm"
              >
                {/* Icon placeholder */}
                <div className="mb-6 text-orange-400">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:block border border-slate-200 rounded-none-none overflow-hidden">
          {features.map((feature, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const totalRows = Math.ceil(features.length / 3);
            const isLastRow = row === totalRows - 1;
            const isLastCol = col === 2 || index === features.length - 1;
            const isFirstInRow = col === 0;

            // icon colors cycling
            const iconColors = [
              "text-orange-400",
              "text-teal-500",
              "text-blue-500",
              "text-indigo-500",
              "text-red-400",
              "text-purple-500",
            ];
            const iconColor = iconColors[index % iconColors.length];

            // Simple icon shapes cycling
            const icons = [
              <svg key="a" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>,
              <svg key="b" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-6 0v4"/><rect x="2" y="9" width="20" height="13" rx="2"/></svg>,
              <svg key="c" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
              <svg key="d" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
              <svg key="e" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 17a5.5 5.5 0 0 1 11 0"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="8" y1="21" x2="16" y2="21"/></svg>,
              <svg key="f" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
            ];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                style={{
                  float: "left",
                  width: "33.333%",
                  borderRight: !isLastCol ? "1px solid #e2e8f0" : "none",
                  borderBottom: !isLastRow ? "1px solid #e2e8f0" : "none",
                  boxSizing: "border-box",
                }}
                className="flex flex-col items-center text-center px-8 py-10 hover:bg-slate-50 transition-colors duration-200"
              >
                <div className={`mb-5 ${iconColor}`}>
                  {icons[index % icons.length]}
                </div>
                <h3 className="text-base font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-6">{feature.description}</p>
              </motion.div>
            );
          })}
          {/* clearfix */}
          <div style={{ clear: "both" }} />
        </div>

      </div>
    </section>
  );
}