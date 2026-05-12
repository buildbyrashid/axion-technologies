'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Search, Edit2, Trash2, Loader2, Building2, Layout, Zap } from 'lucide-react'
import { toast } from 'sonner'
import SlideOver from '@/components/admin/SlideOver'
import FormField from '@/components/admin/FormField'
import { MOCK_CATEGORIES } from '@/lib/mock-data' // Using categories as a proxy or I can add MOCK_INDUSTRIES

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
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [editingIndustry, setEditingIndustry] = useState<Partial<Industry> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchIndustries()
  }, [])

  async function fetchIndustries() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Mock some industry data
      setIndustries([
        { id: '1', name: 'Retail & Commercial', slug: 'retail', description: 'Transforming shopping experiences with high-impact displays.', icon_name: 'ShoppingBag', sort_order: 0, is_active: true },
        { id: '2', name: 'Control Rooms', slug: 'control-rooms', description: 'Critical infrastructure visualization for 24/7 monitoring.', icon_name: 'Activity', sort_order: 1, is_active: true },
        { id: '3', name: 'Sports & Stadiums', slug: 'sports', description: 'Immersive fan engagement with massive LED surfaces.', icon_name: 'Trophy', sort_order: 2, is_active: true },
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

    let res
    if (editingIndustry?.id) {
      res = await supabase.from('industries').update(data).eq('id', editingIndustry.id)
    } else {
      res = await supabase.from('industries').insert([data])
    }

    if (res.error) toast.error('Save failed')
    else {
      toast.success('Industry saved')
      fetchIndustries()
      setIsSlideOverOpen(false)
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">Industries</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage industrial sectors and market vertical content</p>
        </div>
        <button 
          onClick={() => { setEditingIndustry(null); setIsSlideOverOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20"
        >
          <Plus size={18} />
          Add Industry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <div className="col-span-full py-20 text-center"><Loader2 size={32} className="animate-spin text-[#0D95F0] mx-auto" /></div>
        ) : industries.length === 0 ? (
           <div className="col-span-full py-20 text-center text-slate-400 font-medium">No industries listed yet.</div>
        ) : (
          industries.map(industry => (
            <div key={industry.id} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center">
                  <Layout size={22} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2">{industry.name}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4 line-clamp-3">{industry.description}</p>
              
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                /{industry.slug}
              </div>

              <div className="absolute top-6 right-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => { setEditingIndustry(industry); setIsSlideOverOpen(true) }} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-[#0D95F0] flex items-center justify-center transition-all"><Edit2 size={14} /></button>
                 <button onClick={async () => { await supabase.from('industries').delete().eq('id', industry.id); fetchIndustries() }} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      <SlideOver
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={editingIndustry ? 'Edit Industry' : 'Add Industry'}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <FormField label="Industry Name" required>
            <input 
              name="name" 
              defaultValue={editingIndustry?.name} 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold" 
              onBlur={(e) => {
                const slugInput = (e.target.form as HTMLFormElement).elements.namedItem('slug') as HTMLInputElement
                if (slugInput && !slugInput.value) {
                  slugInput.value = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }
              }}
            />
          </FormField>
          <FormField label="Slug" required><input name="slug" defaultValue={editingIndustry?.slug} required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium bg-slate-50" /></FormField>
          <FormField label="Icon Name (Lucide)"><input name="icon_name" defaultValue={editingIndustry?.icon_name} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium" placeholder="e.g. Zap, Building, Layout" /></FormField>
          <FormField label="Description" required><textarea name="description" defaultValue={editingIndustry?.description} required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium resize-none" /></FormField>
          
          <button type="submit" disabled={saving} className="w-full py-3 bg-[#0D95F0] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#0D95F0]/20 flex items-center justify-center gap-2">
            {saving && <Loader2 size={16} className="animate-spin" />}
            Save Industry
          </button>
        </form>
      </SlideOver>
    </div>
  )
}
