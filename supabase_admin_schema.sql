-- ============================================================
-- Axion Technology — Admin Panel Extended Schema
-- Run AFTER the base supabase_schema.sql
-- ============================================================

-- ── New CMS Tables ──────────────────────────────────────────

-- Homepage settings
CREATE TABLE IF NOT EXISTS homepage_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_headline TEXT NOT NULL DEFAULT 'Engineering Advanced Visual Solutions',
  hero_subtext TEXT DEFAULT 'Global engineering excellence in LED display systems, interactive technologies, and integrated AV infrastructure.',
  hero_media_url TEXT,
  hero_media_type TEXT DEFAULT 'video', -- 'video' or 'image'
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About page content
CREATE TABLE IF NOT EXISTS about_page (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  main_content TEXT,
  years_experience INT DEFAULT 20,
  global_offices INT DEFAULT 3,
  projects_delivered INT DEFAULT 1000,
  manufacturing_area INT DEFAULT 5000,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Why Axion section items
CREATE TABLE IF NOT EXISTS why_axion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Global offices
CREATE TABLE IF NOT EXISTS global_offices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  country TEXT,
  role TEXT DEFAULT 'Office', -- 'HQ', 'R&D', 'Sales', 'Manufacturing'
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to existing tables (safe IF NOT EXISTS)
DO $$
BEGIN
  -- Add part_number to product_accessories if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='product_accessories' AND column_name='part_number') THEN
    ALTER TABLE product_accessories ADD COLUMN part_number TEXT;
  END IF;
  
  -- Add country to inquiries if missing
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inquiries' AND column_name='country') THEN
    ALTER TABLE inquiries ADD COLUMN country TEXT;
  END IF;
END $$;

-- Insert default rows if tables are empty
INSERT INTO homepage_settings (hero_headline, hero_subtext, hero_media_type)
SELECT 'Engineering Advanced Visual Solutions', 
       'Global engineering excellence in LED display systems, interactive technologies, and integrated AV infrastructure.',
       'video'
WHERE NOT EXISTS (SELECT 1 FROM homepage_settings);

INSERT INTO about_page (main_content, years_experience, global_offices, projects_delivered, manufacturing_area)
SELECT 'Axion Technology Co Ltd is a global visual technology engineering company.',
       20, 3, 1000, 5000
WHERE NOT EXISTS (SELECT 1 FROM about_page);

-- ── Row Level Security ──────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_accessories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_axion ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_offices ENABLE ROW LEVEL SECURITY;

-- ── Public READ policies (anon can read active items) ───────

CREATE POLICY "Public read active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active subcategories" ON subcategories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read product specs" ON product_specifications FOR SELECT USING (true);
CREATE POLICY "Public read product features" ON product_features FOR SELECT USING (true);
CREATE POLICY "Public read product accessories" ON product_accessories FOR SELECT USING (true);
CREATE POLICY "Public read product documents" ON product_documents FOR SELECT USING (true);
CREATE POLICY "Public read product applications" ON product_applications FOR SELECT USING (true);
CREATE POLICY "Public read active industries" ON industries FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read homepage" ON homepage_settings FOR SELECT USING (true);
CREATE POLICY "Public read about" ON about_page FOR SELECT USING (true);
CREATE POLICY "Public read active why axion" ON why_axion FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active offices" ON global_offices FOR SELECT USING (is_active = true);
-- Inquiries: public can INSERT only (contact form)
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- ── Admin FULL ACCESS policies (authenticated users) ────────

CREATE POLICY "Admin full access categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access subcategories" ON subcategories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_images" ON product_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_specs" ON product_specifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_features" ON product_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_accessories" ON product_accessories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_documents" ON product_documents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_applications" ON product_applications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access industries" ON industries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access homepage" ON homepage_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access about" ON about_page FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access why_axion" ON why_axion FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access global_offices" ON global_offices FOR ALL USING (auth.role() = 'authenticated');

-- ── Additional Indexes ──────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_why_axion_sort ON why_axion(sort_order);
CREATE INDEX IF NOT EXISTS idx_global_offices_sort ON global_offices(sort_order);
CREATE INDEX IF NOT EXISTS idx_industries_sort ON industries(sort_order);
