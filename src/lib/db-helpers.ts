// src/lib/db-helpers.ts

/**
 * Database Helper Functions
 * 
 * These functions replace Supabase queries with MySQL queries.
 * All data access should go through these functions.
 */

import pool from './db';
import { v4 as uuidv4 } from 'uuid';

// ==========================================
// GENERIC QUERY FUNCTION
// ==========================================

export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error: any) {
    console.error('❌ Database Query Error:', error.message);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw new Error(`Database error: ${error.message}`);
  }
}

// ==========================================
// PRODUCT FUNCTIONS
// ==========================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  full_description: string | null;
  tagline: string | null;
  featured_image: string | null;
  gallery: any[];
  video_url: string | null;
  specifications: any;
  features: any[];
  accessories: any[];
  applications: any[];
  downloads: any[];
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
  category_name?: string;
  category_slug?: string;
}

/**
 * Get all products with filters
 */
export async function getProducts(filters: {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
} = {}) {
  let sql = `
    SELECT 
      p.*,
      c.name as category_name,
      c.slug as category_slug,
      c.tagline as category_tagline
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_active = 1
  `;

  const params: any[] = [];

  if (filters.category) {
    sql += ` AND c.slug = ?`;
    params.push(filters.category);
  }

  if (filters.featured) {
    sql += ` AND p.is_featured = 1`;
  }

  if (filters.search) {
    sql += ` AND (
      p.name LIKE ? OR 
      p.short_description LIKE ? OR 
      p.tagline LIKE ?
    )`;
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  sql += ` ORDER BY p.sort_order ASC, p.created_at DESC`;

  if (filters.limit) {
    sql += ` LIMIT ?`;
    params.push(filters.limit);

    if (filters.offset) {
      sql += ` OFFSET ?`;
      params.push(filters.offset);
    }
  }

  const products = await query<any[]>(sql, params);

  // Parse JSON fields
  return products.map(product => ({
    ...product,
    is_featured: Boolean(product.is_featured),
    is_active: Boolean(product.is_active),
    gallery: product.gallery ? JSON.parse(product.gallery) : [],
    specifications: product.specifications ? JSON.parse(product.specifications) : {},
    features: product.features ? JSON.parse(product.features) : [],
    accessories: product.accessories ? JSON.parse(product.accessories) : [],
    applications: product.applications ? JSON.parse(product.applications) : [],
    downloads: product.downloads ? JSON.parse(product.downloads) : [],
  })) as Product[];
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sql = `
    SELECT 
      p.*,
      c.name as category_name,
      c.slug as category_slug,
      c.tagline as category_tagline
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ? AND p.is_active = 1
    LIMIT 1
  `;

  const results = await query<any[]>(sql, [slug]);

  if (results.length === 0) {
    return null;
  }

  const product = results[0];

  return {
    ...product,
    is_featured: Boolean(product.is_featured),
    is_active: Boolean(product.is_active),
    gallery: product.gallery ? JSON.parse(product.gallery) : [],
    specifications: product.specifications ? JSON.parse(product.specifications) : {},
    features: product.features ? JSON.parse(product.features) : [],
    accessories: product.accessories ? JSON.parse(product.accessories) : [],
    applications: product.applications ? JSON.parse(product.applications) : [],
    downloads: product.downloads ? JSON.parse(product.downloads) : [],
  };
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 6) {
  return getProducts({ featured: true, limit });
}

/**
 * Get related products (same category)
 */
export async function getRelatedProducts(productId: string, limit: number = 4) {
  const sql = `
    SELECT 
      p2.*,
      c.name as category_name,
      c.slug as category_slug
    FROM products p1
    JOIN products p2 ON p1.category_id = p2.category_id
    LEFT JOIN categories c ON p2.category_id = c.id
    WHERE p1.id = ?
      AND p2.id != ?
      AND p2.is_active = 1
    ORDER BY p2.sort_order ASC
    LIMIT ?
  `;

  const products = await query<any[]>(sql, [productId, productId, limit]);

  return products.map(product => ({
    ...product,
    is_featured: Boolean(product.is_featured),
    is_active: Boolean(product.is_active),
    gallery: product.gallery ? JSON.parse(product.gallery) : [],
  }));
}

// ==========================================
// CATEGORY FUNCTIONS
// ==========================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  tagline: string | null;
  icon: string | null;
  image: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  product_count?: number;
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  const sql = `
    SELECT * FROM categories
    WHERE is_active = 1
    ORDER BY sort_order ASC
  `;

  const categories = await query<any[]>(sql);
  
  return categories.map(cat => ({
    ...cat,
    is_active: Boolean(cat.is_active),
  }));
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const sql = `
    SELECT * FROM categories
    WHERE slug = ? AND is_active = 1
    LIMIT 1
  `;

  const results = await query<any[]>(sql, [slug]);
  
  if (results.length === 0) {
    return null;
  }

  return {
    ...results[0],
    is_active: Boolean(results[0].is_active),
  };
}

/**
 * Get categories with product count
 */
export async function getCategoriesWithCount(): Promise<Category[]> {
  const sql = `
    SELECT 
      c.*,
      COUNT(p.id) as product_count
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
    WHERE c.is_active = 1
    GROUP BY c.id
    ORDER BY c.sort_order ASC
  `;

  const categories = await query<any[]>(sql);
  
  return categories.map(cat => ({
    ...cat,
    is_active: Boolean(cat.is_active),
  }));
}

// ==========================================
// INQUIRY FUNCTIONS
// ==========================================

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  message: string;
  product_id?: string;
  source: string;
  status: string;
  budget_estimate?: number;
  priority?: string;
  created_at: Date;
  product_name?: string;
  product_slug?: string;
}

/**
 * Create new inquiry
 */
export async function createInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  message: string;
  product_id?: string;
  source?: string;
  budget_estimate?: number;
  priority?: string;
}) {
  const id = uuidv4();

  const sql = `
    INSERT INTO inquiries 
    (id, name, email, phone, company, country, message, product_id, source, budget_estimate, priority)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    id,
    data.name,
    data.email,
    data.phone || null,
    data.company || null,
    data.country || null,
    data.message,
    data.product_id || null,
    data.source || 'contact_form',
    data.budget_estimate || null,
    data.priority || 'medium'
  ];

  await query(sql, params);

  return { id, success: true };
}

/**
 * Get all inquiries (for admin)
 */
export async function getInquiries(filters: {
  status?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<Inquiry[]> {
  let sql = `
    SELECT 
      i.*,
      p.name as product_name,
      p.slug as product_slug
    FROM inquiries i
    LEFT JOIN products p ON i.product_id = p.id
    WHERE 1=1
  `;

  const params: any[] = [];

  if (filters.status) {
    sql += ` AND i.status = ?`;
    params.push(filters.status);
  }

  sql += ` ORDER BY i.created_at DESC`;

  if (filters.limit) {
    sql += ` LIMIT ?`;
    params.push(filters.limit);

    if (filters.offset) {
      sql += ` OFFSET ?`;
      params.push(filters.offset);
    }
  }

  return query<Inquiry[]>(sql, params);
}

// ==========================================
// DOWNLOAD LOG FUNCTIONS
// ==========================================

/**
 * Log file download
 */
export async function logDownload(data: {
  product_id: string;
  file_name: string;
  ip_address: string;
  user_agent: string;
}) {
  const id = uuidv4();

  const sql = `
    INSERT INTO download_logs 
    (id, product_id, file_name, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [
    id,
    data.product_id,
    data.file_name,
    data.ip_address,
    data.user_agent,
  ];

  await query(sql, params);

  return { id, success: true };
}

// ==========================================
// SEARCH FUNCTION
// ==========================================

/**
 * Search products and categories
 */
export async function searchAll(searchTerm: string, limit: number = 20) {
  const products = await getProducts({ search: searchTerm, limit });

  const categorySql = `
    SELECT * FROM categories
    WHERE is_active = 1
    AND (name LIKE ? OR description LIKE ?)
    LIMIT ?
  `;

  const searchPattern = `%${searchTerm}%`;
  const categories = await query<any[]>(categorySql, [
    searchPattern,
    searchPattern,
    limit,
  ]);

  return {
    products,
    categories: categories.map(cat => ({
      ...cat,
      is_active: Boolean(cat.is_active),
    })),
  };
}