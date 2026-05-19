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
  History as HistoryIcon,
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

interface SolutionsClientContentProps {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  
  techBadge: string;
  techTitle: string;
  techSubtitle: string;
  techTitle1: string;
  techImg1: string;
  techTitle2: string;
  techImg2: string;
  techTitle3: string;
  techImg3: string;
  techTitle4: string;
  techImg4: string;
  techTitle5: string;
  techImg5: string;

  envBadge: string;
  envTitle: string;
  envSubtitle: string;
  envTitle1: string;
  envImg1: string;
  envTitle2: string;
  envImg2: string;
  envTitle3: string;
  envImg3: string;
  envTitle4: string;
  envImg4: string;
  envTitle5: string;
  envImg5: string;
  envTitle6: string;
  envImg6: string;
  envTitle7: string;
  envImg7: string;
}

export default function SolutionsClientContent({
  heroTitle,
  heroSubtitle,
  heroBadge,
  heroImage,
  techBadge,
  techTitle,
  techSubtitle,
  techTitle1,
  techImg1,
  techTitle2,
  techImg2,
  techTitle3,
  techImg3,
  techTitle4,
  techImg4,
  techTitle5,
  techImg5,
  envBadge,
  envTitle,
  envSubtitle,
  envTitle1,
  envImg1,
  envTitle2,
  envImg2,
  envTitle3,
  envImg3,
  envTitle4,
  envImg4,
  envTitle5,
  envImg5,
  envTitle6,
  envImg6,
  envTitle7,
  envImg7
}: SolutionsClientContentProps) {
  
  // Dynamically constructed card lists bound to database columns
  const technologies = [
    {
      title: techTitle1,
      desc: "Integrated display ecosystems engineered for modern enterprise environments.",
      image: techImg1,
      icon: Monitor,
    },
    {
      title: techTitle2,
      desc: "Precision-engineered interactive touch solutions for high-traffic environments.",
      image: techImg2,
      icon: Layout,
    },
    {
      title: techTitle3,
      desc: "Advanced architectural and stage lighting systems with centralized control integration.",
      image: techImg3,
      icon: Zap,
    },
    {
      title: techTitle4,
      desc: "Acoustically engineered sound reinforcement for enterprise and venue infrastructure.",
      image: techImg4,
      icon: Music,
    },
    {
      title: techTitle5,
      desc: "Robust power distribution and high-bandwidth signal management ecosystems.",
      image: techImg5,
      icon: Cpu,
    },
  ];

  const environments = [
    {
      title: envTitle1,
      subtitle: "Enterprise Environments",
      desc: "Immersive collaboration environments engineered for modern enterprise communication and operational efficiency. We transform boardrooms into high-performance decision hubs.",
      image: envImg1,
      size: "hero",
      icon: Building2,
    },
    {
      title: envTitle2,
      subtitle: "Global Touring",
      desc: "Cinematic visual infrastructure for world-class concerts and stadium-scale events.",
      image: envImg2,
      size: "standard",
      icon: Mic2,
    },
    {
      title: envTitle3,
      subtitle: "Critical Operations",
      desc: "Mission-critical visualization systems for 24/7 monitoring and security operational environments.",
      image: envImg3,
      size: "standard",
      icon: Activity,
    },
    {
      title: envTitle4,
      subtitle: "Experiential Retail",
      desc: "Transforming customer journeys through immersive digital storytelling and interactive retail experiences.",
      image: envImg4,
      size: "wide",
      icon: ShoppingBag,
    },
    {
      title: envTitle5,
      subtitle: "Immersive Storytelling",
      desc: "Blending architectural design with interactive technology to create unforgettable narrative environments.",
      image: envImg5,
      size: "standard",
      icon: HistoryIcon,
    },
    {
      title: envTitle6,
      subtitle: "Production Excellence",
      desc: "High-specification studio displays and visual ecosystems for global broadcasting and content production.",
      image: envImg6,
      size: "standard",
      icon: Tv,
    },
    {
      title: envTitle7,
      subtitle: "Premium Guest Experiences",
      desc: "Luxury visual integration for high-end hospitality venues, lounges, and entertainment complexes.",
      image: envImg7,
      size: "standard",
      icon: Coffee,
    },
  ];

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        backgroundImage={heroImage}
      />

      {/* SECTION 1 - Integrated Engineering Technologies */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-custom">
          <SectionHeader
            badge={techBadge}
            title={techTitle}
            subtitle={techSubtitle}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {technologies.map((tech, idx) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden bg-white border border-slate-100 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700",
                  idx === 0 ? "lg:col-span-2" : ""
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-64 mb-8 overflow-hidden bg-slate-950">
                    {tech.image ? (
                      <Image
                        src={tech.image}
                        alt={tech.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-500 text-xs font-black uppercase tracking-widest">
                        No Image Asset
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 text-accent">
                          <tech.icon size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-primary">{tech.title}</h3>
                      </div>
                      <p className="text-slate-500 leading-relaxed text-sm max-w-md">
                        {tech.desc}
                      </p>
                    </div>
                    <div className="h-10 w-10 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
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
            badge={envBadge}
            title={envTitle}
            subtitle={envSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
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
                    "group relative min-h-[450px] overflow-hidden bg-primary",
                    isHero ? "md:col-span-12 lg:col-span-8 lg:row-span-2" : 
                    isWide ? "md:col-span-12" : "md:col-span-6 lg:col-span-4"
                  )}
                >
                  {/* Background Image with Cinematic Overlay */}
                  {env.image ? (
                    <Image
                      src={env.image}
                      alt={env.title}
                      fill
                      className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-500 text-xs font-black uppercase tracking-widest">
                      No Image Asset
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-[10px] font-bold uppercase tracking-widest">
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
                          <div className="h-8 w-8 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:scale-110 transition-all duration-300">
                            <ArrowUpRight size={16} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Icon */}
                  <div className="absolute top-10 right-10 p-4 bg-white/5 backdrop-blur-md border border-white/10 text-white/50 group-hover:text-accent group-hover:bg-white/10 transition-all duration-500">
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
                    <div className="h-12 w-12 shrink-0 bg-primary flex items-center justify-center border border-white/10">
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
              className="relative aspect-square overflow-hidden border border-white/10"
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
    </>
  );
}
