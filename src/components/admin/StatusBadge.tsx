'use client'

import { cn } from '@/lib/utils'

type Status = 'new' | 'contacted' | 'closed' | 'read' | 'replied' | 'archived'

const statusConfig: Record<Status, { label: string; dot: string; bg: string; text: string }> = {
  new: { label: 'New', dot: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  contacted: { label: 'Contacted', dot: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
  read: { label: 'Read', dot: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  replied: { label: 'Replied', dot: 'bg-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700' },
  closed: { label: 'Closed', dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  archived: { label: 'Archived', dot: 'bg-slate-400', bg: 'bg-slate-50 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
}

interface StatusBadgeProps {
  status: Status
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.new

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold', config.bg, config.text, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  )
}
