"use client";

import {
  Settings,
  ShieldCheck,
  Globe,
  Factory,
  Cpu,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY_STATS, getYearsExperience } from "@/lib/constants";

const expertise = [
  {
    icon: Settings,
    title: "Deep Experience",
    description: "Decades of deep industry knowledge and engineering heritage.",
  },
  {
    icon: Cpu,
    title: "Engineering-Driven",
    description: "Technical solutions built on rigorous engineering principles.",
  },
  {
    icon: Factory,
    title: "Global Manufacturing",
    description: "Large-scale production facilities across strategic hubs.",
  },
  {
    icon: Globe,
    title: "International Supply",
    description: "Robust logistics and supply chain for global delivery.",
  },
  {
    icon: Users,
    title: "Regional Support",
    description: "Local expertise in Japan, China, Dubai, and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Focused",
    description: "Uncompromising standards in every component we deliver.",
  },
];

export default function ExpertiseSection() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container-custom">
        {/* Header - Matches ProductsSection precisely */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-sora font-extrabold text-primary tracking-tighter"
          >
            Engineering Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-4 max-w-2xl text-lg"
          >
            We don't just supply products; we engineer integrated visual ecosystems that define modern infrastructure for mission-critical and enterprise environments.
          </motion.p>
        </div>

        {/* Metrics Row with Dotted Pattern Background */}
        <div className="relative py-16 lg:py-24 mb-16 bg-white border border-slate-100 overflow-hidden">
          {/* World Map Background Image */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url("/images/world-map-dotted.png")' }}
          />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-6 text-center divide-x-0 md:divide-x divide-slate-100">
            <div className="flex flex-col justify-center px-4">
              <span className="text-5xl lg:text-6xl font-bold text-accent font-sora mb-3">2006</span>
              <span className="text-sm text-primary font-bold">Founded</span>
            </div>
            <div className="flex flex-col justify-center px-4 border-l border-slate-100 md:border-l-0">
              <span className="text-5xl lg:text-6xl font-bold text-accent font-sora mb-3">{COMPANY_STATS.PROJECTS_DELIVERED}</span>
              <span className="text-sm text-primary font-bold">Projects</span>
            </div>
            <div className="flex flex-col justify-center px-4 pt-8 md:pt-0 border-t border-slate-100 md:border-t-0">
              <span className="text-5xl lg:text-6xl font-bold text-accent font-sora mb-3">{COMPANY_STATS.MANUFACTURING_AREA}</span>
              <span className="text-sm text-primary font-bold">Factory Area (m²)</span>
            </div>
            <div className="flex flex-col justify-center px-4 pt-8 md:pt-0 border-t border-l border-slate-100 md:border-t-0 md:border-l-0">
              <span className="text-5xl lg:text-6xl font-bold text-accent font-sora mb-3">{COMPANY_STATS.GLOBAL_LOCATIONS}</span>
              <span className="text-sm text-primary font-bold">Global Hubs</span>
            </div>
          </div>
        </div>

        {/* Features Grid - Matches ProductsSection grid spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-200 p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden flex flex-col"
            >
              {/* Decorative background icon */}
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <item.icon className="w-32 h-32 text-primary" />
              </div>

              <div className="h-14 w-14 bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-primary transition-colors duration-300">
                <item.icon className="h-6 w-6 text-accent group-hover:text-white transition-colors" />
              </div>

              <div className="relative z-10 mt-auto">
                <h4 className="font-bold text-primary mb-3 text-xl font-sora tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
