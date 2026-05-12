'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Save, Loader2, Home, Layout, Type, Video, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import FormField from '@/components/admin/FormField'

export default function HomepageSettingsPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    hero_headline: '',
    hero_subtext: '',
    hero_media_url: '',
    hero_media_type: 'video'
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setData({
        hero_headline: 'Engineering Advanced Visual Solutions',
        hero_subtext: 'Global engineering excellence in LED display systems, interactive technologies, and integrated AV infrastructure.',
        hero_media_url: '/videos/hero.mp4',
        hero_media_type: 'video'
      } as any)
      setLoading(false)
      return
    }

    const { data: settings, error } = await supabase
      .from('homepage_settings')
      .select('*')
      .single()

    if (error) {
      // If it doesn't exist, we might need to initialize it
      toast.error('Failed to load homepage settings')
    } else {
      setData(settings)
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    
    const { error } = await supabase
      .from('homepage_settings')
      .update(data)
      .eq('id', (data as any).id)

    if (error) {
      toast.error('Update failed: ' + error.message)
    } else {
      toast.success('Homepage settings updated successfully!')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 size={32} className="animate-spin text-[#0D95F0]" />
      <p className="text-sm text-slate-400 font-medium">Loading settings...</p>
    </div>
  )

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">Homepage Settings</h1>
        <p className="text-slate-400 text-sm font-medium mt-1">Manage the visual impact of your site's landing page</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 lg:p-10 space-y-8 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <Layout size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#0A1628]">Hero Section</h3>
          </div>

          <FormField label="Hero Headline" required>
            <input 
              value={data.hero_headline}
              onChange={(e) => setData({ ...data, hero_headline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-bold"
              placeholder="e.g. Engineering Advanced Visual Solutions"
            />
          </FormField>

          <FormField label="Hero Subtext">
            <textarea 
              value={data.hero_subtext}
              onChange={(e) => setData({ ...data, hero_subtext: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium resize-none"
              placeholder="A brief description that appears below the headline..."
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField label="Hero Media Type">
              <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setData({ ...data, hero_media_type: 'video' })}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                    data.hero_media_type === 'video' ? "bg-white text-[#0A1628] shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Video size={14} />
                  VIDEO
                </button>
                <button
                  type="button"
                  onClick={() => setData({ ...data, hero_media_type: 'image' })}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                    data.hero_media_type === 'image' ? "bg-white text-[#0A1628] shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <ImageIcon size={14} />
                  IMAGE
                </button>
              </div>
            </FormField>

            <FormField label="Media URL / Path">
              <input 
                value={data.hero_media_url}
                onChange={(e) => setData({ ...data, hero_media_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium"
                placeholder="e.g. /videos/hero.mp4"
              />
            </FormField>
          </div>

          {/* Preview Placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-100">
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 p-10 flex flex-col justify-center">
                <h4 className="text-white text-xl font-bold font-sora leading-tight max-w-xs">{data.hero_headline || 'Headline Preview'}</h4>
                <p className="text-white/60 text-[10px] max-w-[200px] mt-2 line-clamp-2">{data.hero_subtext || 'Subtext preview'}</p>
             </div>
             <div className="absolute inset-0 flex items-center justify-center text-white/10 italic text-sm">
                {data.hero_media_type === 'video' ? 'Video Background Active' : 'Image Background Active'}
             </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20 active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Homepage Settings
          </button>
        </div>
      </form>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
