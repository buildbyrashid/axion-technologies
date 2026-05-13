import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Industries Served',
  description:
    'Axion Technology delivers professional visual technology solutions across 10+ industries including live events, exhibitions, corporate, museums, retail, broadcast, and more.',
};

const industries = [
  {
    name: 'Live Events & Entertainment',
    icon: '≡ƒÄñ',
    desc: 'Full-scale visual and audio technology for concerts, music festivals, and touring productions. High-brightness outdoor LED and professional sound systems.',
    applications: ['Concert LED screens', 'Stage lighting rigs', 'Line array sound', 'LED video walls'],
  },
  {
    name: 'Exhibitions & Trade Shows',
    icon: '≡ƒÅ¢∩╕Å',
    desc: 'Impactful visual technology solutions for exhibition booths and brand activation events. Interactive kiosks and high-resolution LED displays.',
    applications: ['Exhibition LED walls', 'Interactive kiosks', 'Digital signage', 'AV infrastructure'],
  },
  {
    name: 'Corporate Environments',
    icon: '≡ƒÅó',
    desc: 'Professional AV solutions for boardrooms, lobbies, and executive spaces. Interactive flat panels and video conferencing systems.',
    applications: ['Boardroom displays', 'Video conferencing', 'Digital directories', 'Lobby signage'],
  },
  {
    name: 'Museums & Experience Centers',
    icon: '≡ƒû╝∩╕Å',
    desc: 'Immersive visual technologies for museums and brand experience spaces. Creative LED installations and interactive touchscreens.',
    applications: ['Creative LED', 'Interactive exhibits', 'Transparent displays', 'Immersive AV'],
  },
  {
    name: 'Retail & Digital Signage',
    icon: '≡ƒ¢ì∩╕Å',
    desc: 'Dynamic digital signage solutions for retail environments and shopping centers. Window displays and content management systems.',
    applications: ['Window LED', 'Video walls', 'Menu boards', 'Wayfinding'],
  },
  {
    name: 'Command & Control Centers',
    icon: '≡ƒûÑ∩╕Å',
    desc: 'High-reliability video wall solutions for operations centers and security control rooms. Fine-pitch LED and LCD video walls.',
    applications: ['LED video walls', 'Fine-pitch displays', 'LCD walls', 'Control systems'],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Solutions for Diverse Professional Environments"
        subtitle="Axion Technology delivers professional visual technology solutions across 10+ industries, engineered for reliability and high-impact performance."
        badge="Markets Served"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Industries"
            title="Industries We Serve"
            subtitle="Professional visual technology solutions for the full spectrum of modern environments."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div key={ind.name} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{ind.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{ind.name}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">{ind.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {ind.applications.map((app) => (
                    <span key={app} className="text-[10px] uppercase tracking-wider font-bold bg-slate-200/50 text-slate-600 px-2 py-1 rounded-md">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

