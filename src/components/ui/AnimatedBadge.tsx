"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedBadge({ children, className }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "inline-flex items-center rounded-full border-[rgb(2,23,82)]/20 bg-[rgb(2,23,82)]/10 px-3 py-1 text-xs font-semibold text-[rgb(2,23,82)]",
        className
      )}
    >
      <span className="relative flex h-2 w-2 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(2,23,82)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(2,23,82)]"></span>
      </span>
      {children}
    </motion.div>
  );
}
