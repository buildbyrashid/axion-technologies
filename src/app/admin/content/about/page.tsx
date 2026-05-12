'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Save, Loader2, FileText, BarChart3, Clock, Globe2, Trophy, Ruler } from 'lucide-react'
import { toast } from 'sonner'
import FormField from '@/components/admin/FormField'
import RichTextEditor from '@/components/admin/RichTextEditor'

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
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setData({
        main_content: '<h1>Axion Technology</h1><p>Engineering excellence in visual systems.</p>',
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

    if (error) {
      toast.error('Failed to load about page data')
    } else {
      setData(about)
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    
    const { error } = await supabase
      .from('about_page')
      .update(data)
      .eq('id', (data as any).id)

    if (error) {
      toast.error('Update failed: ' + error.message)
    } else {
      toast.success('About page updated successfully!')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 size={32} className="animate-spin text-[#0D95F0]" />
      <p className="text-sm text-slate-400 font-medium">Loading about page...</p>
    </div>
  )

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">About Us Page</h1>
        <p className="text-slate-400 text-sm font-medium mt-1">Edit company history, mission, and key metrics</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Years Experience', key: 'years_experience', icon: Clock, suffix: '+' },
            { label: 'Global Offices', key: 'global_offices', icon: Globe2, suffix: '' },
            { label: 'Projects Delivered', key: 'projects_delivered', icon: Trophy, suffix: '+' },
            { label: 'Manufacturing (sqm)', key: 'manufacturing_area', icon: Ruler, suffix: '' },
          ].map((stat) => (
            <div key={stat.key} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <stat.icon size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  value={(data as any)[stat.key]}
                  onChange={(e) => setData({ ...data, [stat.key]: parseInt(e.target.value) || 0 })}
                  className="w-full text-2xl font-extrabold text-[#0A1628] font-sora outline-none border-b border-transparent focus:border-[#0D95F0] bg-transparent pb-1"
                />
                <span className="text-xl font-bold text-slate-200">{stat.suffix}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 lg:p-10 space-y-8 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#0A1628]">Company Narrative</h3>
          </div>

          <FormField label="Main Content (Rich Text)">
            <RichTextEditor 
              content={data.main_content} 
              onChange={(val) => setData({ ...data, main_content: val })}
              placeholder="Tell the story of Axion Technology..."
            />
          </FormField>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20 active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Publish About Page
          </button>
        </div>
      </form>
    </div>
  )
}
