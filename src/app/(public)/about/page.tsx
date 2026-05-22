import type { Metadata } from 'next';
import { Globe, ShieldCheck, Factory, Cpu } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import Image from 'next/image';
import { query } from '@/lib/db-helpers';

export const dynamic = 'force-dynamic';

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

async function getAboutData() {
  try {
    const rows = await query<any[]>('SELECT * FROM about_page WHERE is_active = 1 LIMIT 1');
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching about page database content:", error);
    return null;
  }
}

export default async function AboutPage() {
  const dbData = await getAboutData();

  // Fallbacks corresponding to original high-fidelity content
  const heroBadge = dbData?.hero_badge || "About Us";
  const heroTitle = dbData?.hero_title || "Engineering Technology for Modern Visual Environments";
  const heroSubtitle = dbData?.hero_subtitle || "Axion Technology Co Ltd is a global visual technology engineering company delivering professional LED display systems and integrated AV solutions.";
  const heroImage = dbData?.hero_image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";

  const whoWeAreBadge = dbData?.who_we_are_badge || "Who We Are";
  const whoWeAreTitle = dbData?.who_we_are_title || "Global Leaders in Visual Engineering";
  const whoWeArePara1 = dbData?.who_we_are_paragraph_1 || "Axion Technology Co Ltd is a global visual technology engineering company delivering professional LED display systems, integrated AV solutions, interactive technologies, lighting, audio systems, and technical infrastructure for events, exhibitions, corporate environments, and modern visual experiences.";
  const whoWeArePara2 = dbData?.who_we_are_paragraph_2 || "Backed by over 20 years of industry experience across the Middle East and Europe, Axion combines engineering expertise, OEM manufacturing partnerships, and global supply capabilities to support clients with high-performance visual technologies tailored for real-world applications.";
  const whoWeAreImage = dbData?.who_we_are_image || "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80";
  const technicalReach = dbData?.technical_reach || "Hong Kong | Shenzhen | Dubai";

  const opsTitle = dbData?.global_operations_title || "Global Operations";
  const opsDesc = dbData?.global_operations_description || "With operational presence in Hong Kong, Shenzhen, and Dubai, Axion supports international clients through manufacturing coordination, quality-focused production, regional inventory support, and international logistics.";

  const solutionsTitle = dbData?.visual_solutions_title || "Visual Solutions";
  const solutionsDesc = dbData?.visual_solutions_description || "From rental-grade LED systems and touring technologies to premium COB, MIP, and enterprise collaboration displays, Axion delivers scalable visual solutions engineered for reliability, performance, and long-term value.";

  return (
    <main className="bg-white">
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        badge={heroBadge}
        backgroundImage={heroImage}
      />

      {/* Main Narrative Section */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
              <SectionHeader
                badge={whoWeAreBadge}
                title={whoWeAreTitle}
                align="left"
              />
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                {whoWeArePara1 && <p>{whoWeArePara1}</p>}
                {whoWeArePara2 && <p>{whoWeArePara2}</p>}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden shadow-2xl relative">
                <Image
                  src={whoWeAreImage}
                  alt="Axion Technology Operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating Highlight */}
              {technicalReach && (
                <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl border border-slate-100 max-w-xs hidden sm:block">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">Technical Reach</p>
                  <p className="text-2xl font-bold text-[#0D95F0] tracking-tight">{technicalReach}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-24 pt-24 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-primary font-sora tracking-tight">{opsTitle}</h4>
              <p className="leading-relaxed text-slate-600">
                {opsDesc}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-primary font-sora tracking-tight">{solutionsTitle}</h4>
              <p className="leading-relaxed text-slate-600">
                {solutionsDesc}
              </p>
            </div>
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
              <div key={tech.title} className="bg-white p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="h-12 w-12 bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#0D95F0]/10 transition-colors">
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
              <div key={hub.city} className="p-10 bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D95F0]/5 -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0D95F0]/10 transition-colors" />
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
