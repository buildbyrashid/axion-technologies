'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  Building2, 
  Layout, 
  Zap,
  Target,
  ArrowUpRight,
  Shield,
  Activity,
  Cpu
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import SpatialDrawer from '@/components/ui/SpatialDrawer'
import { cn } from '@/lib/utils'

interface Industry {
  id: string
  name: string
  slug: string
  description: string
  icon_name: string
  sort_order: number
  is_active: boolean
}

export default function IndustriesPage() {
  const supabase = createClient()
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingIndustry, setEditingIndustry] = useState<Partial<Industry> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchIndustries()
  }, [])

  async function fetchIndustries() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (isDemo) {
      setIndustries([
        { id: '1', name: 'Retail & Commercial', slug: 'retail', description: 'Transforming shopping experiences with high-impact holographic and interactive displays.', icon_name: 'ShoppingBag', sort_order: 0, is_active: true },
        { id: '2', name: 'Control Rooms', slug: 'control-rooms', description: 'Mission-critical infrastructure visualization for 24/7 monitoring and security.', icon_name: 'Activity', sort_order: 1, is_active: true },
        { id: '3', name: 'Sports & Stadiums', slug: 'sports', description: 'Immersive fan engagement with massive high-fidelity LED surfaces and spatial audio.', icon_name: 'Trophy', sort_order: 2, is_active: true },
      ] as any)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data } = await supabase.from('industries').select('*').order('sort_order')
    setIndustries(data || [])
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      icon_name: formData.get('icon_name'),
      is_active: true,
      sort_order: editingIndustry?.sort_order ?? industries.length
    }

    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      let res
      if (editingIndustry?.id) {
        res = await supabase.from('industries').update(data).eq('id', editingIndustry.id)
      } else {
        res = await supabase.from('industries').insert([data])
      }

      if (res.error) {
        toast.error('Save failed')
        setSaving(false)
        return
      }
    } else {
      // Demo fake save
      if (editingIndustry?.id) {
        setIndustries(industries.map(i => i.id === editingIndustry.id ? { ...i, ...data } as any : i))
      } else {
        setIndustries([...industries, { ...data, id: Math.random().toString() } as any])
      }
    }

    toast.success('Market Sector Synchronized')
    if (!isDemo) fetchIndustries()
    setIsDrawerOpen(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Decommission this market sector?')) return
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      await supabase.from('industries').delete().eq('id', id)
      fetchIndustries()
    } else {
      setIndustries(industries.filter(i => i.id !== id))
    }
    toast.success('Sector Removed')
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
                 <Target size={20} />
              </div>
              <SpatialBadge variant="blue" pulse>Market Verticals</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Sector Portfolios</h1>
           <p className="text-slate-500 text-lg font-medium max-w-xl">Configure specialized industrial sectors and enterprise solution clusters.</p>
        </div>
        
        <button 
          onClick={() => { setEditingIndustry(null); setIsDrawerOpen(true) }}
          className="px-8 py-4 bg-[#0A1628] text-white rounded-[2rem] text-sm font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-black/10 shrink-0"
        >
          <Plus size={20} />
          Register New Sector
        </button>
      </div>

      {/* Grid Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 rounded-[3rem] bg-slate-50 animate-pulse border border-black/5" />
             ))
          ) : industries.length === 0 ? (
             <div className="col-span-full py-32 text-center opacity-40">
                <Building2 size={64} className="text-slate-300 mx-auto mb-6" />
                <p className="text-slate-500 font-bold tracking-tight text-xl">Zero active industrial sectors.</p>
             </div>
          ) : (
            industries.map((industry, index) => (
              <motion.div 
                key={industry.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[3rem] border border-black/5 p-10 shadow-sm hover:shadow-2xl hover:shadow-[#0D95F0]/10 transition-all duration-500 relative flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-slate-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/10">
                    <Cpu size={28} />
                  </div>
                  <SpatialBadge variant="blue">Active Sector</SpatialBadge>
                </div>
                
                <div className="flex-1">
                   <h3 className="text-2xl font-black text-[#0A1628] mb-4 tracking-tighter group-hover:text-[#0D95F0] transition-colors">{industry.name}</h3>
                   <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6 line-clamp-3">{industry.description}</p>
                </div>
                
                <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Routing Signature</span>
                      <span className="text-[11px] font-black text-[#0A1628] uppercase tracking-tight">/{industry.slug}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setEditingIndustry(industry); setIsDrawerOpen(true) }} 
                        className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-400 hover:text-[#0D95F0] hover:bg-white hover:shadow-lg flex items-center justify-center transition-all"
                      >
                         <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(industry.id)} 
                        className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-white hover:shadow-lg flex items-center justify-center transition-all"
                      >
                         <Trash2 size={16} />
                      </button>
                   </div>
                </div>
                
                <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Building2 size={120} />
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* SpatialDrawer for Sector Config */}
      <SpatialDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingIndustry ? 'Refine Market Sector' : 'Initialize New Sector'}
        description={editingIndustry ? 'Modifying enterprise industrial vertical parameters.' : 'Configuring a new specialized market portfolio cluster.'}
      >
        <form onSubmit={handleSave} className="space-y-8 py-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sector Identity</label>
            <input 
              name="name" 
              defaultValue={editingIndustry?.name} 
              required
              placeholder="e.g. Aerospace & Defense"
              className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all" 
              onBlur={(e) => {
                const slugInput = (e.target.form as HTMLFormElement).elements.namedItem('slug') as HTMLInputElement
                if (slugInput && !slugInput.value) {
                  slugInput.value = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Routing Slug</label>
            <input 
               name="slug" 
               defaultValue={editingIndustry?.slug} 
               required 
               className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold font-mono tracking-tight transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Symbol Mapping (Lucide)</label>
            <input 
               name="icon_name" 
               defaultValue={editingIndustry?.icon_name} 
               className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all" 
               placeholder="e.g. Shield, Zap, Target" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mission Description</label>
            <textarea 
               name="description" 
               defaultValue={editingIndustry?.description} 
               required 
               rows={5} 
               className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold leading-relaxed tracking-tight resize-none transition-all" 
            />
          </div>
          
          <button 
             type="submit" 
             disabled={saving} 
             className="w-full py-5 bg-[#0A1628] text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Shield size={20} className="text-[#0D95F0]" />}
            Sync Sector Core
          </button>
        </form>
      </SpatialDrawer>
    </div>
  )
}
