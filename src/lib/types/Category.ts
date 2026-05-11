export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
}
