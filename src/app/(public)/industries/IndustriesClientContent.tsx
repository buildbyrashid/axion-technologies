"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Mic2, 
  Presentation, 
  Building2, 
  History as HistoryIcon, 
  ShoppingBag, 
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Zap
} from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { cn } from "@/lib/utils";

interface IndustriesClientContentProps {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  
  secBadge: string;
  secTitle: string;
  secSubtitle: string;
  
  indTitle1: string;
  indSub1: string;
  indDesc1: string;
  indImg1: string;

  indTitle2: string;
  indSub2: string;
  indDesc2: string;
  indImg2: string;

  indTitle3: string;
  indSub3: string;
  indDesc3: string;
  indImg3: string;

  indTitle4: string;
  indSub4: string;
  indDesc4: string;
  indImg4: string;

  indTitle5: string;
  indSub5: string;
  indDesc5: string;
  indImg5: string;

  indTitle6: string;
  indSub6: string;
  indDesc6: string;
  indImg6: string;
}

export default function IndustriesClientContent({
  heroTitle,
  heroSubtitle,
  heroBadge,
  heroImage,
  secBadge,
  secTitle,
  secSubtitle,
  
  indTitle1, indSub1, indDesc1, indImg1,
  indTitle2, indSub2, indDesc2, indImg2,
  indTitle3, indSub3, indDesc3, indImg3,
  indTitle4, indSub4, indDesc4, indImg4,
  indTitle5, indSub5, indDesc5, indImg5,
  indTitle6, indSub6, indDesc6, indImg6
}: IndustriesClientContentProps) {
  
  const industries = [
    {
      name: indTitle1,
      subtitle: indSub1,
      icon: Mic2,
      desc: indDesc1,
      applications: ['Concert LED screens', 'Stage lighting rigs', 'Line array sound', 'LED video walls'],
      image: indImg1,
      size: "wide",
    },
    {
      name: indTitle2,
      subtitle: indSub2,
      icon: Presentation,
      desc: indDesc2,
      applications: ['Exhibition LED walls', 'Interactive kiosks', 'Digital signage', 'AV infrastructure'],
      image: indImg2,
      size: "standard",
    },
    {
      name: indTitle3,
      subtitle: indSub3,
      icon: Building2,
      desc: indDesc3,
      applications: ['Boardroom displays', 'Video conferencing', 'Digital directories', 'Lobby signage'],
      image: indImg3,
      size: "standard",
    },
    {
      name: indTitle4,
      subtitle: indSub4,
      icon: HistoryIcon,
      desc: indDesc4,
      applications: ['Creative LED', 'Interactive exhibits', 'Transparent displays', 'Immersive AV'],
      image: indImg4,
      size: "standard",
    },
    {
      name: indTitle5,
      subtitle: indSub5,
      icon: ShoppingBag,
      desc: indDesc5,
      applications: ['Window LED', 'Video walls', 'Menu boards', 'Wayfinding'],
      image: indImg5,
      size: "standard",
    },
    {
      name: indTitle6,
      subtitle: indSub6,
      icon: Activity,
      desc: indDesc6,
      applications: ['LED video walls', 'Fine-pitch displays', 'LCD walls', 'Control systems'],
      image: indImg6,
      size: "wide",
    },
  ];

  return (
    <main className="bg-white">
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        backgroundImage={heroImage}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge={secBadge}
            title={secTitle}
            subtitle={secSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {industries.map((ind, idx) => {
              const isWide = ind.size === "wide";
              
              return (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "group relative min-h-[450px] overflow-hidden bg-slate-900",
                    isWide ? "md:col-span-12 lg:col-span-8" : "md:col-span-6 lg:col-span-4"
                  )}
                >
                  {/* Background Image with Overlay */}
                  {ind.image ? (
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-500 text-xs font-black uppercase tracking-widest">
                      No Image Asset
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/20 backdrop-blur-md text-accent">
                          <ind.icon size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                          {ind.subtitle}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                          {ind.name}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-xl line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                          {ind.desc}
                        </p>
                      </div>

                      <div className="pt-4 flex flex-wrap gap-2">
                        {ind.applications.map((app) => (
                          <span key={app} className="text-[9px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 text-white/70 px-3 py-1 backdrop-blur-sm">
                            {app}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6">
                        <Link href="/solutions" className="flex items-center gap-2 text-white font-bold text-sm group/btn">
                          <span>View Industry Solutions</span>
                          <div className="h-8 w-8 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:scale-110 transition-all duration-300">
                            <ArrowUpRight size={16} />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Authority Section */}
      <section className="section-padding bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-accent font-bold tracking-widest text-sm uppercase mb-4 block">Industry Leadership</span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-primary mb-6">
              Engineering Excellence Across Strategic Global Markets
            </h2>
            <p className="text-slate-500 text-lg">
              Our presence in key international hubs allows us to coordinate complex visual infrastructure deployments with localized expertise and global standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Global Supply Chain",
                desc: "Strategic coordination between our Hong Kong, Shenzhen, and Dubai hubs for seamless delivery.",
                icon: Globe
              },
              {
                title: "Technical Validation",
                desc: "Every installation undergoes rigorous performance testing to meet international enterprise standards.",
                icon: ShieldCheck
              },
              {
                title: "Rapid Deployment",
                desc: "Engineered systems designed for fast setup and high reliability in demanding environments.",
                icon: Zap
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="h-14 w-14 bg-slate-50 flex items-center justify-center text-accent mb-6">
                  <item.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
