'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Search, MapPin, Globe2, Edit2, Trash2, Loader2, Building2, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SlideOver from '@/components/admin/SlideOver'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import FormField from '@/components/admin/FormField'
import { MOCK_OFFICES } from '@/lib/mock-data'

interface Office {
  id: string
  name: string
  address: string
  email: string
  phone: string
  is_headquarters: boolean
  sort_order: number
}

export default function OfficesPage() {
  const supabase = createClient()
  const [offices, setOffices] = useState<Office[]>([])
  const [loading, setLoading] = useState(true)
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [editingOffice, setEditingOffice] = useState<Partial<Office> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchOffices()
  }, [])

  async function fetchOffices() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setOffices(MOCK_OFFICES as any)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data } = await supabase.from('global_offices').select('*').order('sort_order')
    setOffices(data || [])
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      city: formData.get('city'),
      country: formData.get('country'),
      address: formData.get('address'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      is_headquarters: formData.get('role') === 'HQ'
    }

    let res
    if (editingOffice?.id) {
      res = await supabase.from('global_offices').update(data).eq('id', editingOffice.id)
    } else {
      res = await supabase.from('global_offices').insert([data])
    }

    if (res.error) toast.error('Save failed')
    else {
      toast.success('Office saved')
      fetchOffices()
      setIsSlideOverOpen(false)
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">Global Offices</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage physical locations and contact points</p>
        </div>
        <button 
          onClick={() => { setEditingOffice(null); setIsSlideOverOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all"
        >
          <Plus size={18} />
          Add Office
        </button>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
           <div className="col-span-full py-20 text-center">
             <Loader2 size={32} className="animate-spin text-[#0D95F0] mx-auto" />
             <p className="mt-4 text-slate-400 font-medium animate-pulse">Syncing locations...</p>
           </div>
        ) : offices.length === 0 ? (
           <div className="col-span-full py-24 text-center">
              <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-6">
                <Globe2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-1">No offices mapped</h3>
              <p className="text-sm text-slate-400 font-medium">Click "Add Office" to start building your global presence.</p>
           </div>
        ) : (
          offices.map((office: any, index: number) => (
            <motion.div 
              key={office.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-[#0D95F0]/5 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0D95F0]/5 to-transparent rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", 
                  office.role === 'HQ' ? "bg-gradient-to-br from-[#0D95F0] to-[#0A1628] text-white shadow-lg shadow-[#0D95F0]/20" : "bg-slate-50 text-slate-400 border border-slate-100"
                )}>
                  <Building2 size={24} />
                </div>
                {office.role === 'HQ' && (
                  <span className="px-3 py-1.5 bg-[#0D95F0]/10 text-[#0D95F0] text-[10px] font-extrabold rounded-full uppercase tracking-widest border border-[#0D95F0]/20">
                    Primary HQ
                  </span>
                )}
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-extrabold text-[#0A1628] font-sora tracking-tight mb-1">{office.city}</h3>
                <p className="text-[10px] font-bold text-[#0D95F0] uppercase tracking-[0.2em] mb-4">{office.country}</p>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 line-clamp-2 min-h-[40px] group-hover:text-slate-600 transition-colors">
                  {office.address}
                </p>
                
                <div className="space-y-3 border-t border-slate-50 pt-6">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50/50 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-default">
                    <Mail size={14} className="text-[#0D95F0]" />
                    <span className="truncate">{office.email}</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50/50 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-default">
                    <Phone size={14} className="text-[#0D95F0]" />
                    <span>{office.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                 <button 
                   onClick={() => { setEditingOffice(office); setIsSlideOverOpen(true) }} 
                   className="w-9 h-9 rounded-xl bg-white text-slate-400 hover:text-[#0D95F0] shadow-lg border border-slate-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                 >
                   <Edit2 size={16} />
                 </button>
                 <button 
                   onClick={async () => { if(confirm('Delete this office?')) { await supabase.from('global_offices').delete().eq('id', office.id); fetchOffices(); toast.success('Office deleted'); } }} 
                   className="w-9 h-9 rounded-xl bg-white text-slate-400 hover:text-red-500 shadow-lg border border-slate-50 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <SlideOver
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={editingOffice ? 'Edit Office' : 'Add Office'}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="City" required><input name="city" defaultValue={(editingOffice as any)?.city} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold" /></FormField>
            <FormField label="Country" required><input name="country" defaultValue={(editingOffice as any)?.country} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold" /></FormField>
          </div>
          <FormField label="Full Address" required><textarea name="address" defaultValue={editingOffice?.address} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium resize-none" /></FormField>
          <FormField label="Contact Email" required><input name="email" type="email" defaultValue={editingOffice?.email} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium" /></FormField>
          <FormField label="Contact Phone" required><input name="phone" defaultValue={editingOffice?.phone} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-medium" /></FormField>
          
          <FormField label="Office Role">
            <select name="role" defaultValue={(editingOffice as any)?.role || 'Office'} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-sm font-bold bg-white">
              <option value="Office">Standard Office</option>
              <option value="HQ">Global Headquarters</option>
              <option value="R&D">Research & Development</option>
              <option value="Manufacturing">Manufacturing Plant</option>
              <option value="Sales">Sales Center</option>
            </select>
          </FormField>

          <button type="submit" disabled={saving} className="w-full py-3 bg-[#0D95F0] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#0D95F0]/20 flex items-center justify-center gap-2">{saving && <Loader2 size={16} className="animate-spin" />} Save Office</button>
        </form>
      </SlideOver>
    </div>
  )
}

function cn(...classes: any[]) { return classes.filter(Boolean).join(' ') }
