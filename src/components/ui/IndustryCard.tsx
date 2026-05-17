"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface IndustryCardProps {
  name: string;
  image: string;
  index: number;
}

export default function IndustryCard({ name, image, index }: IndustryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative min-h-[180px] overflow-hidden cursor-pointer"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/60 transition-colors duration-300 flex items-center justify-center p-6 text-center">
        <h3 className="text-white font-bold text-lg lg:text-xl drop-shadow-md">
          {name}
        </h3>
      </div>
    </motion.div>
  );
}
