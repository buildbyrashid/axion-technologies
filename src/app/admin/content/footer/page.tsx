'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2, LayoutTemplate } from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import FormField from '@/components/admin/FormField'

export default function FooterContentPage() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    description: '',
    email: '',
    phone: '',
    address: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: '',
    whatsapp_number: '',
    copyright_text: '',
    products_links: [] as { name: string; href: string }[],
    solutions_links: [] as { name: string; href: string }[],
    company_links: [] as { name: string; href: string }[]
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const res = await fetch('/api/admin/footer')
      const json = await res.json()
      if (json.success && json.data) {
        setData(json.data)
      }
    } catch (err) {
      toast.error('Failed to load footer settings')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      if (json.success) {
        toast.success('Footer settings updated successfully')
      } else {
        throw new Error(json.error)
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update footer settings')
    } finally {
      setSaving(false)
    }
  }

  const handleLinkChange = (group: 'products_links' | 'solutions_links' | 'company_links', index: number, field: 'name' | 'href', value: string) => {
    const newLinks = [...data[group]]
    newLinks[index][field] = value
    setData({ ...data, [group]: newLinks })
  }

  const addLink = (group: 'products_links' | 'solutions_links' | 'company_links') => {
    setData({ ...data, [group]: [...data[group], { name: '', href: '#' }] })
  }

  const removeLink = (group: 'products_links' | 'solutions_links' | 'company_links', index: number) => {
    const newLinks = [...data[group]]
    newLinks.splice(index, 1)
    setData({ ...data, [group]: newLinks })
  }

  if (loading) return null

  return (
    <div className="max-w-5xl space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.5rem] bg-[#0A1628]/5 dark:bg-white/5 flex items-center justify-center text-[#0A1628] dark:text-white shadow-inner">
              <LayoutTemplate size={24} />
            </div>
            <SpatialBadge variant="slate">Global Footer</SpatialBadge>
          </div>
          <h1 className="text-4xl font-black text-[#0A1628] dark:text-white tracking-tighter">Footer Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Manage the global footer content, contact info, and links.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-5 bg-[#0D95F0] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:bg-[#0A1628] transition-all shadow-xl shadow-[#0D95F0]/20 disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Info */}
        <motion.div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-black/5 dark:border-white/10 shadow-sm space-y-8">
          <h2 className="text-2xl font-black text-[#0A1628] dark:text-white tracking-tighter">Core Details</h2>
          <FormField label="Company Description">
            <textarea
              value={data.description}
              onChange={e => setData({ ...data, description: e.target.value })}
              className="w-full h-32 px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/20 resize-none"
            />
          </FormField>
          
          <FormField label="Copyright Text">
            <input
              type="text"
              value={data.copyright_text}
              onChange={e => setData({ ...data, copyright_text: e.target.value })}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/20"
            />
          </FormField>
        </motion.div>

        {/* Contact Info */}
        <motion.div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-black/5 dark:border-white/10 shadow-sm space-y-8">
          <h2 className="text-2xl font-black text-[#0A1628] dark:text-white tracking-tighter">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Email Address">
              <input
                type="email"
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/20"
              />
            </FormField>
            <FormField label="Phone Number">
              <input
                type="text"
                value={data.phone}
                onChange={e => setData({ ...data, phone: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/20"
              />
            </FormField>
            <FormField label="WhatsApp Number" className="md:col-span-2">
              <input
                type="text"
                value={data.whatsapp_number}
                onChange={e => setData({ ...data, whatsapp_number: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/20"
              />
            </FormField>
            <FormField label="Address" className="md:col-span-2">
              <input
                type="text"
                value={data.address}
                onChange={e => setData({ ...data, address: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/20"
              />
            </FormField>
          </div>
        </motion.div>
      </div>

      {/* Social Links */}
      <motion.div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-black/5 dark:border-white/10 shadow-sm space-y-8">
        <h2 className="text-2xl font-black text-[#0A1628] dark:text-white tracking-tighter">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Facebook URL">
            <input type="text" value={data.facebook_url} onChange={e => setData({ ...data, facebook_url: e.target.value })} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none" />
          </FormField>
          <FormField label="Twitter URL">
            <input type="text" value={data.twitter_url} onChange={e => setData({ ...data, twitter_url: e.target.value })} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none" />
          </FormField>
          <FormField label="LinkedIn URL">
            <input type="text" value={data.linkedin_url} onChange={e => setData({ ...data, linkedin_url: e.target.value })} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none" />
          </FormField>
          <FormField label="Instagram URL">
            <input type="text" value={data.instagram_url} onChange={e => setData({ ...data, instagram_url: e.target.value })} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-[1.5rem] text-[#0A1628] dark:text-white placeholder:text-slate-300 font-medium focus:outline-none" />
          </FormField>
        </div>
      </motion.div>

      {/* Dynamic Link Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {(['products_links', 'solutions_links', 'company_links'] as const).map(group => (
          <motion.div key={group} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-black/5 dark:border-white/10 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-[#0A1628] dark:text-white tracking-tighter capitalize">{group.replace('_links', '')} Links</h2>
              <button onClick={() => addLink(group)} className="w-10 h-10 rounded-[1rem] bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center hover:bg-[#0D95F0] hover:text-white transition-colors">
                <Plus size={18} />
              </button>
            </div>
            
            <div className="space-y-4 flex-1">
              {data[group].map((link, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <input 
                      type="text" 
                      placeholder="Link Name" 
                      value={link.name} 
                      onChange={e => handleLinkChange(group, idx, 'name', e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-xl text-[#0A1628] dark:text-white focus:outline-none" 
                    />
                    <input 
                      type="text" 
                      placeholder="URL (e.g. /products)" 
                      value={link.href} 
                      onChange={e => handleLinkChange(group, idx, 'href', e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-xl text-[#0A1628] dark:text-white focus:outline-none" 
                    />
                  </div>
                  <button onClick={() => removeLink(group, idx)} className="w-10 h-10 shrink-0 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors mt-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {data[group].length === 0 && (
                <p className="text-sm text-slate-400 italic text-center py-10">No links added</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
