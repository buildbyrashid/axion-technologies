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
    name: "LED Display Systems",
    href: "/products/led-display-systems",
    subcategories: [
      {
        name: "Indoor Rental LED",
        tagline: "Seamless LCD Retrofit & High-Impact Display",
        href: "/products/led-display-systems/indoor-rental",
        image: "/images/products/indoor-rental.png",
        specs: [
          { label: "Pixel Pitch", value: "P1.25 to P4.0" },
          { label: "Dimension", value: "640 × 480 × 70 mm" },
        ],
        features: [
          "Art When off, Display When On",
          "Bespoke Tactile Surface Textures",
          "Anti-Glare Matte Camouflage",
          "100% Flush Wall-Mount Design",
        ],
      },
      {
        name: "Outdoor Rental LED",
        tagline: "Architectural Art: Invisible Tech, Vivid Visuals",
        href: "/products/led-display-systems/outdoor-rental",
        image: "/images/products/outdoor-rental.png",
        specs: [
          { label: "Pixel Pitch", value: "P2.6 to P6.25" },
          { label: "Brightness", value: "5000–8000 nits" },
        ],
        features: [
          "IP65 all-weather rated",
          "3840Hz High Refresh Rate",
          "Seamless Arc Splicing",
          "Smart Active Cooling",
        ],
      },
      {
        name: "Fine Pitch LED",
        tagline: "Dynamic Digital Branding for Retail Spaces",
        href: "/products/led-display-systems/fine-pitch",
        image: "/images/products/fine-pitch.png",
        specs: [
          { label: "Pixel Pitch", value: "P0.9 to P1.8" },
          { label: "Contrast", value: "5000:1" },
        ],
        features: [
          "Ultra-fine pixel density",
          "Front service design",
          "Magnetic module attachment",
          "Built-in calibration system",
        ],
      },
      {
        name: "COB & MIP Technology",
        tagline: "Efficient Professional Signage with Fast ROI",
        href: "/products/led-display-systems/cob-mip",
        image: "/images/products/cob-mip.png",
        specs: [
          { label: "Pixel Pitch", value: "P0.6 to P1.2" },
          { label: "Lifespan", value: "100,000+ hours" },
        ],
        features: [
          "Anti-collision surface",
          "Dustproof & waterproof",
          "Wide viewing angle 180°",
          "Superior color uniformity",
        ],
      },
    ],
  },
  {
    name: "LCD & Interactive",
    href: "/products/lcd-interactive-kiosks",
    subcategories: [
      {
        name: "Commercial Displays",
        tagline: "Professional Grade Visual Excellence",
        href: "/products/lcd-interactive-kiosks/commercial",
        image: "/images/products/commercial-displays.png",
        specs: [
          { label: "Screen Size", value: "32″ to 98″" },
          { label: "Resolution", value: "4K UHD" },
        ],
        features: [
          "24/7 operation certified",
          "500–700 nit brightness",
          "Built-in media player",
          "Remote management ready",
        ],
      },
      {
        name: "Touch Kiosks",
        tagline: "Interactive Engagement at Every Touchpoint",
        href: "/products/lcd-interactive-kiosks/kiosks",
        image: "/images/products/touch-kiosks.png",
        specs: [
          { label: "Touch Points", value: "10-point multi-touch" },
          { label: "OS", value: "Android / Windows" },
        ],
        features: [
          "Tempered glass surface",
          "Integrated thermal printer",
          "ADA compliant design",
          "Custom branding options",
        ],
      },
      {
        name: "Interactive Flat Panels",
        tagline: "Next-Gen Collaboration Surfaces",
        href: "/products/lcd-interactive-kiosks/ifp",
        image: "/images/products/ifp.png",
        specs: [
          { label: "Size", value: "65″ to 110″" },
          { label: "Touch", value: "20-point IR touch" },
        ],
        features: [
          "Zero-bond anti-glare glass",
          "Whiteboard & annotation",
          "Wireless screen sharing",
          "Front camera integration",
        ],
      },
      {
        name: "Digital Signage",
        tagline: "Content-Driven Brand Experiences",
        href: "/products/lcd-interactive-kiosks/signage",
        image: "/images/products/digital-signage.png",
        specs: [
          { label: "Orientation", value: "Portrait / Landscape" },
          { label: "Connectivity", value: "WiFi + LAN + 4G" },
        ],
        features: [
          "Cloud CMS platform",
          "Scheduled playlists",
          "Real-time content push",
          "Analytics dashboard",
        ],
      },
    ],
  },
  {
    name: "Lighting & Power",
    href: "/products/lighting-systems",
    subcategories: [
      {
        name: "Professional Lighting",
        tagline: "Stage-Grade Illumination Systems",
        href: "/products/lighting-systems/professional",
        image: "/images/products/professional-lighting.png",
        specs: [
          { label: "Power", value: "100W – 2000W" },
          { label: "CRI", value: "Ra > 95" },
        ],
        features: [
          "DMX512 control protocol",
          "IP66 weatherproof",
          "Flicker-free output",
          "RGB+W full spectrum",
        ],
      },
      {
        name: "Power Distribution",
        tagline: "Reliable Power for Any Scale Event",
        href: "/products/power-distribution",
        image: "/images/products/power-distribution.png",
        specs: [
          { label: "Capacity", value: "32A – 400A" },
          { label: "Protection", value: "IP44 rated" },
        ],
        features: [
          "Short-circuit protection",
          "Real-time power monitoring",
          "Modular rack design",
          "Hot-swap capability",
        ],
      },
      {
        name: "Stage Systems",
        tagline: "Complete Performance Infrastructure",
        href: "/products/lighting-systems/stage",
        image: "/images/products/stage-systems.png",
        specs: [
          { label: "Load Capacity", value: "Up to 750 kg/m²" },
          { label: "Material", value: "Aluminium alloy" },
        ],
        features: [
          "Quick-lock truss system",
          "TÜV certified structures",
          "Modular & scalable",
          "Indoor & outdoor rated",
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
        <div className="py-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] text-black/80 hover:text-black hover:bg-black/5 transition-all duration-200"
            >
              <span className="text-[15px] font-bold">{cat.name}</span>
              <ChevronRight size={16} className="text-black/40" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ─── DESKTOP VERSION ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-[40px] left-[-250px] -translate-x-1/2 w-[min(980px,calc(100vw-48px))] z-[100] mt-4 hidden md:block rounded-2xl overflow-hidden border border-black/10 shadow-[0_25px_80px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl"
      >
        <div className="flex min-h-[380px]">

          {/* PANEL 1 — Main Categories */}
          <div className="w-[220px] flex-shrink-0 flex flex-col py-3 bg-white border-r border-black/[0.06]">
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
                    <span className="text-[13px] font-bold leading-tight">{cat.name}</span>
                    <ChevronDown
                      size={14}
                      className={`flex-shrink-0 ml-2 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* PANEL 2 — Subcategories */}
          <div className="w-[260px] flex-shrink-0 py-4 overflow-y-auto bg-gray-50 border-r border-black/[0.06]">
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
                    <div className={`text-[13px] font-bold mb-0.5 ${activeSubIndex === i ? "text-blue-600" : "text-black/80"}`}>
                      {sub.name}
                    </div>
                    <div className="text-[11px] text-black/40 leading-tight">{sub.tagline}</div>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PANEL 3 — Detail Preview */}
          <div className="flex-1 bg-white p-6 overflow-hidden">
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
                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-5 bg-gray-100 flex-shrink-0">
                    <Image
                      src={activeSub.image}
                      alt={activeSub.name}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="text-white font-bold text-lg">{activeSub.name}</div>
                      <div className="text-white/80 text-xs">{activeSub.tagline}</div>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {activeSub.specs.map((spec) => (
                      <div key={spec.label}>
                        <div className="text-[11px] font-bold text-black/80 mb-0.5">{spec.label}</div>
                        <div className="text-[12px] text-black/40">{spec.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-5">
                    <div className="text-[11px] font-bold text-black/80 mb-2">Features</div>
                    <ul className="space-y-1">
                      {activeSub.features.map((f) => (
                        <li key={f} className="text-[12px] text-black/50 flex items-start gap-1.5">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA — button bg matches panel bg (white) with blue border and blue text */}
                  <div className="mt-auto">
                    <Link href={activeSub.href}>
                      <Button className="w-full rounded-lg bg-[#021752] hover:bg-blue-50 border border-blue-500 text-white hover:text-blue-500 text-[13px] font-bold h-10 transition-all duration-200">
                        View Detail <ArrowRight size={14} className="ml-1.5" />
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