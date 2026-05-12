'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SpatialDrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function SpatialDrawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer
}: SpatialDrawerProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-4 right-4 bottom-4 w-full max-w-xl bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-black/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] z-[110] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-10 pt-10 pb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1628] tracking-tight">{title}</h2>
                {description && (
                  <p className="text-sm text-slate-500 font-medium mt-1">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-slate-400 hover:text-[#0A1628] hover:bg-black/10 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-10 py-4 scrollbar-hide">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-10 py-8 border-t border-black/5 bg-white/40">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
