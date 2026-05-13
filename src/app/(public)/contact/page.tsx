import type { Metadata } from 'next';
import { Mail, Globe, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Axion Technology — request a consultation, product quote, or technical enquiry. Offices in Hong Kong, Shenzhen, and Dubai.',
};

const offices = [
  {
    city: 'Hong Kong',
    role: 'Global Operations',
    detail: 'Primary hub for international business coordination and strategic operations.',
    flag: '🇭🇰',
  },
  {
    city: 'Shenzhen',
    role: 'Manufacturing & Supply Chain',
    detail: 'OEM manufacturing partnerships, quality assurance, and sourcing operations.',
    flag: '🇨🇳',
  },
  {
    city: 'Dubai',
    role: 'Middle East Operations',
    detail: 'Regional inventory support and project coordination for the Middle East market.',
    flag: '🇦🇪',
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* Reduced Height Dark Hero Section */}
      <section className="bg-primary pt-32 pb-16 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl pt-14">
            <SectionHeader
              badge="Get in Touch"
              title="Let's Build the Next Visual Experience"
              subtitle="Partner with Axion Technology for advanced visual technology solutions engineered for modern global environments."
              align="left"
              dark={true}
              className="mb-0"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area - Positioned Below Hero */}
      <div className="container-custom py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-primary font-sora mb-2 tracking-tight">Request a Consultation</h3>
                <p className="text-slate-500 text-sm">Please fill in the form below and an engineering expert will contact you shortly.</p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-5 space-y-10">
            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="mailto:sales@axiontechnology.com" className="group p-6 bg-white rounded-3xl border border-slate-100 hover:border-accent hover:shadow-lg transition-all duration-300">
                <div className="h-10 w-10 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Mail size={20} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <div className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Email Sales</div>
                <div className="text-xs text-slate-400 font-medium truncate">sales@axiontechnology.com</div>
              </a>
              <div className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
                  <Phone size={20} className="text-slate-400" />
                </div>
                <div className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Global Support</div>
                <div className="text-xs text-slate-400 font-medium">Available Mon-Fri</div>
              </div>
            </div>

            {/* Regional Hubs Section */}
            <div className="space-y-6">
              <div className="flex items-center">
                <h4 className="text-md font-bold text-primary font-sora uppercase tracking-[0.1em]">Regional Hubs</h4>
                <div className="h-px bg-slate-100 flex-1 ml-6" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {offices.map((o) => (
                  <div key={o.city} className="flex items-center p-5 bg-white rounded-3xl border border-slate-100 hover:border-slate-200 transition-all duration-300 group">
                    <div className="text-2xl mr-5 h-14 w-14 flex items-center justify-center bg-slate-50 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500">{o.flag}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-md font-bold text-primary leading-none mb-1">{o.city}</div>
                        <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-accent">{o.role}</div>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-1">{o.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
