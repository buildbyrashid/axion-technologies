"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SlideType = {
  id: number;
  smallText: string;
  title: string;
  description: string;
  button: string;
  image: string;
};

const slides: SlideType[] = [
  {
    id: 1,
    smallText: "WELCOME TO SKYLUMINA",
    title: "LIGHT YEARS AHEAD",
    description:
      "Illuminate your retail success with premium LED solutions designed for modern businesses and future-ready brands.",
    button: "BOOK A CALL",
    image:
      "../images/products/young-man-funny-expression.jpg",
  },
  {
    id: 2,
    smallText: "FUTURE OF LIGHTING",
    title: "DESIGNED TO SHINE",
    description:
      "Smart lighting systems with powerful performance, elegant aesthetics, and unmatched efficiency.",
    button: "EXPLORE NOW",
    image:
      "../images/products/digital-art-inmersive-exhibition.jpg",
  },
  {
    id: 3,
    smallText: "PREMIUM SOLUTIONS",
    title: "SMART CITY LIGHTS",
    description:
      "Delivering high-performance lighting experiences for commercial and luxury environments worldwide.",
    button: "GET STARTED",
    image:
      "../images/products/futurism-perspective-digital-nomads-lifestyle.jpg",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-black"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center  bg-black"
            style={{
              backgroundImage: `url(${slides[current].image})`,
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 " />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/50 via-[#090b2c]/40 to-black" />
        </motion.div>
      </AnimatePresence>

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-5xl text-center text-white">
          <motion.p
            key={slides[current].smallText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 mb-5 text-[11px] font-light tracking-[0.45em] text-white/70 md:text-sm"
          >
            {slides[current].smallText}
          </motion.p>

          <motion.h1
            key={slides[current].title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl text-white"
          >
            {slides[current].title}
          </motion.h1>

          <motion.p
            key={slides[current].description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base"
          >
            {slides[current].description}
          </motion.p>

          <motion.div
            key={slides[current].button}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10"
          >
            <button className="rounded-2xl  hover:bg-white px-10 py-4 text-sm font-bold hover:text-black transition-all duration-300 hover:scale-105 bg-blue-500 text-white">
              {slides[current].button}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "w-5 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
