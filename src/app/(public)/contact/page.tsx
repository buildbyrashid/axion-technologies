import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import ContactHero from '@/components/sections/ContactHero';

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
      <ContactHero />

      {/* Main Content Area - Form & Office Info */}
      <div id="contact-form-section" className="container-custom py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-14 rounded-[48px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <div className="mb-10">
                <h3 className="text-3xl font-bold text-primary font-sora mb-3 tracking-tight">Direct Inquiry</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Please fill in the form below and an engineering expert will contact you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-5 space-y-12">
            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <a href="mailto:sales@axiontechnology.com" className="group p-8 bg-white rounded-[32px] border border-slate-100 hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                  <Mail size={24} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <div className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Email Sales</div>
                <div className="text-xs text-slate-400 font-medium break-all">sales@axiontechnology.com</div>
              </a>
              <div className="group p-8 bg-white rounded-[32px] border border-slate-100 hover:shadow-xl transition-all duration-500">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  <Phone size={24} className="text-slate-400" />
                </div>
                <div className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Global Support</div>
                <div className="text-xs text-slate-400 font-medium">Available Mon-Fri</div>
              </div>
            </div>

            {/* Regional Hubs Section */}
            <div className="space-y-8">
              <div className="flex items-center">
                <h4 className="text-xs font-bold text-slate-400 font-sora uppercase tracking-[0.2em]">Regional Hubs</h4>
                <div className="h-px bg-slate-100 flex-1 ml-6" />
              </div>
              <div className="grid grid-cols-1 gap-5">
                {offices.map((o) => (
                  <div key={o.city} className="flex items-center p-6 bg-white rounded-[32px] border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-500 group">
                    <div className="text-3xl mr-6 h-16 w-16 flex items-center justify-center bg-slate-50 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700">{o.flag}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-lg font-bold text-primary">{o.city}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-accent">{o.role.split(' & ')[0]}</div>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{o.detail}</p>
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
