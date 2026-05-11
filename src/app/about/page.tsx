import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Globe, Clock, Wrench, ArrowRight } from 'lucide-react';
import { COMPANY_STATS, getYearsExperience } from '@/lib/constants';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Axion Technology',
  description:
    `Learn about Axion Technology Co Ltd — ${getYearsExperience()}+ years of visual technology engineering across the Middle East and Europe, with offices in Hong Kong, Shenzhen, and Dubai.`,
};

const milestones = [
  { year: `${getYearsExperience()}+`, label: 'Years of Experience' },
  { year: COMPANY_STATS.GLOBAL_LOCATIONS.toString(), label: 'Global Offices' },
  { year: '5', label: 'Product Categories' },
  { year: '10+', label: 'Industries Served' },
];

const values = [
  {
    icon: <Wrench size={24} className="text-accent" />,
    title: 'Engineering Excellence',
    desc: 'Every solution we deliver is built on a foundation of engineering expertise, precision manufacturing partnerships, and real-world performance testing.',
  },
  {
    icon: <Globe size={24} className="text-accent" />,
    title: 'Global Reach',
    desc: 'With operations across Hong Kong, Shenzhen, and Dubai, we coordinate international supply chains and support clients across the Middle East and Europe.',
  },
  {
    icon: <Clock size={24} className="text-accent" />,
    title: 'Proven Experience',
    desc: 'Two decades of hands-on industry experience means we understand the real challenges of deploying visual technology at scale.',
  },
];

const offices = [
  {
    city: 'Hong Kong',
    role: 'Global Business Operations',
    desc: 'Our Hong Kong office serves as the primary hub for international business coordination, client relations, and strategic development.',
    flag: '🇭🇰',
  },
  {
    city: 'Shenzhen',
    role: 'Manufacturing & Supply Chain',
    desc: "Located in the heart of China's technology manufacturing belt, our Shenzhen operations manage OEM partnerships, production coordination, and quality assurance.",
    flag: '🇨🇳',
  },
  {
    city: 'Dubai',
    role: 'Middle East Operations',
    desc: 'Our Dubai office supports the growing Middle East market with regional inventory, client support, and on-ground project coordination.',
    flag: '🇦🇪',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Engineering Technology for Modern Visual Environments"
        subtitle={`Axion Technology Co Ltd is a global visual technology engineering company with over ${getYearsExperience()} years of experience delivering professional AV solutions across the Middle East and Europe.`}
        badge="Our Story"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
      />

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-black text-white mb-2">{m.year}</div>
                <div className="text-sm uppercase tracking-widest font-bold text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Company Overview"
                title="Global Leaders in Visual Engineering Excellence"
                align="left"
              />
              <div className="space-y-6 mb-10">
                <p className="text-slate-600 leading-relaxed">
                  Axion Technology is a premier engineering-driven provider of advanced visual solutions. 
                  delivering professional LED display systems, integrated AV solutions, interactive
                  technologies, lighting, audio systems, and technical infrastructure for events,
                  exhibitions, corporate environments, and modern visual experiences.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Backed by over {getYearsExperience()} years of industry experience across the Middle East and Europe,
                  Axion combines engineering expertise, OEM manufacturing partnerships, and global
                  supply capabilities to support clients with high-performance visual technologies.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary px-8 rounded-full">
                  Partner With Us <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link href="/products" className="btn btn-outline px-8 rounded-full">
                  Our Products
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
                  alt="Axion Technology Operations"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionHeader
            badge="Core Values"
            title="What Drives Us"
            subtitle="Our commitment to excellence defines every project we undertake."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Global Presence"
            title="International Operations & Supply Network"
            subtitle="Strategic presence in key global technology hubs."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((o) => (
              <div key={o.city} className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-4xl mb-4">{o.flag}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{o.city}</h3>
                <div className="text-xs uppercase tracking-widest font-bold text-accent mb-4">{o.role}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Tag Cloud */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom text-center">
          <SectionHeader
            badge="Our Markets"
            title="Industries We Serve"
            subtitle="Delivering excellence across diverse professional sectors."
          />
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              'Event Production', 'AV Systems Integrators', 'Corporate Enterprises', 
              'Public Sector', 'Exhibition Organizers', 'Broadcast & Media', 
              'Hospitality Groups', 'Educational Institutions', 'Entertainment Venues', 'Retail Chains'
            ].map((m) => (
              <div key={m} className="px-6 py-3 bg-white border border-slate-200 rounded-full text-primary font-medium flex items-center shadow-sm">
                <MapPin size={14} className="mr-2 text-accent" />
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

