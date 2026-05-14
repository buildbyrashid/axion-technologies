'use client'

import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  helperText?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export default function FormField({ label, helperText, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-widest">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {helperText && !error && (
        <p className="text-xs text-slate-400 font-medium">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 font-semibold">{error}</p>
      )}
    </div>
  )
}
