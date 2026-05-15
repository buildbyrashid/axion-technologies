'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Search, MapPin, Globe2, Edit2, Trash2, Loader2, Building2, Phone, Mail, ArrowUpRight, LayoutGrid, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SpatialDrawer from '@/components/ui/SpatialDrawer'
import SpatialBadge from '@/components/ui/SpatialBadge'
import SpatialFloatingBar from '@/components/ui/SpatialFloatingBar'
import FormField from '@/components/admin/FormField'
import { MOCK_OFFICES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Office {
  id: string
  city: string
  country: string
  address: string
  email: string
  phone: string
  role: string
  is_headquarters: boolean
  sort_order: number
}

export default function OfficesPage() {
  const supabase = createClient()
  const [offices, setOffices] = useState<Office[]>([])
  const [loading, setLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingOffice, setEditingOffice] = useState<Partial<Office> | null>(null)
  const [saving, setSaving] = useState(false)
  
  // FAB State
  const [isDirty, setIsDirty] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

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

  const handleFormChange = () => {
    setIsDirty(true)
  }

  async function handleSave() {
    if (!formRef.current) return
    
    setSaving(true)
    const formData = new FormData(formRef.current)
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
      toast.success('Office saved successfully')
      fetchOffices()
      setIsDrawerOpen(false)
      setIsDirty(false)
    }
    setSaving(false)
  }

  const handleDiscard = () => {
    setIsDirty(false)
    setIsDrawerOpen(false)
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
                <Globe2 size={20} />
             </div>
             <SpatialBadge variant="blue" pulse>Enterprise Infrastructure</SpatialBadge>
          </div>
          <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Global Offices</h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">Manage your physical footprint across continents with precision control.</p>
        </div>
        
        <button 
          onClick={() => { setEditingOffice(null); setIsDrawerOpen(true); setIsDirty(false) }}
          className="group relative flex items-center gap-3 px-8 py-4 bg-[#0A1628] text-white rounded-3xl text-sm font-bold overflow-hidden shadow-2xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D95F0] to-[#0A1628] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Plus size={20} className="relative z-10" />
          <span className="relative z-10">Add Location</span>
        </button>
      </div>

      {/* Grid Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 min-h-[600px]">
        {loading ? (
           <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white/40 backdrop-blur-xl rounded-[1.75rem] border border-black/5">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 border-4 border-[#0D95F0]/10 rounded-full" />
                 <div className="absolute inset-0 border-4 border-[#0D95F0] border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Maps...</p>
           </div>
        ) : offices.length === 0 ? (
           <div className="col-span-full py-32 text-center bg-white/40 backdrop-blur-xl rounded-[1.75rem] border border-black/5 border-dashed">
              <div className="w-24 h-24 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-8">
                <MapPin size={48} />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628] mb-2">No locations deployed</h3>
              <p className="text-slate-400 font-medium mb-8">Your global network is currently offline.</p>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-[#0A1628] hover:bg-slate-50 transition-all"
              >
                Deploy First Office
              </button>
           </div>
        ) : (
          offices.map((office: any, index: number) => {
            // Determine bento sizing
            const isLarge = index === 0 || index === 5
            return (
              <motion.div 
                key={office.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={cn(
                  "group relative overflow-hidden bg-white rounded-[1.5rem] border border-black/5 p-10 transition-all duration-700 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2",
                  isLarge ? "md:col-span-3" : "md:col-span-2"
                )}
              >
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0D95F0]/5 rounded-full blur-[80px] group-hover:bg-[#0D95F0]/10 transition-colors duration-700" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className={cn(
                      "w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6", 
                      office.role === 'HQ' ? "bg-slate-950 text-white shadow-2xl shadow-black/20" : "bg-white border border-black/5 text-slate-400"
                    )}>
                      <Building2 size={28} />
                    </div>
                    <SpatialBadge 
                      variant={office.role === 'HQ' ? 'emerald' : office.role === 'R&D' ? 'amber' : 'blue'}
                      pulse={office.role === 'HQ'}
                    >
                      {office.role === 'HQ' ? 'Global HQ' : office.role}
                    </SpatialBadge>
                  </div>

                  <div className="space-y-1 mb-6">
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter group-hover:text-[#0D95F0] transition-colors duration-500">{office.city}</h3>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{office.country}</p>
                  </div>

                  <p className="text-slate-500 font-medium leading-relaxed mb-10 line-clamp-3">
                    {office.address}
                  </p>
                  
                  <div className="mt-auto space-y-4">
                    <div className="flex flex-wrap gap-4">
                       <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl text-[11px] font-bold text-slate-600 border border-black/5 transition-all group-hover:bg-white group-hover:shadow-sm">
                          <Mail size={14} className="text-[#0D95F0]" />
                          {office.email}
                       </div>
                       <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl text-[11px] font-bold text-slate-600 border border-black/5 transition-all group-hover:bg-white group-hover:shadow-sm">
                          <Phone size={14} className="text-[#0D95F0]" />
                          {office.phone}
                       </div>
                    </div>
                  </div>

                  {/* Quick Actions overlay */}
                  <div className="absolute top-8 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                     <button 
                       onClick={() => { setEditingOffice(office); setIsDrawerOpen(true); setIsDirty(false) }} 
                       className="w-11 h-11 rounded-2xl bg-white text-slate-400 hover:text-[#0D95F0] shadow-xl border border-black/5 flex items-center justify-center transition-all hover:scale-110"
                     >
                       <Edit2 size={18} />
                     </button>
                     <button 
                       onClick={async () => { 
                         if(confirm('Archive this location from the global map?')) { 
                           await supabase.from('global_offices').delete().eq('id', office.id); 
                           fetchOffices(); 
                           toast.success('Location archived'); 
                         } 
                       }} 
                       className="w-11 h-11 rounded-2xl bg-white text-slate-400 hover:text-rose-500 shadow-xl border border-black/5 flex items-center justify-center transition-all hover:scale-110"
                     >
                       <Trash2 size={18} />
                     </button>
                  </div>

                  <div className="absolute bottom-8 right-8 text-slate-200 group-hover:text-[#0D95F0]/20 transition-colors duration-700">
                    <ArrowUpRight size={64} />
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Slide-Over Form */}
      <SpatialDrawer
        isOpen={isDrawerOpen}
        onClose={handleDiscard}
        title={editingOffice ? 'Edit Location' : 'Deploy New Location'}
        description="Configure technical and logistical details for this office."
      >
        <form ref={formRef} onChange={handleFormChange} className="space-y-10 py-4">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                <input 
                  name="city" 
                  defaultValue={(editingOffice as any)?.city} 
                  required
                  placeholder="e.g. Dubai"
                  className="w-full px-6 py-4 rounded-[1.5rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</label>
                <input 
                  name="country" 
                  defaultValue={(editingOffice as any)?.country} 
                  required
                  placeholder="e.g. UAE"
                  className="w-full px-6 py-4 rounded-[1.5rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Physical Address</label>
              <textarea 
                name="address" 
                defaultValue={editingOffice?.address} 
                required
                rows={3}
                placeholder="Full technical address..."
                className="w-full px-6 py-4 rounded-[1.5rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-medium resize-none transition-all" 
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Email</label>
                <input 
                  name="email" 
                  type="email"
                  defaultValue={editingOffice?.email} 
                  required
                  placeholder="contact@axion.com"
                  className="w-full px-6 py-4 rounded-[1.5rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-medium transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Line</label>
                <input 
                  name="phone" 
                  defaultValue={editingOffice?.phone} 
                  required
                  placeholder="+971 ..."
                  className="w-full px-6 py-4 rounded-[1.5rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-medium transition-all" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Operational Role</label>
              <select 
                name="role" 
                defaultValue={(editingOffice as any)?.role || 'Office'} 
                className="w-full px-6 py-4 rounded-[1.5rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold transition-all appearance-none cursor-pointer"
              >
                <option value="Office">Standard Office</option>
                <option value="HQ">Global Headquarters</option>
                <option value="R&D">Research & Development</option>
                <option value="Manufacturing">Manufacturing Plant</option>
                <option value="Sales">Sales Center</option>
              </select>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-[2rem] border border-black/5 flex gap-4">
             <div className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#0D95F0] shrink-0">
                <Info size={18} />
             </div>
             <p className="text-[11px] text-slate-400 font-bold leading-relaxed uppercase tracking-wider">
                This location will be instantly visible on the global network map upon successful deployment.
             </p>
          </div>
        </form>
      </SpatialDrawer>

      {/* Apple-style Floating Action Bar */}
      <SpatialFloatingBar 
        isVisible={isDirty}
        onSave={handleSave}
        onDiscard={handleDiscard}
        isLoading={saving}
      />
    </div>
  )
}
