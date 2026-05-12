import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Power Distribution & Cable Solutions',
  description:
    'Reliable power distribution systems, EDUs, signal management, and professional-grade cabling from Axion Technology for AV and event technology infrastructure.',
};

const subcategories = [
  { name: 'Power Distribution Units (PDU)', desc: 'Professional power distribution units with circuit protection for live events and fixed installations.' },
  { name: 'Distros & Socapex Systems', desc: 'Socapex distribution systems, dimmer racks, and touring-grade electrical distribution for events.' },
  { name: 'Signal Distribution', desc: 'Active and passive signal distribution solutions for video, audio, and data in AV systems.' },
  { name: 'Data & DMX Cables', desc: 'Professional-grade DMX512 and network data cables for lighting control and AV networking.' },
  { name: 'Audio & Video Cables', desc: 'Robust touring-grade XLR, SDI, HDMI, and fiber optic cables for professional AV applications.' },
  { name: 'Connectors & Accessories', desc: 'Professional connectors, adaptors, and cable accessories for AV and event technology infrastructure.' },
];

const applications = [
  { title: 'Live Events & Touring', desc: 'Robust touring-grade power distribution and cabling for concerts, festivals, and live productions.' },
  { title: 'Permanent Installations', desc: 'Structured AV cabling and power infrastructure for theaters, venues, and corporate installations.' },
  { title: 'Exhibition & Trade Shows', desc: 'Flexible power and signal solutions for exhibition booths and trade show environments.' },
  { title: 'Broadcast & Studios', desc: 'Studio-grade cabling and signal management for broadcast production environments.' },
];

export default function PowerDistributionPage() {
  return (
    <>
      <section className="page-hero" aria-label="Power Distribution hero">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__glow hero__glow--1" aria-hidden="true" />
        <div className="container page-hero__content">
          <div className="hero__badge"><Zap size={13} /> Product Category</div>
          <h1 className="page-hero__heading">
            Power Distribution &amp; <span className="hero__heading-accent">Cable Solutions</span>
          </h1>
          <p className="page-hero__tagline">Engineered Connectivity. Reliable Performance</p>
          <p className="page-hero__sub">
            Reliable power distribution systems, electrical distribution units, signal management solutions,
            and professional-grade cabling for AV and event technology infrastructure.
          </p>
          <div className="hero__ctas">
            <Link href="/contact" className="btn btn-primary hero__btn-primary" id="power-quote-btn">
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">Back to Products</Link>
          </div>
        </div>
      </section>

      <section className="section-light section-padding" aria-labelledby="power-sub-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Product Range</div>
            <h2 id="power-sub-heading" className="section-title">Power & Cable Categories</h2>
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

      <section className="section-alt section-padding" aria-labelledby="power-apps-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Applications</div>
            <h2 id="power-apps-heading" className="section-title">Reliable Infrastructure for Every Environment</h2>
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

      <section className="hero contact-cta section-padding" aria-labelledby="power-cta-heading">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="container contact-cta__content">
          <h2 id="power-cta-heading" className="contact-cta__heading">Engineered Connectivity Starts Here</h2>
          <p className="contact-cta__sub">Get the right power and cabling infrastructure for your next project.</p>
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
