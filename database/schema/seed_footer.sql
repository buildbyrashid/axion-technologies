-- Run this file using the "Import" tab in phpMyAdmin to bypass the WAF

CREATE TABLE IF NOT EXISTS footer_settings (
  id VARCHAR(36) PRIMARY KEY,
  description TEXT,
  email VARCHAR(255),
  phone VARCHAR(255),
  address TEXT,
  facebook_url VARCHAR(255),
  twitter_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  instagram_url VARCHAR(255),
  whatsapp_number VARCHAR(255),
  products_links TEXT,
  solutions_links TEXT,
  company_links TEXT,
  copyright_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO footer_settings (
  id,
  description,
  email,
  phone,
  address,
  facebook_url,
  twitter_url,
  linkedin_url,
  instagram_url,
  whatsapp_number,
  products_links,
  solutions_links,
  company_links,
  copyright_text
) VALUES (
  'footer-default',
  'Engineering advanced visual technology solutions for global enterprise environments.',
  'sales@axiontechnology.com',
  '+852 2345 6789',
  'Hong Kong | Shenzhen | Dubai',
  '#',
  '#',
  '#',
  '#',
  '+852 2345 6789',
  '[{"name": "LED Display Systems", "href": "#"}, {"name": "LCD & Kiosks", "href": "#"}, {"name": "Lighting Systems", "href": "#"}, {"name": "Audio Systems", "href": "#"}, {"name": "Power Solutions", "href": "#"}]',
  '[{"name": "Live Events", "href": "#"}, {"name": "Corporate", "href": "#"}, {"name": "Retail & Signage", "href": "#"}, {"name": "Museums", "href": "#"}, {"name": "Command Centers", "href": "#"}]',
  '[{"name": "About Us", "href": "#"}, {"name": "Our Process", "href": "#"}, {"name": "Global Network", "href": "#"}, {"name": "Careers", "href": "#"}, {"name": "Contact", "href": "#"}]',
  'Axion Technology Co Ltd. All rights reserved.'
);
