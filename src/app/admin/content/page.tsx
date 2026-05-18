'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Loader2, Layout, Video, Image as ImageIcon, Zap, Activity, Terminal, Eye, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import { cn } from '@/lib/utils'

export default function HomepageSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    id: '',
    hero_headline: '',
    hero_subtext: '',
    hero_media_url: '',
    hero_media_type: 'video'
  })

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/homepage')
      const json = await res.json()
      if (json.success) setData(json.data)
      else toast.error('Failed to load portal configuration')
    } catch {
      toast.error('Connection error')
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) toast.success('Main Portal Synchronized')
      else toast.error('Update failed: ' + (json.error || 'Unknown error'))
    } catch {
      toast.error('Connection error')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Booting Portal Core...</p>
    </div>
  )

  return (
    <div className="max-w-5xl space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <Terminal size={20} />
            </div>
            <SpatialBadge variant="blue" pulse>Digital Flagship</SpatialBadge>
          </div>
          <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Portal Console</h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">Configure the high-impact visual protocols for the Axion global entry point.</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-2 bg-white border border-black/5 rounded-2xl shadow-sm">
          <Activity size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Rendering Active</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <div className="bg-white rounded-[1.75rem] border border-black/5 p-12 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-[1.25rem] bg-slate-950 text-white flex items-center justify-center shadow-xl shadow-black/10">
                <Layout size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0A1628] tracking-tighter">Hero Configuration</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Main Entrance Visuals</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hero Signature Headline</label>
                <input
                  value={data.hero_headline}
                  onChange={e => setData({ ...data, hero_headline: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                  placeholder="Enter headline..."
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hero Mission Context</label>
                <textarea
                  value={data.hero_subtext}
                  onChange={e => setData({ ...data, hero_subtext: e.target.value })}
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold leading-relaxed tracking-tight resize-none transition-all"
                  placeholder="Brief architectural context..."
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Media Protocol</label>
                  <div className="flex p-1.5 bg-slate-100 rounded-[1.25rem]">
                    {['video', 'image'].map(type => (
                      <button key={type} type="button" onClick={() => setData({ ...data, hero_media_type: type })}
                        className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[0.8rem] text-[10px] font-black uppercase tracking-widest transition-all",
                          data.hero_media_type === type ? "bg-white text-[#0A1628] shadow-lg" : "text-slate-400 hover:text-slate-600"
                        )}
                      >
                        {type === 'video' ? <Video size={14} /> : <ImageIcon size={14} />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Path</label>
                  <input
                    value={data.hero_media_url}
                    onChange={e => setData({ ...data, hero_media_url: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-[11px] font-black tracking-widest transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="w-full py-6 bg-[#0A1628] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 disabled:opacity-50"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} className="text-[#0D95F0]" />}
            Sync Portal parameters
          </button>
        </div>

        <div className="lg:sticky lg:top-8 h-fit space-y-6">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <Eye size={16} className="text-[#0D95F0]" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Live Core Preview</span>
            </div>
            <SpatialBadge variant="blue">Real-time</SpatialBadge>
          </div>
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-2xl border border-black/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 z-0 opacity-40">
              {data.hero_media_type === 'video' ? (
                <div className="w-full h-full bg-[#0D95F0]/20 flex items-center justify-center text-[#0D95F0] italic">[ Cinematic Video Sequence Active ]</div>
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 italic">[ High-Fidelity Image Layer ]</div>
              )}
            </div>
            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="w-12 h-1.5 bg-[#0D95F0] rounded-full" />
                <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter">
                  {data.hero_headline || 'AXION_PROTOCOL_SIGNATURE'}
                </h2>
                <p className="text-white/60 text-lg font-medium leading-relaxed max-w-sm">
                  {data.hero_subtext || 'Configuring universal engineering excellence.'}
                </p>
                <div className="pt-8 flex items-center gap-4">
                  <div className="px-8 py-4 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest shadow-xl">Explore Core</div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 text-center uppercase tracking-widest opacity-50">Spatial UI Render v1.0.4</p>
        </div>
      </form>
    </div>
  )
}
