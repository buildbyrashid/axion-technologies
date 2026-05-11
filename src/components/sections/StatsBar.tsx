import StatCounter from "@/components/ui/StatCounter";
import { COMPANY_STATS, getYearsExperience } from "@/lib/constants";

export default function StatsBar() {
  const stats = [
    { value: getYearsExperience(), suffix: "+", label: "Years Experience" },
    { value: COMPANY_STATS.GLOBAL_LOCATIONS, suffix: "", label: "Global Locations" },
    { value: COMPANY_STATS.PROJECTS_DELIVERED, suffix: "+", label: "Projects Delivered" },
    { value: COMPANY_STATS.MANUFACTURING_AREA, suffix: "+", label: "Sq.M Manufacturing" },
  ];

  return (
    <section className="bg-white border-b border-slate-100 py-0 lg:py-20">
      <div className="container-custom px-0 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-slate-100 bg-slate-50/50 sm:bg-transparent border-y sm:border-none border-slate-100">
          {stats.map((stat, index) => (
            <div key={index} className="py-6 sm:py-0">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
