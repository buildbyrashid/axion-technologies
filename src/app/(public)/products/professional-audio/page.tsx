import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Audio Systems',
  description:
    'Professional sound systems from Axion Technology — line arrays, speakers, subwoofers, amplifiers, DSP, and installation audio.',
};

const subcategories = [
  { name: 'Line Array Systems', desc: 'High-output professional line array speakers for large-format concerts, festivals, and live event productions.' },
  { name: 'Point Source Speakers', desc: 'Compact and full-range point source speakers for corporate events, houses of worship, and installations.' },
  { name: 'Subwoofer Systems', desc: 'Professional subwoofers for powerful low-frequency reinforcement in live events and fixed installations.' },
  { name: 'Stage Monitors & Wedges', desc: 'On-stage monitoring solutions for performers, presenters, and production teams.' },
  { name: 'Power Amplifiers', desc: 'High-efficiency power amplifiers for driving professional speaker systems in any configuration.' },
  { name: 'DSP Processing', desc: 'Digital signal processors for system management, tuning, protection, and audio routing.' },
  { name: 'Mixing Consoles', desc: 'Digital and analog mixing consoles for live sound, broadcast, and installation environments.' },
  { name: 'Installation Audio Solutions', desc: 'Background music, paging, and distributed audio systems for commercial and corporate installations.' },
];

const applications = [
  { title: 'Live Events & Concerts', desc: 'High-output touring sound systems for concerts, music festivals, and large outdoor events.' },
  { title: 'Houses of Worship', desc: 'Intelligible speech reinforcement and music reproduction for religious venues and auditoriums.' },
  { title: 'Corporate Events', desc: 'Professional audio for conferences, product launches, award ceremonies, and presentations.' },
  { title: 'Fixed Installations', desc: 'Permanent sound system installations for theaters, venues, restaurants, and retail environments.' },
  { title: 'Broadcast & Studios', desc: 'High-fidelity audio monitoring and production systems for broadcast and recording environments.' },
];

export default function AudioPage() {
  return (
    <>
      <section className="page-hero" aria-label="Professional Audio Systems hero">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="hero__glow hero__glow--1" aria-hidden="true" />
        <div className="container page-hero__content">
          <div className="hero__badge"><Zap size={13} /> Product Category</div>
          <h1 className="page-hero__heading">
            Professional <span className="hero__heading-accent">Audio</span> Systems
          </h1>
          <p className="page-hero__tagline">Precision Audio for Powerful Experiences</p>
          <p className="page-hero__sub">
            Professional sound systems including line arrays, speakers, subwoofers, amplifiers, DSP systems,
            and installation audio solutions for live events, fixed installations, and broadcast environments.
          </p>
          <div className="hero__ctas">
            <Link href="/contact" className="btn btn-primary hero__btn-primary" id="audio-quote-btn">
              Request Audio Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">Back to Products</Link>
          </div>
        </div>
      </section>

      <section className="section-light section-padding" aria-labelledby="audio-sub-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Product Range</div>
            <h2 id="audio-sub-heading" className="section-title">Professional Audio Categories</h2>
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

      <section className="section-alt section-padding" aria-labelledby="audio-apps-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Applications</div>
            <h2 id="audio-apps-heading" className="section-title">Where Our Audio Performs</h2>
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

      <section className="hero contact-cta section-padding" aria-labelledby="audio-cta-heading">
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="container contact-cta__content">
          <h2 id="audio-cta-heading" className="contact-cta__heading">Powerful Sound for Every Venue</h2>
          <p className="contact-cta__sub">Speak with our audio specialists to design the right sound system for your project.</p>
          <div className="hero__ctas">
            <Link href="/contact" className="btn btn-primary hero__btn-primary">
              Get an Audio Quote <ArrowRight size={16} />
            </Link>
            <Link href="/products" className="btn btn-outline">View All Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
