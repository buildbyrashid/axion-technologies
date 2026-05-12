import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Tv2, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'LCD Screens & Interactive Kiosks',
  description:
    'Advanced LCD displays, interactive kiosks, digital signage, and enterprise collaboration solutions from Axion Technology for corporate, retail, and public environments.',
};

const subcategories = [
  { name: 'Commercial LCD Displays', desc: 'High-brightness commercial-grade LCD panels designed for 24/7 continuous operation in retail, corporate, and public environments.' },
  { name: 'Touch Screen Kiosks', desc: 'Self-service interactive kiosks with capacitive multi-touch displays for wayfinding, information, and customer engagement.' },
  { name: 'Interactive Flat Panels', desc: '4K touch-enabled interactive flat panel displays for education, corporate collaboration, and presentation environments.' },
  { name: 'Digital Signage Solutions', desc: 'End-to-end digital signage systems including displays, media players, and content management for dynamic messaging.' },
  { name: 'Video Wall Systems', desc: 'Seamless multi-panel LCD video wall solutions for control rooms, retail, and large-format corporate display environments.' },
  { name: 'Enterprise Collaboration Displays', desc: 'All-in-one collaboration displays with built-in compute, wireless connectivity, and conferencing integration for modern workplaces.' },
];

const applications = [
  { title: 'Corporate Environments', desc: 'Meeting rooms, lobbies, digital directories, and corporate communication displays.' },
  { title: 'Retail & Hospitality', desc: 'Point-of-sale displays, menu boards, wayfinding, and in-store digital engagement systems.' },
  { title: 'Education', desc: 'Interactive classroom displays, lecture hall systems, and collaborative learning environments.' },
  { title: 'Command & Control', desc: 'High-resolution video walls for operations centers, security monitoring, and unified command environments.' },
  { title: 'Public Spaces', desc: 'Transportation hubs, airports, shopping malls, and government facilities digital signage.' },
];

export default function LCDKiosksPage() {
  return (
    <>
      <section className="page-hero" aria-label="LCD Screens hero">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__glow hero__glow--1" aria-hidden="true" />
        <div className="container page-hero__content">
          <div className="hero__badge"><Tv2 size={13} /> Product Category</div>
          <h1 className="page-hero__heading">
            <span className="hero__heading-accent">LCD Screens</span> &amp; Interactive Kiosks
          </h1>
          <p className="page-hero__tagline">Smart Displays for Connected Experiences</p>
          <p className="page-hero__sub">
            Advanced LCD displays, touch screens, interactive kiosks, digital signage systems,
            and enterprise collaboration solutions for corporate, retail, education, and
            public-facing environments.
          </p>
          <div className="hero__ctas">
            <Link href="/contact?interest=LCD+Screens+%26+Interactive+Kiosks" className="btn btn-primary hero__btn-primary" id="lcd-quote-btn">
              Request LCD Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">Back to Products</Link>
          </div>
        </div>
      </section>

      <section className="section-light section-padding" aria-labelledby="lcd-sub-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Product Range</div>
            <h2 id="lcd-sub-heading" className="section-title">LCD & Interactive Display Categories</h2>
          </div>
          <div className="subcat-grid">
            {subcategories.map((sub) => (
              <div key={sub.name} className="subcat-card">
                <CheckCircle size={18} className="subcat-card__icon" />
                <h3 className="subcat-card__title">{sub.name}</h3>
                <p className="subcat-card__desc">{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt section-padding" aria-labelledby="lcd-apps-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Applications</div>
            <h2 id="lcd-apps-heading" className="section-title">Where LCD Solutions Perform</h2>
          </div>
          <div className="apps-grid">
            {applications.map((app) => (
              <div key={app.title} className="app-card">
                <div className="app-card__dot" />
                <h3 className="app-card__title">{app.title}</h3>
                <p className="app-card__desc">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero contact-cta section-padding" aria-labelledby="lcd-cta-heading">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="container contact-cta__content">
          <h2 id="lcd-cta-heading" className="contact-cta__heading">Discuss Your Display Requirements</h2>
          <p className="contact-cta__sub">Our team will help you select the right LCD solution for your environment.</p>
          <div className="hero__ctas">
            <Link href="/contact" className="btn btn-primary hero__btn-primary">
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
