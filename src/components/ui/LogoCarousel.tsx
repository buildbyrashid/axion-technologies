"use client";

import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";

const partners = [
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg" },
  { name: "Panasonic", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Panasonic_logo.svg" },
  { name: "NEC", logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/NEC_logo.svg" },
  { name: "Barco", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Barco_logo.svg" },
];

export default function LogoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    AutoPlay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <div className="bg-white py-6 sm:py-10 border-b border-slate-50">
      <div className="container-custom">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 sm:mb-10">
          Trusted by Global Technology Partners
        </p>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {partners.concat(partners).map((partner, index) => (
              <div
                key={index}
                className="flex-[0_0_50%] min-w-0 sm:flex-[0_0_33%] lg:flex-[0_0_20%] px-4"
              >
                <div className="h-12 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <span className="font-bold text-xl text-slate-400 italic">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
