"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Monitor, 
  Layout, 
  Zap, 
  Music, 
  Cpu, 
  ArrowUpRight,
  Building2,
  Mic2,
  Activity,
  ShoppingBag,
  History,
  Tv,
  Coffee,
  Workflow,
  Globe,
  ShieldCheck
} from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { cn } from "@/lib/utils";

const technologies = [
  {
    title: "LED Display Systems",
    desc: "Integrated display ecosystems engineered for modern enterprise environments.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    icon: Monitor,
  },
  {
    title: "LCD & Interactive Kiosks",
    desc: "Precision-engineered interactive touch solutions for high-traffic environments.",
    image: "/images/solutions/kiosk.png",
    icon: Layout,
  },
  {
    title: "Professional Lighting",
    desc: "Advanced architectural and stage lighting systems with centralized control integration.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
    icon: Zap,
  },
  {
    title: "Professional Audio",
    desc: "Acoustically engineered sound reinforcement for enterprise and venue infrastructure.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    icon: Music,
  },
  {
    title: "Power & Connectivity",
    desc: "Robust power distribution and high-bandwidth signal management ecosystems.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80",
    icon: Cpu,
  },
];

const environments = [
  {
    title: "Corporate Visual Ecosystems",
    subtitle: "Enterprise Environments",
    desc: "Immersive collaboration environments engineered for modern enterprise communication and operational efficiency. We transform boardrooms into high-performance decision hubs.",
    image: "/images/solutions/corporate-solutions.png",
    size: "hero",
    icon: Building2,
  },
  {
    title: "Live Event Infrastructure",
    subtitle: "Global Touring",
    desc: "Cinematic visual infrastructure for world-class concerts and stadium-scale events.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80",
    size: "standard",
    icon: Mic2,
  },
  {
    title: "Command & Control Centers",
    subtitle: "Critical Operations",
    desc: "Mission-critical visualization systems for 24/7 monitoring and security operational environments.",
    image: "/images/solutions/control-centers.png",
    size: "standard",
    icon: Activity,
  },
  {
    title: "Retail & Digital Signage",
    subtitle: "Experiential Retail",
    desc: "Transforming customer journeys through immersive digital storytelling and interactive retail experiences.",
    image: "/images/solutions/retail-experience.png",
    size: "wide",
    icon: ShoppingBag,
  },
  {
    title: "Museums & Experience Centers",
    subtitle: "Immersive Storytelling",
    desc: "Blending architectural design with interactive technology to create unforgettable narrative environments.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80",
    size: "standard",
    icon: History,
  },
  {
    title: "Broadcast & Studios",
    subtitle: "Production Excellence",
    desc: "High-specification studio displays and visual ecosystems for global broadcasting and content production.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
    size: "standard",
    icon: Tv,
  },
  {
    title: "Hospitality & Entertainment",
    subtitle: "Premium Guest Experiences",
    desc: "Luxury visual integration for high-end hospitality venues, lounges, and entertainment complexes.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
    size: "standard",
    icon: Coffee,
  },
];

export default function SolutionsPage() {
  return (
    <main className="bg-white">
      <PageHero
        title="Engineering Integrated Visual Ecosystems"
        subtitle="Moving beyond equipment to engineer complete visual environments that redefine professional infrastructure."
        badge="Enterprise Solutions"
        backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80"
      />

      {/* SECTION 1 - Integrated Engineering Technologies */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-custom">
          <SectionHeader
            badge="Technical Foundations"
            title="Integrated Engineering Technologies"
            subtitle="Core engineering systems that power our advanced visual infrastructure."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, idx) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700",
                  idx === 0 ? "lg:col-span-2" : ""
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-64 mb-8 overflow-hidden rounded-[2rem]">
                    <Image
                      src={tech.image}
                      alt={tech.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg text-accent">
                          <tech.icon size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-primary">{tech.title}</h3>
                      </div>
                      <p className="text-slate-500 leading-relaxed text-sm max-w-md">
                        {tech.desc}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 - Real Solutions / Environments */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <SectionHeader
            badge="Environments"
            title="Solutions Built for Real Environments"
            subtitle="We don't just sell products; we transform physical spaces through cinematic visual engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {environments.map((env, idx) => {
              const isHero = env.size === "hero";
              const isWide = env.size === "wide";
              
              return (
                <motion.div
                  key={env.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "group relative min-h-[450px] overflow-hidden rounded-[3rem] bg-primary",
                    isHero ? "md:col-span-12 lg:col-span-8 lg:row-span-2" : 
                    isWide ? "md:col-span-12" : "md:col-span-6 lg:col-span-4"
                  )}
                >
                  {/* Background Image with Cinematic Overlay */}
                  <Image
                    src={env.image}
                    alt={env.title}
                    fill
                    className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
                          {env.subtitle}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className={cn(
                          "font-bold text-white leading-tight",
                          isHero ? "text-4xl" : "text-2xl"
                        )}>
                          {env.title}
                        </h3>
                        <p className={cn(
                          "text-slate-300 leading-relaxed max-w-xl transition-all duration-500",
                          isHero ? "text-lg" : "text-sm group-hover:text-white"
                        )}>
                          {env.desc}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center gap-4">
                        <button className="flex items-center gap-2 text-white font-bold text-sm group/btn">
                          <span>Explore Solution</span>
                          <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:scale-110 transition-all duration-300">
                            <ArrowUpRight size={16} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Icon */}
                  <div className="absolute top-10 right-10 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white/50 group-hover:text-accent group-hover:bg-white/10 transition-all duration-500">
                    <env.icon size={24} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Capability / Engineering Value Section */}
      <section className="section-padding bg-slate-950 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block">Engineering Excellence</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight text-white">
                From Engineering Concept to Global Deployment
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "System Integration",
                    desc: "We don't just supply hardware; we engineer entire ecosystems that integrate seamlessly with your existing infrastructure.",
                    icon: Workflow
                  },
                  {
                    title: "Deployment Logistics",
                    desc: "Coordinated global supply chains ensuring timely delivery and precision installation in even the most complex environments.",
                    icon: Globe
                  },
                  {
                    title: "Performance Validation",
                    desc: "Rigorous testing protocols that ensure every installation meets international enterprise standards for reliability.",
                    icon: ShieldCheck
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary flex items-center justify-center border border-white/10">
                      <item.icon className="text-accent h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
                alt="Engineering Excellence"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
