'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  Sparkles, 
  CheckCircle2,
  Award,
  Zap,
  Shield,
  Activity,
  Workflow,
  Cpu
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import SpatialDrawer from '@/components/ui/SpatialDrawer'
import { cn } from '@/lib/utils'

interface WhyAxionItem {
  id: string
  title: string
  description: string
  icon_name: string
  sort_order: number
  is_active: boolean
}

export default function WhyAxionPage() {
  const supabase = createClient()
  const [items, setItems] = useState<WhyAxionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Partial<WhyAxionItem> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (isDemo) {
      setItems([
        { id: '1', title: 'Global Engineering Excellence', description: 'Over 20 years of specialized expertise in high-fidelity visual technology and spatial computing.', icon_name: 'Award', sort_order: 0, is_active: true },
        { id: '2', title: 'Quantum Manufacturing', description: 'Precision-engineered bespoke solutions tailored to the most demanding enterprise project requirements.', icon_name: 'Cpu', sort_order: 1, is_active: true },
        { id: '3', title: 'End-to-End Neural Integration', description: 'Comprehensive full-stack service architecture from conceptual design to global maintenance protocols.', icon_name: 'Zap', sort_order: 2, is_active: true },
      ] as any)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data } = await supabase.from('why_axion').select('*').order('sort_order')
    setItems(data || [])
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      icon_name: formData.get('icon_name'),
      is_active: true,
      sort_order: editingItem?.sort_order ?? items.length
    }

    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      let res
      if (editingItem?.id) {
        res = await supabase.from('why_axion').update(data).eq('id', editingItem.id)
      } else {
        res = await supabase.from('why_axion').insert([data])
      }

      if (res.error) {
        toast.error('Save failed')
        setSaving(false)
        return
      }
    } else {
      // Demo fake save
      if (editingItem?.id) {
        setItems(items.map(i => i.id === editingItem.id ? { ...i, ...data } as any : i))
      } else {
        setItems([...items, { ...data, id: Math.random().toString() } as any])
      }
    }

    toast.success('Benefit Protocol Synchronized')
    if (!isDemo) fetchItems()
    setIsDrawerOpen(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Decommission this value proposition?')) return
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      await supabase.from('why_axion').delete().eq('id', id)
      fetchItems()
    } else {
      setItems(items.filter(i => i.id !== id))
    }
    toast.success('Benefit Removed')
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
                 <Workflow size={20} />
              </div>
              <SpatialBadge variant="blue" pulse>Value Prop</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Engineering Edge</h1>
           <p className="text-slate-500 text-lg font-medium max-w-xl">Configure core engineering advantages and corporate value propositions.</p>
        </div>
        
        <button 
          onClick={() => { setEditingItem(null); setIsDrawerOpen(true) }}
          className="px-8 py-4 bg-[#0A1628] text-white rounded-[2rem] text-sm font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-black/10 shrink-0"
        >
          <Plus size={20} />
          Append Benefit
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 rounded-[1.5rem] bg-slate-50 animate-pulse border border-black/5" />
             ))
          ) : items.length === 0 ? (
             <div className="py-32 text-center opacity-40">
                <Sparkles size={64} className="text-slate-300 mx-auto mb-6" />
                <p className="text-slate-500 font-bold tracking-tight text-xl">Zero active value propositions.</p>
             </div>
          ) : (
            items.map((item, index) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[1.75rem] border border-black/5 p-10 shadow-sm hover:shadow-2xl hover:shadow-[#0D95F0]/10 transition-all duration-500 flex items-center gap-10 relative overflow-hidden"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-[#0A1628] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-black/20">
                  <Cpu size={32} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                     <h3 className="text-2xl font-black text-[#0A1628] tracking-tighter group-hover:text-[#0D95F0] transition-colors">{item.title}</h3>
                     <SpatialBadge variant="blue">Prop v2.4</SpatialBadge>
                  </div>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-3xl">{item.description}</p>
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                   <button 
                      onClick={() => { setEditingItem(item); setIsDrawerOpen(true) }} 
                      className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 hover:text-[#0D95F0] hover:bg-white hover:shadow-xl flex items-center justify-center transition-all"
                   >
                      <Edit2 size={20} />
                   </button>
                   <button 
                      onClick={() => handleDelete(item.id)} 
                      className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-white hover:shadow-xl flex items-center justify-center transition-all"
                   >
                      <Trash2 size={20} />
                   </button>
                </div>
                
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Sparkles size={160} />
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <SpatialDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingItem ? 'Refine Value Proposition' : 'Initialize Engineering Edge'}
        description={editingItem ? 'Modifying the core architectural advantage parameters.' : 'Configuring a new global engineering differentiator.'}
      >
        <form onSubmit={handleSave} className="space-y-8 py-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proposition Signature</label>
            <input 
              name="title" 
              defaultValue={editingItem?.title} 
              required 
              placeholder="e.g. Advanced Holographic Optics"
              className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Symbol Mapping (Lucide)</label>
            <input 
               name="icon_name" 
               defaultValue={editingItem?.icon_name} 
               className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all" 
               placeholder="e.g. Zap, Shield, Award" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proposition Context</label>
            <textarea 
               name="description" 
               defaultValue={editingItem?.description} 
               required 
               rows={6} 
               className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold leading-relaxed tracking-tight resize-none transition-all" 
            />
          </div>
          
          <button 
             type="submit" 
             disabled={saving} 
             className="w-full py-5 bg-[#0A1628] text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} className="text-[#0D95F0]" />}
            Sync Proposition Core
          </button>
        </form>
      </SpatialDrawer>
    </div>
  )
}
