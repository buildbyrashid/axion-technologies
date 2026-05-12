import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Monitor, Zap, CheckCircle } from 'lucide-react';
import { getYearsExperience } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'LED Display Systems',
  description:
    'Professional LED display solutions from Axion Technology — rental-grade, fixed installation, COB, MIP, fine-pitch, and creative LED displays for events, exhibitions, and corporate environments.',
};

const subcategories = [
  {
    name: 'Indoor Rental LED Displays',
    desc: 'Lightweight, modular LED panels engineered for fast deployment across concerts, conferences, trade shows, and live events.',
  },
  {
    name: 'Outdoor Rental LED Displays',
    desc: 'Weatherproof, high-brightness outdoor LED screens for festivals, sporting events, outdoor advertising, and large-scale productions.',
  },
  {
    name: 'Fine Pitch LED Displays',
    desc: 'Ultra-high-resolution LED displays with sub-1mm pixel pitch for control rooms, broadcast studios, and corporate environments.',
  },
  {
    name: 'COB LED Displays',
    desc: 'Chip-on-board LED technology delivering superior visual consistency, enhanced durability, and higher contrast for premium environments.',
  },
  {
    name: 'MIP LED Displays',
    desc: 'Micro inorganic LED pixel technology for enterprise-grade reliability, premium image quality, and long-term performance.',
  },
  {
    name: 'Creative LED Displays',
    desc: 'Custom-shaped, curved, transparent, and flexible LED solutions for architectural applications and immersive visual experiences.',
  },
  {
    name: 'Curved & Transparent LED Displays',
    desc: 'Seamlessly curved or see-through LED panels for retail environments, museums, and creative installations.',
  },
  {
    name: 'All-in-One LED Displays',
    desc: 'Integrated LED solutions with built-in processing for simplified setup and deployment in corporate and commercial environments.',
  },
  {
    name: 'Fixed Installation LED Systems',
    desc: 'Permanent indoor and outdoor LED installations engineered for long-term reliability in stadiums, transportation hubs, and public spaces.',
  },
];

const applications = [
  { title: 'Events & Exhibitions', desc: 'Concerts, conferences, trade shows, product launches, and large-scale live events.' },
  { title: 'Command & Control Centers', desc: 'High-reliability LED video walls for operations centers, control rooms, and surveillance environments.' },
  { title: 'Corporate Environments', desc: 'Boardrooms, lobbies, reception areas, and executive meeting spaces.' },
  { title: 'Retail & Digital Signage', desc: 'Dynamic advertising displays, wayfinding systems, and in-store digital experiences.' },
  { title: 'Entertainment Venues', desc: 'Arenas, stadiums, nightclubs, theaters, and permanent venue installations.' },
];

export default function LEDDisplayPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-label="LED Display Systems hero">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__glow hero__glow--1" aria-hidden="true" />
        <div className="container page-hero__content">
          <div className="hero__badge"><Monitor size={13} /> Product Category</div>
          <h1 className="page-hero__heading">
            <span className="hero__heading-accent">LED Display</span> Systems
          </h1>
          <p className="page-hero__tagline">Brilliant Visuals for Every Environment</p>
          <p className="page-hero__sub">
            Axion delivers professional LED display solutions ranging from rental-grade indoor and
            outdoor LED screens to premium fixed installation COB, MIP, and fine-pitch displays for
            events, exhibitions, command centers, corporate environments, retail spaces, entertainment
            venues, and immersive visual experiences.
          </p>
          <div className="hero__ctas">
            <Link href="/contact?interest=LED+Display+Systems" className="btn btn-primary hero__btn-primary" id="led-quote-btn">
              Request LED Display Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">Back to Products</Link>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="section-light section-padding" aria-labelledby="led-sub-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Product Range</div>
            <h2 id="led-sub-heading" className="section-title">LED Display Categories</h2>
            <p className="section-subtitle">
              A comprehensive range of LED display technologies for every application and environment.
            </p>
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

      {/* Applications */}
      <section className="section-alt section-padding" aria-labelledby="led-apps-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Applications</div>
            <h2 id="led-apps-heading" className="section-title">Where LED Displays Perform</h2>
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

      {/* Why Axion LED */}
      <section className="section-light section-padding" aria-labelledby="led-why-heading">
        <div className="container">
          <div className="why-box">
            <div className="section-eyebrow">Why Axion</div>
            <h2 id="led-why-heading" className="section-title">
              Engineering-Backed LED Solutions
            </h2>
            <p className="section-body">
              With over {getYearsExperience()} years of experience sourcing, specifying, and deploying LED display
              systems across the Middle East and Europe, Axion brings deep technical knowledge
              and strong OEM manufacturing partnerships to every project. From single-screen
              rentals to large-scale multi-zone installations, we deliver LED solutions
              engineered for real-world performance.
            </p>
            <div className="why-box__features">
              {[
                'Rental-grade and fixed-installation solutions',
                'COB, MIP, fine-pitch, and creative LED technologies',
                'Strong OEM manufacturing partnerships',
                'Global sourcing and logistics support',
                'Technical specification and project consultation',
                'Middle East and Europe market experience',
              ].map((f) => (
                <div key={f} className="why-box__feature">
                  <Zap size={14} className="why-box__feature-icon" />
                  {f}
                </div>
              ))}
            </div>
            <Link href="/contact?interest=LED+Display+Systems" className="btn btn-primary" id="led-consult-btn">
              Request a Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero contact-cta section-padding" aria-labelledby="led-cta-heading">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="container contact-cta__content">
          <h2 id="led-cta-heading" className="contact-cta__heading">
            Ready to Elevate Your Visual Experience?
          </h2>
          <p className="contact-cta__sub">
            Contact our team to discuss your LED display requirements and receive a tailored proposal.
          </p>
          <div className="hero__ctas">
            <Link href="/contact" className="btn btn-primary hero__btn-primary">
              Request LED Display Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
