"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Mic2, 
  Presentation, 
  Building2, 
  History, 
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

const industries = [
  {
    name: 'Live Events & Entertainment',
    subtitle: 'High-Impact Spectacles',
    icon: Mic2,
    desc: 'Full-scale visual and audio technology for concerts, music festivals, and touring productions. We engineer high-brightness outdoor LED systems that define the world\'s most iconic stages.',
    applications: ['Concert LED screens', 'Stage lighting rigs', 'Line array sound', 'LED video walls'],
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80",
    size: "wide",
  },
  {
    name: 'Exhibitions & Trade Shows',
    subtitle: 'Brand Activations',
    icon: Presentation,
    desc: 'Impactful visual technology solutions for exhibition booths and brand activation events. We create immersive environments that capture attention and drive engagement.',
    applications: ['Exhibition LED walls', 'Interactive kiosks', 'Digital signage', 'AV infrastructure'],
    image: "/images/solutions/exhibitions.png",
    size: "standard",
  },
  {
    name: 'Corporate Environments',
    subtitle: 'Enterprise Infrastructure',
    icon: Building2,
    desc: 'Professional AV solutions for boardrooms, lobbies, and executive spaces. We integrate advanced video conferencing and interactive displays into modern corporate ecosystems.',
    applications: ['Boardroom displays', 'Video conferencing', 'Digital directories', 'Lobby signage'],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80",
    size: "standard",
  },
  {
    name: 'Museums & Experience Centers',
    subtitle: 'Immersive Narratives',
    icon: History,
    desc: 'Immersive visual technologies for museums and brand experience spaces. We bridge the gap between architectural design and digital storytelling.',
    applications: ['Creative LED', 'Interactive exhibits', 'Transparent displays', 'Immersive AV'],
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80",
    size: "standard",
  },
  {
    name: 'Retail & Digital Signage',
    subtitle: 'Omnichannel Engagement',
    icon: ShoppingBag,
    desc: 'Dynamic digital signage solutions for luxury retail and flagship stores. We transform customer journeys through artistic digital content and interactive touchpoints.',
    applications: ['Window LED', 'Video walls', 'Menu boards', 'Wayfinding'],
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80",
    size: "standard",
  },
  {
    name: 'Command & Control Centers',
    subtitle: 'Mission-Critical Operations',
    icon: Activity,
    desc: 'High-reliability video wall solutions for operations centers and security control rooms. We engineer fine-pitch LED systems for 24/7 mission-critical environments.',
    applications: ['LED video walls', 'Fine-pitch displays', 'LCD walls', 'Control systems'],
    image: "/images/solutions/control-centers.png",
    size: "wide",
  },
];

export default function IndustriesPage() {
  return (
    <main className="bg-white">
      <PageHero
        title="Solutions for Diverse Professional Environments"
        subtitle="Axion Technology delivers professional visual technology solutions across 10+ industries, engineered for reliability and high-impact performance."
        badge="Markets Served"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Expertise"
            title="Industries We Serve"
            subtitle="Professional visual technology solutions for the full spectrum of modern professional environments."
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
                    "group relative min-h-[450px] overflow-hidden rounded-[2.5rem] bg-slate-900",
                    isWide ? "md:col-span-12 lg:col-span-8" : "md:col-span-6 lg:col-span-4"
                  )}
                >
                  {/* Background Image with Overlay */}
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/20 backdrop-blur-md rounded-lg text-accent">
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
                          <span key={app} className="text-[9px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 text-white/70 px-3 py-1 rounded-full backdrop-blur-sm">
                            {app}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6">
                        <Link href="/solutions" className="flex items-center gap-2 text-white font-bold text-sm group/btn">
                          <span>View Industry Solutions</span>
                          <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:scale-110 transition-all duration-300">
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
                className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-accent mb-6">
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
