"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AnimatedBadge from "./AnimatedBadge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
        className
      )}
    >
      {badge && <AnimatedBadge className="mb-4">{badge}</AnimatedBadge>}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "text-3xl lg:text-4xl font-extrabold mb-4",
          dark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "text-lg",
            dark ? "text-slate-300" : "text-slate-500"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
