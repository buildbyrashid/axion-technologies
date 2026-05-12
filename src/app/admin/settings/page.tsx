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
  Info
} from 'lucide-react'
import { toast } from 'sonner'
import FormField from '@/components/admin/FormField'

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
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
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

    if (error) {
      toast.error('Failed to load settings')
    } else {
      setSettings(data)
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    
    const { error } = await supabase
      .from('settings')
      .update(settings)
      .eq('id', settings.id)

    if (error) {
      toast.error('Update failed: ' + error.message)
    } else {
      toast.success('Settings updated successfully!')
    }
    setSaving(false)
  }

  const TABS = [
    { id: 'general', label: 'General & Contact', icon: Info },
    { id: 'seo', label: 'Global SEO', icon: Search },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ]

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 size={32} className="animate-spin text-[#0D95F0]" />
      <p className="text-sm text-slate-400 font-medium">Loading system settings...</p>
    </div>
  )

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">System Settings</h1>
        <p className="text-slate-400 text-sm font-medium mt-1">Configure global contact points, SEO, and business defaults</p>
      </div>

      <div className="flex gap-1 p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-slate-100 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-[#0A1628] text-white shadow-lg shadow-[#0A1628]/10" 
                : "text-slate-500 hover:text-[#0A1628] hover:bg-white"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 lg:p-10 shadow-sm">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <FormField label="WhatsApp Contact Number" helperText="Include country code, no spaces (e.g. 971501234567)">
                      <div className="relative">
                        <MessageCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                        <input 
                          value={settings.whatsapp_number || ''}
                          onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-bold"
                        />
                      </div>
                   </FormField>

                   <FormField label="Inquiry Receiver Email" helperText="Leads will be sent to this address">
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D95F0]" />
                        <input 
                          value={settings.contact_email || ''}
                          onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-bold"
                        />
                      </div>
                   </FormField>

                   <FormField label="Office Phone" helperText="Global headquarters line">
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          value={settings.office_phone || ''}
                          onChange={(e) => setSettings({ ...settings, office_phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-bold"
                        />
                      </div>
                   </FormField>

                   <FormField label="Default Site Language">
                      <div className="relative">
                        <Globe2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select 
                          value={settings.default_language || 'en'}
                          onChange={(e) => setSettings({ ...settings, default_language: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-bold bg-white"
                        >
                          <option value="en">English (Global)</option>
                          <option value="ar">Arabic</option>
                        </select>
                      </div>
                   </FormField>
                </div>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div 
                key="seo"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                 <FormField label="Global Meta Title" helperText="The default title shown in browser tabs and Google">
                    <input 
                      value={settings.site_title || ''}
                      onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-bold"
                      placeholder="Axion Technology | Global Visual Solutions"
                    />
                 </FormField>

                 <FormField label="Global Meta Description" helperText="Max 160 characters for optimal SEO">
                    <textarea 
                      value={settings.site_description || ''}
                      onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-medium resize-none"
                    />
                 </FormField>

                 <FormField label="Global Keywords" helperText="Comma separated list">
                    <input 
                      value={settings.meta_keywords || ''}
                      onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-medium"
                      placeholder="LED, Interactive, Display, AV Integration"
                    />
                 </FormField>
              </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div 
                key="social"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {['LinkedIn', 'Instagram', 'Twitter', 'YouTube'].map(platform => (
                      <FormField key={platform} label={platform} helperText={`Official ${platform} profile URL`}>
                        <input 
                          value={settings[`social_${platform.toLowerCase()}`] || ''}
                          onChange={(e) => setSettings({ ...settings, [`social_${platform.toLowerCase()}`]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] outline-none text-sm font-medium"
                          placeholder="https://..."
                        />
                      </FormField>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-center py-12"
              >
                 <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0D95F0] mx-auto mb-4">
                    <ShieldCheck size={32} />
                 </div>
                 <h3 className="text-lg font-bold text-[#0A1628] mb-2">Admin Security</h3>
                 <p className="text-sm text-slate-400 max-w-sm mx-auto font-medium">Session management and 2FA settings are controlled via the Supabase Dashboard for maximum security.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20 active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Commit System Settings
          </button>
        </div>
      </form>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
