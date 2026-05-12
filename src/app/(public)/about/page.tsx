import type { Metadata } from 'next';
import { Globe, ShieldCheck, Factory, Cpu } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Axion Technology',
  description: 'Axion Technology Co Ltd is a global visual technology engineering company specializing in professional LED systems and integrated AV solutions.',
};

const technicalCore = [
  { 
    title: "LED Display Systems", 
    tagline: "Brilliant Visuals for Every Environment.",
    icon: <Globe className="text-accent" />
  },
  { 
    title: "LCD & Interactive Kiosks", 
    tagline: "Smart Displays for Connected Experiences.",
    icon: <Cpu className="text-accent" />
  },
  { 
    title: "Lighting Systems", 
    tagline: "Dynamic Lighting for Immersive Spaces.",
    icon: <ShieldCheck className="text-accent" />
  },
  { 
    title: "Professional Audio", 
    tagline: "Precision Audio for Powerful Experiences.",
    icon: <Factory className="text-accent" />
  }
];

const hubs = [
  {
    city: 'Hong Kong',
    role: 'Global Business Hub',
    desc: 'International business coordination, client relations, and strategic development hub.',
  },
  {
    city: 'Shenzhen',
    role: 'Manufacturing Hub',
    desc: 'OEM coordination, quality-focused production, and manufacturing management.',
  },
  {
    city: 'Dubai',
    role: 'Regional Support Hub',
    desc: 'Middle East inventory support, project coordination, and regional logistics.',
  }
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <PageHero
        title="Engineering Technology for Modern Visual Environments"
        subtitle="Axion Technology Co Ltd is a global visual technology engineering company delivering professional LED display systems and integrated AV solutions."
        badge="About Us"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
      />

      {/* Main Narrative Section */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
              <SectionHeader
                badge="Who We Are"
                title="Global Leaders in Visual Engineering"
                align="left"
              />
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  Axion Technology Co Ltd is a global visual technology engineering company delivering professional 
                  LED display systems, integrated AV solutions, interactive technologies, lighting, audio systems, 
                  and technical infrastructure for events, exhibitions, corporate environments, and modern visual experiences.
                </p>
                <p>
                  Backed by over 20 years of industry experience across the Middle East and Europe, Axion combines 
                  engineering expertise, OEM manufacturing partnerships, and global supply capabilities to support 
                  clients with high-performance visual technologies tailored for real-world applications.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
                  alt="Axion Technology Operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating Highlight */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">Technical Reach</p>
                <p className="text-2xl font-bold text-primary tracking-tight">Hong Kong | Shenzhen | Dubai</p>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-24 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600">
            <p className="leading-relaxed">
              With operational presence in Hong Kong, Shenzhen, and Dubai, Axion supports international 
              clients through manufacturing coordination, quality-focused production, regional inventory 
              support, and international logistics.
            </p>
            <p className="leading-relaxed">
              From rental-grade LED systems and touring technologies to premium COB, MIP, and enterprise 
              collaboration displays, Axion delivers scalable visual solutions engineered for reliability, 
              performance, and long-term value.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Core Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <SectionHeader
            badge="Our Foundation"
            title="Technical Core Competencies"
            subtitle="Delivering scalable visual solutions engineered for reliability and long-term value."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalCore.map((tech) => (
              <div key={tech.title} className="bg-white p-8 rounded-[32px] border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  {tech.icon}
                </div>
                <h4 className="text-xl font-bold text-primary mb-3 font-sora">{tech.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{tech.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubs Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-custom text-center">
          <SectionHeader
            badge="Global Hubs"
            title="Strategic Operational Presence"
            subtitle="Providing manufacturing coordination and regional inventory support from key technology centers."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {hubs.map((hub) => (
              <div key={hub.city} className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
                <h3 className="text-3xl font-bold text-primary mb-2 tracking-tight">{hub.city}</h3>
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-6">{hub.role}</div>
                <p className="text-slate-500 leading-relaxed text-sm">{hub.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
