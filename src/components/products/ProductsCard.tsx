"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Monitor,
  PanelsTopLeft,
  Lightbulb,
  Volume2,
  Cable,
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

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
  image?: string;
  description?: string;
  subcategories: SubCategory[];
}

interface ProductGroup {
  name: string;
  href: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  categories: Category[];
}

const productGroups: ProductGroup[] = [
  {
    name: "VISUAL DISPLAY SOLUTIONS",
    href: "/products/visual-display-solutions",
    description: "Cutting-edge display technologies for high-impact visual communication and immersive environments.",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    icon: <Monitor className="w-6 h-6" />,
    categories: [
      {
        name: "LED DISPLAY SYSTEMS",
        href: "/products/led-display-systems",
        image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
        description: "Professional LED solutions for events, command centers, and retail spaces.",
        subcategories: [
          {
            name: "Indoor Rental LED Displays",
            tagline: "Brilliant Visuals for Indoor Event Environments",
            href: "/products/led-display-systems",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Pixel Pitch", value: "P1.9 – P4.8" }],
            features: ["Lightweight", "Fast Installation"],
          },
          {
            name: "Outdoor Rental LED Displays",
            tagline: "High Brightness for Outdoor Productions",
            href: "/products/led-display-systems",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Brightness", value: "5000–8000 nits" }],
            features: ["Weatherproof", "High-impact"],
          },
          {
            name: "Fine Pitch LED Displays",
            tagline: "Ultra Fine Pixel Precision",
            href: "/products/led-display-systems",
            image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Pixel Pitch", value: "P0.9 – P1.8" }],
            features: ["Ultra-sharp", "HDR Performance"],
          },
          {
            name: "COB LED Displays",
            tagline: "Advanced Chip-on-Board Technology",
            href: "/products/led-display-systems",
            image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Technology", value: "COB Packaging" }],
            features: ["Durable", "High Contrast"],
          },
        ],
      },
      {
        name: "LCD SCREENS & INTERACTIVE KIOSKS",
        href: "/products/lcd-screens-&-interactive-kiosks",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        description: "Smart interactive displays and digital signage for modern engagement.",
        subcategories: [
          {
            name: "Interactive Touch Screens",
            tagline: "Smart Collaboration & Communication",
            href: "/products/lcd-screens-&-interactive-kiosks",
            image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Touch", value: "20 Point Multi-Touch" }],
            features: ["Smooth Interaction", "4K UHD"],
          },
          {
            name: "Digital Signage Displays",
            tagline: "Dynamic Digital Communication",
            href: "/products/lcd-screens-&-interactive-kiosks",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Operation", value: "24/7 Use" }],
            features: ["Cloud Management", "Portrait Mode"],
          },
        ],
      },
    ],
  },
  {
    name: "EVENT TECHNOLOGY",
    href: "/products/event-technology",
    description: "Professional audio and lighting systems for live entertainment and productions.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    icon: <Lightbulb className="w-6 h-6" />,
    categories: [
      {
        name: "LIGHTING SYSTEMS",
        href: "/products/lighting-systems",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
        description: "Dynamic stage and architectural lighting for professional productions.",
        subcategories: [
          {
            name: "Moving Head Lights",
            tagline: "Intelligent Lighting Systems",
            href: "/products/lighting-systems",
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Control", value: "DMX512" }],
            features: ["High-speed", "Programmable"],
          },
        ],
      },
      {
        name: "PROFESSIONAL AUDIO SYSTEMS",
        href: "/products/professional-audio-systems",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
        description: "High-fidelity sound systems for concerts and conferences.",
        subcategories: [
          {
            name: "Line Array Systems",
            tagline: "Scalable Professional Audio",
            href: "/products/professional-audio-systems",
            image: "https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Coverage", value: "Large Venues" }],
            features: ["High SPL", "Scalable"],
          },
        ],
      },
    ],
  },
  {
    name: "INFRASTRUCTURE & CONNECTIVITY",
    href: "/products/infrastructure-connectivity",
    description: "Reliable power management and signal processing solutions for AV infrastructure.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    icon: <Cable className="w-6 h-6" />,
    categories: [
      {
        name: "POWER DISTRIBUTION",
        href: "/products/power-distribution-&-cable-solutions",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
        description: "Safe and reliable power management for large-scale events.",
        subcategories: [
          {
            name: "Power Distribution Units",
            tagline: "Event Power Management",
            href: "/products/power-distribution-&-cable-solutions",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
            specs: [{ label: "Capacity", value: "32A – 400A" }],
            features: ["Industrial Grade", "Portable"],
          },
        ],
      },
    ],
  },
];

export default function ProductsCard() {
  const [view, setView] = useState<{
    level: "groups" | "categories" | "subcategories";
    groupIndex?: number;
    categoryIndex?: number;
  }>({ level: "groups" });

  const handleBack = () => {
    if (view.level === "categories") {
      setView({ level: "groups" });
    } else if (view.level === "subcategories") {
      setView({ level: "categories", groupIndex: view.groupIndex });
    }
  };

  const currentItems =
    view.level === "groups"
      ? productGroups
      : view.level === "categories"
      ? productGroups[view.groupIndex!].categories
      : productGroups[view.groupIndex!].categories[view.categoryIndex!].subcategories;

  const currentTitle =
    view.level === "groups"
      ? "Product Groups"
      : view.level === "categories"
      ? productGroups[view.groupIndex!].name
      : productGroups[view.groupIndex!].categories[view.categoryIndex!].name;

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-block border border-blue-200 bg-blue-50 px-4 py-1 text-[10px] font-semibold tracking-wide text-blue-700">
            OUR PRODUCTS
          </span>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {currentTitle}
          </h2>

          <div className="mx-auto mt-6 h-1 w-28 bg-gradient-to-r from-blue-500 to-blue-700" />
        </div>

        {/* Navigation Controls */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {view.level !== "groups" && (
            <button
              onClick={handleBack}
              className="flex sm:hidden items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 w-fit"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setView({ level: "groups" })}
              className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap px-3 py-1.5 transition-all ${
                view.level === "groups" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              All Groups
            </button>
            {view.groupIndex !== undefined && (
              <>
                <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                <button
                  onClick={() => setView({ level: "categories", groupIndex: view.groupIndex })}
                  className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap px-3 py-1.5 transition-all ${
                    view.level === "categories" ? "bg-blue-600 text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {productGroups[view.groupIndex].name}
                </button>
              </>
            )}
            {view.categoryIndex !== undefined && (
              <>
                <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                <button
                  className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap px-3 py-1.5 bg-blue-600 text-white shadow-lg"
                >
                  {productGroups[view.groupIndex!].categories[view.categoryIndex].name}
                </button>
              </>
            )}
          </div>

          {view.level !== "groups" && (
            <button
              onClick={handleBack}
              className="hidden sm:flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {currentItems.map((item: any, index: number) => (
            <motion.div
              key={`${view.level}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                    {item.name}
                  </h3>
                  {item.tagline && (
                    <p className="mt-2 text-[10px] text-slate-200">
                      {item.tagline}
                    </p>
                  )}
                </div>

                {/* Level Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-[9px] font-bold text-white uppercase">
                    {view.level === "groups" ? "Group" : view.level === "categories" ? "Category" : "Series"}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-[11px] leading-relaxed text-slate-600 mb-6">
                    {item.description || item.tagline || "Professional solutions engineered for excellence and reliability in demanding environments."}
                  </p>

                  {/* Features/Specs Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(item.categories || item.subcategories || item.features || []).slice(0, 4).map((feat: any, idx: number) => (
                      <span
                        key={idx}
                        className="border border-blue-100 bg-blue-50 px-3 py-1 text-[9px] font-medium text-blue-700"
                      >
                        {typeof feat === 'string' ? feat : feat.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  {view.level === "subcategories" ? (
                    <Link
                      href={item.href}
                      className="inline-flex w-full items-center justify-center px-4 border gap-2 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold text-[12px] shadow-lg shadow-blue-200"
                    >
                      Explore Products
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (view.level === "groups") {
                          setView({ level: "categories", groupIndex: index });
                        } else if (view.level === "categories") {
                          setView({
                            level: "subcategories",
                            groupIndex: view.groupIndex,
                            categoryIndex: index,
                          });
                        }
                      }}
                      className="inline-flex w-full items-center justify-center px-4 border gap-2 py-3 bg-white text-blue-600 border-blue-100 hover:bg-blue-50 transition-all font-bold text-[12px]"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}