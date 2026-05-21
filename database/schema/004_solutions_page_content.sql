-- ============================================================
-- 004_solutions_page_content.sql
-- Description: Creates the tables for solutions page content including card-level titles and images.
-- ============================================================

DROP TABLE IF EXISTS solutions_page;

-- ─── 1. Solutions Page Content Table ─────────────────────────
CREATE TABLE solutions_page (
  id                            VARCHAR(36)  PRIMARY KEY,
  hero_title                    VARCHAR(255) NOT NULL,
  hero_subtitle                 TEXT,
  hero_badge                    VARCHAR(255),
  hero_image                    VARCHAR(500),
  
  -- Technical Foundations General
  tech_badge                    VARCHAR(255),
  tech_title                    VARCHAR(255),
  tech_subtitle                 TEXT,
  
  -- Technical Foundations Cards (Title and Image)
  tech_title_1                  VARCHAR(255), -- default: LED Display Systems
  tech_img_1                    VARCHAR(500),
  tech_title_2                  VARCHAR(255), -- default: LCD & Interactive Kiosks
  tech_img_2                    VARCHAR(500),
  tech_title_3                  VARCHAR(255), -- default: Professional Lighting
  tech_img_3                    VARCHAR(500),
  tech_title_4                  VARCHAR(255), -- default: Professional Audio
  tech_img_4                    VARCHAR(500),
  tech_title_5                  VARCHAR(255), -- default: Power & Connectivity
  tech_img_5                    VARCHAR(500),

  -- Environments General
  env_badge                    VARCHAR(255),
  env_title                    VARCHAR(255),
  env_subtitle                 TEXT,
  
  -- Environments Cards (Title and Image)
  env_title_1                  VARCHAR(255), -- default: Corporate Visual Ecosystems
  env_img_1                    VARCHAR(500),
  env_title_2                  VARCHAR(255), -- default: Live Event Infrastructure
  env_img_2                    VARCHAR(500),
  env_title_3                  VARCHAR(255), -- default: Command & Control Centers
  env_img_3                    VARCHAR(500),
  env_title_4                  VARCHAR(255), -- default: Retail & Digital Signage
  env_img_4                    VARCHAR(500),
  env_title_5                  VARCHAR(255), -- default: Museums & Experience Centers
  env_img_5                    VARCHAR(500),
  env_title_6                  VARCHAR(255), -- default: Broadcast & Studios
  env_img_6                    VARCHAR(500),
  env_title_7                  VARCHAR(255), -- default: Hospitality & Entertainment
  env_img_7                    VARCHAR(500),

  is_active                     BOOLEAN      DEFAULT true,
  created_at                    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at                    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed Initial Content ────────────────────────────────────
INSERT INTO solutions_page (
  id,
  hero_title,
  hero_subtitle,
  hero_badge,
  hero_image,
  tech_badge,
  tech_title,
  tech_subtitle,
  
  -- Tech Cards (Titles & Images)
  tech_title_1, tech_img_1,
  tech_title_2, tech_img_2,
  tech_title_3, tech_img_3,
  tech_title_4, tech_img_4,
  tech_title_5, tech_img_5,
  
  env_badge,
  env_title,
  env_subtitle,
  
  -- Env Cards (Titles & Images)
  env_title_1, env_img_1,
  env_title_2, env_img_2,
  env_title_3, env_img_3,
  env_title_4, env_img_4,
  env_title_5, env_img_5,
  env_title_6, env_img_6,
  env_title_7, env_img_7,
  
  is_active
) VALUES (
  'solutions-default',
  'Engineering Integrated Visual Ecosystems',
  'Moving beyond equipment to engineer complete visual environments that redefine professional infrastructure.',
  'Enterprise Solutions',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
  'Technical Foundations',
  'Integrated Engineering Technologies',
  'Core engineering systems that power our advanced visual infrastructure.',
  
  -- Tech cards seed data
  'LED Display Systems', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
  'LCD & Interactive Kiosks', '/images/solutions/kiosk.png',
  'Professional Lighting', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
  'Professional Audio', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80',
  'Power & Connectivity', 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80',
  
  'Environments',
  'Solutions Built for Real Environments',
  'We don\'t just sell products; we transform physical spaces through cinematic visual engineering.',
  
  -- Env cards seed data
  'Corporate Visual Ecosystems', '/images/solutions/corporate-solutions.png',
  'Live Event Infrastructure', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
  'Command & Control Centers', '/images/solutions/control-centers.png',
  'Retail & Digital Signage', '/images/solutions/retail-experience.png',
  'Museums & Experience Centers', 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80',
  'Broadcast & Studios', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80',
  'Hospitality & Entertainment', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  
  true
);
