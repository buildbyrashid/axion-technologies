'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, 
  Loader2, 
  Activity,
  ImageIcon, 
  BookOpen, 
  Layers, 
  Terminal, 
  History, 
  Upload, 
  Trash2, 
  Shield,
} from 'lucide-react'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import AxionLoader from '@/components/ui/AxionLoader'
import { cn } from '@/lib/utils'

export default function SolutionsCMSPage() {
  const [loading, setLoading] = useState(true)
  const [savingType, setSavingType] = useState<'draft' | 'publish' | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  const [activeUploadField, setActiveUploadField] = useState<string | null>(null)
  
  // Media asset deletion target modal
  const [deleteTarget, setDeleteTarget] = useState<{ field: string; label: string } | null>(null)

  // Three sections as tabs
  type TabType = 'hero' | 'technical-foundations' | 'environments'
  const [activeTab, setActiveTab] = useState<TabType>('hero')

  // Solutions data structure with 12 card images and 12 card titles initialized with corporate defaults
  const [data, setData] = useState({
    id: 'solutions-default',
    hero_title: 'Engineering Integrated Visual Ecosystems',
    hero_subtitle: 'Moving beyond equipment to engineer complete visual environments that redefine professional infrastructure.',
    hero_badge: 'Enterprise Solutions',
    hero_image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
    
    tech_badge: 'Technical Foundations',
    tech_title: 'Integrated Engineering Technologies',
    tech_subtitle: 'Core engineering systems that power our advanced visual infrastructure.',
    
    tech_title_1: 'LED Display Systems',
    tech_img_1: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    tech_title_2: 'LCD & Interactive Kiosks',
    tech_img_2: '/images/solutions/kiosk.png',
    tech_title_3: 'Professional Lighting',
    tech_img_3: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
    tech_title_4: 'Professional Audio',
    tech_img_4: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80',
    tech_title_5: 'Power & Connectivity',
    tech_img_5: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80',

    env_badge: 'Environments',
    env_title: 'Solutions Built for Real Environments',
    env_subtitle: 'We don\'t just sell products; we transform physical spaces through cinematic visual engineering.',
    
    env_title_1: 'Corporate Visual Ecosystems',
    env_img_1: '/images/solutions/corporate-solutions.png',
    env_title_2: 'Live Event Infrastructure',
    env_img_2: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
    env_title_3: 'Command & Control Centers',
    env_img_3: '/images/solutions/control-centers.png',
    env_title_4: 'Retail & Digital Signage',
    env_img_4: '/images/solutions/retail-experience.png',
    env_title_5: 'Museums & Experience Centers',
    env_img_5: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80',
    env_title_6: 'Broadcast & Studios',
    env_img_6: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80',
    env_title_7: 'Hospitality & Entertainment',
    env_img_7: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',

    is_active: 1
  })

  // Deep comparison state tracking to detect dirty changes
  const [initialData, setInitialData] = useState<typeof data | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/solutions')
      const json = await res.json()
      if (json.success) {
        if (json.data && Object.keys(json.data).length > 0) {
          const db = json.data
          const fetched = {
            id: db.id || 'solutions-default',
            hero_title: db.hero_title || 'Engineering Integrated Visual Ecosystems',
            hero_subtitle: db.hero_subtitle || 'Moving beyond equipment to engineer complete visual environments that redefine professional infrastructure.',
            hero_badge: db.hero_badge || 'Enterprise Solutions',
            hero_image: db.hero_image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
            
            tech_badge: db.tech_badge || 'Technical Foundations',
            tech_title: db.tech_title || 'Integrated Engineering Technologies',
            tech_subtitle: db.tech_subtitle || 'Core engineering systems that power our advanced visual infrastructure.',
            
            tech_title_1: db.tech_title_1 || 'LED Display Systems',
            tech_img_1: db.tech_img_1 || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
            tech_title_2: db.tech_title_2 || 'LCD & Interactive Kiosks',
            tech_img_2: db.tech_img_2 || '/images/solutions/kiosk.png',
            tech_title_3: db.tech_title_3 || 'Professional Lighting',
            tech_img_3: db.tech_img_3 || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
            tech_title_4: db.tech_title_4 || 'Professional Audio',
            tech_img_4: db.tech_img_4 || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80',
            tech_title_5: db.tech_title_5 || 'Power & Connectivity',
            tech_img_5: db.tech_img_5 || 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80',

            env_badge: db.env_badge || 'Environments',
            env_title: db.env_title || 'Solutions Built for Real Environments',
            env_subtitle: db.env_subtitle || 'We don\'t just sell products; we transform physical spaces through cinematic visual engineering.',
            
            env_title_1: db.env_title_1 || 'Corporate Visual Ecosystems',
            env_img_1: db.env_img_1 || '/images/solutions/corporate-solutions.png',
            env_title_2: db.env_title_2 || 'Live Event Infrastructure',
            env_img_2: db.env_img_2 || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
            env_title_3: db.env_title_3 || 'Command & Control Centers',
            env_img_3: db.env_img_3 || '/images/solutions/control-centers.png',
            env_title_4: db.env_title_4 || 'Retail & Digital Signage',
            env_img_4: db.env_img_4 || '/images/solutions/retail-experience.png',
            env_title_5: db.env_title_5 || 'Museums & Experience Centers',
            env_img_5: db.env_img_5 || 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80',
            env_title_6: db.env_title_6 || 'Broadcast & Studios',
            env_img_6: db.env_img_6 || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80',
            env_title_7: db.env_title_7 || 'Hospitality & Entertainment',
            env_img_7: db.env_img_7 || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',

            is_active: db.is_active === undefined ? 1 : (db.is_active ? 1 : 0)
          }
          setData(fetched)
          setInitialData(JSON.parse(JSON.stringify(fetched)))
        } else {
          // If table has been initialized but is empty, set default and allow saving
          setInitialData(JSON.parse(JSON.stringify(data)))
        }
      } else {
        toast.error('Failed to load solutions page parameters')
      }
    } catch {
      toast.error('Connection error fetching solutions content')
    }
    setLoading(false)
  }

  // Dirty state computed directly
  const isDirty = initialData && JSON.stringify(data) !== JSON.stringify(initialData)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0 || !activeUploadField) return

    const file = files[0]
    const targetField = activeUploadField
    setUploadingField(targetField)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'solutions')

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (json.success) {
        setData(prev => ({
          ...prev,
          [targetField]: json.url
        }))
        toast.success('Card asset uploaded successfully')
      } else {
        toast.error('Upload failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('File upload connection error')
    } finally {
      setUploadingField(null)
      setActiveUploadField(null)
      // Reset input value to allow uploading same file
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const triggerFileSelect = (field: string) => {
    setActiveUploadField(field)
    fileInputRef.current?.click()
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    const field = deleteTarget.field

    setData(prev => ({
      ...prev,
      [field]: ''
    }))

    toast.success(`${deleteTarget.label} cleared. Remember to SAVE DRAFT or PUBLISH to apply changes.`)
    setDeleteTarget(null)
  }

  async function handleSave(status: 'draft' | 'published') {
    const isPublish = status === 'published'
    const type = isPublish ? 'publish' : 'draft'
    setSavingType(type)
    
    const payload = {
      ...data,
      is_active: isPublish ? 1 : 0
    }

    try {
      const res = await fetch('/api/admin/solutions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        setData(payload)
        setInitialData(JSON.parse(JSON.stringify(payload)))
        toast.success(isPublish ? 'Solutions page published live!' : 'Solutions page draft saved successfully.')
      } else {
        toast.error('Synchronization failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('Connection error while synchronizing')
    } finally {
      setSavingType(null)
    }
  }

  // Cards definitions
  const techCards = [
    { id: 'tech_img_1' as const, titleId: 'tech_title_1' as const, defaultLabel: 'LED Display Systems' },
    { id: 'tech_img_2' as const, titleId: 'tech_title_2' as const, defaultLabel: 'LCD & Interactive Kiosks' },
    { id: 'tech_img_3' as const, titleId: 'tech_title_3' as const, defaultLabel: 'Professional Lighting' },
    { id: 'tech_img_4' as const, titleId: 'tech_title_4' as const, defaultLabel: 'Professional Audio' },
    { id: 'tech_img_5' as const, titleId: 'tech_title_5' as const, defaultLabel: 'Power & Connectivity' },
  ]

  const envCards = [
    { id: 'env_img_1' as const, titleId: 'env_title_1' as const, defaultLabel: 'Corporate Visual Ecosystems' },
    { id: 'env_img_2' as const, titleId: 'env_title_2' as const, defaultLabel: 'Live Event Infrastructure' },
    { id: 'env_img_3' as const, titleId: 'env_title_3' as const, defaultLabel: 'Command & Control Centers' },
    { id: 'env_img_4' as const, titleId: 'env_title_4' as const, defaultLabel: 'Retail & Digital Signage' },
    { id: 'env_img_5' as const, titleId: 'env_title_5' as const, defaultLabel: 'Museums & Experience Centers' },
    { id: 'env_img_6' as const, titleId: 'env_title_6' as const, defaultLabel: 'Broadcast & Studios' },
    { id: 'env_img_7' as const, titleId: 'env_title_7' as const, defaultLabel: 'Hospitality & Entertainment' },
  ]

  if (loading) return <AxionLoader message="Loading Solutions Page Parameters..." />

  return (
    <div className="w-full space-y-8 pb-24 relative">
      
      {/* Hidden dynamic file input */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef}
        className="hidden" 
        onChange={handleFileUpload}
      />

      {/* Sticky Header Section */}
      <div className="sticky top-0 z-30 bg-[#F8FAFC]/90 backdrop-blur-md py-6 border-b border-slate-200/60 -mx-10 lg:-mx-14 px-10 lg:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <Building2 size={16} />
            </div>
            <SpatialBadge variant="blue">Corporate Portal</SpatialBadge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tighter">Solutions Page CMS</h1>
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

      {/* Tabs navigation */}
      <div className="border-b border-black/5 flex items-center gap-2 overflow-x-auto pb-px">
        {[
          { id: 'hero', label: 'Hero Banner', icon: ImageIcon },
          { id: 'technical-foundations', label: 'Technical Foundations', icon: Shield },
          { id: 'environments', label: 'Environments Story', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon
          const isSelected = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm tracking-tight transition-all whitespace-nowrap",
                isSelected 
                  ? "border-[#0D95F0] text-[#0A1628] bg-slate-50" 
                  : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
              )}
            >
              <Icon size={16} className={isSelected ? 'text-[#0D95F0]' : 'text-slate-400'} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Form Editor Body Container */}
      <div className="bg-white rounded-[2rem] border border-black/5 p-8 lg:p-12 shadow-sm max-w-[1800px] mx-auto w-full">
        
        {/* TAB 1: SOLUTIONS HERO BANNER */}
        {activeTab === 'hero' && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-[#0A1628] font-sora">Hero banner controls</h3>
              <p className="text-slate-400 text-xs mt-1">Configure primary branding badges, headlines, and presentation layers for the Solutions page.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Hero Badge Label</label>
                <input 
                  type="text" 
                  value={data.hero_badge}
                  disabled={savingType !== null}
                  onChange={e => setData({ ...data, hero_badge: e.target.value })}
                  placeholder="Enterprise Solutions"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Hero Title</label>
                <input 
                  type="text" 
                  value={data.hero_title}
                  disabled={savingType !== null}
                  onChange={e => setData({ ...data, hero_title: e.target.value })}
                  placeholder="Engineering Integrated Visual Ecosystems"
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Hero Subtitle Narrative</label>
              <textarea 
                rows={3}
                value={data.hero_subtitle}
                disabled={savingType !== null}
                onChange={e => setData({ ...data, hero_subtitle: e.target.value })}
                placeholder="Moving beyond equipment to engineer complete visual environments..."
                className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all resize-none disabled:opacity-50"
              />
            </div>

            {/* Media Background Setting */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-600 border-l-4 border-[#0D95F0] pl-3">Presentation Layer Assets</h4>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Background Image URL</label>
                <div className="flex gap-2">
                  <input
                    value={data.hero_image}
                    disabled={savingType !== null}
                    onChange={e => setData({ ...data, hero_image: e.target.value })}
                    className="flex-1 px-4 py-3 text-xs font-mono border border-slate-200 rounded-xl outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0]"
                    placeholder="https://unsplash.com/..."
                  />
                  <button
                    type="button"
                    disabled={uploadingField === 'hero_image' || savingType !== null}
                    onClick={() => triggerFileSelect('hero_image')}
                    className="px-4 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors disabled:opacity-50"
                  >
                    {uploadingField === 'hero_image' ? <Loader2 size={14} className="animate-spin text-[#0D95F0]" /> : <Upload size={14} />}
                  </button>
                  <button
                    type="button"
                    disabled={!data.hero_image || savingType !== null}
                    onClick={() => setDeleteTarget({ field: 'hero_image', label: 'Background Image' })}
                    className={cn(
                      "px-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                      data.hero_image ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {data.hero_image && (
                <div className="relative aspect-[3/1] max-w-4xl rounded-2xl border border-slate-200 overflow-hidden bg-slate-950 shadow-sm mt-4">
                  <img
                    src={data.hero_image}
                    alt="Hero Background Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px] font-black uppercase tracking-widest">
                    Asset Preview Layer Active
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: TECHNICAL FOUNDATIONS */}
        {activeTab === 'technical-foundations' && (
          <div className="space-y-12">
            
            {/* Header Content */}
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-[#0A1628] font-sora">Technical foundations section</h3>
                <p className="text-slate-400 text-xs mt-1">Configure section labeling, positioning, and subtitle descriptors for the Engineering Technologies grid.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Section Badge</label>
                  <input 
                    type="text" 
                    value={data.tech_badge}
                    disabled={savingType !== null}
                    onChange={e => setData({ ...data, tech_badge: e.target.value })}
                    placeholder="Technical Foundations"
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Section Main Title</label>
                  <input 
                    type="text" 
                    value={data.tech_title}
                    disabled={savingType !== null}
                    onChange={e => setData({ ...data, tech_title: e.target.value })}
                    placeholder="Integrated Engineering Technologies"
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Section Description / Subtitle</label>
                <textarea 
                  rows={3}
                  value={data.tech_subtitle}
                  disabled={savingType !== null}
                  onChange={e => setData({ ...data, tech_subtitle: e.target.value })}
                  placeholder="Core engineering systems that power our advanced visual infrastructure."
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all resize-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Individual Card Asset Upload Suite */}
            <div className="space-y-6 pt-8 border-t border-slate-100">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-600 border-l-4 border-[#0D95F0] pl-3">Individual Technical Cards</h4>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
                {techCards.map((card) => {
                  const val = data[card.id] || ''
                  const titleVal = data[card.titleId] || ''
                  return (
                    <div key={card.id} className="p-6 rounded-2xl border border-slate-200/60 bg-slate-50/30 flex flex-col md:flex-row gap-6 shadow-sm">
                      
                      {/* Image Preview Box */}
                      <div className="w-full md:w-32 h-32 rounded-xl border border-slate-200 bg-slate-950 overflow-hidden shrink-0 relative flex items-center justify-center">
                        {val ? (
                          <img src={val} alt={titleVal || card.defaultLabel} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center px-2">No Image Card</div>
                        )}
                        {uploadingField === card.id && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Loader2 size={18} className="animate-spin text-[#0D95F0]" />
                          </div>
                        )}
                      </div>

                      {/* File Controls */}
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        
                        {/* Title Editor */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#0D95F0] block">Card Name / Title</label>
                          <input
                            type="text"
                            value={titleVal}
                            disabled={savingType !== null}
                            onChange={e => setData(prev => ({ ...prev, [card.titleId]: e.target.value }))}
                            placeholder={card.defaultLabel}
                            className="w-full px-4 py-2 border border-slate-200 bg-white text-xs font-bold rounded-xl outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-colors disabled:opacity-50"
                          />
                        </div>

                        {/* Image URL & Upload button */}
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 block">Image URL / Local upload</label>
                          <div className="flex gap-2">
                            <input
                              value={val}
                              disabled={savingType !== null}
                              onChange={e => setData(prev => ({ ...prev, [card.id]: e.target.value }))}
                              placeholder="Image URL link..."
                              className="flex-1 px-4 py-2.5 text-xs font-mono border border-slate-200 bg-white rounded-xl outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] disabled:opacity-50"
                            />
                            <button
                              type="button"
                              disabled={uploadingField !== null || savingType !== null}
                              onClick={() => triggerFileSelect(card.id)}
                              className="px-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 transition-colors disabled:opacity-50"
                            >
                              <Upload size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={!val || savingType !== null}
                              onClick={() => setDeleteTarget({ field: card.id, label: `${titleVal || card.defaultLabel} Image Card` })}
                              className={cn(
                                "px-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                                val ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                              )}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SOLUTIONS ENVIRONMENTS STORY */}
        {activeTab === 'environments' && (
          <div className="space-y-12">
            
            {/* Header Content */}
            <div className="space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-[#0A1628] font-sora">Environments section</h3>
                <p className="text-slate-400 text-xs mt-1">Configure narrative titles, segment markers, and branding taglines for the Solutions Built for Real Environments grid.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Environments Badge</label>
                  <input 
                    type="text" 
                    value={data.env_badge}
                    disabled={savingType !== null}
                    onChange={e => setData({ ...data, env_badge: e.target.value })}
                    placeholder="Environments"
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Environments Title</label>
                  <input 
                    type="text" 
                    value={data.env_title}
                    disabled={savingType !== null}
                    onChange={e => setData({ ...data, env_title: e.target.value })}
                    placeholder="Solutions Built for Real Environments"
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Environments Subtitle Narrative</label>
                <textarea 
                  rows={3}
                  value={data.env_subtitle}
                  disabled={savingType !== null}
                  onChange={e => setData({ ...data, env_subtitle: e.target.value })}
                  placeholder="We don't just sell products; we transform physical spaces through cinematic visual engineering..."
                  className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-slate-50/50 text-[#0A1628] text-sm font-semibold outline-none focus:bg-white focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-all resize-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Individual Card Asset Upload Suite */}
            <div className="space-y-6 pt-8 border-t border-slate-100">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-600 border-l-4 border-[#0D95F0] pl-3">Individual Environment Cards</h4>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
                {envCards.map((card) => {
                  const val = data[card.id] || ''
                  const titleVal = data[card.titleId] || ''
                  return (
                    <div key={card.id} className="p-6 rounded-2xl border border-slate-200/60 bg-slate-50/30 flex flex-col md:flex-row gap-6 shadow-sm">
                      
                      {/* Image Preview Box */}
                      <div className="w-full md:w-32 h-32 rounded-xl border border-slate-200 bg-slate-950 overflow-hidden shrink-0 relative flex items-center justify-center">
                        {val ? (
                          <img src={val} alt={titleVal || card.defaultLabel} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center px-2">No Image Card</div>
                        )}
                        {uploadingField === card.id && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Loader2 size={18} className="animate-spin text-[#0D95F0]" />
                          </div>
                        )}
                      </div>

                      {/* File Controls */}
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        
                        {/* Title Editor */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase tracking-widest text-[#0D95F0] block">Card Name / Title</label>
                          <input
                            type="text"
                            value={titleVal}
                            disabled={savingType !== null}
                            onChange={e => setData(prev => ({ ...prev, [card.titleId]: e.target.value }))}
                            placeholder={card.defaultLabel}
                            className="w-full px-4 py-2 border border-slate-200 bg-white text-xs font-bold rounded-xl outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] transition-colors disabled:opacity-50"
                          />
                        </div>

                        {/* Image URL & Upload button */}
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 block">Image URL / Local upload</label>
                          <div className="flex gap-2">
                            <input
                              value={val}
                              disabled={savingType !== null}
                              onChange={e => setData(prev => ({ ...prev, [card.id]: e.target.value }))}
                              placeholder="Image URL link..."
                              className="flex-1 px-4 py-2.5 text-xs font-mono border border-slate-200 bg-white rounded-xl outline-none focus:border-[#0D95F0] focus:ring-1 focus:ring-[#0D95F0] disabled:opacity-50"
                            />
                            <button
                              type="button"
                              disabled={uploadingField !== null || savingType !== null}
                              onClick={() => triggerFileSelect(card.id)}
                              className="px-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 transition-colors disabled:opacity-50"
                            >
                              <Upload size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={!val || savingType !== null}
                              onClick={() => setDeleteTarget({ field: card.id, label: `${titleVal || card.defaultLabel} Environment Card` })}
                              className={cn(
                                "px-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors",
                                val ? "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" : "opacity-40 cursor-not-allowed"
                              )}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
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
                  Are you sure you want to delete <span className="font-extrabold text-slate-700">{deleteTarget.label}</span>? This action will clear the asset reference instantly from your active editor.
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
