export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  category: {
    id: string;
    name: string;
    slug: string;
    tagline?: string;
  } | null;
  subcategory?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  images: string[];
  isFeatured: boolean;
  sortOrder: number;
  keyFeatures?: string[];
  specifications?: Record<string, any>;
  accessories?: Record<string, any>;
  downloads?: {
    datasheet?: string;
    manual?: string;
    technicalDrawing?: string;
    installationGuide?: string;
    certification?: string;
    brochure?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
