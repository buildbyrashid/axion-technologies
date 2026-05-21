-- ============================================================
-- Axion Technology - Full MySQL Schema
-- Matches: src/lib/db-helpers.ts column names exactly
-- Run this in MySQL Workbench or phpMyAdmin
-- ============================================================

CREATE DATABASE IF NOT EXISTS axion_technology
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE axion_technology;

-- ─── 1. Admin Users ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id          VARCHAR(36)  PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  name        VARCHAR(255),
  role        VARCHAR(50)  DEFAULT 'admin',
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── 2. Categories ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id          VARCHAR(36)  PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) UNIQUE NOT NULL,
  tagline     VARCHAR(255),
  description TEXT,
  icon        VARCHAR(100),
  image       VARCHAR(500),
  parent_id   VARCHAR(36)  DEFAULT NULL,
  sort_order  INT          DEFAULT 0,
  is_active   BOOLEAN      DEFAULT true,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── 3. Products ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                VARCHAR(36)  PRIMARY KEY,
  category_id       VARCHAR(36),
  subcategory_id    VARCHAR(36),
  name              VARCHAR(255) NOT NULL,
  slug              VARCHAR(255) UNIQUE NOT NULL,
  tagline           VARCHAR(255),
  short_description VARCHAR(500),
  full_description  TEXT,
  featured_image    VARCHAR(500),
  gallery           JSON,
  video_url         VARCHAR(500),
  specifications    JSON,
  features          JSON,
  accessories       JSON,
  applications      JSON,
  downloads         JSON,
  meta_title        VARCHAR(255),
  meta_description  VARCHAR(500),
  is_featured       BOOLEAN      DEFAULT false,
  is_active         BOOLEAN      DEFAULT true,
  sort_order        INT          DEFAULT 0,
  created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (subcategory_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ─── 4. Inquiries ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id          VARCHAR(36)  PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(50),
  company     VARCHAR(255),
  country     VARCHAR(100),
  message     TEXT         NOT NULL,
  product_id  VARCHAR(36),
  source      VARCHAR(100) DEFAULT 'contact_form',
  status      VARCHAR(20)  DEFAULT 'new',
  budget_estimate   DECIMAL(15,2) DEFAULT NULL,
  priority          VARCHAR(20)  DEFAULT 'medium',
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- ─── 5. Download Logs ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS download_logs (
  id          VARCHAR(36)  PRIMARY KEY,
  product_id  VARCHAR(36),
  file_name   VARCHAR(255),
  ip_address  VARCHAR(50),
  user_agent  TEXT,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- ─── Seed: First Admin User ───────────────────────────────────
-- Default password: "password" (change this immediately!)
-- Generate your own hash at: https://bcrypt-generator.com
INSERT IGNORE INTO admins (id, email, password, name, role)
VALUES (
  UUID(),
  'admin@axiontechnology.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Admin User',
  'admin'
);

-- ─── 6. Homepage Hero ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS homepage_hero (
  id                VARCHAR(36)  PRIMARY KEY,
  hero_type         ENUM('video','image') DEFAULT 'video',
  headline          VARCHAR(255) NOT NULL,
  subheadline       TEXT,
  hero_video_1      VARCHAR(500),
  hero_video_2      VARCHAR(500),
  active_video      VARCHAR(500),
  fallback_image    VARCHAR(500),
  hero_image_1      VARCHAR(500),
  hero_image_2      VARCHAR(500),
  active_image      VARCHAR(500),
  is_active         BOOLEAN      DEFAULT true,
  created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── 7. Homepage Expertise ───────────────────────────────────
CREATE TABLE IF NOT EXISTS homepage_expertise (
  id                VARCHAR(36)  PRIMARY KEY,
  section_label     VARCHAR(255),
  section_title     VARCHAR(255),
  description       TEXT,
  stat_1_number     VARCHAR(50),
  stat_1_label      VARCHAR(255),
  stat_2_number     VARCHAR(50),
  stat_2_label      VARCHAR(255),
  stat_3_number     VARCHAR(50),
  stat_3_label      VARCHAR(255),
  stat_4_number     VARCHAR(50),
  stat_4_label      VARCHAR(255),
  created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── 8. Global CTA ───────────────────────────────────────────
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

-- ─── Seed: Homepage Hero ──────────────────────────────────────
INSERT IGNORE INTO homepage_hero (
  id,
  hero_type,
  headline,
  subheadline,
  hero_video_1,
  hero_video_2,
  active_video,
  fallback_image,
  hero_image_1,
  hero_image_2,
  active_image,
  is_active
) VALUES (
  'hero-default',
  'video',
  'Engineering Advanced Visual Solutions',
  'Global engineering excellence in LED display systems, interactive technologies, and integrated AV infrastructure for world-class environments.',
  '/videos/hero-background.mp4',
  '',
  '/videos/hero-background.mp4',
  'https://images.unsplash.com/photo-1517245315814-1397ad28996a?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517245315814-1397ad28996a?auto=format&fit=crop&q=80',
  '',
  'https://images.unsplash.com/photo-1517245315814-1397ad28996a?auto=format&fit=crop&q=80',
  true
);

-- ─── Seed: Homepage Expertise ────────────────────────────────
INSERT IGNORE INTO homepage_expertise (
  id,
  section_label,
  section_title,
  description,
  stat_1_number,
  stat_1_label,
  stat_2_number,
  stat_2_label,
  stat_3_number,
  stat_3_label,
  stat_4_number,
  stat_4_label
) VALUES (
  'expertise-default',
  'Our Expertise',
  'Engineering Excellence',
  'We don\'t just supply products, we engineer integrated visual ecosystems that define modern infrastructure for mission-critical and enterprise environments.',
  '2006',
  'Founded',
  '1250+',
  'Projects',
  '25000',
  'Factory Area (m²)',
  '12+',
  'Global Hubs'
);

-- ─── Seed: Global CTA ────────────────────────────────────────
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

-- ─── 4. About Page Table ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS about_page (
  id                            VARCHAR(36)  PRIMARY KEY,
  hero_title                    VARCHAR(255) NOT NULL,
  hero_subtitle                 TEXT,
  hero_badge                    VARCHAR(255),
  hero_image                    VARCHAR(500),
  who_we_are_badge              VARCHAR(255),
  who_we_are_title              VARCHAR(255),
  who_we_are_paragraph_1        TEXT,
  who_we_are_paragraph_2        TEXT,
  who_we_are_image              VARCHAR(500),
  technical_reach               VARCHAR(255),
  global_operations_title       VARCHAR(255),
  global_operations_description TEXT,
  visual_solutions_title        VARCHAR(255),
  visual_solutions_description  TEXT,
  is_active                     BOOLEAN      DEFAULT true,
  created_at                    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at                    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed: About Page ─────────────────────────────────────────
INSERT IGNORE INTO about_page (
  id,
  hero_title,
  hero_subtitle,
  hero_badge,
  hero_image,
  who_we_are_badge,
  who_we_are_title,
  who_we_are_paragraph_1,
  who_we_are_paragraph_2,
  who_we_are_image,
  technical_reach,
  global_operations_title,
  global_operations_description,
  visual_solutions_title,
  visual_solutions_description,
  is_active
) VALUES (
  'about-default',
  'Engineering Technology for Modern Visual Environments',
  'Axion Technology Co Ltd is a global visual technology engineering company delivering professional LED display systems and integrated AV solutions.',
  'About Us',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
  'Who We Are',
  'Global Leaders in Visual Engineering',
  'Axion Technology Co Ltd is a global visual technology engineering company delivering professional LED display systems, integrated AV solutions, interactive technologies, lighting, audio systems, and technical infrastructure for events, exhibitions, corporate environments, and modern visual experiences.',
  'Backed by over 20 years of industry experience across the Middle East and Europe, Axion combines engineering expertise, OEM manufacturing partnerships, and global supply capabilities to support clients with high-performance visual technologies tailored for real-world applications.',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
  'Hong Kong | Shenzhen | Dubai',
  'Global Operations',
  'With operational presence in Hong Kong, Shenzhen, and Dubai, Axion supports international clients through manufacturing coordination, quality-focused production, regional inventory support, and international logistics.',
  'Visual Solutions',
  'From rental-grade LED systems and touring technologies to premium COB, MIP, and enterprise collaboration displays, Axion delivers scalable visual solutions engineered for reliability, performance, and long-term value.',
  true
);
