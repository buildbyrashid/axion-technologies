'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, 
  Loader2, 
  Layout, 
  Video, 
  Image as ImageIcon, 
  Zap, 
  Terminal, 
  Upload, 
  Sparkles,
  Check,
  BarChart3,
  Trash2
} from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import { cn } from '@/lib/utils'

export default function HomepageCMSPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'expertise'>('hero')
  const [loading, setLoading] = useState(true)
  const [savingType, setSavingType] = useState<'draft' | 'publish' | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  
  // Media asset deletion target
  const [deleteTarget, setDeleteTarget] = useState<{ field: string; label: string } | null>(null)

  // Data state matching db tables
  const [hero, setHero] = useState({
    id: 'hero-default',
    hero_type: 'video',
    headline: '',
    subheadline: '',
    hero_video_1: '',
    hero_video_2: '',
    active_video: '',
    fallback_image: '',
    hero_image_1: '',
    hero_image_2: '',
    active_image: '',
    is_active: 1
  })

  const [expertise, setExpertise] = useState({
    id: 'expertise-default',
    section_label: '',
    section_title: '',
    description: '',
    stat_1_number: '',
    stat_1_label: '',
    stat_2_number: '',
    stat_2_label: '',
    stat_3_number: '',
    stat_3_label: '',
    stat_4_number: '',
    stat_4_label: ''
  })

  // Track initial state to detect modified changes
  const [initialHero, setInitialHero] = useState<typeof hero | null>(null)
  const [initialExpertise, setInitialExpertise] = useState<typeof expertise | null>(null)

  // File input refs for uploading
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/homepage')
      const json = await res.json()
      if (json.success) {
        if (json.data.hero && Object.keys(json.data.hero).length > 0) {
          const heroData = {
            ...hero,
            ...json.data.hero,
            is_active: json.data.hero.is_active === undefined ? 1 : (json.data.hero.is_active ? 1 : 0)
          }
          setHero(heroData)
          setInitialHero(heroData)
        }
        if (json.data.expertise && Object.keys(json.data.expertise).length > 0) {
          const expData = {
            ...expertise,
            ...json.data.expertise
          }
          setExpertise(expData)
          setInitialExpertise(expData)
        }
      } else {
        toast.error('Failed to load homepage parameters')
      }
    } catch {
      toast.error('Connection error')
    }
    setLoading(false)
  }

  // Deep comparison to determine dirty status
  const isDirty = initialHero && initialExpertise && (
    JSON.stringify(hero) !== JSON.stringify(initialHero) ||
    JSON.stringify(expertise) !== JSON.stringify(initialExpertise)
  )

  async function handleSave(status: 'draft' | 'published') {
    const isPublish = status === 'published'
    const type = isPublish ? 'publish' : 'draft'
    setSavingType(type)
    
    const updatedHero = { ...hero, is_active: isPublish ? 1 : 0 }

    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: updatedHero,
          expertise
        }),
      })
      const json = await res.json()
      if (json.success) {
        setHero(updatedHero)
        setInitialHero(updatedHero)
        setInitialExpertise(expertise)
        toast.success(isPublish ? 'Homepage parameters published live!' : 'Saved as draft')
      } else {
        toast.error('Synchronization failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('Connection error while saving')
    }
    setSavingType(null)
  }

  const handleFileUpload = async (fieldName: string, e: React.ChangeEvent<HTMLInputElement>, folder: string) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    setUploadingField(fieldName)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (json.success) {
        setHero(prev => {
          const updated = { ...prev, [fieldName]: json.url }
          // Automatically set active selection if appropriate
          if (fieldName === 'hero_video_1' && !prev.active_video) {
            updated.active_video = json.url
          } else if (fieldName === 'hero_image_1' && !prev.active_image) {
            updated.active_image = json.url
          }
          return updated
        })
        toast.success('Asset uploaded successfully')
      } else {
        toast.error('Upload failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('File upload connection error')
    } finally {
      setUploadingField(null)
    }
  }

  const triggerFileSelect = (fieldName: string) => {
    fileInputRefs.current[fieldName]?.click()
  }

  // Clear media asset reference after confirmation
  const confirmDelete = () => {
    if (!deleteTarget) return
    const field = deleteTarget.field

    setHero(prev => {
      const updated = { ...prev, [field]: '' }
      // Auto-clear active selection if matching
      if (field === 'hero_video_1' && prev.active_video === prev.hero_video_1) {
        updated.active_video = prev.hero_video_2 ? prev.hero_video_2 : ''
      } else if (field === 'hero_video_2' && prev.active_video === prev.hero_video_2) {
        updated.active_video = prev.hero_video_1 ? prev.hero_video_1 : ''
      } else if (field === 'hero_image_1' && prev.active_image === prev.hero_image_1) {
        updated.active_image = prev.hero_image_2 ? prev.hero_image_2 : (prev.fallback_image ? prev.fallback_image : '')
      } else if (field === 'hero_image_2' && prev.active_image === prev.hero_image_2) {
        updated.active_image = prev.hero_image_1 ? prev.hero_image_1 : (prev.fallback_image ? prev.fallback_image : '')
      } else if (field === 'fallback_image' && prev.active_image === prev.fallback_image) {
        updated.active_image = prev.hero_image_1 ? prev.hero_image_1 : (prev.hero_image_2 ? prev.hero_image_2 : '')
      }
      return updated
    })

    toast.success(`${deleteTarget.label} cleared. Click Save or Publish to synchronize changes.`)
    setDeleteTarget(null)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
      <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Homepage Core Parameters...</p>
    </div>
  )

  return (
    <div className="w-full space-y-10 pb-24">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-30 bg-[#F8FAFC]/90 backdrop-blur-md py-6 border-b border-slate-200/60 -mx-10 lg:-mx-14 px-10 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <Terminal size={16} />
            </div>
            <SpatialBadge variant="blue">Corporate Portal</SpatialBadge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tighter">Homepage CMS</h1>
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
                  className="flex items-center justify-center h-12 px-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
              hero.is_active === 1 ? (
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
                  <div className="flex items-center gap-2 h-12 px-5 bg-slate-100 border border-slate-200/40 rounded-xl shadow-sm text-slate-500">
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

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-100 pb-px">
        <button
          onClick={() => setActiveTab('hero')}
          className={cn(
            "px-8 py-5 text-sm font-black uppercase tracking-widest border-b-2 transition-all relative",
            activeTab === 'hero' 
              ? "border-[#0D95F0] text-[#0A1628]" 
              : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <div className="flex items-center gap-2">
            <Layout size={16} />
            Hero Module
          </div>
        </button>
        <button
          onClick={() => setActiveTab('expertise')}
          className={cn(
            "px-8 py-5 text-sm font-black uppercase tracking-widest border-b-2 transition-all relative",
            activeTab === 'expertise' 
              ? "border-[#0D95F0] text-[#0A1628]" 
              : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <div className="flex items-center gap-2">
            <BarChart3 size={16} />
            Expertise Statistics
          </div>
        </button>
      </div>

      {/* Main CMS Editor Form */}
      <div className="space-y-10">
        <AnimatePresence mode="wait">
          {activeTab === 'hero' && (
            <motion.div
              key="hero-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Headline Card */}
              <div className="bg-white rounded-[1.75rem] border border-black/5 p-10 shadow-sm space-y-8 relative overflow-hidden">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0A1628] tracking-tight">Main Headline Parameters</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry visuals identity</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Signature Headline</label>
                    <input
                      value={hero.headline}
                      onChange={e => setHero({ ...hero, headline: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                      placeholder="Use \n for line breaks (e.g. Engineering\nAdvanced\nVisual Solutions)"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subheadline context</label>
                    <textarea
                      value={hero.subheadline}
                      onChange={e => setHero({ ...hero, subheadline: e.target.value })}
                      rows={4}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all resize-none leading-relaxed"
                      placeholder="Enter the supportive subheadline content..."
                    />
                  </div>
                </div>
              </div>

              {/* Media Configuration Card */}
              <div className="bg-white rounded-[1.75rem] border border-black/5 p-10 shadow-sm space-y-8">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center">
                    <Video size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0A1628] tracking-tight">Media Presentation Protocols</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Video & Image controls</p>
                  </div>
                </div>

                {/* Primary Mode Picker */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Display Protocol</label>
                  <div className="flex max-w-md p-1.5 bg-slate-100 rounded-2xl">
                    {['video', 'image'].map(type => (
                      <button 
                        key={type} 
                        type="button" 
                        onClick={() => setHero({ ...hero, hero_type: type })}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          hero.hero_type === type 
                            ? "bg-white text-[#0A1628] shadow-sm" 
                            : "text-slate-400 hover:text-slate-600"
                        )}
                      >
                        {type === 'video' ? <Video size={14} /> : <ImageIcon size={14} />}
                        {type} Mode
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold italic ml-1">
                    * Note: If video mode is active but fails to load, the image mode will automatically display as a background fallback.
                  </p>
                </div>

                {/* Video Paths Settings Group */}
                <div className="space-y-10 pt-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 border-l-4 border-[#0D95F0] pl-3">Video Resources</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Video 1 */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Video 1 URL / Asset</label>
                      <div className="flex gap-2">
                        <input
                          value={hero.hero_video_1}
                          onChange={e => setHero({ ...hero, hero_video_1: e.target.value })}
                          className="flex-1 px-4 py-3 text-xs font-mono border border-slate-200 rounded-xl outline-none"
                          placeholder="/videos/hero-background.mp4"
                        />
                        <input 
                          type="file" 
                          accept="video/mp4" 
                          ref={el => { fileInputRefs.current['hero_video_1'] = el }}
                          className="hidden" 
                          onChange={(e) => handleFileUpload('hero_video_1', e, 'hero')}
                        />
                        <button
                          type="button"
                          disabled={uploadingField === 'hero_video_1'}
                          onClick={() => triggerFileSelect('hero_video_1')}
                          className="px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                        >
                          {uploadingField === 'hero_video_1' ? <Loader2 size={14} className="animate-spin text-[#0D95F0]" /> : <Upload size={14} />}
                        </button>
                        <button
                          type="button"
                          disabled={!hero.hero_video_1}
                          onClick={() => setDeleteTarget({ field: 'hero_video_1', label: 'Hero Video 1' })}
                          className={cn(
                            "px-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                            hero.hero_video_1 ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                          )}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Video 1 Preview Section */}
                      {hero.hero_video_1 && (
                        <div className="relative aspect-[16/9] rounded-2xl border border-slate-200 overflow-hidden bg-slate-950 group">
                          <video
                            src={hero.hero_video_1}
                            className="w-full h-full object-cover opacity-80"
                            muted
                            loop
                            playsInline
                            controls
                          />
                          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-wider pointer-events-none">
                            Video 1 Live Preview
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video 2 */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Video 2 URL / Asset (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          value={hero.hero_video_2}
                          onChange={e => setHero({ ...hero, hero_video_2: e.target.value })}
                          className="flex-1 px-4 py-3 text-xs font-mono border border-slate-200 rounded-xl outline-none"
                          placeholder="/videos/hero-sec.mp4"
                        />
                        <input 
                          type="file" 
                          accept="video/mp4" 
                          ref={el => { fileInputRefs.current['hero_video_2'] = el }}
                          className="hidden" 
                          onChange={(e) => handleFileUpload('hero_video_2', e, 'hero')}
                        />
                        <button
                          type="button"
                          disabled={uploadingField === 'hero_video_2'}
                          onClick={() => triggerFileSelect('hero_video_2')}
                          className="px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                        >
                          {uploadingField === 'hero_video_2' ? <Loader2 size={14} className="animate-spin text-[#0D95F0]" /> : <Upload size={14} />}
                        </button>
                        <button
                          type="button"
                          disabled={!hero.hero_video_2}
                          onClick={() => setDeleteTarget({ field: 'hero_video_2', label: 'Hero Video 2' })}
                          className={cn(
                            "px-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                            hero.hero_video_2 ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                          )}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Video 2 Preview Section */}
                      {hero.hero_video_2 && (
                        <div className="relative aspect-[16/9] rounded-2xl border border-slate-200 overflow-hidden bg-slate-950 group">
                          <video
                            src={hero.hero_video_2}
                            className="w-full h-full object-cover opacity-80"
                            muted
                            loop
                            playsInline
                            controls
                          />
                          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-wider pointer-events-none">
                            Video 2 Live Preview
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Active Video Selector */}
                  <div className="space-y-3 max-w-md">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Background Video Selection</label>
                    <select
                      value={hero.active_video}
                      onChange={e => setHero({ ...hero, active_video: e.target.value })}
                      className="w-full px-5 py-3 text-xs font-bold border border-slate-200 rounded-xl outline-none bg-slate-50 cursor-pointer"
                    >
                      <option value="">-- No video selected --</option>
                      {hero.hero_video_1 && <option value={hero.hero_video_1}>Hero Video 1 ({hero.hero_video_1})</option>}
                      {hero.hero_video_2 && <option value={hero.hero_video_2}>Hero Video 2 ({hero.hero_video_2})</option>}
                      {!['', hero.hero_video_1, hero.hero_video_2].includes(hero.active_video) && (
                        <option value={hero.active_video}>Custom Value ({hero.active_video})</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Image Paths Settings Group */}
                <div className="space-y-10 pt-10 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 border-l-4 border-amber-500 pl-3">Image Resources</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image 1 */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Image 1 URL</label>
                      <div className="flex gap-2">
                        <input
                          value={hero.hero_image_1}
                          onChange={e => setHero({ ...hero, hero_image_1: e.target.value })}
                          className="flex-1 px-4 py-3 text-xs font-mono border border-slate-200 rounded-xl outline-none"
                          placeholder="https://unsplash.com/..."
                        />
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={el => { fileInputRefs.current['hero_image_1'] = el }}
                          className="hidden" 
                          onChange={(e) => handleFileUpload('hero_image_1', e, 'hero')}
                        />
                        <button
                          type="button"
                          disabled={uploadingField === 'hero_image_1'}
                          onClick={() => triggerFileSelect('hero_image_1')}
                          className="px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                        >
                          {uploadingField === 'hero_image_1' ? <Loader2 size={14} className="animate-spin text-[#0D95F0]" /> : <Upload size={14} />}
                        </button>
                        <button
                          type="button"
                          disabled={!hero.hero_image_1}
                          onClick={() => setDeleteTarget({ field: 'hero_image_1', label: 'Hero Image 1' })}
                          className={cn(
                            "px-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                            hero.hero_image_1 ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                          )}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Image 1 Preview */}
                      {hero.hero_image_1 && (
                        <div className="relative aspect-[16/9] rounded-2xl border border-slate-200 overflow-hidden bg-slate-950">
                          <img
                            src={hero.hero_image_1}
                            alt="Hero Image 1 Preview"
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-wider pointer-events-none">
                            Image 1 Live Preview
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image 2 */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Image 2 URL (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          value={hero.hero_image_2}
                          onChange={e => setHero({ ...hero, hero_image_2: e.target.value })}
                          className="flex-1 px-4 py-3 text-xs font-mono border border-slate-200 rounded-xl outline-none"
                          placeholder="https://unsplash.com/..."
                        />
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={el => { fileInputRefs.current['hero_image_2'] = el }}
                          className="hidden" 
                          onChange={(e) => handleFileUpload('hero_image_2', e, 'hero')}
                        />
                        <button
                          type="button"
                          disabled={uploadingField === 'hero_image_2'}
                          onClick={() => triggerFileSelect('hero_image_2')}
                          className="px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                        >
                          {uploadingField === 'hero_image_2' ? <Loader2 size={14} className="animate-spin text-[#0D95F0]" /> : <Upload size={14} />}
                        </button>
                        <button
                          type="button"
                          disabled={!hero.hero_image_2}
                          onClick={() => setDeleteTarget({ field: 'hero_image_2', label: 'Hero Image 2' })}
                          className={cn(
                            "px-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                            hero.hero_image_2 ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                          )}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Image 2 Preview */}
                      {hero.hero_image_2 && (
                        <div className="relative aspect-[16/9] rounded-2xl border border-slate-200 overflow-hidden bg-slate-950">
                          <img
                            src={hero.hero_image_2}
                            alt="Hero Image 2 Preview"
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-wider pointer-events-none">
                            Image 2 Live Preview
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fallback Image */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fallback Poster Image URL</label>
                      <div className="flex gap-2">
                        <input
                          value={hero.fallback_image}
                          onChange={e => setHero({ ...hero, fallback_image: e.target.value })}
                          className="flex-1 px-4 py-3 text-xs font-mono border border-slate-200 rounded-xl outline-none"
                          placeholder="https://unsplash.com/..."
                        />
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={el => { fileInputRefs.current['fallback_image'] = el }}
                          className="hidden" 
                          onChange={(e) => handleFileUpload('fallback_image', e, 'hero')}
                        />
                        <button
                          type="button"
                          disabled={uploadingField === 'fallback_image'}
                          onClick={() => triggerFileSelect('fallback_image')}
                          className="px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                        >
                          {uploadingField === 'fallback_image' ? <Loader2 size={14} className="animate-spin text-[#0D95F0]" /> : <Upload size={14} />}
                        </button>
                        <button
                          type="button"
                          disabled={!hero.fallback_image}
                          onClick={() => setDeleteTarget({ field: 'fallback_image', label: 'Fallback Poster Image' })}
                          className={cn(
                            "px-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                            hero.fallback_image ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                          )}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Fallback Image Preview */}
                      {hero.fallback_image && (
                        <div className="relative aspect-[16/9] rounded-2xl border border-slate-200 overflow-hidden bg-slate-950">
                          <img
                            src={hero.fallback_image}
                            alt="Fallback Poster Image Preview"
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-wider pointer-events-none">
                            Fallback Poster Live Preview
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Active Image Selector */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Background Image Selection</label>
                      <select
                        value={hero.active_image}
                        onChange={e => setHero({ ...hero, active_image: e.target.value })}
                        className="w-full px-5 py-3.5 text-xs font-bold border border-slate-200 rounded-xl outline-none bg-slate-50 cursor-pointer"
                      >
                        <option value="">-- No image selected --</option>
                        {hero.hero_image_1 && <option value={hero.hero_image_1}>Hero Image 1 ({hero.hero_image_1})</option>}
                        {hero.hero_image_2 && <option value={hero.hero_image_2}>Hero Image 2 ({hero.hero_image_2})</option>}
                        {hero.fallback_image && <option value={hero.fallback_image}>Fallback Image ({hero.fallback_image})</option>}
                        {!['', hero.hero_image_1, hero.hero_image_2, hero.fallback_image].includes(hero.active_image) && (
                          <option value={hero.active_image}>Custom Image URL ({hero.active_image})</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'expertise' && (
            <motion.div
              key="expertise-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Header Texts */}
              <div className="bg-white rounded-[1.75rem] border border-black/5 p-10 shadow-sm space-y-8">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0A1628] tracking-tight">Expertise Section Headlines</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section Header Texts</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section Label</label>
                    <input
                      value={expertise.section_label}
                      onChange={e => setExpertise({ ...expertise, section_label: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                      placeholder="e.g. Our Expertise"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section Title</label>
                    <input
                      value={expertise.section_title}
                      onChange={e => setExpertise({ ...expertise, section_title: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight transition-all"
                      placeholder="e.g. Engineering Excellence"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section Description</label>
                  <textarea
                    value={expertise.description}
                    onChange={e => setExpertise({ ...expertise, description: e.target.value })}
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none text-sm font-bold tracking-tight leading-relaxed transition-all resize-none"
                    placeholder="Enter description..."
                  />
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="bg-white rounded-[1.75rem] border border-black/5 p-10 shadow-sm space-y-8">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center">
                    <BarChart3 size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0A1628] tracking-tight">Authority Statistics</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4 Key Corporate Milestones</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Stat 1 */}
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0]">Statistic Milestone 1</h4>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Number / Value</label>
                      <input
                        value={expertise.stat_1_number}
                        onChange={e => setExpertise({ ...expertise, stat_1_number: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="2006"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Label</label>
                      <input
                        value={expertise.stat_1_label}
                        onChange={e => setExpertise({ ...expertise, stat_1_label: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="Founded"
                      />
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0]">Statistic Milestone 2</h4>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Number / Value</label>
                      <input
                        value={expertise.stat_2_number}
                        onChange={e => setExpertise({ ...expertise, stat_2_number: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="1250+"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Label</label>
                      <input
                        value={expertise.stat_2_label}
                        onChange={e => setExpertise({ ...expertise, stat_2_label: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="Projects"
                      />
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0]">Statistic Milestone 3</h4>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Number / Value</label>
                      <input
                        value={expertise.stat_3_number}
                        onChange={e => setExpertise({ ...expertise, stat_3_number: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="25000"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Label</label>
                      <input
                        value={expertise.stat_3_label}
                        onChange={e => setExpertise({ ...expertise, stat_3_label: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="Factory Area (m²)"
                      />
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0]">Statistic Milestone 4</h4>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Number / Value</label>
                      <input
                        value={expertise.stat_4_number}
                        onChange={e => setExpertise({ ...expertise, stat_4_number: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="12+"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Label</label>
                      <input
                        value={expertise.stat_4_label}
                        onChange={e => setExpertise({ ...expertise, stat_4_label: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-white outline-none"
                        placeholder="Global Hubs"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] font-semibold text-slate-400 italic text-center pt-2">
                  * Note: Corporate expertise feature cards and DMX/IP icons remain hardcoded in the frontend layout.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              className="w-full max-w-md bg-white rounded-3xl border border-black/5 p-8 shadow-2xl space-y-6"
            >
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={22} />
                </div>
                <h3 className="text-lg font-black text-[#0A1628] tracking-tight">Remove Media Asset?</h3>
                <p className="text-xs text-slate-400 font-bold leading-relaxed">
                  Are you sure you want to delete <span className="font-extrabold text-slate-700">{deleteTarget.label}</span>? This action will clear the asset reference instantly.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
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
