import SectionHeader from "@/components/ui/SectionHeader";
import IndustryCard from "@/components/ui/IndustryCard";
import { Button } from "@/components/ui/Button";

const industries = [
  { name: "Live Events & Entertainment", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80" },
  { name: "Exhibitions & Trade Shows", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" },
  { name: "Corporate Environments", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" },
  { name: "Museums & Experience Centers", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80" },
  { name: "Retail & Digital Signage", image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80" },
  { name: "Command & Control Centers", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80" },
  { name: "Hospitality & Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" },
  { name: "Houses of Worship", image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80" },
  { name: "Aquariums & Zoos", image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80" },
  { name: "Education & Training", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="section-padding bg-slate-50">
      <div className="container-custom">
        <SectionHeader
          badge="Industries"
          title="Transforming Diverse Environments"
          subtitle="Our engineering expertise adapts to the unique requirements of every sector."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              index={index}
              {...industry}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="rounded-full border-slate-300">
            View All Industries
          </Button>
        </div>
      </div>
    </section>
  );
}
