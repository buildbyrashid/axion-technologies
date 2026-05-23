"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import AnimatedBadge from "@/components/ui/AnimatedBadge";

export interface HeroData {
  hero_type: 'video' | 'image';
  headline: string;
  subheadline: string;
  hero_video_1?: string;
  hero_video_2?: string;
  active_video?: string;
  fallback_image?: string;
  hero_image_1?: string;
  hero_image_2?: string;
  active_image?: string;
  is_active: boolean;
}

export default function HeroSection({ data }: { data?: HeroData | null }) {
  const [videoError, setVideoError] = useState(false);

  // Graceful fallbacks
  const isActive = data ? Boolean(data.is_active) : true;
  if (!isActive) return null;

  const heroType = data?.hero_type || 'video';
  const headline = data?.headline || "Engineering\nAdvanced\nVisual Solutions";
  const subheadline = data?.subheadline || "Global engineering excellence in LED display systems, interactive technologies, and integrated AV infrastructure for world-class environments.";
  
  // Clean resolution of video & image assets
  const videoSrc = data?.active_video || data?.hero_video_1 || data?.hero_video_2 || "/videos/hero-background.mp4";
  const fallbackPoster = data?.fallback_image || data?.active_image || data?.hero_image_1 || "https://images.unsplash.com/photo-1517245315814-1397ad28996a?auto=format&fit=crop&q=80";
  const imageSrc = data?.active_image || data?.hero_image_1 || data?.hero_image_2 || data?.fallback_image || "https://images.unsplash.com/photo-1517245315814-1397ad28996a?auto=format&fit=crop&q=80";

  return (
    <section className="relative min-h-screen flex items-center pb-10 pt-32 sm:pt-40 lg:pt-48 overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 sm:from-black/80 sm:via-black/40 sm:to-transparent z-10" />
        {heroType === 'video' && videoSrc && !videoError ? (
          <video
            key={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={fallbackPoster}
            onError={() => {
              console.warn("Hero background video failed to load, falling back to static poster image.");
              setVideoError(true);
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={imageSrc}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-24">
        <div className="max-w-4xl text-left">
          <AnimatedBadge className="mb-4 sm:mb-6 border-white/20 bg-white/10 text-white">
            Visual Technology Engineering
          </AnimatedBadge>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-sora font-[800] text-white mb-6 sm:mb-8 leading-[1.1] tracking-tighter whitespace-pre-line"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-12 max-w-xl lg:max-w-2xl leading-[1.6] sm:leading-[1.8] font-medium"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mt-8"
          >
            <Link href="/products" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="bg-accent text-white border-none hover:bg-accent/90 transition-all duration-300 h-14 w-full px-10 font-bold shadow-[0_0_20px_rgba(13,149,240,0.5)]"
              >
                Explore Products
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-primary hover:border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500 h-14 w-full px-10 bg-white/5 backdrop-blur-sm font-bold"
              >
                Contact Us
              </Button>
            </Link>
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
