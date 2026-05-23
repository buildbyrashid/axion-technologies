-- ============================================================
-- 008_homepage_products.sql
-- Description: Creates the table for homepage products and seeds initial data
-- ============================================================

-- ─── Homepage Products Table ─────────────────────────────────
CREATE TABLE IF NOT EXISTS homepage_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  href VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0
);

-- ─── Seed Initial Content ────────────────────────────────────
INSERT IGNORE INTO homepage_products (id, title, category, image, href, sort_order) VALUES
(1, 'LED Display Systems', 'Visual Hardware', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80', '/products/led-display-systems', 1),
(2, 'Interactive Kiosks', 'Engagement', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80', '/products/lcd-screens-interactive-kiosks', 2),
(3, 'Lighting Systems', 'Atmosphere', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', '/products/lighting-systems', 3),
(4, 'Professional Audio', 'Infrastructure', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80', '/products/professional-audio-systems', 4),
(5, 'Power Solutions', 'Integration', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80', '/products/power-distribution-cable-solutions', 5);
