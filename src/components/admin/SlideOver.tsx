'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SlideOverProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  wide?: boolean
}

export default function SlideOver({ open, onClose, title, description, children, wide }: SlideOverProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed top-0 right-0 bottom-0 bg-white dark:bg-slate-900 z-[90] shadow-2xl flex flex-col',
              wide ? 'w-[600px]' : 'w-[480px]'
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#0A1628] dark:text-white font-sora">{title}</h3>
                {description && (
                  <p className="text-sm text-slate-400 dark:text-slate-300 mt-1">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:text-slate-300 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
