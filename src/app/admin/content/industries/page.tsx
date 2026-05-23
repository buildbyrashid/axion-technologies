'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  History, 
  Image as ImageIcon, 
  Target, 
  Loader2, 
  Trash2, 
  Upload, 
  Eye, 
  Check, 
  ChevronRight, 
  AlertCircle,
  Megaphone,
  Briefcase
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Image from 'next/image'
import SpatialBadge from '@/components/ui/SpatialBadge'
import AxionLoader from '@/components/ui/AxionLoader'

export default function IndustriesCMSPage() {
  const [loading, setLoading] = useState(true)
  const [savingType, setSavingType] = useState<'draft' | 'publish' | null>(null)
  const [activeUploadField, setActiveUploadField] = useState<string | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ field: string; label: string } | null>(null)

  // Two sections as tabs
  type TabType = 'hero' | 'markets'
  const [activeTab, setActiveTab] = useState<TabType>('hero')

  // Industries data structure with 6 card images, subtitles, descriptions, and titles
  const [data, setData] = useState({
    id: 'industries-default',
    hero_title: 'Solutions for Diverse Professional Environments',
    hero_subtitle: 'Axion Technology delivers professional visual technology solutions across 10+ industries, engineered for reliability and high-impact performance.',
    hero_badge: 'Markets Served',
    hero_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    
    sec_badge: 'Expertise',
    sec_title: 'Industries We Serve',
    sec_subtitle: 'Professional visual technology solutions for the full spectrum of modern professional environments.',
    
    // Card 1
    ind_title_1: 'Live Events & Entertainment',
    ind_sub_1: 'High-Impact Spectacles',
    ind_desc_1: 'Full-scale visual and audio technology for concerts, music festivals, and touring productions. We engineer high-brightness outdoor LED systems that define the world\'s most iconic stages.',
    ind_img_1: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',

    // Card 2
    ind_title_2: 'Exhibitions & Trade Shows',
    ind_sub_2: 'Brand Activations',
    ind_desc_2: 'Impactful visual technology solutions for exhibition booths and brand activation events. We create immersive environments that capture attention and drive engagement.',
    ind_img_2: '/images/solutions/exhibitions.png',

    // Card 3
    ind_title_3: 'Corporate Environments',
    ind_sub_3: 'Enterprise Infrastructure',
    ind_desc_3: 'Professional AV solutions for boardrooms, lobbies, and executive spaces. We integrate advanced video conferencing and interactive displays into modern corporate ecosystems.',
    ind_img_3: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',

    // Card 4
    ind_title_4: 'Museums & Experience Centers',
    ind_sub_4: 'Immersive Narratives',
    ind_desc_4: 'Immersive visual technologies for museums and brand experience spaces. We bridge the gap between architectural design and digital storytelling.',
    ind_img_4: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80',

    // Card 5
    ind_title_5: 'Retail & Digital Signage',
    ind_sub_5: 'Omnichannel Engagement',
    ind_desc_5: 'Dynamic digital signage solutions for luxury retail and flagship stores. We transform customer journeys through artistic digital content and interactive touchpoints.',
    ind_img_5: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80',

    // Card 6
    ind_title_6: 'Command & Control Centers',
    ind_sub_6: 'Mission-Critical Operations',
    ind_desc_6: 'High-reliability video wall solutions for operations centers and security control rooms. We engineer fine-pitch LED systems for 24/7 mission-critical environments.',
    ind_img_6: '/images/solutions/control-centers.png',

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
      const res = await fetch('/api/admin/industries')
      const json = await res.json()
      if (json.success) {
        if (json.data && Object.keys(json.data).length > 0) {
          const db = json.data
          const fetched = {
            id: db.id || 'industries-default',
            hero_title: db.hero_title || 'Solutions for Diverse Professional Environments',
            hero_subtitle: db.hero_subtitle || 'Axion Technology delivers professional visual technology solutions across 10+ industries, engineered for reliability and high-impact performance.',
            hero_badge: db.hero_badge || 'Markets Served',
            hero_image: db.hero_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
            
            sec_badge: db.sec_badge || 'Expertise',
            sec_title: db.sec_title || 'Industries We Serve',
            sec_subtitle: db.sec_subtitle || 'Professional visual technology solutions for the full spectrum of modern professional environments.',
            
            ind_title_1: db.ind_title_1 || 'Live Events & Entertainment',
            ind_sub_1: db.ind_sub_1 || 'High-Impact Spectacles',
            ind_desc_1: db.ind_desc_1 || 'Full-scale visual and audio technology for concerts, music festivals, and touring productions. We engineer high-brightness outdoor LED systems that define the world\'s most iconic stages.',
            ind_img_1: db.ind_img_1 || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',

            ind_title_2: db.ind_title_2 || 'Exhibitions & Trade Shows',
            ind_sub_2: db.ind_sub_2 || 'Brand Activations',
            ind_desc_2: db.ind_desc_2 || 'Impactful visual technology solutions for exhibition booths and brand activation events. We create immersive environments that capture attention and drive engagement.',
            ind_img_2: db.ind_img_2 || '/images/solutions/exhibitions.png',

            ind_title_3: db.ind_title_3 || 'Corporate Environments',
            ind_sub_3: db.ind_sub_3 || 'Enterprise Infrastructure',
            ind_desc_3: db.ind_desc_3 || 'Professional AV solutions for boardrooms, lobbies, and executive spaces. We integrate advanced video conferencing and interactive displays into modern corporate ecosystems.',
            ind_img_3: db.ind_img_3 || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',

            ind_title_4: db.ind_title_4 || 'Museums & Experience Centers',
            ind_sub_4: db.ind_sub_4 || 'Immersive Narratives',
            ind_desc_4: db.ind_desc_4 || 'Immersive visual technologies for museums and brand experience spaces. We bridge the gap between architectural design and digital storytelling.',
            ind_img_4: db.ind_img_4 || 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80',

            ind_title_5: db.ind_title_5 || 'Retail & Digital Signage',
            ind_sub_5: db.ind_sub_5 || 'Omnichannel Engagement',
            ind_desc_5: db.ind_desc_5 || 'Dynamic digital signage solutions for luxury retail and flagship stores. We transform customer journeys through artistic digital content and interactive touchpoints.',
            ind_img_5: db.ind_img_5 || 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80',

            ind_title_6: db.ind_title_6 || 'Command & Control Centers',
            ind_sub_6: db.ind_sub_6 || 'Mission-Critical Operations',
            ind_desc_6: db.ind_desc_6 || 'High-reliability video wall solutions for operations centers and security control rooms. We engineer fine-pitch LED systems for 24/7 mission-critical environments.',
            ind_img_6: db.ind_img_6 || '/images/solutions/control-centers.png',

            is_active: db.is_active === undefined ? 1 : (db.is_active ? 1 : 0)
          }
          setData(fetched)
          setInitialData(JSON.parse(JSON.stringify(fetched)))
        } else {
          setInitialData(JSON.parse(JSON.stringify(data)))
        }
      } else {
        toast.error('Failed to load industries page parameters')
      }
    } catch {
      toast.error('Connection error fetching industries content')
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
    formData.append('folder', 'industries')

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
      const res = await fetch('/api/admin/industries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        setData(payload)
        setInitialData(JSON.parse(JSON.stringify(payload)))
        toast.success(isPublish ? 'Industries page published live!' : 'Industries page draft saved successfully.')
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
  const industryCards = [
    { id: 'ind_img_1' as const, titleId: 'ind_title_1' as const, subId: 'ind_sub_1' as const, descId: 'ind_desc_1' as const, defaultLabel: 'Live Events & Entertainment' },
    { id: 'ind_img_2' as const, titleId: 'ind_title_2' as const, subId: 'ind_sub_2' as const, descId: 'ind_desc_2' as const, defaultLabel: 'Exhibitions & Trade Shows' },
    { id: 'ind_img_3' as const, titleId: 'ind_title_3' as const, subId: 'ind_sub_3' as const, descId: 'ind_desc_3' as const, defaultLabel: 'Corporate Environments' },
    { id: 'ind_img_4' as const, titleId: 'ind_title_4' as const, subId: 'ind_sub_4' as const, descId: 'ind_desc_4' as const, defaultLabel: 'Museums & Experience Centers' },
    { id: 'ind_img_5' as const, titleId: 'ind_title_5' as const, subId: 'ind_sub_5' as const, descId: 'ind_desc_5' as const, defaultLabel: 'Retail & Digital Signage' },
    { id: 'ind_img_6' as const, titleId: 'ind_title_6' as const, subId: 'ind_sub_6' as const, descId: 'ind_desc_6' as const, defaultLabel: 'Command & Control Centers' },
  ]

  if (loading) return <AxionLoader message="Loading Industries Page Parameters..." />

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
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tighter">Industries Page CMS</h1>
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
          { id: 'markets', label: 'Markets Served', icon: Briefcase },
        ].map((tab) => {
          const Icon = tab.icon
          const isSelected = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-3 px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all shrink-0 ${
                isSelected 
                  ? 'border-[#0D95F0] text-[#0A1628]' 
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'
              }`}
            >
              <Icon size={14} className={isSelected ? 'text-[#0D95F0]' : 'text-slate-400'} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Contents */}
      <div className="pt-6">
        
        {/* Tab 1: Hero Banner */}
        {activeTab === 'hero' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form Panel */}
            <div className="lg:col-span-7 bg-white border border-black/5 rounded-[1.75rem] p-8 lg:p-10 space-y-8 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0]">Structure Config</span>
                <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">Main Hero Presentation</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Badge Text</label>
                  <input 
                    type="text" 
                    value={data.hero_badge}
                    onChange={(e) => setData(prev => ({ ...prev, hero_badge: e.target.value }))}
                    className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-sm font-bold text-slate-800 transition-all bg-slate-55"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Heading</label>
                  <input 
                    type="text" 
                    value={data.hero_title}
                    onChange={(e) => setData(prev => ({ ...prev, hero_title: e.target.value }))}
                    className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-sm font-bold text-slate-800 transition-all bg-slate-55"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Subtitle</label>
                  <textarea 
                    value={data.hero_subtitle}
                    rows={4}
                    onChange={(e) => setData(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                    className="w-full p-5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-sm font-bold text-slate-800 leading-relaxed transition-all bg-slate-55 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hero Background Image Link / URL</label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={data.hero_image}
                      onChange={(e) => setData(prev => ({ ...prev, hero_image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 h-12 px-5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-sm font-bold text-slate-800 transition-all bg-slate-55"
                    />
                    <button
                      type="button"
                      onClick={() => triggerFileSelect('hero_image')}
                      className="h-12 px-5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs font-black uppercase tracking-wider"
                    >
                      <Upload size={14} />
                      UPLOAD
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Preview Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-[1.75rem] p-8 shadow-2xl relative overflow-hidden text-left min-h-[360px] flex flex-col justify-between">
                {/* Background image preview if exists */}
                {data.hero_image && (
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={data.hero_image} 
                      alt="Hero preview" 
                      fill 
                      className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 space-y-4">
                  <span className="px-3 py-1 bg-[#0D95F0]/10 border border-[#0D95F0]/20 text-[#0D95F0] text-[9px] font-black uppercase tracking-[0.2em] rounded-full inline-block">
                    {data.hero_badge || 'MARKETS SERVED'}
                  </span>
                  
                  <h2 className="text-3xl font-black text-white tracking-tight leading-none">
                    {data.hero_title || 'Hero Title Heading'}
                  </h2>
                  
                  <p className="text-slate-400 text-xs font-bold leading-relaxed max-w-md">
                    {data.hero_subtitle || 'Enter your subtitle text to see it rendered here live.'}
                  </p>
                </div>

                <div className="relative z-10 pt-8 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    Aesthetic Visual Preview
                  </span>
                  <div className="flex items-center gap-2 text-[#0D95F0] text-xs font-bold">
                    <Eye size={12} />
                    <span>Real-Time</span>
                  </div>
                </div>
              </div>

              {/* Informative helper block */}
              <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-6 flex gap-4 text-left">
                <AlertCircle className="text-[#0D95F0] shrink-0 mt-0.5" size={18} />
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black text-[#0A1628] uppercase tracking-wider">Asset Integration Guidelines</h4>
                  <p className="text-slate-500 text-xs font-bold leading-relaxed">
                    Axion B2B sites leverage full-width high-resolution Unsplash photo links or localized static assets. Ensure background images maintain excellent readability contrast for text overlaps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Markets Served */}
        {activeTab === 'markets' && (
          <div className="space-y-10">
            {/* Section General Info Config */}
            <div className="bg-white border border-black/5 rounded-[1.75rem] p-8 lg:p-10 space-y-8 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0]">Section Headers</span>
                <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">Expertise Grid Header Setup</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Badge</label>
                  <input 
                    type="text" 
                    value={data.sec_badge}
                    onChange={(e) => setData(prev => ({ ...prev, sec_badge: e.target.value }))}
                    className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-sm font-bold text-slate-800 transition-all bg-slate-55"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Title</label>
                  <input 
                    type="text" 
                    value={data.sec_title}
                    onChange={(e) => setData(prev => ({ ...prev, sec_title: e.target.value }))}
                    className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-sm font-bold text-slate-800 transition-all bg-slate-55"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Subtitle</label>
                  <input 
                    type="text" 
                    value={data.sec_subtitle}
                    onChange={(e) => setData(prev => ({ ...prev, sec_subtitle: e.target.value }))}
                    className="w-full h-12 px-5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-sm font-bold text-slate-800 transition-all bg-slate-55"
                  />
                </div>
              </div>
            </div>

            {/* Individual Card Content Editors */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0]">Card Grid Layout</span>
                <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">Enterprise Industry Sectors (6 Items)</h3>
                <p className="text-xs text-slate-400 font-bold">Edit names, subtitles, descriptions, and thumbnails directly mapped to the live mosaic responsive layout.</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {industryCards.map((card, i) => {
                  const imageVal = data[card.id]
                  const titleVal = data[card.titleId]
                  const subVal = data[card.subId]
                  const descVal = data[card.descId]
                  const isUploading = uploadingField === card.id

                  return (
                    <div 
                      key={card.id}
                      className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between space-y-6 relative group hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500"
                    >
                      {/* Top identity tag */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                            {i + 1}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#0A1628]">
                            Sector Card
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                          {i === 0 || i === 5 ? 'Wide Format' : 'Standard Format'}
                        </span>
                      </div>

                      {/* Card Content Inputs */}
                      <div className="space-y-4">
                        {/* Title input */}
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Card Title / Name</label>
                          <input 
                            type="text"
                            value={titleVal}
                            onChange={(e) => setData(prev => ({ ...prev, [card.titleId]: e.target.value }))}
                            placeholder={card.defaultLabel}
                            className="w-full h-10 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-xs font-black text-slate-800 transition-all"
                          />
                        </div>

                        {/* Subtitle Input */}
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Subtitle / Tagline</label>
                          <input 
                            type="text"
                            value={subVal}
                            onChange={(e) => setData(prev => ({ ...prev, [card.subId]: e.target.value }))}
                            placeholder="e.g. Brand Activations"
                            className="w-full h-10 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-xs font-bold text-slate-800 transition-all"
                          />
                        </div>

                        {/* Description Textarea */}
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Description</label>
                          <textarea 
                            value={descVal}
                            rows={3}
                            onChange={(e) => setData(prev => ({ ...prev, [card.descId]: e.target.value }))}
                            placeholder="Market vertical details..."
                            className="w-full p-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-xs font-bold text-slate-800 leading-relaxed resize-none transition-all"
                          />
                        </div>

                        {/* Image asset selector */}
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Card Image URL</label>
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              value={imageVal}
                              onChange={(e) => setData(prev => ({ ...prev, [card.id]: e.target.value }))}
                              placeholder="/images/solutions/..."
                              className="flex-1 h-10 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0D95F0]/10 focus:border-[#0D95F0] text-xs font-bold text-slate-800 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => triggerFileSelect(card.id)}
                              className="px-4 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all text-[10px] font-black uppercase tracking-widest"
                            >
                              <Upload size={12} />
                              UPLOAD
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Visual Thumbnail Frame */}
                      <div className="relative h-44 w-full bg-slate-950 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                        {isUploading ? (
                          <div className="absolute inset-0 bg-slate-900/90 z-10 flex flex-col items-center justify-center gap-2 text-white">
                            <Loader2 size={24} className="animate-spin text-[#0D95F0]" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Uploading Asset...</span>
                          </div>
                        ) : null}

                        {imageVal ? (
                          <>
                            <Image 
                              src={imageVal} 
                              alt="Thumbnail preview" 
                              fill 
                              className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                            
                            {/* Card Content Text Rendered Overlay */}
                            <div className="absolute bottom-5 left-5 right-5 text-left">
                              <span className="text-[8px] font-black uppercase tracking-widest text-[#0D95F0] block mb-1">
                                {subVal || 'SUBTITLE'}
                              </span>
                              <h4 className="text-white text-sm font-black uppercase tracking-tight">
                                {titleVal || 'Card Name'}
                              </h4>
                            </div>

                            {/* Clear Trash action button */}
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ field: card.id, label: card.defaultLabel })}
                              className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 hover:bg-rose-600 hover:scale-110 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm z-10"
                              title="Clear Image Link"
                            >
                              <Trash2 size={12} />
                            </button>
                          </>
                        ) : (
                          <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex flex-col items-center gap-2">
                            <ImageIcon size={20} className="text-slate-600" />
                            <span>No visual asset configured</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Corporate Premium Delete Confirmation Drawer/Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2rem] p-8 shadow-2xl z-10 text-center space-y-6 m-4"
            >
              <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mx-auto">
                <AlertCircle size={28} />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">Clear Asset Reference</h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">
                  Are you sure you want to remove the image path reference for <strong className="text-slate-800">"{deleteTarget.label}"</strong>? The card will fallback to displaying its empty state in the layout.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 h-12 bg-slate-50 hover:bg-slate-100 text-[#0A1628] text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 h-12 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-rose-900/10"
                >
                  CONFIRM CLEAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
