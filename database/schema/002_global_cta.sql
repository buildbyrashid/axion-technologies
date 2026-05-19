-- ============================================================
-- 002_global_cta.sql
-- Description: Creates the tables for global CTA (Call To Action) settings
-- Do NOT destructively modify existing tables.
-- ============================================================

-- ─── Global CTA Table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS global_cta (
  id                VARCHAR(36)  PRIMARY KEY,
  headline          VARCHAR(255) NOT NULL,
  description       TEXT,
  email             VARCHAR(255),
  website           VARCHAR(255),
  locations         TEXT,
  support_text      VARCHAR(255),
  background_image  VARCHAR(500),
  is_active         BOOLEAN      DEFAULT true,
  created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed Initial Content ────────────────────────────────────
-- Insert default CTA configuration if not exist
INSERT IGNORE INTO global_cta (
  id,
  headline,
  description,
  email,
  website,
  locations,
  support_text,
  background_image,
  is_active
) VALUES (
  'cta-default',
  'Let\'s Build Your Next Visual Experience',
  'Partner with Axion Technology for advanced visual technology solutions engineered for modern global environments.',
  'sales@axiontechnology.com',
  'www.axiontechnology.com',
  'Hong Kong | Shenzhen | Dubai',
  'Engineering Support Online',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
  true
);
