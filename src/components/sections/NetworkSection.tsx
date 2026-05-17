"use client";

import { motion, Variants } from "framer-motion";
import { Building2, Settings2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  {
    city: "Hong Kong",
    role: "Global Operations",
    description:
      "Global business operations and international coordination.",
    isHQ: true,
    badge: null,
    icon: Building2,
  },
  {
    city: "Shenzhen",
    role: "Engineering & Supply",
    description:
      "Manufacturing coordination, sourcing, and supply chain management.",
    isHQ: false,
    badge: null,
    icon: Settings2,
  },
  {
    city: "Dubai",
    role: "Middle East Office",
    description:
      "Middle East operations and regional inventory support.",
    isHQ: false,
    badge: null,
    icon: MapPin,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function NetworkSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold
                           tracking-widest uppercase text-accent bg-accent/10
                           border border-accent/20 px-4 py-2 mb-5">
            <span className="w-1.5 h-1.5 bg-accent" />
            Global Operations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            International Operations &<br className="hidden sm:block" />
            {" "}Supply Network
          </h2>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden sm:block">
          <div className="relative">

            {/* Connecting line */}
            <div className="absolute top-[27px] left-[calc(16.67%)] 
                            right-[calc(16.67%)] h-px bg-accent z-0" />

            {/* Nodes */}
            <div className="grid grid-cols-3 relative z-10">
              {locations.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center px-6"
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-14 h-14 flex items-center justify-center mb-4 border-2 transition-all",
                      loc.isHQ
                        ? "bg-accent border-accent"
                        : "bg-white border-accent"
                    )}
                  >
                    <loc.icon
                      className={cn(
                        "w-6 h-6",
                        loc.isHQ ? "text-white" : "text-accent"
                      )}
                    />
                  </div>

                  {/* HQ Badge */}
                  {loc.badge && (
                    <span className="text-xs font-semibold bg-accent/10 
                                     text-accent border border-accent/20 
                                     px-3 py-1 mb-3">
                      {loc.badge}
                    </span>
                  )}

                  {/* City */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {loc.city}
                  </h3>

                  {/* Role */}
                  <p className="text-xs font-semibold text-accent 
                                uppercase tracking-wider mb-3">
                    {loc.role}
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-px bg-slate-200 mb-3" />

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {loc.description}
                  </p>

                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile — Vertical timeline */}
        <div className="sm:hidden relative">

          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 
                          w-px bg-accent z-0" />

          <div className="flex flex-col gap-10 relative z-10">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.city}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-5"
              >
                {/* Circle */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center border-2",
                    loc.isHQ
                      ? "bg-accent border-accent"
                      : "bg-white border-accent"
                  )}
                >
                  <loc.icon
                    className={cn(
                      "w-6 h-6",
                      loc.isHQ ? "text-white" : "text-accent"
                    )}
                  />
                </div>

                {/* Content */}
                <div className="pt-1">
                  {loc.badge && (
                    <span className="text-xs font-semibold bg-accent/10
                                     text-accent border border-accent/20
                                     px-3 py-1 mb-2 inline-block">
                      {loc.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {loc.city}
                  </h3>
                  <p className="text-xs font-semibold text-accent 
                                uppercase tracking-wider mb-2">
                    {loc.role}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {loc.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
