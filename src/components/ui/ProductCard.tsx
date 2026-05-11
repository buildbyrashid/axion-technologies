"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  index: number;
  className?: string;
  isFeatured?: boolean;
}

export default function ProductCard({
  title,
  category,
  description,
  image,
  index,
  className,
  isFeatured,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:border-[rgb(2,23,82)]/30",
        className
      )}
    >
      <div className={cn(
        "relative w-full overflow-hidden",
        isFeatured ? "h-64 lg:h-[420px]" : "h-64"
      )}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[rgb(2,23,82)] text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-[rgb(2,23,82)] transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center text-[rgb(2,23,82)] font-bold text-sm group/link"
        >
          Explore More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
