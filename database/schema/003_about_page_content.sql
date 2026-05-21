-- ============================================================
-- 003_about_page_content.sql
-- Description: Creates the tables for about page hero, who we are, global operations, and visual solutions.
-- Do NOT destructively modify existing tables without dropping/overwriting them if requested.
-- ============================================================

DROP TABLE IF EXISTS about_page;

-- ─── 1. About Page Content Table ─────────────────────────────
CREATE TABLE about_page (
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

-- ─── Seed Initial Content ────────────────────────────────────
INSERT INTO about_page (
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
