import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Lightbulb, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lighting Systems',
  description:
    'Professional stage and architectural lighting from Axion Technology — moving heads, beam, wash, profile, effect, and outdoor lighting solutions for live events and venues.',
};

const subcategories = [
  { name: 'Moving Head Lights', desc: 'High-output motorized moving head fixtures for dynamic stage lighting and live event productions.' },
  { name: 'Beam & Wash Fixtures', desc: 'Professional beam, wash, and hybrid fixtures delivering powerful and versatile stage illumination.' },
  { name: 'LED Bar & Strip Lights', desc: 'Compact LED wash bars and strip lighting for stage edge lighting, back lighting, and ambient effects.' },
  { name: 'Profile & Spot Lights', desc: 'High-precision profile spotlights and gobos for theatrical and concert lighting applications.' },
  { name: 'Outdoor Lighting Systems', desc: 'IP-rated outdoor moving heads and wash fixtures for exterior stages, festivals, and architectural lighting.' },
  { name: 'Architectural Lighting', desc: 'Permanent architectural LED fixtures for building facades, interiors, and ambient environment lighting.' },
  { name: 'Effect & Strobe Lights', desc: 'LED strobes, derby effects, and atmospheric lighting for entertainment and nightlife venues.' },
  { name: 'Hazer & Fog Machines', desc: 'Professional hazer and fog systems to enhance light beam visibility and stage atmosphere.' },
];

const applications = [
  { title: 'Live Events & Concerts', desc: 'Stage lighting packages for touring productions, festivals, and large-scale live events.' },
  { title: 'Theatrical Productions', desc: 'Precision lighting for theater, opera, ballet, and performing arts venues.' },
  { title: 'Nightlife & Entertainment', desc: 'Club lighting systems, effect lights, and immersive entertainment environments.' },
  { title: 'Corporate Events', desc: 'Professional event lighting for product launches, conferences, and award ceremonies.' },
  { title: 'Architectural Projects', desc: 'Building facade lighting, landscape illumination, and permanent architectural installations.' },
];

export default function LightingPage() {
  return (
    <>
      <section className="page-hero" aria-label="Lighting Systems hero">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__glow hero__glow--1" aria-hidden="true" />
        <div className="container page-hero__content">
          <div className="hero__badge"><Lightbulb size={13} /> Product Category</div>
          <h1 className="page-hero__heading">
            <span className="hero__heading-accent">Lighting</span> Systems
          </h1>
          <p className="page-hero__tagline">Dynamic Lighting for Immersive Spaces</p>
          <p className="page-hero__sub">
            Professional stage and architectural lighting solutions including moving heads, beam,
            wash, profile, effect, and outdoor lighting systems for live events, entertainment,
            and architectural applications.
          </p>
          <div className="hero__ctas">
            <Link href="/contact?interest=Lighting+Systems" className="btn btn-primary hero__btn-primary" id="lighting-quote-btn">
              Request Lighting Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">Back to Products</Link>
          </div>
        </div>
      </section>

      <section className="section-light section-padding" aria-labelledby="lighting-sub-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Product Range</div>
            <h2 id="lighting-sub-heading" className="section-title">Lighting System Categories</h2>
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

      <section className="section-alt section-padding" aria-labelledby="lighting-apps-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Applications</div>
            <h2 id="lighting-apps-heading" className="section-title">Lighting in Action</h2>
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

      <section className="hero contact-cta section-padding" aria-labelledby="lighting-cta-heading">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="container contact-cta__content">
          <h2 id="lighting-cta-heading" className="contact-cta__heading">Illuminate Your Next Event</h2>
          <p className="contact-cta__sub">Talk to our team about professional lighting solutions for your project.</p>
          <div className="hero__ctas">
            <Link href="/contact" className="btn btn-primary hero__btn-primary">
              Get a Lighting Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
