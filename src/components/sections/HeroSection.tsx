"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AnimatedBadge from "@/components/ui/AnimatedBadge";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 sm:from-black/80 sm:via-black/40 sm:to-transparent z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1517245315814-1397ad28996a?auto=format&fit=crop&q=80"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 w-full px-6 sm:pl-16 lg:pl-24">
        <div className="max-w-3xl text-left">
          <AnimatedBadge className="mb-6 border-white/20 bg-white/10 text-white">
            Visual Technology Engineering
          </AnimatedBadge>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-[1.1]"
          >
            Engineering <span className="">Advanced</span> Visual Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/80 mb-12 max-w-xl leading-relaxed"
          >
            Global engineering excellence in LED display systems, interactive technologies,
            and integrated AV infrastructure for world-class environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <Button 
              size="lg" 
              className="rounded-full bg-gradient-to-r from-[rgb(2,23,82)] to-[rgb(6,160,237)] text-white border-none hover:opacity-90 transition-opacity h-12 w-full sm:w-auto px-8"
            >
              Explore Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-300 h-12 w-full sm:w-auto px-8 bg-transparent"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-white/50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Scroll</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
