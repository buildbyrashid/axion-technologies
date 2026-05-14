"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ProductSpec {
  label: string;
  value: string;
}

interface SubCategory {
  name: string;
  tagline: string;
  href: string;
  image: string;
  specs: ProductSpec[];
  features: string[];
}

interface Category {
  name: string;
  href: string;
  subcategories: SubCategory[];
}

const categories: Category[] = [
  {
    name: "LED DISPLAY SYSTEMS",
    href: "/products/led-display-systems",
    subcategories: [
      {
        name: "Indoor Rental LED Displays",
        tagline: "Brilliant Visuals for Indoor Event Environments",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Application", value: "Events & Exhibitions" },
          { label: "Pixel Pitch", value: "P1.9 – P4.8" },
        ],
        features: [
          "Lightweight rental cabinets",
          "Fast installation system",
          "High refresh rate visuals",
          "Seamless panel alignment",
        ],
      },
      {
        name: "Outdoor Rental LED Displays",
        tagline: "High Brightness Displays for Outdoor Productions",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Brightness", value: "5000–8000 nits" },
          { label: "Protection", value: "IP65 Rated" },
        ],
        features: [
          "Weatherproof design",
          "High-impact outdoor visuals",
          "Quick-lock cabinet system",
          "Wide viewing angles",
        ],
      },
      {
        name: "Fine Pitch LED Displays",
        tagline: "Ultra Fine Pixel Precision for Premium Spaces",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Pixel Pitch", value: "P0.9 – P1.8" },
          { label: "Usage", value: "Control Rooms & Corporate" },
        ],
        features: [
          "Ultra-sharp image quality",
          "Front maintenance access",
          "HDR visual performance",
          "Accurate color calibration",
        ],
      },
      {
        name: "COB LED Displays",
        tagline: "Advanced Chip-on-Board LED Technology",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Technology", value: "COB Packaging" },
          { label: "Durability", value: "High Protection Surface" },
        ],
        features: [
          "Enhanced durability",
          "Superior heat dissipation",
          "Anti-collision surface",
          "High contrast visuals",
        ],
      },
      {
        name: "MIP LED Displays",
        tagline: "Micro LED Innovation for Premium Installations",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Technology", value: "Micro LED Packaging" },
          { label: "Display", value: "Ultra Fine Resolution" },
        ],
        features: [
          "Energy efficient technology",
          "Improved visual consistency",
          "Enhanced black levels",
          "Long operational lifespan",
        ],
      },
      {
        name: "Creative LED Displays",
        tagline: "Custom LED Concepts for Immersive Experiences",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Design", value: "Custom Configurations" },
          { label: "Application", value: "Experiential Installations" },
        ],
        features: [
          "Flexible display structures",
          "Custom creative shapes",
          "Immersive visual experiences",
          "Modular design systems",
        ],
      },
      {
        name: "Curved & Transparent LED Displays",
        tagline: "Architectural LED Innovation with Transparency",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Transparency", value: "Up to 85%" },
          { label: "Design", value: "Curved Structures" },
        ],
        features: [
          "Transparent visual effects",
          "Curved installation support",
          "Lightweight cabinet design",
          "Modern architectural aesthetics",
        ],
      },
      {
        name: "All-in-One LED Displays",
        tagline: "Integrated LED Systems for Collaboration Spaces",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Integration", value: "Built-in System" },
          { label: "Usage", value: "Meeting & Presentation Rooms" },
        ],
        features: [
          "Plug-and-play operation",
          "Integrated audio system",
          "Wireless connectivity",
          "Corporate collaboration ready",
        ],
      },
      {
        name: "Fixed Installation LED Systems",
        tagline: "Permanent LED Solutions for Professional Spaces",
        href: "/products/led-display-systems",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Installation", value: "Fixed Mounting" },
          { label: "Application", value: "Retail & Corporate" },
        ],
        features: [
          "Front service accessibility",
          "Long-term reliability",
          "Slim cabinet structure",
          "High brightness output",
        ],
      },
    ],
  },

  {
    name: "LCD SCREENS & INTERACTIVE KIOSKS",
    href: "/products/lcd-screens-&-interactive-kiosks",
    subcategories: [
      {
        name: "Interactive Touch Screens",
        tagline: "Smart Collaboration & Interactive Communication",
        href: "/products/lcd-screens-&-interactive-kiosks",
        image:
          "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Touch", value: "20 Point Multi-Touch" },
          { label: "Resolution", value: "4K UHD" },
        ],
        features: [
          "Smooth touch interaction",
          "Wireless screen sharing",
          "Integrated collaboration tools",
          "Anti-glare display surface",
        ],
      },
      {
        name: "Digital Signage Displays",
        tagline: "Dynamic Digital Communication Solutions",
        href: "/products/lcd-screens-&-interactive-kiosks",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Operation", value: "24/7 Commercial Use" },
          { label: "Brightness", value: "700 nits" },
        ],
        features: [
          "Cloud content management",
          "Remote display monitoring",
          "Portrait & landscape modes",
          "Commercial-grade panels",
        ],
      },
      {
        name: "Interactive Kiosks",
        tagline: "Self-Service Interactive Engagement Systems",
        href: "/products/lcd-screens-&-interactive-kiosks",
        image:
          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Usage", value: "Retail & Public Spaces" },
          { label: "Touch", value: "Multi-Touch Interface" },
        ],
        features: [
          "Self-service interaction",
          "Custom branding support",
          "Integrated hardware options",
          "Modern slim design",
        ],
      },
      {
        name: "OLED Displays",
        tagline: "Premium OLED Visual Performance",
        href: "/products/lcd-screens-&-interactive-kiosks",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Display", value: "OLED Technology" },
          { label: "Contrast", value: "Infinite Contrast" },
        ],
        features: [
          "True black color output",
          "Ultra-thin design",
          "Exceptional image clarity",
          "Premium visual aesthetics",
        ],
      },
      {
        name: "Transparent OLED Systems",
        tagline: "Next-Generation Transparent Display Solutions",
        href: "/products/lcd-screens-&-interactive-kiosks",
        image:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Transparency", value: "High Transparency" },
          { label: "Application", value: "Retail & Museums" },
        ],
        features: [
          "Transparent viewing experience",
          "Futuristic visual presentation",
          "Interactive integration ready",
          "Architectural compatibility",
        ],
      },
    ],
  },

  {
    name: "LIGHTING SYSTEMS",
    href: "/products/lighting-systems",
    subcategories: [
      {
        name: "Moving Head Lights",
        tagline: "Dynamic Intelligent Lighting Systems",
        href: "/products/lighting-systems",
        image:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Control", value: "DMX512" },
          { label: "Usage", value: "Events & Stages" },
        ],
        features: [
          "High-speed movement",
          "Advanced beam control",
          "Programmable effects",
          "Professional stage lighting",
        ],
      },
      {
        name: "Beam Lights",
        tagline: "Powerful Focused Beam Lighting",
        href: "/products/lighting-systems",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Beam Angle", value: "Ultra Narrow" },
          { label: "Application", value: "Live Events" },
        ],
        features: [
          "Sharp beam projection",
          "Long-distance output",
          "High brightness intensity",
          "Professional touring ready",
        ],
      },
      {
        name: "Wash Lights",
        tagline: "Wide Coverage Stage Wash Lighting",
        href: "/products/lighting-systems",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Color", value: "RGBW Mixing" },
          { label: "Coverage", value: "Wide Wash" },
        ],
        features: [
          "Smooth color blending",
          "Wide-area illumination",
          "Flicker-free operation",
          "Silent cooling system",
        ],
      },
    ],
  },

  {
    name: "PROFESSIONAL AUDIO SYSTEMS",
    href: "/products/professional-audio-systems",
    subcategories: [
      {
        name: "Line Array Systems",
        tagline: "Scalable Professional Audio Coverage",
        href: "/products/professional-audio-systems",
        image:
          "https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Application", value: "Concert & Events" },
          { label: "Coverage", value: "Large Venues" },
        ],
        features: [
          "High SPL performance",
          "Scalable system design",
          "Consistent sound coverage",
          "Touring-grade construction",
        ],
      },
      {
        name: "Professional Speakers",
        tagline: "High Fidelity Professional Sound Systems",
        href: "/products/professional-audio-systems",
        image:
          "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Output", value: "High Power Audio" },
          { label: "Usage", value: "Live & Installed Audio" },
        ],
        features: [
          "Clear vocal reproduction",
          "Durable cabinet design",
          "Wide frequency response",
          "Professional acoustic tuning",
        ],
      },
    ],
  },

  {
    name: "POWER DISTRIBUTION & CABLE SOLUTIONS",
    href: "/products/power-distribution-&-cable-solutions",
    subcategories: [
      {
        name: "Power Distribution Units",
        tagline: "Reliable Event Power Management Systems",
        href: "/products/power-distribution-&-cable-solutions",
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Capacity", value: "32A – 400A" },
          { label: "Protection", value: "Industrial Grade" },
        ],
        features: [
          "Safe power distribution",
          "Industrial-grade components",
          "Portable rack systems",
          "Event-ready reliability",
        ],
      },
      {
        name: "Power Cables",
        tagline: "Professional Grade Electrical Connectivity",
        href: "/products/power-distribution-&-cable-solutions",
        image:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Application", value: "Event & AV Systems" },
          { label: "Build", value: "Heavy Duty" },
        ],
        features: [
          "High durability insulation",
          "Flexible cable design",
          "Industrial safety standards",
          "Reliable power transmission",
        ],
      },
      {
        name: "Audio Cables",
        tagline: "High Quality Professional Audio Connectivity",
        href: "/products/power-distribution-&-cable-solutions",
        image:
          "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop",
        specs: [
          { label: "Signal", value: "Balanced Audio" },
          { label: "Connector", value: "XLR / TRS" },
        ],
        features: [
          "Low noise transmission",
          "Professional shielding",
          "Durable connector quality",
          "Reliable signal performance",
        ],
      },
    ],
  },
];

export default function ProductDropdown() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([0]);

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
    setActiveCategoryIndex(index);
    setActiveSubIndex(0);
  };

  const activeCategory = categories[activeCategoryIndex];
  const activeSub = activeCategory?.subcategories[activeSubIndex];

  return (
    <>
      {/* ─── MOBILE VERSION ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden fixed top-[72px] left-0 right-0 z-[100] bg-white border-t border-black/[0.06] overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 72px)" }}
      >
        <div className="py-2 divide-y divide-black/[0.04]">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col">
              {/* Main Category Link */}
              <Link
                href={cat.href}
                className="flex items-center justify-between px-6 py-4 bg-slate-50/50 text-black/90 hover:bg-black/5 transition-all duration-200"
              >
                <span className="text-[14px] font-black tracking-tight">{cat.name}</span>
                <ChevronRight size={14} className="text-black/20" />
              </Link>

              {/* Subcategories (Products) */}
              <div className="bg-white">
                {/* "All" link for the category */}
                <Link
                  href={cat.href}
                  className="flex items-center px-10 py-3 text-blue-600 font-bold border-b border-black/[0.02]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-3 shrink-0" />
                  <span className="text-[13px] uppercase tracking-wider">All {cat.name}</span>
                </Link>

                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="flex items-center px-10 py-3 text-black/60 hover:text-blue-600 transition-colors border-b border-black/[0.02] last:border-0"
                  >
                    <div className="w-1 h-1 rounded-full bg-blue-500/40 mr-3 shrink-0" />
                    <span className="text-[13px] font-medium leading-tight">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-[45px] left-[-350px] -translate-x-1/2 w-[min(980px,calc(100vw-48px))] max-h-[calc(100vh-120px)] z-[100] mt-4 hidden md:block rounded-2xl overflow-hidden border border-black/10 shadow-[0_25px_80px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl"
      >
        <div className="flex min-h-[380px] max-h-[calc(100vh-120px)]">

          {/* PANEL 1 — Main Categories */}
          <div className="w-[220px] flex-shrink-0 flex flex-col py-3 bg-white border-r border-black/[0.06] overflow-y-auto">
            {categories.map((cat, i) => {
              const isExpanded = expandedCategories.includes(i);
              const isActive = activeCategoryIndex === i;
              return (
                <div key={cat.name}>
                  <button
                    onClick={() => toggleCategory(i)}
                    className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-200 border-l-[3px] ${isActive
                      ? "bg-blue-600/10 border-blue-500 text-black"
                      : "border-transparent text-black/50 hover:bg-black/5 hover:text-black/80"
                      }`}
                  >
                    <span className="text-[13px] font-bold leading-tight">
                      {cat.name}
                    </span>

                    <ChevronDown
                      size={14}
                      className={`flex-shrink-0 ml-2 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* PANEL 2 — Subcategories */}
          <div className="w-[260px] flex-shrink-0 py-4 overflow-y-auto custom-scrollbar bg-gray-50 border-r border-black/[0.06]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryIndex}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
              >
                {activeCategory?.subcategories.map((sub, i) => (
                  <button
                    key={sub.name}
                    onMouseEnter={() => setActiveSubIndex(i)}
                    onClick={() => setActiveSubIndex(i)}
                    className={`w-full text-left px-5 py-4 border-l-[3px] transition-all duration-200 ${activeSubIndex === i
                      ? "border-blue-500 bg-blue-600/10"
                      : "border-transparent hover:border-blue-500/30 hover:bg-black/5"
                      }`}
                  >
                    <div
                      className={`text-[13px] font-bold mb-0.5 ${activeSubIndex === i ? "text-blue-600" : "text-black/80"
                        }`}
                    >
                      {sub.name}
                    </div>

                    <div className="text-[11px] text-black/40 leading-tight">
                      {sub.tagline}
                    </div>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PANEL 3 — Detail Preview */}
          <div className="flex-1 bg-white p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeSub && (
                <motion.div
                  key={`${activeCategoryIndex}-${activeSubIndex}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-5 flex-shrink-0">
                    <Image
                      src={activeSub.image}
                      alt={activeSub.name}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute bottom-4 left-4">
                      <div className="text-white font-bold text-lg">
                        {activeSub.name}
                      </div>

                      <div className="text-white/80 text-xs">
                        {activeSub.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {activeSub.specs.map((spec) => (
                      <div key={spec.label}>
                        <div className="text-[11px] font-bold text-black/80 mb-0.5">
                          {spec.label}
                        </div>

                        <div className="text-[12px] text-black/40">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-5">
                    <div className="text-[11px] font-bold text-black/80 mb-2">
                      Features
                    </div>

                    <ul className="space-y-1">
                      {activeSub.features.map((f) => (
                        <li
                          key={f}
                          className="text-[12px] text-black/50 flex items-start gap-1.5"
                        >
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link href={activeSub.href}>
                      <Button className="w-full rounded-lg bg-blue-500 hover:bg-[#021752] border border-blue-500 text-white text-[13px] font-bold h-10 transition-all duration-200">
                        View Detail
                        <ArrowRight size={14} className="ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}