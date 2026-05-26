'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render after component mounts on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-full bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-300">
        <div className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-full bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-300 hover:text-[#0D95F0] hover:bg-white dark:hover:bg-black hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group"
      title="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" />
      ) : (
        <Moon size={18} className="group-hover:-rotate-90 transition-transform duration-500" />
      )}
    </button>
  )
}
