import type { Metadata } from 'next';
import { Mail, Globe, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import PageHero from '@/components/sections/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Axion Technology ΓÇö request a consultation, product quote, or technical enquiry. Offices in Hong Kong, Shenzhen, and Dubai.',
};

const offices = [
  {
    city: 'Hong Kong',
    role: 'Global Operations',
    detail: 'Primary hub for international business coordination and strategic operations.',
    flag: '≡ƒç¡≡ƒç░',
  },
  {
    city: 'Shenzhen',
    role: 'Manufacturing & Supply Chain',
    detail: 'OEM manufacturing partnerships, quality assurance, and sourcing operations.',
    flag: '≡ƒç¿≡ƒç│',
  },
  {
    city: 'Dubai',
    role: 'Middle East Operations',
    detail: 'Regional inventory support and project coordination for the Middle East market.',
    flag: '≡ƒçª≡ƒç¬',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Build the Next Visual Experience"
        subtitle="Partner with Axion Technology for advanced visual technology solutions engineered for modern environments. Our team is ready to discuss your requirements."
        badge="Get in Touch"
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Column */}
            <div>
              <SectionHeader
                badge="Send a Message"
                title="Request a Consultation"
                align="left"
              />
              <div className="bg-slate-50 p-8 lg:p-12 rounded-3xl border border-slate-100">
                <ContactForm />
              </div>
            </div>

            {/* Info Column */}
            <div className="space-y-12">
              <div>
                <SectionHeader
                  badge="Contact Info"
                  title="Direct Channels"
                  align="left"
                  className="mb-8"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <a href="mailto:sales@axiontechnology.com" className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
                    <Mail className="text-accent mb-4 group-hover:scale-110 transition-transform" size={24} />
                    <div className="text-sm font-bold text-primary mb-1">Email Sales</div>
                    <div className="text-xs text-slate-500 break-all">sales@axiontechnology.com</div>
                  </a>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group">
                    <Phone className="text-accent mb-4" size={24} />
                    <div className="text-sm font-bold text-primary mb-1">Global Support</div>
                    <div className="text-xs text-slate-500">Available Mon-Fri</div>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeader
                  badge="Global Offices"
                  title="Regional Hubs"
                  align="left"
                  className="mb-8"
                />
                <div className="space-y-4">
                  {offices.map((o) => (
                    <div key={o.city} className="flex items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-3xl mr-6">{o.flag}</div>
                      <div>
                        <div className="text-lg font-bold text-primary">{o.city}</div>
                        <div className="text-xs uppercase tracking-widest font-bold text-accent mb-2">{o.role}</div>
                        <p className="text-slate-500 text-sm">{o.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-8 bg-primary rounded-3xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <MapPin className="text-accent mb-4" size={32} />
                <h4 className="text-xl font-bold mb-2">Global Sourcing Hub</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our strategic presence in Hong Kong and Shenzhen ensures we maintain the highest 
                  quality control standards and efficient logistics for every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

