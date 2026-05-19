-- ============================================================
-- 005_industries_page_content.sql
-- Description: Creates the tables for industries page content including card-level titles, subtitles, descriptions, and images.
-- ============================================================

DROP TABLE IF EXISTS industries_page;

-- ─── 1. Industries Page Content Table ─────────────────────────
CREATE TABLE industries_page (
  id                            VARCHAR(36)  PRIMARY KEY,
  hero_title                    VARCHAR(255) NOT NULL,
  hero_subtitle                 TEXT,
  hero_badge                    VARCHAR(255),
  hero_image                    VARCHAR(500),
  
  -- Industries Grid General
  sec_badge                     VARCHAR(255),
  sec_title                     VARCHAR(255),
  sec_subtitle                  TEXT,
  
  -- Card 1
  ind_title_1                   VARCHAR(255),
  ind_sub_1                     VARCHAR(255),
  ind_desc_1                    TEXT,
  ind_img_1                     VARCHAR(500),
  
  -- Card 2
  ind_title_2                   VARCHAR(255),
  ind_sub_2                     VARCHAR(255),
  ind_desc_2                    TEXT,
  ind_img_2                     VARCHAR(500),

  -- Card 3
  ind_title_3                   VARCHAR(255),
  ind_sub_3                     VARCHAR(255),
  ind_desc_3                    TEXT,
  ind_img_3                     VARCHAR(500),

  -- Card 4
  ind_title_4                   VARCHAR(255),
  ind_sub_4                     VARCHAR(255),
  ind_desc_4                    TEXT,
  ind_img_4                     VARCHAR(500),

  -- Card 5
  ind_title_5                   VARCHAR(255),
  ind_sub_5                     VARCHAR(255),
  ind_desc_5                    TEXT,
  ind_img_5                     VARCHAR(500),

  -- Card 6
  ind_title_6                   VARCHAR(255),
  ind_sub_6                     VARCHAR(255),
  ind_desc_6                    TEXT,
  ind_img_6                     VARCHAR(500),

  is_active                     BOOLEAN      DEFAULT true,
  created_at                    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at                    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed Initial Content ────────────────────────────────────
INSERT INTO industries_page (
  id,
  hero_title,
  hero_subtitle,
  hero_badge,
  hero_image,
  sec_badge,
  sec_title,
  sec_subtitle,
  
  -- Card 1
  ind_title_1, ind_sub_1, ind_desc_1, ind_img_1,
  -- Card 2
  ind_title_2, ind_sub_2, ind_desc_2, ind_img_2,
  -- Card 3
  ind_title_3, ind_sub_3, ind_desc_3, ind_img_3,
  -- Card 4
  ind_title_4, ind_sub_4, ind_desc_4, ind_img_4,
  -- Card 5
  ind_title_5, ind_sub_5, ind_desc_5, ind_img_5,
  -- Card 6
  ind_title_6, ind_sub_6, ind_desc_6, ind_img_6,
  
  is_active
) VALUES (
  'industries-default',
  'Solutions for Diverse Professional Environments',
  'Axion Technology delivers professional visual technology solutions across 10+ industries, engineered for reliability and high-impact performance.',
  'Markets Served',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
  'Expertise',
  'Industries We Serve',
  'Professional visual technology solutions for the full spectrum of modern professional environments.',
  
  -- Card 1: Live Events
  'Live Events & Entertainment', 
  'High-Impact Spectacles', 
  'Full-scale visual and audio technology for concerts, music festivals, and touring productions. We engineer high-brightness outdoor LED systems that define the world\'s most iconic stages.', 
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
  
  -- Card 2: Exhibitions
  'Exhibitions & Trade Shows', 
  'Brand Activations', 
  'Impactful visual technology solutions for exhibition booths and brand activation events. We create immersive environments that capture attention and drive engagement.', 
  '/images/solutions/exhibitions.png',
  
  -- Card 3: Corporate
  'Corporate Environments', 
  'Enterprise Infrastructure', 
  'Professional AV solutions for boardrooms, lobbies, and executive spaces. We integrate advanced video conferencing and interactive displays into modern corporate ecosystems.', 
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
  
  -- Card 4: Museums
  'Museums & Experience Centers', 
  'Immersive Narratives', 
  'Immersive visual technologies for museums and brand experience spaces. We bridge the gap between architectural design and digital storytelling.', 
  'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80',
  
  -- Card 5: Retail
  'Retail & Digital Signage', 
  'Omnichannel Engagement', 
  'Dynamic digital signage solutions for luxury retail and flagship stores. We transform customer journeys through artistic digital content and interactive touchpoints.', 
  'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80',
  
  -- Card 6: Command Centers
  'Command & Control Centers', 
  'Mission-Critical Operations', 
  'High-reliability video wall solutions for operations centers and security control rooms. We engineer fine-pitch LED systems for 24/7 mission-critical environments.', 
  '/images/solutions/control-centers.png',
  
  true
);
