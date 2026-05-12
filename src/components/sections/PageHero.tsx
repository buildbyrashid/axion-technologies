"use client";

import { motion } from "framer-motion";
import AnimatedBadge from "@/components/ui/AnimatedBadge";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge: string;
  backgroundImage?: string;
}

export default function PageHero({ title, subtitle, badge, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative h-[75vh] min-h-[550px] flex items-center pt-32 overflow-hidden bg-primary">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-primary" />
        )}
      </div>

      <div className="container-custom relative z-20 w-full">
        <div className="max-w-3xl text-left">
          <AnimatedBadge className="mb-6 border-white/20 bg-white/10 text-white">
            {badge}
          </AnimatedBadge>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
