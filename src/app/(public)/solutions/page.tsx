import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Globe, Settings } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Engineering Solutions',
  description:
    'Custom visual technology engineering solutions for global enterprise environments — from concept to deployment.',
};

const solutions = [
  {
    title: 'Custom LED Engineering',
    desc: 'Bespoke LED display systems engineered for unique architectural environments and high-performance requirements.',
    features: ['Custom Pixel Pitch', 'Curved & Flexible Panels', 'Advanced Control Systems'],
  },
  {
    title: 'Integrated AV Ecosystems',
    desc: 'Seamless integration of visual, audio, and control technologies for command centers and corporate hubs.',
    features: ['Signal Management', 'Centralized Control', 'Network Optimization'],
  },
  {
    title: 'Live Event Infrastructure',
    desc: "High-reliability visual infrastructure engineered for the world's most demanding touring and event environments.",
    features: ['Fast-deploy Systems', 'Road-ready Durability', 'Redundant Power'],
  },
  {
    title: 'Interactive Technology',
    desc: 'Advanced touch and sensor-based visual solutions for museums, retail, and experiential environments.',
    features: ['Multi-touch Surfaces', 'Motion Tracking', 'Custom Content Delivery'],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="Engineering Integrated Visual Ecosystems"
        subtitle="We don't just supply products; we engineer integrated visual ecosystems that define modern infrastructure across the Middle East and Europe."
        badge="Our Services"
        backgroundImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
      />

      {/* Solutions Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Expertise"
            title="Technical Capabilities"
            subtitle="Professional engineering solutions tailored for complex project requirements."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol) => (
              <div key={sol.title} className="p-10 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{sol.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{sol.desc}</p>
                <div className="space-y-3">
                  {sol.features.map((f) => (
                    <div key={f} className="flex items-center text-sm font-medium text-primary">
                      <Zap size={14} className="text-accent mr-3" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Our Network"
                title="Global Operations & Supply Chain"
                align="left"
              />
              <p className="text-slate-600 leading-relaxed mb-8">
                With operations in Hong Kong, Shenzhen, and Dubai, we coordinate international 
                supply chains and support clients across the Middle East and Europe with 
                manufacturing coordination, quality assurance, and regional inventory support.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary">3</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Global Hubs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary">10+</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Markets Served</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md bg-white rounded-3xl shadow-2xl p-12 flex flex-col justify-center border border-slate-100">
                <div className="bg-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                  <Globe className="text-white h-8 w-8" />
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">International Standards</h4>
                <p className="text-slate-600 leading-relaxed">
                  Every solution we engineer meets rigorous international performance and safety 
                  standards, ensuring reliability in even the most demanding environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

