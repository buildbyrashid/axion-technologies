'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { 
  Save, 
  Loader2, 
  FileText, 
  BarChart3, 
  Clock, 
  Globe2, 
  Trophy, 
  Ruler,
  Activity,
  History,
  Zap,
  BookOpen
} from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { cn } from '@/lib/utils'

export default function AboutPageCMS() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    main_content: '',
    years_experience: 20,
    global_offices: 3,
    projects_delivered: 1000,
    manufacturing_area: 5000
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (isDemo) {
      setData({
        main_content: '<h1>Axion Technology</h1><p>Engineering excellence in global visual systems and spatial integration.</p>',
        years_experience: 20,
        global_offices: 3,
        projects_delivered: 1000,
        manufacturing_area: 5000
      } as any)
      setLoading(false)
      return
    }

    const { data: about, error } = await supabase
      .from('about_page')
      .select('*')
      .single()

    if (error) toast.error('Failed to load narrative data')
    else setData(about)
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      const { error } = await supabase
        .from('about_page')
        .update(data)
        .eq('id', (data as any).id)
      if (error) {
        toast.error('Update failed: ' + error.message)
        setSaving(false)
        return
      }
    }
    
    toast.success('Corporate Narrative Published')
    setSaving(false)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Corporate Core...</p>
    </div>
  )

  return (
    <div className="max-w-6xl space-y-12 pb-24">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
                 <History size={20} />
              </div>
              <SpatialBadge variant="blue" pulse>Corporate Identity</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Narrative & Metrics</h1>
           <p className="text-slate-500 text-lg font-medium max-w-xl">Architect the global company history and key performance indicators.</p>
        </div>
        
        <div className="flex items-center gap-2 px-6 py-2 bg-white border border-black/5 rounded-2xl shadow-sm">
           <Activity size={14} className="text-[#0D95F0]" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Sync Enabled</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-12">
        {/* High-Fidelity Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Years Experience', key: 'years_experience', icon: Clock, suffix: 'Yrs' },
            { label: 'Global Offices', key: 'global_offices', icon: Globe2, suffix: 'HQ' },
            { label: 'Projects Delivered', key: 'projects_delivered', icon: Trophy, suffix: '+' },
            { label: 'Manufacturing Area', key: 'manufacturing_area', icon: Ruler, suffix: 'SQM' },
          ].map((stat, idx) => (
            <motion.div 
               key={stat.key} 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.05 }}
               className="bg-white rounded-[2.5rem] border border-black/5 p-8 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#0D95F0]/10 group-hover:text-[#0D95F0] transition-colors">
                  <stat.icon size={18} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-end gap-3">
                <input 
                  type="number"
                  value={(data as any)[stat.key]}
                  onChange={(e) => setData({ ...data, [stat.key]: parseInt(e.target.value) || 0 })}
                  className="w-full text-4xl font-black text-[#0A1628] font-sora outline-none border-b-2 border-transparent focus:border-[#0D95F0] bg-transparent pb-1 tracking-tighter"
                />
                <span className="text-sm font-black text-slate-300 mb-2 uppercase tracking-widest">{stat.suffix}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Narrative Section */}
        <div className="bg-white rounded-[3rem] border border-black/5 p-12 lg:p-16 space-y-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
             <BookOpen size={240} />
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-[1.25rem] bg-slate-950 text-white flex items-center justify-center shadow-xl shadow-black/10">
              <FileText size={24} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-[#0A1628] tracking-tighter">Corporate Narrative</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">High-Resolution Brand Storytelling</p>
            </div>
          </div>

          <div className="relative z-10">
             <div className="mb-2 ml-1 flex items-center gap-2">
                <Zap size={12} className="text-[#0D95F0]" />
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Content Interface</label>
             </div>
             <div className="rounded-[2rem] border border-black/5 bg-slate-50/50 p-2 focus-within:bg-white transition-all">
                <RichTextEditor 
                  content={data.main_content} 
                  onChange={(val) => setData({ ...data, main_content: val })}
                  placeholder="Tell the story of Axion Technology..."
                />
             </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-12 py-6 bg-[#0A1628] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 disabled:opacity-50"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} className="text-[#0D95F0]" />}
            Sync Corporate Narrative
          </button>
        </div>
      </form>
    </div>
  )
}
