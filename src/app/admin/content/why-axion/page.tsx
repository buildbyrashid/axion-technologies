'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Search, Edit2, Trash2, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import SlideOver from '@/components/admin/SlideOver'
import FormField from '@/components/admin/FormField'
import { MOCK_STATS } from '@/lib/mock-data'

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
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Partial<WhyAxionItem> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setItems([
        { id: '1', title: 'Global Engineering Excellence', description: 'Over 20 years of experience in visual technology.', icon_name: 'Award', sort_order: 0, is_active: true },
        { id: '2', title: 'Custom Manufacturing', description: 'Bespoke solutions tailored to unique project requirements.', icon_name: 'Settings', sort_order: 1, is_active: true },
        { id: '3', title: 'End-to-End Integration', description: 'Full service from design to installation and maintenance.', icon_name: 'Zap', sort_order: 2, is_active: true },
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

    let res
    if (editingItem?.id) {
      res = await supabase.from('why_axion').update(data).eq('id', editingItem.id)
    } else {
      res = await supabase.from('why_axion').insert([data])
    }

    if (res.error) toast.error('Save failed')
    else {
      toast.success('Benefit saved')
      fetchItems()
      setIsSlideOverOpen(false)
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">Why Axion Benefits</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage core value propositions and engineering advantages</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsSlideOverOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20"
        >
          <Plus size={18} />
          Add Benefit
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
           <div className="py-20 text-center"><Loader2 size={32} className="animate-spin text-[#0D95F0] mx-auto" /></div>
        ) : items.length === 0 ? (
           <div className="py-20 text-center text-slate-400 font-medium">No benefits listed yet.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Sparkles size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[#0A1628] mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.description}</p>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => { setEditingItem(item); setIsSlideOverOpen(true) }} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-[#0D95F0] flex items-center justify-center transition-all"><Edit2 size={16} /></button>
                 <button onClick={async () => { await supabase.from('why_axion').delete().eq('id', item.id); fetchItems() }} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      <SlideOver
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={editingItem ? 'Edit Benefit' : 'Add Benefit'}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <FormField label="Benefit Title" required><input name="title" defaultValue={editingItem?.title} required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold" /></FormField>
          <FormField label="Icon Name (Lucide)"><input name="icon_name" defaultValue={editingItem?.icon_name} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium" placeholder="e.g. Shield, Zap, Award" /></FormField>
          <FormField label="Detailed Description" required><textarea name="description" defaultValue={editingItem?.description} required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium resize-none" /></FormField>
          
          <button type="submit" disabled={saving} className="w-full py-3 bg-[#0D95F0] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#0D95F0]/20 flex items-center justify-center gap-2">
            {saving && <Loader2 size={16} className="animate-spin" />}
            Save Benefit Item
          </button>
        </form>
      </SlideOver>
    </div>
  )
}
