'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Save, RotateCcw, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpatialFloatingBarProps {
  isVisible: boolean
  onSave: () => void
  onDiscard: () => void
  isLoading?: boolean
  message?: string
}

export default function SpatialFloatingBar({
  isVisible,
  onSave,
  onDiscard,
  isLoading = false,
  message = "You have unsaved changes"
}: SpatialFloatingBarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] w-full max-w-xl px-6">
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-slate-950 text-white rounded-full px-4 py-3 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] border border-white/10 flex items-center justify-between gap-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <AlertCircle size={16} className="text-[#0D95F0]" />
              </div>
              <span className="text-sm font-bold tracking-tight">{message}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onDiscard}
                disabled={isLoading}
                className="px-5 py-2 rounded-full text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <RotateCcw size={14} />
                Discard
              </button>
              <button
                onClick={onSave}
                disabled={isLoading}
                className="px-6 py-2 bg-[#0D95F0] hover:bg-[#0D95F0]/90 text-white rounded-full text-xs font-extrabold transition-all duration-300 shadow-lg shadow-[#0D95F0]/20 flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
