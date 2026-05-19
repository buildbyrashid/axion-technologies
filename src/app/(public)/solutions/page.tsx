import type { Metadata } from 'next';
import { query } from '@/lib/db-helpers';
import SolutionsClientContent from './SolutionsClientContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Enterprise Solutions | Axion Technology',
  description: 'Axion Technology engineers complete B2B visual ecosystems and AV infrastructure environments, moving beyond equipment to redefine professional spaces.',
};

async function getSolutionsData() {
  try {
    const rows = await query<any[]>('SELECT * FROM solutions_page WHERE is_active = 1 LIMIT 1');
    return rows[0] || null;
  } catch (error) {
    console.error("Error fetching solutions page database content:", error);
    return null;
  }
}

export default async function SolutionsPage() {
  const dbData = await getSolutionsData();

  // Fallbacks corresponding to original high-fidelity content
  const heroBadge = dbData?.hero_badge || "Enterprise Solutions";
  const heroTitle = dbData?.hero_title || "Engineering Integrated Visual Ecosystems";
  const heroSubtitle = dbData?.hero_subtitle || "Moving beyond equipment to engineer complete visual environments that redefine professional infrastructure.";
  const heroImage = dbData?.hero_image || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80";

  const techBadge = dbData?.tech_badge || "Technical Foundations";
  const techTitle = dbData?.tech_title || "Integrated Engineering Technologies";
  const techSubtitle = dbData?.tech_subtitle || "Core engineering systems that power our advanced visual infrastructure.";

  // Individual Technical Foundations card Titles & Images
  const techTitle1 = dbData?.tech_title_1 || "LED Display Systems";
  const techImg1 = dbData?.tech_img_1 || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80";
  
  const techTitle2 = dbData?.tech_title_2 || "LCD & Interactive Kiosks";
  const techImg2 = dbData?.tech_img_2 || "/images/solutions/kiosk.png";
  
  const techTitle3 = dbData?.tech_title_3 || "Professional Lighting";
  const techImg3 = dbData?.tech_img_3 || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80";
  
  const techTitle4 = dbData?.tech_title_4 || "Professional Audio";
  const techImg4 = dbData?.tech_img_4 || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80";
  
  const techTitle5 = dbData?.tech_title_5 || "Power & Connectivity";
  const techImg5 = dbData?.tech_img_5 || "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80";

  const envBadge = dbData?.env_badge || "Environments";
  const envTitle = dbData?.env_title || "Solutions Built for Real Environments";
  const envSubtitle = dbData?.env_subtitle || "We don't just sell products; we transform physical spaces through cinematic visual engineering.";

  // Individual Environments card Titles & Images
  const envTitle1 = dbData?.env_title_1 || "Corporate Visual Ecosystems";
  const envImg1 = dbData?.env_img_1 || "/images/solutions/corporate-solutions.png";
  
  const envTitle2 = dbData?.env_title_2 || "Live Event Infrastructure";
  const envImg2 = dbData?.env_img_2 || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80";
  
  const envTitle3 = dbData?.env_title_3 || "Command & Control Centers";
  const envImg3 = dbData?.env_img_3 || "/images/solutions/control-centers.png";
  
  const envTitle4 = dbData?.env_title_4 || "Retail & Digital Signage";
  const envImg4 = dbData?.env_img_4 || "/images/solutions/retail-experience.png";
  
  const envTitle5 = dbData?.env_title_5 || "Museums & Experience Centers";
  const envImg5 = dbData?.env_img_5 || "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80";
  
  const envTitle6 = dbData?.env_title_6 || "Broadcast & Studios";
  const envImg6 = dbData?.env_img_6 || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80";
  
  const envTitle7 = dbData?.env_title_7 || "Hospitality & Entertainment";
  const envImg7 = dbData?.env_img_7 || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80";

  return (
    <main className="bg-white">
      <SolutionsClientContent
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroBadge={heroBadge}
        heroImage={heroImage}
        techBadge={techBadge}
        techTitle={techTitle}
        techSubtitle={techSubtitle}
        techTitle1={techTitle1}
        techImg1={techImg1}
        techTitle2={techTitle2}
        techImg2={techImg2}
        techTitle3={techTitle3}
        techImg3={techImg3}
        techTitle4={techTitle4}
        techImg4={techImg4}
        techTitle5={techTitle5}
        techImg5={techImg5}
        envBadge={envBadge}
        envTitle={envTitle}
        envSubtitle={envSubtitle}
        envTitle1={envTitle1}
        envImg1={envImg1}
        envTitle2={envTitle2}
        envImg2={envImg2}
        envTitle3={envTitle3}
        envImg3={envImg3}
        envTitle4={envTitle4}
        envImg4={envImg4}
        envTitle5={envTitle5}
        envImg5={envImg5}
        envTitle6={envTitle6}
        envImg6={envImg6}
        envTitle7={envTitle7}
        envImg7={envImg7}
      />
    </main>
  );
}
