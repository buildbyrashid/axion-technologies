-- ============================================================
-- 006_categories_products_seeding.sql
-- Description: Seeds the categories and sub-categories into the database
-- ============================================================

-- Clean existing categories (only dynamic seed)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;

-- ─── MAIN CATEGORIES ──────────────────────────────────────────
INSERT INTO categories (id, name, slug, tagline, description, parent_id, sort_order, is_active)
VALUES 
  ('cat-led', 'LED DISPLAY SYSTEMS', 'led-display-systems', 'Brilliant Visuals for Every Environment', 'High-performance B2B display systems for stage, outdoor advertising, and control centers.', NULL, 10, true),
  ('cat-lcd', 'LCD SCREENS & INTERACTIVE KIOSKS', 'lcd-screens-interactive-kiosks', 'Smart Displays for Connected Experiences', 'Premium touchscreen systems and self-service kiosks for modern retail and hospitality.', NULL, 20, true),
  ('cat-light', 'LIGHTING SYSTEMS', 'lighting-systems', 'Dynamic Lighting for Immersive Spaces', 'Professional moving heads, architectural washes, and DMX console triggers.', NULL, 30, true),
  ('cat-audio', 'PROFESSIONAL AUDIO SYSTEMS', 'professional-audio-systems', 'Precision Audio for Powerful Experiences', 'High-fidelity line arrays, active subwoofers, and DSP power management products.', NULL, 40, true),
  ('cat-power', 'POWER DISTRIBUTION & CABLE SOLUTIONS', 'power-distribution-cable-solutions', 'Reliable Infrastructure for Critical Power', 'Robust power distribution boxes and professional grade cabling solutions.', NULL, 50, true);

-- ─── SUB-CATEGORIES FOR LED ──────────────────────────────────
INSERT INTO categories (id, name, slug, tagline, description, parent_id, sort_order, is_active)
VALUES 
  ('sub-led-1', 'Indoor Rental LED Displays', 'indoor-rental-led-displays', 'High-Impact Spectacles', 'Full-scale visual and audio technology for concerts and touring productions.', 'cat-led', 1, true),
  ('sub-led-2', 'Outdoor Rental LED Displays', 'outdoor-rental-led-displays', 'Brand Activations', 'Impactful visual technology solutions for outdoor events.', 'cat-led', 2, true),
  ('sub-led-3', 'Fine Pitch LED Displays', 'fine-pitch-led-displays', 'Enterprise Infrastructure', 'Professional fine pitch video walls for boardrooms.', 'cat-led', 3, true),
  ('sub-led-4', 'COB LED Displays', 'cob-led-displays', 'Chip on Board Technology', 'High density LED arrays for high reliability applications.', 'cat-led', 4, true),
  ('sub-led-5', 'MIP LED Displays', 'mip-led-displays', 'Micro LED in Package', 'Ultra fine pitch Micro LED solutions.', 'cat-led', 5, true),
  ('sub-led-6', 'Creative LED Displays', 'creative-led-displays', 'Artistic Installs', 'Custom shape and creative design LED options.', 'cat-led', 6, true),
  ('sub-led-7', 'Curved & Transparent LED Displays', 'curved-transparent-led-displays', 'See-through displays', 'Aesthetic curved and highly transparent screens.', 'cat-led', 7, true),
  ('sub-led-8', 'All-in-One LED Displays', 'all-in-one-led-displays', 'Smart Screen Solution', 'Complete pre-packaged LED wall with integrated OS.', 'cat-led', 8, true),
  ('sub-led-9', 'Fixed Installation LED Systems', 'fixed-installation-led-systems', 'Commercial Signage', 'Permanent indoor and outdoor screen installations.', 'cat-led', 9, true);

-- ─── SUB-CATEGORIES FOR LCD ──────────────────────────────────
INSERT INTO categories (id, name, slug, tagline, description, parent_id, sort_order, is_active)
VALUES 
  ('sub-lcd-1', 'Interactive Touch Screens', 'interactive-touch-screens', 'Connected experiences', 'Multi-touch LCD panels for collaborative corporate environments.', 'cat-lcd', 1, true),
  ('sub-lcd-2', 'Digital Signage Displays', 'digital-signage-displays', 'Retail branding', 'Dynamic commercial media players and public signs.', 'cat-lcd', 2, true),
  ('sub-lcd-3', 'Interactive Kiosks', 'interactive-kiosks', 'Self-service solutions', 'Premium B2B checkout and reservation terminals.', 'cat-lcd', 3, true),
  ('sub-lcd-4', 'OLED Displays', 'oled-displays', 'Unmatched contrast', 'Sleek OLED panels with ultra deep blacks.', 'cat-lcd', 4, true),
  ('sub-lcd-5', 'Transparent OLED Systems', 'transparent-oled-systems', 'Futuristic glass overlays', 'Creative transparent OLED display packages.', 'cat-lcd', 5, true),
  ('sub-lcd-6', 'Self-Service Kiosks', 'self-service-kiosks', 'Rapid checkout terminals', 'Robust public service check-in systems.', 'cat-lcd', 6, true),
  ('sub-lcd-7', 'Enterprise Collaboration Displays', 'enterprise-collaboration-displays', 'Smart whiteboard', 'Interactive screens for video conferencing.', 'cat-lcd', 7, true),
  ('sub-lcd-8', 'Meeting Room Solutions', 'meeting-room-solutions', 'Integrated schedulers', 'Corporate LCD door plaques and control hubs.', 'cat-lcd', 8, true),
  ('sub-lcd-9', 'Information & Wayfinding Systems', 'information-wayfinding-systems', 'Digital signage paths', 'Wayfinding directories for shopping malls and airports.', 'cat-lcd', 9, true);

-- ─── SUB-CATEGORIES FOR LIGHTING ──────────────────────────────
INSERT INTO categories (id, name, slug, tagline, description, parent_id, sort_order, is_active)
VALUES 
  ('sub-light-1', 'Moving Head Lights', 'moving-head-lights', 'Concert stage dynamics', 'High speed moving fixtures with GOBO patterns and profile cuts.', 'cat-light', 1, true),
  ('sub-light-2', 'Beam Lights', 'beam-lights', 'Sharp beams', 'Ultra narrow beam spots for stadium-level sky tracking.', 'cat-light', 2, true),
  ('sub-light-3', 'Wash Lights', 'wash-lights', 'Broad washes', 'Wide flood lights for background colors.', 'cat-light', 3, true),
  ('sub-light-4', 'Hybrid Fixtures', 'hybrid-fixtures', 'Beam, spot and wash', 'Three-in-one smart stage lighting systems.', 'cat-light', 4, true),
  ('sub-light-5', 'Profile Lights', 'profile-lights', 'Rigid profile cuts', 'Precise stage framing and spotlight systems.', 'cat-light', 5, true),
  ('sub-light-6', 'Outdoor IP Lighting', 'outdoor-ip-lighting', 'Weather-proof setups', 'IP65 rated waterproof lighting arrays.', 'cat-light', 6, true),
  ('sub-light-7', 'Architectural Lighting', 'architectural-lighting', 'Facade accentuation', 'Static washes and dynamic color panels for buildings.', 'cat-light', 7, true),
  ('sub-light-8', 'Effect Lighting', 'effect-lighting', 'Strobes and lasers', 'Creative visual fixtures for nightclubs and theatrical setups.', 'cat-light', 8, true),
  ('sub-light-9', 'Follow Spots', 'follow-spots', 'Live tracking spots', 'Manual and automated stage character spotlights.', 'cat-light', 9, true),
  ('sub-light-10', 'DMX & Control Systems', 'dmx-control-systems', 'Lighting desks', 'Advanced network decoders and console products.', 'cat-light', 10, true);

-- ─── SUB-CATEGORIES FOR AUDIO ─────────────────────────────────
INSERT INTO categories (id, name, slug, tagline, description, parent_id, sort_order, is_active)
VALUES 
  ('sub-audio-1', 'Line Array Systems', 'line-array-systems', 'Stadium sound arrays', 'High pressure line arrays for concert halls and stadium productions.', 'cat-audio', 1, true),
  ('sub-audio-2', 'Professional Speakers', 'professional-speakers', 'Corporate point sources', 'High clarity speakers for theatres and boardrooms.', 'cat-audio', 2, true),
  ('sub-audio-3', 'Subwoofers', 'subwoofers', 'Low frequency punch', 'Ultra low frequency horn-loaded B2B subwoofers.', 'cat-audio', 3, true),
  ('sub-audio-4', 'Amplifiers', 'amplifiers', 'Multi-channel power', 'High efficiency class-D network power amplifiers.', 'cat-audio', 4, true),
  ('sub-audio-5', 'DSP Systems', 'dsp-systems', 'Network processors', 'Advanced matrices with AEC and automixing algorithms.', 'cat-audio', 5, true),
  ('sub-audio-6', 'Installation Audio', 'installation-audio', 'Commercial ceiling speakers', 'Pendant and ceiling systems for shopping malls and retail outlets.', 'cat-audio', 6, true),
  ('sub-audio-7', 'Conference Audio Systems', 'conference-audio-systems', 'Gooseneck delegate arrays', 'Integrated microphone matrices and delegate systems.', 'cat-audio', 7, true);
