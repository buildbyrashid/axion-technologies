'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpatialBadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'emerald' | 'amber' | 'rose' | 'slate'
  className?: string
  pulse?: boolean
  onClick?: () => void
}

const variants = {
  blue: 'bg-blue-400/10 text-blue-500 ring-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.1)]',
  emerald: 'bg-emerald-400/10 text-emerald-500 ring-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]',
  amber: 'bg-amber-400/10 text-amber-500 ring-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.1)]',
  rose: 'bg-rose-400/10 text-rose-500 ring-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.1)]',
  slate: 'bg-slate-400/10 text-slate-500 ring-slate-500/20 shadow-[0_0_12px_rgba(100,116,139,0.1)]',
}

const dots = {
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  slate: 'bg-slate-500',
}

export default function SpatialBadge({ 
  children, 
  variant = 'blue', 
  className,
  pulse = false,
  onClick
}: SpatialBadgeProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ring-1 ring-inset transition-all duration-300",
        onClick && "cursor-pointer active:scale-95",
        variants[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dots[variant])}></span>
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dots[variant])}></span>
        </span>
      )}
      {children}
    </div>
  )
}
