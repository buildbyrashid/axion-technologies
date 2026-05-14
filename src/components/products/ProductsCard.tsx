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
} from "lucide-react";

type ProductCard = {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  categories: string[];
};

const products: ProductCard[] = [
  {
    title: "LED DISPLAY SYSTEMS",
    slug: "led-display-systems",
    subtitle: "Brilliant Visuals for Every Environment",
    description:
      "Professional LED display solutions for events, command centers, retail spaces, exhibitions, and immersive visual environments.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    icon: <Monitor className="w-6 h-6" />,
    categories: [
      "Indoor Rental LED Displays",
      "Outdoor Rental LED Displays",
      "Fine Pitch LED Displays",
      "COB LED Displays",
    ],
  },
  {
    title: "LCD SCREENS & INTERACTIVE KIOSKS",
    slug: "lcd-screens-&-interactive-kiosks",
    subtitle: "Smart Displays for Connected Experiences",
    description:
      "Advanced touch displays, kiosks, signage systems, and collaboration solutions for modern interactive experiences.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    icon: <PanelsTopLeft className="w-6 h-6" />,
    categories: [
      "Interactive Touch Screens",
      "Digital Signage Displays",
      "Interactive Kiosks",
      "OLED Displays",
    ],
  },
  {
    title: "LIGHTING SYSTEMS",
    slug: "lighting-systems",
    subtitle: "Dynamic Lighting for Immersive Spaces",
    description:
      "Professional stage and architectural lighting systems engineered for live events and entertainment productions.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    icon: <Lightbulb className="w-6 h-6" />,
    categories: [
      "Moving Head Lights",
      "Beam Lights",
      "Wash Lights",
      "Architectural Lighting",
    ],
  },
  {
    title: "PROFESSIONAL AUDIO SYSTEMS",
    slug: "professional-audio-systems",
    subtitle: "Precision Audio for Powerful Experiences",
    description:
      "High-performance audio systems including speakers, amplifiers, DSP systems, and installation audio solutions.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    icon: <Volume2 className="w-6 h-6" />,
    categories: [
      "Line Array Systems",
      "Professional Speakers",
      "Subwoofers",
      "Conference Audio Systems",
    ],
  },
  {
    title: "POWER DISTRIBUTION & CABLE SOLUTIONS",
    slug: "power-distribution-&-cable-solutions",
    subtitle: "Engineered Connectivity. Reliable Performance.",
    description:
      "Reliable power distribution systems, signal management solutions, and professional-grade cabling.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    icon: <Cable className="w-6 h-6" />,
    categories: [
      "Power Distribution Units",
      "Signal Distribution Systems",
      "Power Cables",
      "DMX & Signal Solutions",
    ],
  },
];

export default function ProductsCard() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold tracking-wide text-blue-700">
            OUR PRODUCTS
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Professional Visual Technology Solutions
          </h2>

          <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" />
        </div>

        {/* Product Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-xl font-bold text-white">
                    {product.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-200">
                    {product.subtitle}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <p className="text-sm leading-relaxed text-slate-600">
                  {product.description}
                </p>

                {/* Categories */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.categories.map((item, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div>
                  {/* Button */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex px-4 border rounded-[10px] mt-5 gap-2 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Explore Products
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Link>
                </div>
             
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
