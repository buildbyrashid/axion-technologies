'use client'

import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DragHandleProps {
  className?: string
  listeners?: any
  attributes?: any
}

export default function DragHandle({ className, listeners, attributes }: DragHandleProps) {
  return (
    <button
      type="button"
      className={cn(
        'w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-500 dark:text-slate-400 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 cursor-grab active:cursor-grabbing transition-all touch-none',
        className
      )}
      {...listeners}
      {...attributes}
    >
      <GripVertical size={16} />
    </button>
  )
}
