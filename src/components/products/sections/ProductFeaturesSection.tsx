"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="w-full bg-white py-10 sm:py-14 md:py-16 px-3 sm:px-4">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-white p-4 sm:p-6 md:p-10 border-blue-100 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="block h-px w-8 bg-sky-500" />
              <span className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">
                Engineering Excellence
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="text-[28px] leading-[36px] sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f172a]"
            >
              Key Technical Advantages
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="mt-3 sm:mt-4 text-sm md:text-base leading-6 md:leading-7 text-slate-600 max-w-2xl"
            >
              Explore innovative engineering solutions designed to deliver superior
              performance, operational flexibility, and seamless industrial integration.
            </motion.p>
          </div>

          {/* Arrow buttons — navy colour */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0a1628]/20 bg-white text-[#0a1628] transition-all duration-300 hover:bg-[#0a1628]/5"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a1628] text-white transition-all duration-300 hover:bg-[#0d1f35]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="mt-8 sm:mt-10 md:mt-12 flex items-stretch gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide px-1 pb-2 snap-x snap-mandatory"
        >
          {features.map((feature, index) => {
            const isDark = index === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className={`min-w-[85%] sm:min-w-[300px] min-h-[360px] rounded-[28px] p-5 sm:p-7 flex flex-col transition-all duration-300 border snap-center ${
                  isDark
                    ? "bg-[#0a1628] text-white border-[#0d1f35]"
                    : "bg-[#eff6ff] text-[#0f172a] border-[#0a1628]/10"
                }`}
              >
                {/* Icon */}
                <div className={`mb-6 sm:mb-8 ${isDark ? "text-white" : "text-[#0a1628]"}`}>
                  <CheckCircle2 size={28} />
                </div>

                {/* Title */}
                <h3 className={`text-[20px] sm:text-[22px] font-bold leading-[30px] sm:leading-[34px] ${isDark ? "text-white" : "text-black"}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`mt-4 sm:mt-5 text-sm leading-6 flex-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {feature.description}
                </p>

                {/* Button — navy colour */}
                <button
                  className={`mt-6 sm:mt-8 w-full sm:w-fit rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                    isDark
                      ? "bg-white text-[#0a1628] hover:bg-slate-100"
                      : "bg-[#0a1628] text-white hover:bg-[#0d1f35]"
                  }`}
                >
                  Learn More
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}