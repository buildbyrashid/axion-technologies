"use client";

import { Button } from "@/components/ui/Button";
import { Mail, Globe, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import { useState } from "react";
import QuoteModal from "@/components/modals/QuoteModal";

export interface CTAData {
  headline?: string;
  description?: string;
  email?: string;
  website?: string;
  locations?: string;
  support_text?: string;
  background_image?: string;
  is_active?: boolean;
}

export default function CTASection({ data }: { data?: CTAData | null }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Graceful fallbacks
  const isActive = data ? Boolean(data.is_active) : true;
  if (!isActive) return null;

  const headline = data?.headline || "Let's Build Your Next Visual Experience";
  const description = data?.description || "Partner with Axion Technology for advanced visual technology solutions engineered for modern global environments.";
  const email = data?.email || "sales@axiontechnology.com";
  const website = data?.website || "www.axiontechnology.com";
  const locations = data?.locations || "Hong Kong | Shenzhen | Dubai";
  const supportText = data?.support_text || "Engineering Support Online";
  const backgroundImage = data?.background_image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80";

  const renderHeadline = (text: string) => {
    const target = "Visual Experience";
    const index = text.toLowerCase().indexOf(target.toLowerCase());
    if (index !== -1) {
      const before = text.substring(0, index);
      const matched = text.substring(index, index + target.length);
      const after = text.substring(index + target.length);
      return (
        <>
          {before}
          <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">
            {matched}
          </span>
          {after}
        </>
      );
    }
    return text;
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-primary">
      {/* Background with Technical Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Technical Background"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021752] via-[#021752]/95 to-transparent z-10" />
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
      </div>

      <div className="container-custom relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-7xl font-[800] text-white font-sora leading-[1.1] tracking-tighter mb-8 whitespace-pre-line">
                {renderHeadline(headline)}
              </h2>
              <p className="text-lg lg:text-xl text-slate-300 mb-12 max-w-xl leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  size="lg"
                  className="bg-accent hover:bg-white hover:text-primary transition-all duration-500 px-10 h-14 text-base lg:text-lg font-bold shadow-[0_0_30px_rgba(13,149,240,0.4)] border-none"
                >
                  Request a Consultation
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-primary hover:border-transparent px-10 h-14 text-base lg:text-lg font-bold transition-all duration-500">
                  <Link href="/contact">
                    Contact Our Team
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Global Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
              {/* Card Decoration */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-[100px] group-hover:bg-accent/30 transition-colors duration-700" />

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-10 font-sora">Contact Information</h3>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="h-12 w-12 bg-accent/10 flex items-center justify-center mr-6 shrink-0 border border-accent/20">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1 font-bold uppercase tracking-widest">Email Address</p>
                    <a href={`mailto:${email}`} className="text-md lg:text-xl text-white hover:text-accent transition-colors font-medium">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 bg-accent/10 flex items-center justify-center mr-6 shrink-0 border border-accent/20">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1 font-bold uppercase tracking-widest">Website</p>
                    <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="text-md lg:text-xl text-white hover:text-accent transition-colors font-medium">
                      {website}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 bg-accent/10 flex items-center justify-center mr-6 shrink-0 border border-accent/20">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1 font-bold uppercase tracking-widest">Global Hubs</p>
                    <p className="text-md lg:text-xl text-white font-medium">
                      {locations}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 bg-accent"></span>
                  </span>
                  <span className="text-sm text-slate-400 font-medium">{supportText}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </section>
  );
}

