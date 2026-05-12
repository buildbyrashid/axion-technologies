"use client";

import Image from "next/image";
import { 
  Settings, 
  ShieldCheck, 
  Globe, 
  Factory, 
  Cpu, 
  Users 
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY_STATS, getYearsExperience } from "@/lib/constants";

const expertise = [
  {
    icon: Settings,
    title: `${getYearsExperience()}+ Years Experience`,
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
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
                  alt="Engineering"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80"
                  alt="Production"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80"
                  alt="Quality Control"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                  alt="Manufacturing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              badge="Our Expertise"
              title="Built on Foundation of Engineering Excellence"
              align="left"
              subtitle="We don't just supply products; we engineer integrated visual ecosystems that define modern infrastructure."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex space-x-4"
                >
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
