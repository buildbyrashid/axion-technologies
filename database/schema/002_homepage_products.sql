-- MySQL Database Schema and Seed Data for homepage_products
-- Hostinger Database Compatible

CREATE TABLE IF NOT EXISTS `homepage_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `sort_order` int DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Seed Data (This matches your current local data)
INSERT INTO `homepage_products` (`id`, `title`, `category`, `image_url`, `sort_order`) VALUES
(1, 'Outdoor LED Video Walls', 'LED Display Systems', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80', 1),
(2, 'Interactive Retail Kiosks', 'LCD Solutions', 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80', 2),
(3, 'Corporate Boardroom Displays', 'Enterprise Systems', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80', 3),
(4, 'Stage Lighting Arrays', 'Professional Lighting', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', 4),
(5, 'Concert Line Arrays', 'Pro Audio', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80', 5)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  category = VALUES(category),
  image_url = VALUES(image_url),
  sort_order = VALUES(sort_order);
