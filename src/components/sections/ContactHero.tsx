"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import AnimatedBadge from "@/components/ui/AnimatedBadge";

export default function ContactHero() {
  return (
    <section className="relative w-full min-h-[40vh] lg:min-h-[45vh] flex items-center pt-32 pb-16 overflow-hidden bg-primary">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Base darkening overlay */}
        <div className="absolute inset-0 bg-primary/85 z-10" />

        {/* Top gradient for navbar separation */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary via-primary/40 to-transparent z-20" />

        {/* Softened Technology Background */}
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
          alt="Technology Background"
          fill
          className="object-cover opacity-15 grayscale scale-105 transition-transform duration-1000"
          priority
        />

        {/* Subtle Grid / Pattern Overlay */}
        <div
          className="absolute inset-0 z-15 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />

        {/* Radial mask for content focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,transparent_0%,rgba(2,23,82,0.8)_70%)] z-20" />
      </div>

      <div className="container-custom relative z-30 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <AnimatedBadge className="mb-6 border-white/10 bg-white/5 text-white/80 backdrop-blur-sm mt-4">
            Contact Engineering
          </AnimatedBadge>

          {/* Heading with clamp() for responsive scaling */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2.2rem,5vw,3.8rem)] font-sora font-[800] text-white leading-[1.1] tracking-tighter mb-5"
          >
            Let's Build the <br />
            <span className="text-accent">Next Visual</span> Experience
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-8 font-medium"
          >
            Engineering advanced visual technology solutions for global enterprise environments.
          </motion.p>

          {/* Minimalist CTA to scroll to form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-accent text-white border-none hover:bg-accent/90 transition-all duration-300 h-13 px-10 font-bold shadow-[0_0_20px_rgba(13,149,240,0.2)]"
              onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Inquiry
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
