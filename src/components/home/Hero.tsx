import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { getYearsExperience } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__badge">
          <Zap size={13} />
          Global Visual Technology Engineering
        </div>
        <h1 className="hero__heading">
          Engineering Advanced<br />
          <span className="hero__heading-accent">Visual Technology</span><br />
          Solutions
        </h1>
        <p className="hero__lead">
          Axion Technology Co Ltd is a global visual technology engineering company
          specializing in professional LED display systems, interactive technologies,
          stage systems, lighting, audio, and integrated AV infrastructure for
          modern environments.
        </p>
        <p className="hero__sub">
          With over {getYearsExperience()} years of industry experience across the Middle East and Europe,
          Axion combines engineering expertise, OEM manufacturing partnerships, and
          international supply capabilities to deliver reliable and scalable visual
          technology solutions.
        </p>
        <div className="hero__ctas">
          <Link href="/products" className="btn btn-primary hero__btn-primary">
            Explore Products
            <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">{getYearsExperience()}+</span>
            <span className="hero__stat-label">Years Experience</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-num">3</span>
            <span className="hero__stat-label">Global Offices</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-num">5</span>
            <span className="hero__stat-label">Product Categories</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-num">10+</span>
            <span className="hero__stat-label">Industries Served</span>
          </div>
        </div>
      </div>
    </section>
  );
}
