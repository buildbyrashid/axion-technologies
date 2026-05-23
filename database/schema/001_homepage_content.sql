-- ============================================================
-- 001_homepage_content.sql
-- Description: Creates the tables for homepage hero and expertise settings
-- Do NOT destructively modify existing tables.
-- ============================================================

-- ─── 1. Homepage Hero Table ─────────────────────────────────
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

-- ─── 2. Homepage Expertise Table ────────────────────────────
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
  is_active         BOOLEAN      DEFAULT true,
  created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed Initial Content ────────────────────────────────────
-- Insert default Hero configurations if not exist
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

-- Insert default Expertise configuration if not exist
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
