import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Monitor, Tv2, Lightbulb, Volume2, Zap } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Products',
  description:
    "Explore Axion Technology's professional visual technology product range: LED display systems, LCD kiosks, lighting, audio, and power distribution solutions.",
};

const categories = [
  {
    icon: <Monitor size={32} className="text-accent" />,
    title: 'LED Display Systems',
    tagline: 'Brilliant Visuals for Every Environment',
    description:
      'Professional LED display solutions ranging from rental-grade indoor and outdoor LED screens to premium fixed installation COB, MIP, and fine-pitch displays.',
    link: '/products/led-display-systems',
    subcategories: [
      'Indoor Rental LED Displays',
      'Outdoor Rental LED Displays',
      'Fine Pitch LED Displays',
      'COB LED Displays',
      'MIP LED Displays',
    ],
  },
  {
    icon: <Tv2 size={32} className="text-accent" />,
    title: 'LCD Screens & Interactive Kiosks',
    tagline: 'Smart Displays for Connected Experiences',
    description:
      'Advanced LCD displays, touch screens, interactive kiosks, digital signage systems, and enterprise collaboration solutions.',
    link: '/products/lcd-interactive-kiosks',
    subcategories: [
      'Commercial LCD Displays',
      'Touch Screen Kiosks',
      'Interactive Flat Panels',
      'Digital Signage Solutions',
      'Video Wall Systems',
    ],
  },
  {
    icon: <Lightbulb size={32} className="text-accent" />,
    title: 'Lighting Systems',
    tagline: 'Dynamic Lighting for Immersive Spaces',
    description:
      'Professional stage and architectural lighting solutions including moving heads, beam, wash, profile, and effect lighting.',
    link: '/products/lighting-systems',
    subcategories: [
      'Moving Head Lights',
      'Beam & Wash Fixtures',
      'LED Bar & Strip Lights',
      'Outdoor Lighting Systems',
      'Architectural Lighting',
    ],
  },
  {
    icon: <Volume2 size={32} className="text-accent" />,
    title: 'Professional Audio Systems',
    tagline: 'Precision Audio for Powerful Experiences',
    description:
      'Professional sound systems including line arrays, speakers, subwoofers, amplifiers, and DSP systems for live events.',
    link: '/products/professional-audio',
    subcategories: [
      'Line Array Systems',
      'Point Source Speakers',
      'Subwoofer Systems',
      'Power Amplifiers',
      'DSP Processing',
    ],
  },
  {
    icon: <Zap size={32} className="text-accent" />,
    title: 'Power Distribution & Cables',
    tagline: 'Engineered Connectivity. Reliable Performance',
    description:
      'Reliable power distribution systems, signal management solutions, and professional-grade cabling for AV infrastructure.',
    link: '/products/power-distribution',
    subcategories: [
      'Power Distribution Units',
      'Distros & Socapex',
      'Signal Distribution',
      'Data & DMX Cables',
      'Connectors & Accessories',
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Professional Visual Technology Solutions"
        subtitle="Five comprehensive product categories engineered for reliability, performance, and long-term value across diverse professional environments."
        badge="Product Portfolio"
        backgroundImage="https://images.unsplash.com/photo-1517245315814-1397ad28996a?auto=format&fit=crop&q=80"
      />

      {/* Category Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Product Categories"
            title="Comprehensive AV Infrastructure"
            subtitle="Explore our range of professional visual, audio, and lighting solutions."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div key={cat.link} className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{cat.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{cat.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <span key={sub} className="text-[10px] uppercase tracking-wider font-bold bg-slate-200/50 text-slate-600 px-2 py-1 rounded-md">
                      {sub}
                    </span>
                  ))}
                </div>
                <Link href={cat.link} className="inline-flex items-center text-accent font-bold text-sm hover:translate-x-2 transition-transform duration-300">
                  Explore Solutions <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Categories */}
      {categories.map((cat, i) => (
        <section
          key={cat.link}
          className={`section-padding ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
        >
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                  {cat.icon}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-4">{cat.tagline}</div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-primary mb-6">{cat.title}</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{cat.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {cat.subcategories.map((sub) => (
                    <div key={sub} className="flex items-center text-sm font-medium text-slate-700">
                      <Zap size={14} className="text-accent mr-2" />
                      {sub}
                    </div>
                  ))}
                </div>
                <Link href={cat.link} className="btn btn-primary rounded-full px-8">
                  View Technical Specs <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="aspect-video bg-primary/10 rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
                   <div className="relative z-10 text-primary font-bold opacity-20 text-4xl uppercase tracking-tighter italic">Axion Tech</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}

