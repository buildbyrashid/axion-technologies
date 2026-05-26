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
  products_links JSON,
  solutions_links JSON,
  company_links JSON,
  copyright_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
