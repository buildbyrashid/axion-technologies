'use client'

import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 px-8', className)}>
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#0A1628] dark:text-white mb-2 text-center">{title}</h3>
      <p className="text-sm text-slate-400 dark:text-slate-300 text-center max-w-sm mb-6">{description}</p>
      {action}
    </div>
  )
}
