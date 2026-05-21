import type { Metadata } from 'next';
import { query } from '@/lib/db-helpers';
import IndustriesClientContent from './IndustriesClientContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Industries We Serve | Axion Technology',
  description: 'Axion Technology serves diverse professional environments including Live Events, Trade Shows, Corporate Spaces, Museums, Retail, and Control Rooms.',
};

async function getIndustriesData() {
  try {
    const rows = await query<any[]>('SELECT * FROM industries_page WHERE is_active = 1 LIMIT 1');
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching industries page database content:", error);
    return null;
  }
}

export default async function IndustriesPage() {
  const dbData = await getIndustriesData();

  // Hero Section Fallbacks
  const heroBadge = dbData?.hero_badge || "Markets Served";
  const heroTitle = dbData?.hero_title || "Solutions for Diverse Professional Environments";
  const heroSubtitle = dbData?.hero_subtitle || "Axion Technology delivers professional visual technology solutions across 10+ industries, engineered for reliability and high-impact performance.";
  const heroImage = dbData?.hero_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80";

  // Section General Fallbacks
  const secBadge = dbData?.sec_badge || "Expertise";
  const secTitle = dbData?.sec_title || "Industries We Serve";
  const secSubtitle = dbData?.sec_subtitle || "Professional visual technology solutions for the full spectrum of modern professional environments.";

  // Card 1: Live Events
  const indTitle1 = dbData?.ind_title_1 || "Live Events & Entertainment";
  const indSub1 = dbData?.ind_sub_1 || "High-Impact Spectacles";
  const indDesc1 = dbData?.ind_desc_1 || "Full-scale visual and audio technology for concerts, music festivals, and touring productions. We engineer high-brightness outdoor LED systems that define the world's most iconic stages.";
  const indImg1 = dbData?.ind_img_1 || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80";

  // Card 2: Exhibitions
  const indTitle2 = dbData?.ind_title_2 || "Exhibitions & Trade Shows";
  const indSub2 = dbData?.ind_sub_2 || "Brand Activations";
  const indDesc2 = dbData?.ind_desc_2 || "Impactful visual technology solutions for exhibition booths and brand activation events. We create immersive environments that capture attention and drive engagement.";
  const indImg2 = dbData?.ind_img_2 || "/images/solutions/exhibitions.png";

  // Card 3: Corporate
  const indTitle3 = dbData?.ind_title_3 || "Corporate Environments";
  const indSub3 = dbData?.ind_sub_3 || "Enterprise Infrastructure";
  const indDesc3 = dbData?.ind_desc_3 || "Professional AV solutions for boardrooms, lobbies, and executive spaces. We integrate advanced video conferencing and interactive displays into modern corporate ecosystems.";
  const indImg3 = dbData?.ind_img_3 || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80";

  // Card 4: Museums
  const indTitle4 = dbData?.ind_title_4 || "Museums & Experience Centers";
  const indSub4 = dbData?.ind_sub_4 || "Immersive Narratives";
  const indDesc4 = dbData?.ind_desc_4 || "Immersive visual technologies for museums and brand experience spaces. We bridge the gap between architectural design and digital storytelling.";
  const indImg4 = dbData?.ind_img_4 || "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80";

  // Card 5: Retail
  const indTitle5 = dbData?.ind_title_5 || "Retail & Digital Signage";
  const indSub5 = dbData?.ind_sub_5 || "Omnichannel Engagement";
  const indDesc5 = dbData?.ind_desc_5 || "Dynamic digital signage solutions for luxury retail and flagship stores. We transform customer journeys through artistic digital content and interactive touchpoints.";
  const indImg5 = dbData?.ind_img_5 || "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80";

  // Card 6: Command Centers
  const indTitle6 = dbData?.ind_title_6 || "Command & Control Centers";
  const indSub6 = dbData?.ind_sub_6 || "Mission-Critical Operations";
  const indDesc6 = dbData?.ind_desc_6 || "High-reliability video wall solutions for operations centers and security control rooms. We engineer fine-pitch LED systems for 24/7 mission-critical environments.";
  const indImg6 = dbData?.ind_img_6 || "/images/solutions/control-centers.png";

  return (
    <IndustriesClientContent
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      heroBadge={heroBadge}
      heroImage={heroImage}
      secBadge={secBadge}
      secTitle={secTitle}
      secSubtitle={secSubtitle}
      indTitle1={indTitle1}
      indSub1={indSub1}
      indDesc1={indDesc1}
      indImg1={indImg1}
      indTitle2={indTitle2}
      indSub2={indSub2}
      indDesc2={indDesc2}
      indImg2={indImg2}
      indTitle3={indTitle3}
      indSub3={indSub3}
      indDesc3={indDesc3}
      indImg3={indImg3}
      indTitle4={indTitle4}
      indSub4={indSub4}
      indDesc4={indDesc4}
      indImg4={indImg4}
      indTitle5={indTitle5}
      indSub5={indSub5}
      indDesc5={indDesc5}
      indImg5={indImg5}
      indTitle6={indTitle6}
      indSub6={indSub6}
      indDesc6={indDesc6}
      indImg6={indImg6}
    />
  );
}
