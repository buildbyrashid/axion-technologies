'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, 
  Loader2, 
  Terminal, 
  Upload, 
  Mail,
  Globe,
  MapPin,
  Megaphone,
  Check,
  Trash2,
  Building2
} from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import AxionLoader from '@/components/ui/AxionLoader'
import { cn } from '@/lib/utils'

export default function GlobalCTACMSPage() {
  const [loading, setLoading] = useState(true)
  const [savingType, setSavingType] = useState<'draft' | 'publish' | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  
  // Media asset deletion target
  const [deleteTarget, setDeleteTarget] = useState<{ field: string; label: string } | null>(null)

  // Data state matching global_cta db table
  const [cta, setCta] = useState({
    id: 'cta-default',
    headline: '',
    description: '',
    email: '',
    website: '',
    locations: '',
    support_text: '',
    background_image: '',
    is_active: 1
  })

  // Track initial state to detect modified changes
  const [initialCta, setInitialCta] = useState<typeof cta | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/global-cta')
      const json = await res.json()
      if (json.success) {
        if (json.data && Object.keys(json.data).length > 0) {
          const ctaData = {
            ...cta,
            ...json.data,
            is_active: json.data.is_active === undefined ? 1 : (json.data.is_active ? 1 : 0)
          }
          setCta(ctaData)
          setInitialCta(ctaData)
        }
      } else {
        toast.error('Failed to load global CTA parameters')
      }
    } catch {
      toast.error('Connection error')
    }
    setLoading(false)
  }

  // Deep comparison to determine dirty status
  const isDirty = initialCta && JSON.stringify(cta) !== JSON.stringify(initialCta)

  async function handleSave(status: 'draft' | 'published') {
    const isPublish = status === 'published'
    const type = isPublish ? 'publish' : 'draft'
    setSavingType(type)
    
    const updatedCta = { ...cta, is_active: isPublish ? 1 : 0 }

    try {
      const res = await fetch('/api/admin/global-cta', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCta),
      })
      const json = await res.json()
      if (json.success) {
        setCta(updatedCta)
        setInitialCta(updatedCta)
        toast.success(isPublish ? 'Global CTA published live!' : 'Saved as draft')
      } else {
        toast.error('Synchronization failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('Connection error while saving')
    }
    setSavingType(null)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    setUploadingField('background_image')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'cta')

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (json.success) {
        setCta(prev => ({
          ...prev,
          background_image: json.url
        }))
        toast.success('Background image uploaded successfully')
      } else {
        toast.error('Upload failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('File upload connection error')
    } finally {
      setUploadingField(null)
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  // Clear media asset reference after confirmation
  const confirmDelete = () => {
    if (!deleteTarget) return
    const field = deleteTarget.field

    setCta(prev => ({
      ...prev,
      [field]: ''
    }))

    toast.success(`${deleteTarget.label} cleared. Click Save or Publish to synchronize changes.`)
    setDeleteTarget(null)
  }

  if (loading) return <AxionLoader message="Loading CTA Parameters..." />

  return (
    <div className="w-full space-y-10 pb-24">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-30 bg-[#F8FAFC]/90 backdrop-blur-md py-6 border-b border-slate-200/60 -mx-10 lg:-mx-14 px-10 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <Building2 size={16} />
            </div>
            <SpatialBadge variant="blue">Global CMS Core</SpatialBadge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] dark:text-white tracking-tighter">Global CTA CMS</h1>
        </div>

        {/* Action / Status Controls Area */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isDirty ? (
              <motion.div 
                key="dirty-actions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => handleSave('draft')}
                  disabled={savingType !== null}
                  className="flex items-center justify-center h-12 px-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingType === 'draft' ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                  SAVE DRAFT
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('published')}
                  disabled={savingType !== null}
                  className="flex items-center justify-center h-12 px-6 bg-[#0A1628] hover:bg-[#0A1628]/95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingType === 'publish' ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                  PUBLISH
                </button>
              </motion.div>
            ) : (
              cta.is_active === 1 ? (
                <motion.div
                  key="live-published-status"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex items-center gap-3 h-12 px-6 bg-emerald-50 border border-emerald-200/50 rounded-xl shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 rounded-full opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 bg-emerald-500 rounded-full"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                      LIVE & PUBLISHED
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="draft-saved-status"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-2 h-12 px-5 bg-slate-100 dark:bg-slate-800 border border-slate-200/40 rounded-xl shadow-sm text-slate-500 dark:text-slate-400 dark:text-slate-300">
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      SAVED AS DRAFT
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSave('published')}
                    disabled={savingType !== null}
                    className="flex items-center justify-center h-12 px-6 bg-[#0A1628] hover:bg-[#0A1628]/95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingType === 'publish' ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                    PUBLISH
                  </button>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main CMS Editor Form */}
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: CTA Messaging Settings */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] border border-black/5 dark:border-white/10 p-10 shadow-sm space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center">
                  <Megaphone size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#0A1628] dark:text-white tracking-tight">CTA Messaging</h3>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest">Headline and descriptions</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Call to Action Headline</label>
                  <input
                    value={cta.headline}
                    onChange={e => setCta({ ...cta, headline: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                    placeholder="e.g. Let's Build Your Next Visual Experience"
                  />
                  <p className="text-[9px] text-slate-400 dark:text-slate-300 font-semibold italic ml-1">
                    * The signature phrase "Visual Experience" is automatically highlighted with the gradient design.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Supportive Message / description</label>
                  <textarea
                    value={cta.description}
                    onChange={e => setCta({ ...cta, description: e.target.value })}
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight leading-relaxed transition-all resize-none"
                    placeholder="Enter the supportive call to action content..."
                  />
                </div>
              </div>
            </div>

            {/* Media Background Setting */}
            <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] border border-black/5 dark:border-white/10 p-10 shadow-sm space-y-6">
              <h3 className="text-md font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 border-l-4 border-[#0D95F0] pl-3">Presentation Layer Assets</h3>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Background Image URL</label>
                <div className="flex gap-2">
                  <input
                    value={cta.background_image}
                    onChange={e => setCta({ ...cta, background_image: e.target.value })}
                    className="flex-1 px-4 py-3 text-xs font-mono border border-slate-200 dark:border-slate-800 rounded-xl outline-none"
                    placeholder="https://unsplash.com/..."
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef}
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    disabled={uploadingField === 'background_image'}
                    onClick={triggerFileSelect}
                    className="px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {uploadingField === 'background_image' ? <Loader2 size={14} className="animate-spin text-[#0D95F0]" /> : <Upload size={14} />}
                  </button>
                  <button
                    type="button"
                    disabled={!cta.background_image}
                    onClick={() => setDeleteTarget({ field: 'background_image', label: 'Background Image' })}
                    className={cn(
                      "px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-300 transition-colors",
                      cta.background_image ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {cta.background_image && (
                <div className="relative aspect-[3/1] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-950">
                  <img
                    src={cta.background_image}
                    alt="CTA Background Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px] font-black uppercase tracking-widest">
                    Asset Preview Layer Active
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Global Contact Card Settings */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] border border-black/5 dark:border-white/10 p-10 shadow-sm space-y-8">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-lg font-extrabold text-[#0A1628] dark:text-white tracking-tight">Contact Card Settings</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest">Physical & Digital Touchpoints</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                    <Mail size={12} className="text-[#0D95F0]" /> Email Address
                  </label>
                  <input
                    value={cta.email}
                    onChange={e => setCta({ ...cta, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl outline-none"
                    placeholder="sales@axiontechnology.com"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                    <Globe size={12} className="text-[#0D95F0]" /> Website Link
                  </label>
                  <input
                    value={cta.website}
                    onChange={e => setCta({ ...cta, website: e.target.value })}
                    className="w-full px-4 py-3 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl outline-none"
                    placeholder="www.axiontechnology.com"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                    <MapPin size={12} className="text-[#0D95F0]" /> Global Hub Locations
                  </label>
                  <input
                    value={cta.locations}
                    onChange={e => setCta({ ...cta, locations: e.target.value })}
                    className="w-full px-4 py-3 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl outline-none"
                    placeholder="Hong Kong | Shenzhen | Dubai"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">
                    Support Online text
                  </label>
                  <input
                    value={cta.support_text}
                    onChange={e => setCta({ ...cta, support_text: e.target.value })}
                    className="w-full px-4 py-3 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl outline-none"
                    placeholder="Engineering Support Online"
                  />
                </div>
              </div>

              <div className="text-[9px] font-semibold text-slate-400 dark:text-slate-300 italic leading-relaxed pt-2 border-t border-slate-100">
                * Note: Action buttons, consulting modal triggers, and structural visual icons remain locked & hardcoded in the primary design layout.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-black/5 dark:border-white/10 p-8 shadow-2xl space-y-6"
            >
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={22} />
                </div>
                <h3 className="text-lg font-black text-[#0A1628] dark:text-white tracking-tight">Remove Media Asset?</h3>
                <p className="text-xs text-slate-400 dark:text-slate-300 font-bold leading-relaxed">
                  Are you sure you want to delete <span className="font-extrabold text-slate-700">{deleteTarget.label}</span>? This action will clear the asset reference instantly.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 px-4 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-300 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-rose-600/10"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
