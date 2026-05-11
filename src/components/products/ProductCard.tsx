import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  tagline: string;
  description: string;
  link: string;
  icon?: React.ReactNode;
  index?: number;
}

export default function ProductCard({ title, tagline, description, link, icon, index = 0 }: ProductCardProps) {
  return (
    <article className="product-card" style={{ '--card-index': index } as React.CSSProperties}>
      {icon && <div className="product-card__icon">{icon}</div>}
      <div className="product-card__body">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__tagline">{tagline}</p>
        <p className="product-card__desc">{description}</p>
      </div>
      <Link href={link} className="product-card__cta" aria-label={`Learn more about ${title}`}>
        Learn More
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}
