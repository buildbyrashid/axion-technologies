'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, 
  Loader2, 
  Trash2, 
  History, 
  BookOpen, 
  Info, 
  Globe2, 
  Cpu, 
  Image as ImageIcon, 
  Layers, 
  Eye, 
  X, 
  Activity,
  Check,
  Building2,
  Bookmark
} from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import AxionLoader from '@/components/ui/AxionLoader'
export default function AboutPageCMS() {
  const [loading, setLoading] = useState(true)
  const [savingType, setSavingType] = useState<'draft' | 'publish' | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'hero' | 'who-we-are' | 'core-strengths'>('hero')
  
  // Custom delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<{ field: string; label: string } | null>(null)

  // Full state schema corresponding to the SQL schema
  const [data, setData] = useState({
    id: 'about-default',
    hero_title: '',
    hero_subtitle: '',
    hero_badge: '',
    hero_image: '',
    who_we_are_badge: '',
    who_we_are_title: '',
    who_we_are_paragraph_1: '',
    who_we_are_paragraph_2: '',
    who_we_are_image: '',
    technical_reach: '',
    global_operations_title: '',
    global_operations_description: '',
    visual_solutions_title: '',
    visual_solutions_description: '',
    is_active: 1
  })

  // Deep comparison state
  const [initialData, setInitialData] = useState<typeof data | null>(null)
  const isDirty = initialData && JSON.stringify(data) !== JSON.stringify(initialData)

  // Top header scroll tracking
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)

  useEffect(() => {
    fetchData()

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsHeaderSticky(true)
      } else {
        setIsHeaderSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/about')
      const json = await res.json()
      if (json.success && json.data && Object.keys(json.data).length > 0) {
        // Hydrate state
        const fetched = {
          id: json.data.id || 'about-default',
          hero_title: json.data.hero_title || '',
          hero_subtitle: json.data.hero_subtitle || '',
          hero_badge: json.data.hero_badge || '',
          hero_image: json.data.hero_image || '',
          who_we_are_badge: json.data.who_we_are_badge || '',
          who_we_are_title: json.data.who_we_are_title || '',
          who_we_are_paragraph_1: json.data.who_we_are_paragraph_1 || '',
          who_we_are_paragraph_2: json.data.who_we_are_paragraph_2 || '',
          who_we_are_image: json.data.who_we_are_image || '',
          technical_reach: json.data.technical_reach || '',
          global_operations_title: json.data.global_operations_title || '',
          global_operations_description: json.data.global_operations_description || '',
          visual_solutions_title: json.data.visual_solutions_title || '',
          visual_solutions_description: json.data.visual_solutions_description || '',
          is_active: json.data.is_active !== undefined ? Number(json.data.is_active) : 1
        }
        setData(fetched)
        setInitialData(JSON.parse(JSON.stringify(fetched)))
      } else {
        toast.error('Failed to load narrative or empty response')
      }
    } catch {
      toast.error('Database connection error')
    }
    setLoading(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingField(fieldName)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'about')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      const json = await res.json()
      if (json.success) {
        setData(prev => ({ ...prev, [fieldName]: json.url }))
        toast.success('Asset uploaded successfully')
      } else {
        toast.error('Upload failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('Network error during file upload')
    } finally {
      setUploadingField(null)
    }
  }

  const openDeleteConfirmation = (field: string, label: string) => {
    setDeleteTarget({ field, label })
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setData(prev => ({ ...prev, [deleteTarget.field]: '' }))
    toast.success(`${deleteTarget.label} cleared. Remember to save your draft or publish!`)
    setDeleteTarget(null)
  }

  async function handleSave(status: 'draft' | 'published') {
    const type = status === 'published' ? 'publish' : 'draft'
    setSavingType(type)
    
    const payload = {
      ...data,
      is_active: status === 'published' ? 1 : 0
    }

    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        toast.success(status === 'published' ? 'About page published live!' : 'About page draft saved.')
        setData(payload)
        setInitialData(JSON.parse(JSON.stringify(payload)))
      } else {
        toast.error('Update failed: ' + (json.error || 'Unknown'))
      }
    } catch {
      toast.error('Connection error saving About page.')
    } finally {
      setSavingType(null)
    }
  }

  if (loading) return <AxionLoader message="Loading About Page Parameters..." />

  const isSaving = savingType !== null

  return (
    <div className="w-full space-y-8 pb-24 relative">
      
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-30 bg-[#F8FAFC]/90 backdrop-blur-md py-6 border-b border-slate-200/60 -mx-10 lg:-mx-14 px-10 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <Building2 size={16} />
            </div>
            <SpatialBadge variant="blue">Corporate Portal</SpatialBadge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tighter">About Page CMS</h1>
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
              data.is_active === 1 ? (
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

      {/* Tabs list navigation */}
      <div className="border-b border-black/5 flex items-center gap-2 overflow-x-auto pb-px">
        {[
          { id: 'hero', label: 'Hero Banner', icon: ImageIcon },
          { id: 'who-we-are', label: 'Who We Are Story', icon: BookOpen },
          { id: 'core-strengths', label: 'Core Strengths', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon
          const isSelected = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm tracking-tight transition-all whitespace-nowrap ${
                isSelected 
                  ? 'border-[#0D95F0] text-[#0A1628] bg-slate-50' 
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
              }`}
            >
              <Icon size={16} className={isSelected ? 'text-[#0D95F0]' : 'text-slate-400'} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-[2rem] border border-black/5 p-8 lg:p-12 shadow-sm max-w-[1800px] mx-auto w-full">
        
        {/* Tab 1: Hero banner parameters */}
        {activeTab === 'hero' && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-[#0A1628] font-sora">Hero banner controls</h3>
              <p className="text-slate-400 text-xs mt-1">Configure primary backgrounds and initial titles displayed on the About Us page.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Hero Badge Label</label>
                <input 
                  type="text" 
                  value={data.hero_badge}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, hero_badge: e.target.value })}
                  placeholder="About Us"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Hero Title</label>
                <input 
                  type="text" 
                  value={data.hero_title}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, hero_title: e.target.value })}
                  placeholder="Engineering Technology for Modern Visual Environments"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Hero Subtitle Narrative</label>
              <textarea 
                rows={3}
                value={data.hero_subtitle}
                disabled={isSaving}
                onChange={e => setData({ ...data, hero_subtitle: e.target.value })}
                placeholder="Write a brief introduction to welcome visitors..."
                className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50 resize-none leading-relaxed"
              />
            </div>

            {/* Hero Background Image Picker & Preview */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Background Image Url / File</label>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={data.hero_image}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, hero_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
                
                <label className="relative shrink-0 flex items-center justify-center px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-widest rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                  {uploadingField === 'hero_image' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ImageIcon size={16} className="mr-2" />
                  )}
                  Upload Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleFileUpload(e, 'hero_image')}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    disabled={isSaving || uploadingField !== null}
                  />
                </label>

                {data.hero_image && (
                  <button
                    type="button"
                    onClick={() => openDeleteConfirmation('hero_image', 'Hero Background Image')}
                    disabled={isSaving}
                    className="shrink-0 p-4 bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 rounded-2xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              {/* Dynamic image preview pane */}
              {data.hero_image && (
                <div className="relative rounded-[2rem] border border-black/5 overflow-hidden max-w-xl shadow-inner group bg-slate-50">
                  <div className="aspect-[21/9] w-full relative">
                    <img 
                      src={data.hero_image} 
                      alt="Hero Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black uppercase tracking-wider text-white/50 block">Preview Context</span>
                      <p className="text-xs font-bold truncate max-w-md">{data.hero_image}</p>
                    </div>
                    <a 
                      href={data.hero_image} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white transition-all"
                    >
                      <Eye size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Who we are corporate storytelling */}
        {activeTab === 'who-we-are' && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-[#0A1628] font-sora">Corporate Storytelling</h3>
              <p className="text-slate-400 text-xs mt-1">Update your team background, badges, narrative text blocks, and secondary visual assets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Badge Tagline</label>
                <input 
                  type="text" 
                  value={data.who_we_are_badge}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, who_we_are_badge: e.target.value })}
                  placeholder="Who We Are"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Section Headline</label>
                <input 
                  type="text" 
                  value={data.who_we_are_title}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, who_we_are_title: e.target.value })}
                  placeholder="Global Leaders in Visual Engineering"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Narrative Paragraph 1</label>
                <textarea 
                  rows={4}
                  value={data.who_we_are_paragraph_1}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, who_we_are_paragraph_1: e.target.value })}
                  placeholder="Explain who you are..."
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Narrative Paragraph 2</label>
                <textarea 
                  rows={4}
                  value={data.who_we_are_paragraph_2}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, who_we_are_paragraph_2: e.target.value })}
                  placeholder="Add experience details, partners, or global logistics info..."
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50 resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Technical Reach Summary</label>
                <input 
                  type="text" 
                  value={data.technical_reach}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, technical_reach: e.target.value })}
                  placeholder="Hong Kong | Shenzhen | Dubai"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
                <p className="text-[10px] text-slate-400">Displays inside the white floating highlight box overlaid on the side column image.</p>
              </div>
            </div>

            {/* Who We Are Story Image */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Side Column Visual Graphic Url / File</label>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={data.who_we_are_image}
                  disabled={isSaving}
                  onChange={e => setData({ ...data, who_we_are_image: e.target.value })}
                  placeholder="https://example.com/who-we-are.jpg"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
                
                <label className="relative shrink-0 flex items-center justify-center px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-widest rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                  {uploadingField === 'who_we_are_image' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ImageIcon size={16} className="mr-2" />
                  )}
                  Upload Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleFileUpload(e, 'who_we_are_image')}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    disabled={isSaving || uploadingField !== null}
                  />
                </label>

                {data.who_we_are_image && (
                  <button
                    type="button"
                    onClick={() => openDeleteConfirmation('who_we_are_image', 'Who We Are Graphic')}
                    disabled={isSaving}
                    className="shrink-0 p-4 bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-600 rounded-2xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              {/* Graphic preview card */}
              {data.who_we_are_image && (
                <div className="relative rounded-[2rem] border border-black/5 overflow-hidden max-w-xl shadow-inner group bg-slate-50">
                  <div className="aspect-[4/3] w-full relative">
                    <img 
                      src={data.who_we_are_image} 
                      alt="Who We Are Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black uppercase tracking-wider text-white/50 block">Preview Context</span>
                      <p className="text-xs font-bold truncate max-w-md">{data.who_we_are_image}</p>
                    </div>
                    <a 
                      href={data.who_we_are_image} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white transition-all"
                    >
                      <Eye size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Core Strengths (Global Operations / Visual Solutions) */}
        {activeTab === 'core-strengths' && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-[#0A1628] font-sora">Corporate Strategic Strengths</h3>
              <p className="text-slate-400 text-xs mt-1">Configure titles and descriptions for the Global Operations and Visual Solutions panels.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Operations Column */}
              <div className="bg-slate-50/50 border border-black/5 rounded-[2rem] p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-[#0D95F0] rounded-2xl flex items-center justify-center">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1628] text-base leading-tight">Global Operations</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-0.5">Operations management</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Section Header</label>
                  <input 
                    type="text" 
                    value={data.global_operations_title}
                    disabled={isSaving}
                    onChange={e => setData({ ...data, global_operations_title: e.target.value })}
                    placeholder="Global Operations"
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-white text-[#0A1628] text-sm font-semibold outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Operations Narrative Description</label>
                  <textarea 
                    rows={6}
                    value={data.global_operations_description}
                    disabled={isSaving}
                    onChange={e => setData({ ...data, global_operations_description: e.target.value })}
                    placeholder="Describe your manufacturing coordinators, logistics hubs, and quality check processes..."
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-white text-[#0A1628] text-sm font-semibold outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50 resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Visual Solutions Column */}
              <div className="bg-slate-50/50 border border-black/5 rounded-[2rem] p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-500 rounded-2xl flex items-center justify-center">
                    <Bookmark size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1628] text-base leading-tight">Visual Solutions</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-0.5">Technology strategy</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Section Header</label>
                  <input 
                    type="text" 
                    value={data.visual_solutions_title}
                    disabled={isSaving}
                    onChange={e => setData({ ...data, visual_solutions_title: e.target.value })}
                    placeholder="Visual Solutions"
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-white text-[#0A1628] text-sm font-semibold outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Solutions Narrative Description</label>
                  <textarea 
                    rows={6}
                    value={data.visual_solutions_description}
                    disabled={isSaving}
                    onChange={e => setData({ ...data, visual_solutions_description: e.target.value })}
                    placeholder="Describe your LED display specs, COB/MIP systems, and custom engineering parameters..."
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-white text-[#0A1628] text-sm font-semibold outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50 resize-none leading-relaxed"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Delete confirmation custom modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurry dim overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal popup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white w-full max-w-md rounded-[2rem] border border-black/5 p-8 shadow-2xl z-10 overflow-hidden"
            >
              <button 
                onClick={() => setDeleteTarget(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 animate-bounce">
                  <Trash2 size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-[#0A1628] tracking-tight">Confirm clear asset</h4>
                  <p className="text-slate-400 text-xs px-2 leading-relaxed">
                    Are you sure you want to remove the path reference for <strong className="text-slate-600 font-semibold">{deleteTarget.label}</strong>? This action will collapse the image preview.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest rounded-2xl transition-all border border-slate-200/40"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
