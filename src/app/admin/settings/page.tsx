'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, 
  Settings as SettingsIcon, 
  Globe2, 
  MessageCircle, 
  Mail, 
  Phone, 
  Share2, 
  ShieldCheck,
  Search,
  Loader2,
  Info,
  Cpu,
  Zap,
  Globe,
  Lock,
  ArrowUpRight,
  Activity
} from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<any>({})

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (isDemo) {
      setSettings({
        id: '1',
        whatsapp_number: '+971501234567',
        contact_email: 'inquiry@axion.ae',
        office_phone: '+971 4 123 4567',
        default_language: 'en',
        site_title: 'Axion Technology | Premium Visual Solutions',
        site_description: 'Global engineering excellence in LED and interactive systems.',
        meta_keywords: 'LED, AV, Integration, Display',
        social_linkedin: 'https://linkedin.com/company/axion',
        social_instagram: 'https://instagram.com/axion',
      } as any)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single()

    if (error) toast.error('Failed to load settings')
    else setSettings(data)
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      const { error } = await supabase
        .from('settings')
        .update(settings)
        .eq('id', settings.id)
      if (error) {
        toast.error('Update failed: ' + error.message)
        setSaving(false)
        return
      }
    }
    
    toast.success('System Parameters Synchronized')
    setSaving(false)
  }

  const TABS = [
    { id: 'general', label: 'Core Identity', icon: Info },
    { id: 'seo', label: 'Global Index', icon: Search },
    { id: 'social', label: 'Neural Links', icon: Share2 },
    { id: 'security', label: 'Encryption', icon: Lock },
  ]

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Booting System Config...</p>
    </div>
  )

  return (
    <div className="max-w-5xl space-y-12 pb-24">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
                 <Cpu size={20} />
              </div>
              <SpatialBadge variant="blue" pulse>System Core</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Configuration</h1>
           <p className="text-slate-500 text-lg font-medium max-w-xl">Configure global protocols, metadata signatures, and neural endpoints.</p>
        </div>
        
        <div className="flex items-center gap-2 px-6 py-2 bg-white border border-black/5 rounded-2xl shadow-sm">
           <Activity size={14} className="text-emerald-500" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol v4.0.2 Stable</span>
        </div>
      </div>

      {/* Spatial Tabs */}
      <div className="flex gap-2 p-2 bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-x-auto scrollbar-hide max-w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all relative group",
              activeTab === tab.id 
                ? "text-white" 
                : "text-slate-400 hover:text-[#0A1628]"
            )}
          >
            {activeTab === tab.id && (
               <motion.div 
                  layoutId="active-tab-bg"
                  className="absolute inset-0 bg-[#0A1628] rounded-[1.5rem] z-0 shadow-xl shadow-black/10"
               />
            )}
            <div className="relative z-10 flex items-center gap-3">
               <tab.icon size={18} />
               {tab.label}
            </div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-12">
        <div className="bg-white rounded-[3rem] border border-black/5 p-12 lg:p-16 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <SettingsIcon size={200} />
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Interface</label>
                      <div className="relative group">
                        <MessageCircle size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:scale-110 transition-transform" />
                        <input 
                          value={settings.whatsapp_number || ''}
                          onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                          placeholder="+971..."
                        />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Central Inquiry Node</label>
                      <div className="relative group">
                        <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0D95F0] group-focus-within:scale-110 transition-transform" />
                        <input 
                          value={settings.contact_email || ''}
                          onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                          placeholder="admin@axion.ae"
                        />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">HQ Voice Terminal</label>
                      <div className="relative group">
                        <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:scale-110 transition-transform" />
                        <input 
                          value={settings.office_phone || ''}
                          onChange={(e) => setSettings({ ...settings, office_phone: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                        />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Linguistic Protocol</label>
                      <div className="relative group">
                        <Globe size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:scale-110 transition-transform" />
                        <select 
                          value={settings.default_language || 'en'}
                          onChange={(e) => setSettings({ ...settings, default_language: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all cursor-pointer appearance-none"
                        >
                          <option value="en">English (Standard)</option>
                          <option value="ar">Arabic (Universal)</option>
                        </select>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div 
                key="seo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10 relative z-10"
              >
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Master Meta Signature</label>
                    <input 
                      value={settings.site_title || ''}
                      onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                      className="w-full px-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                      placeholder="Enterprise Title Tag"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Global Metadata Description</label>
                    <textarea 
                      value={settings.site_description || ''}
                      onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                      rows={4}
                      className="w-full px-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight resize-none transition-all"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Taxonomy Keywords</label>
                    <input 
                      value={settings.meta_keywords || ''}
                      onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                      className="w-full px-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                      placeholder="LED, Integration, Visual Systems"
                    />
                 </div>
              </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div 
                key="social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   {['LinkedIn', 'Instagram', 'Twitter', 'YouTube'].map(platform => (
                      <div key={platform} className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{platform} Endpoint</label>
                        <input 
                          value={settings[`social_${platform.toLowerCase()}`] || ''}
                          onChange={(e) => setSettings({ ...settings, [`social_${platform.toLowerCase()}`]: e.target.value })}
                          className="w-full px-8 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                          placeholder="https://neural-link.com/..."
                        />
                      </div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 relative z-10"
              >
                 <div className="w-24 h-24 rounded-[2rem] bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] mx-auto mb-8 relative group">
                    <div className="absolute inset-0 bg-[#0D95F0] rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                    <ShieldCheck size={48} className="relative z-10" />
                 </div>
                 <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-4">Enterprise Shield Active</h3>
                 <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg leading-relaxed">System-wide encryption, session management, and 2FA protocols are managed via the secure Supabase core infrastructure.</p>
                 
                 <div className="mt-12 flex justify-center">
                    <SpatialBadge variant="blue" pulse>Full Encryption Enabled</SpatialBadge>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-12 py-6 bg-[#0A1628] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 disabled:opacity-50"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} className="text-[#0D95F0]" />}
            Sync System Parameters
          </button>
        </div>
      </form>
    </div>
  )
}
