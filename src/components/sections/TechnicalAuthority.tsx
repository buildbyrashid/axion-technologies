



"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Experience", value: "20+", suffix: "Years" },
  { label: "Presence", value: "Global", suffix: "Locations" },
  { label: "Manufacturing", value: "5000+", suffix: "Sq.m" },
];

const features = [
  "Precision Thermal Management Systems",
  "High-Reflectivity Optical Coatings",
  "Structural Grade 6061-T6 Aluminum",
  "Advanced Signal Redundancy Protocols",
  "Automated Calibration Algorithms",
];

export default function TechnicalAuthority() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: 3D Schematic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <Image
                src="/images/bento/led-schematic.png"
                alt="Technical Schematic"
                fill
                className="object-contain"
              />
              {/* Overlay elements for technical feel */}
              <div className="absolute top-0 left-0 w-full h-full border-[0.5px] border-slate-200 pointer-events-none" />
              <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Axion-Eng-042
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block"
            >
              Engineering Excellence
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-5xl font-sora font-extrabold text-primary mb-8 tracking-tighter"
            >
              The Science of <br /> Visual Authority
            </motion.h2>

            <div className="space-y-4 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-slate-600 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-mono font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {stat.label} {stat.suffix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}