'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { 
  Search, 
  Package, 
  FolderTree, 
  MessageSquare, 
  Settings, 
  Plus, 
  Home, 
  FileText, 
  Building2, 
  Globe2, 
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Palette"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A1628]/40 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-[1.75rem] border border-black/5 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.4)] overflow-hidden keep-rounded"
          >
            <div className="flex items-center gap-4 px-8 py-6 border-b border-black/5 keep-rounded">
              <Search className="text-slate-300 keep-rounded" size={20} />
              <Command.Input
                placeholder="Search across enterprise intelligence..."
                className="flex-1 bg-transparent border-none outline-none text-base font-bold text-[#0A1628] placeholder:text-slate-300 keep-rounded"
              />
              <div className="flex items-center gap-2 keep-rounded">
                 <div className="px-3 py-1.5 bg-slate-50 border border-black/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest keep-rounded">ESC TO EXIT</div>
              </div>
            </div>

            <Command.List className="max-h-[450px] overflow-y-auto p-4 scrollbar-hide">
              <Command.Empty className="py-20 text-center">
                 <div className="flex flex-col items-center gap-4 opacity-30">
                    <Zap size={48} className="text-slate-300" />
                    <p className="text-slate-500 font-black tracking-widest uppercase text-xs">No matching signals found</p>
                 </div>
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-4 py-3">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3 ml-2">Enterprise Portals</div>
                <Item icon={Home} label="Dashboard" onSelect={() => runCommand(() => router.push('/admin'))} />
                <Item icon={Package} label="Asset Inventory" onSelect={() => runCommand(() => router.push('/admin/products'))} />
                <Item icon={FolderTree} label="Sector Hierarchy" onSelect={() => runCommand(() => router.push('/admin/categories'))} />
                <Item icon={MessageSquare} label="Intelligence Hub (Inquiries)" onSelect={() => runCommand(() => router.push('/admin/inquiries'))} />
              </Command.Group>

              <Command.Group heading="Actions" className="px-4 py-3">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3 ml-2">Operational Tasks</div>
                <Item icon={Plus} label="Initialize New Asset" onSelect={() => runCommand(() => router.push('/admin/products/new'))} />
                <Item icon={Sparkles} label="Configure Feature Stack" onSelect={() => runCommand(() => router.push('/admin/categories'))} />
                <Item icon={Settings} label="System Protocol (Settings)" onSelect={() => runCommand(() => router.push('/admin/settings'))} />
              </Command.Group>

              <Command.Group heading="Content" className="px-4 py-3">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3 ml-2">Narrative Layer</div>
                <Item icon={FileText} label="Edit About Narrative" onSelect={() => runCommand(() => router.push('/admin/content/about'))} />
                <Item icon={Sparkles} label="Edit Solutions Page" onSelect={() => runCommand(() => router.push('/admin/content/solutions'))} />
                <Item icon={Building2} label="Manage Industry Sector" onSelect={() => runCommand(() => router.push('/admin/content/industries'))} />
                <Item icon={Globe2} label="Global Office Network" onSelect={() => runCommand(() => router.push('/admin/content/offices'))} />
              </Command.Group>
            </Command.List>

            <div className="p-4 bg-slate-50/80 border-t border-black/5 flex items-center justify-between">
               <div className="flex items-center gap-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                     <span className="p-1.5 bg-white border border-black/5 rounded-lg">↵</span>
                     <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <span className="p-1.5 bg-white border border-black/5 rounded-lg">↑↓</span>
                     <span>Navigate</span>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Spotlight Engine v4.0</span>
               </div>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  )
}

function Item({ icon: Icon, label, onSelect }: { icon: any; label: string; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-4 px-4 py-3.5 rounded-[1.25rem] text-sm font-black text-slate-500 aria-selected:bg-[#0D95F0] aria-selected:text-white transition-all cursor-pointer group"
    >
      <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-aria-selected:bg-white/20 group-aria-selected:text-white transition-colors">
        <Icon size={18} />
      </div>
      <span className="tracking-tight">{label}</span>
      <ArrowRight size={14} className="ml-auto opacity-0 group-aria-selected:opacity-100 group-aria-selected:translate-x-1 transition-all" />
    </Command.Item>
  )
}
