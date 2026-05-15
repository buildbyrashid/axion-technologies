'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, 
  ArrowLeft, 
  Loader2, 
  Info, 
  Image as ImageIcon, 
  Settings, 
  Sparkles, 
  Box, 
  Download, 
  Images,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Zap,
  Activity,
  Cpu,
  Layers,
  Terminal,
  Database
} from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import Link from 'next/link'

import SpatialBadge from '@/components/ui/SpatialBadge'
import MediaUploader from '@/components/admin/MediaUploader'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

// Zod Schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Product identity signature required'),
  slug: z.string().min(1, 'Universal slug signature required'),
  category_id: z.string().min(1, 'Sector classification required'),
  subcategory_id: z.string().optional().nullable(),
  short_description: z.string().max(250, 'Abstract context is too long'),
  full_description: z.string().optional(),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
})

const TABS = [
  { id: 'basic', label: 'Protocol Core', icon: Info },
  { id: 'media', label: 'Visual Assets', icon: ImageIcon },
  { id: 'specs', label: 'Technical Specs', icon: Cpu },
  { id: 'features', label: 'Feature Stack', icon: Sparkles },
  { id: 'accessories', label: 'Peripheral Kit', icon: Box },
  { id: 'downloads', label: 'Documentation', icon: Download },
  { id: 'application', label: 'Field Evidence', icon: Images },
]

export default function ProductEditorPage() {
  const { id } = useParams()
  const router = useRouter()
  const isNew = id === 'new'
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState('basic')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [subcategories, setSubcategories] = useState<{id: string, name: string, category_id: string}[]>([])
  
  const [images, setImages] = useState<any[]>([])
  const [specs, setSpecs] = useState<{id?: string, spec_key: string, spec_value: string}[]>([])
  const [features, setFeatures] = useState<{id?: string, title: string, description: string}[]>([])
  const [downloads, setDownloads] = useState<{id?: string, name: string, document_type: string, file_url: string}[]>([])
  const [applications, setApplications] = useState<any[]>([])

  const { register, handleSubmit, setValue, watch, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      category_id: '',
      subcategory_id: '',
      short_description: '',
      full_description: '',
      is_active: true,
      is_featured: false,
    }
  })

  useEffect(() => {
    fetchFormData()
    if (!isNew) fetchProductData()
  }, [id])

  async function fetchFormData() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (isDemo) {
      setCategories(MOCK_CATEGORIES as any)
      setSubcategories([
        { id: 's1', name: 'Indoor LED', category_id: '1' },
        { id: 's2', name: 'Outdoor LED', category_id: '1' },
        { id: 's3', name: 'Touch Kiosks', category_id: '2' },
      ] as any)
      return
    }

    const [catRes, subRes] = await Promise.all([
      supabase.from('categories').select('id, name').order('name'),
      supabase.from('subcategories').select('id, name, category_id').order('name')
    ])

    if (catRes.data) setCategories(catRes.data)
    if (subRes.data) setSubcategories(subRes.data)
  }

  async function fetchProductData() {
    let product: any
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL

    if (isDemo) {
      product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0]
    } else {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images(*),
          product_specifications(*),
          product_features(*),
          product_documents(*),
          product_applications(*)
        `)
        .eq('id', id)
        .single()

      if (error) {
        toast.error('Portal connection failed')
        router.push('/admin/products')
        return
      }
      product = data
    }

    // Set form values
    setValue('name', product.name)
    setValue('slug', product.slug)
    setValue('category_id', product.category_id)
    setValue('subcategory_id', product.subcategory_id || '')
    setValue('short_description', product.short_description || '')
    setValue('full_description', product.full_description || '')
    setValue('is_active', product.is_active)
    setValue('is_featured', product.is_featured)

    // Set relational states
    setImages((product.product_images || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)).map((img: any) => ({
      id: img.id,
      url: img.image_url,
      is_primary: img.is_primary,
      sort_order: img.sort_order
    })))
    setSpecs((product.product_specifications || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)))
    setFeatures((product.product_features || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)))
    setDownloads(product.product_documents || [])
    setApplications((product.product_applications || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)).map((app: any) => ({
      id: app.id,
      url: app.image_url,
      caption: app.caption,
      location: app.location
    })))

    setLoading(false)
  }

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setSaving(true)
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    
    try {
      if (isDemo) {
        toast.success('Local configuration synchronized')
        setSaving(false)
        return
      }

      let productId = id as string
      const dataToSave = {
        ...values,
        subcategory_id: values.subcategory_id || null
      }
      
      // 1. Save main product info
      if (isNew) {
        const { data, error } = await supabase.from('products').insert([dataToSave]).select().single()
        if (error) throw error
        productId = data.id
      } else {
        const { error } = await supabase.from('products').update(dataToSave).eq('id', id)
        if (error) throw error
      }

      // 2. Save Images
      await supabase.from('product_images').delete().eq('product_id', productId)
      if (images.length > 0) {
        await supabase.from('product_images').insert(images.map((img, i) => ({
          product_id: productId,
          image_url: img.url,
          is_primary: img.is_primary,
          sort_order: i
        })))
      }

      // 3. Save Specs
      await supabase.from('product_specifications').delete().eq('product_id', productId)
      if (specs.length > 0) {
        await supabase.from('product_specifications').insert(specs.map((s, i) => ({
          product_id: productId,
          spec_key: s.spec_key,
          spec_value: s.spec_value,
          sort_order: i
        })))
      }

      // 4. Save Features
      await supabase.from('product_features').delete().eq('product_id', productId)
      if (features.length > 0) {
        await supabase.from('product_features').insert(features.map((f, i) => ({
          product_id: productId,
          title: f.title,
          description: f.description,
          sort_order: i
        })))
      }

      // 5. Save Downloads
      await supabase.from('product_documents').delete().eq('product_id', productId)
      if (downloads.length > 0) {
        await supabase.from('product_documents').insert(downloads.map(d => ({
          product_id: productId,
          name: d.name,
          document_type: d.document_type,
          file_url: d.file_url
        })))
      }

      // 6. Save Application Gallery
      await supabase.from('product_applications').delete().eq('product_id', productId)
      if (applications.length > 0) {
        await supabase.from('product_applications').insert(applications.map((app, i) => ({
          product_id: productId,
          image_url: app.url,
          caption: app.caption,
          location: app.location,
          sort_order: i
        })))
      }

      toast.success(isNew ? 'Asset Initialized' : 'Architecture Synchronized')
      if (isNew) router.push(`/admin/products/${productId}`)
      else fetchProductData()
      
    } catch (err: any) {
      toast.error('Sync failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAddSpec = () => setSpecs([...specs, { spec_key: '', spec_value: '' }])
  const handleRemoveSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index))
  const handleSpecChange = (index: number, key: 'spec_key' | 'spec_value', val: string) => {
    const updated = [...specs]
    updated[index][key] = val
    setSpecs(updated)
  }

  const handleAddFeature = () => setFeatures([...features, { title: '', description: '' }])
  const handleRemoveFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))
  const handleFeatureChange = (index: number, key: 'title' | 'description', val: string) => {
    const updated = [...features]
    updated[index][key] = val
    setFeatures(updated)
  }

  const handleAddDownload = () => setDownloads([...downloads, { name: '', document_type: 'datasheet', file_url: '' }])
  const handleRemoveDownload = (index: number) => setDownloads(downloads.filter((_, i) => i !== index))
  const handleDownloadChange = (index: number, key: keyof typeof downloads[0], val: string) => {
    const updated = [...downloads] as any
    updated[index][key] = val
    setDownloads(updated)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Scanning Asset Metadata...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-40 relative">
      {/* Header Architecture */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
          <Link 
            href="/admin/products"
            className="w-14 h-14 rounded-[1.5rem] bg-white border border-black/5 flex items-center justify-center text-slate-400 hover:text-[#0D95F0] hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all shadow-sm group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <SpatialBadge variant="blue" pulse={!isNew}>{isNew ? 'New Signature' : 'Core Active'}</SpatialBadge>
              {!isNew && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono opacity-60">ID: {id}</span>}
            </div>
            <h1 className="text-4xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">
              {watch('name') || (isNew ? 'Untitled Asset' : 'Decrypting...')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-3 bg-white border border-black/5 rounded-2xl shadow-sm">
           <Activity size={16} className={cn(watch('is_active') ? "text-emerald-500" : "text-slate-300")} />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {watch('is_active') ? 'Public Stream Active' : 'Protocol Hidden'}
           </span>
        </div>
      </div>

      {/* Spatial Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide p-2 bg-white/40 backdrop-blur-2xl rounded-[1.5rem] border border-black/5 sticky top-24 z-30 mb-12 shadow-2xl shadow-black/[0.02]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-[#0A1628] text-white shadow-2xl shadow-black/20 scale-105" 
                : "text-slate-400 hover:text-[#0A1628] hover:bg-white"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Technical Canvas (Content) */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#0D95F0]/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none" />
        
        <div className="relative bg-white rounded-[2.25rem] border border-black/5 shadow-sm overflow-hidden min-h-[600px] z-10 transition-all duration-700">
          <AnimatePresence mode="wait">
            {activeTab === 'basic' && (
              <motion.div 
                key="basic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 space-y-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Identity</label>
                    <input 
                      {...register('name')}
                      placeholder="e.g. UltraHD LED Series 2026"
                      className="w-full px-8 py-5 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight shadow-sm"
                      onBlur={(e) => {
                        if (!watch('slug')) {
                          setValue('slug', e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''), { shouldValidate: true })
                        }
                      }}
                    />
                    {errors.name && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Slug Signature</label>
                    <input 
                      {...register('slug')}
                      placeholder="ultrahd-led-series-2026"
                      className="w-full px-8 py-5 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold font-mono tracking-tight shadow-sm"
                    />
                    {errors.slug && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.slug.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sector Classification</label>
                    <select 
                      {...register('category_id')}
                      className="w-full px-8 py-5 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight shadow-sm appearance-none"
                      onChange={(e) => {
                        register('category_id').onChange(e)
                        setValue('subcategory_id', '')
                      }}
                    >
                      <option value="">Select Sector</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-Cluster Layer</label>
                    <select 
                      {...register('subcategory_id')}
                      disabled={!watch('category_id')}
                      className="w-full px-8 py-5 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight shadow-sm appearance-none disabled:opacity-40"
                    >
                      <option value="">No Layer Assigned</option>
                      {subcategories
                        .filter(s => s.category_id === watch('category_id'))
                        .map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-8 p-8 bg-slate-50/50 rounded-[1.5rem] border border-black/5">
                   <label className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative w-12 h-6 bg-slate-200 rounded-full transition-colors group-has-[:checked]:bg-emerald-400">
                         <input type="checkbox" {...register('is_active')} className="sr-only peer" />
                         <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#0A1628] transition-colors">Visible to Public</span>
                   </label>
                   <label className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative w-12 h-6 bg-slate-200 rounded-full transition-colors group-has-[:checked]:bg-amber-400">
                         <input type="checkbox" {...register('is_featured')} className="sr-only peer" />
                         <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#0A1628] transition-colors">Flagship Highlight</span>
                   </label>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Abstract (Listing Context)</label>
                  <textarea 
                    {...register('short_description')}
                    rows={4}
                    placeholder="Engineering advanced visual technology for world-class environments..."
                    className="w-full px-8 py-6 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold leading-relaxed tracking-tight shadow-sm resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Narrative (Detailed Context)</label>
                  <div className="rounded-[1.5rem] overflow-hidden border border-black/5">
                    <RichTextEditor 
                      content={watch('full_description') || ''} 
                      onChange={(val) => setValue('full_description', val, { shouldDirty: true })}
                      placeholder="Enter detailed technical narrative..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'media' && (
              <motion.div 
                key="media"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 space-y-12"
              >
                <div className="max-w-4xl space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Visual Asset Layer</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Manage high-fidelity imagery and primary listing thumbnails.</p>
                  </div>
                  
                  <div className="bg-slate-50/50 p-8 rounded-[1.75rem] border border-black/5">
                    <MediaUploader 
                      files={images}
                      onFilesChange={setImages}
                      folder={`products/${watch('slug') || 'unnamed'}`}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div 
                key="specs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Technical Parameters</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Define the engineering metrics for this hardware cluster.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddSpec}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20"
                  >
                    <Plus size={16} />
                    Append Spec
                  </button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {specs.length === 0 ? (
                      <div className="py-32 flex flex-col items-center justify-center text-slate-300 gap-6 opacity-40">
                        <Cpu size={64} />
                        <p className="text-xl font-black tracking-tight">Zero parameters defined.</p>
                      </div>
                    ) : (
                      specs.map((s, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-[2rem] border border-black/5 group hover:bg-white hover:shadow-2xl transition-all duration-500"
                        >
                          <div className="w-12 h-12 rounded-[1rem] bg-slate-950 text-white flex items-center justify-center shrink-0">
                             <Database size={18} />
                          </div>
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input 
                              value={s.spec_key} 
                              onChange={(e) => handleSpecChange(index, 'spec_key', e.target.value)}
                              placeholder="Parameter Identity (e.g. Pixel Pitch)"
                              className="px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-black tracking-tight bg-white/40"
                            />
                            <input 
                              value={s.spec_value} 
                              onChange={(e) => handleSpecChange(index, 'spec_value', e.target.value)}
                              placeholder="Metric Value (e.g. 1.2mm)"
                              className="px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-bold tracking-tight bg-white/40"
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSpec(index)}
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={20} />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div 
                key="features"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Feature Signature</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Define the technical differentiators and key selling points.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddFeature}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20"
                  >
                    <Plus size={16} />
                    Initialize Feature
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence mode="popLayout">
                    {features.length === 0 ? (
                       <div className="md:col-span-2 py-32 flex flex-col items-center justify-center text-slate-300 gap-6 opacity-40">
                        <Sparkles size={64} />
                        <p className="text-xl font-black tracking-tight">Zero features configured.</p>
                      </div>
                    ) : (
                      features.map((f, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="bg-slate-50/50 p-8 rounded-[1.5rem] border border-black/5 space-y-6 group relative hover:bg-white hover:shadow-2xl transition-all duration-700"
                        >
                          <div className="flex items-center justify-between">
                             <div className="w-12 h-12 rounded-[1rem] bg-[#0D95F0]/10 text-[#0D95F0] flex items-center justify-center">
                                <Sparkles size={20} />
                             </div>
                             <button 
                                type="button" 
                                onClick={() => handleRemoveFeature(index)}
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={18} />
                              </button>
                          </div>
                          <input 
                            value={f.title} 
                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                            placeholder="Feature Identity (e.g. Neural Dimming)"
                            className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-black tracking-tight bg-white/40"
                          />
                          <textarea 
                            value={f.description} 
                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                            placeholder="Detailed technical context of this feature..."
                            rows={4}
                            className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-bold tracking-tight bg-white/40 resize-none leading-relaxed"
                          />
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'accessories' && (
               <motion.div 
                key="accessories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-16 text-center py-40"
              >
                <div className="w-24 h-24 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-10 shadow-inner">
                  <Box size={40} />
                </div>
                <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-4">Peripheral Kit Console</h3>
                <p className="text-lg text-slate-400 font-medium max-w-sm mx-auto leading-relaxed italic">Linking maintenance protocols and global hardware accessories is currently restricted.</p>
              </motion.div>
            )}

            {activeTab === 'downloads' && (
              <motion.div 
                key="downloads"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Technical Documents</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Manage Datasheets, Manuals, and Technical Drawings.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddDownload}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20"
                  >
                    <Plus size={16} />
                    Append Document
                  </button>
                </div>

                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {downloads.length === 0 ? (
                      <div className="py-32 flex flex-col items-center justify-center text-slate-300 gap-6 opacity-40">
                        <Download size={64} />
                        <p className="text-xl font-black tracking-tight">Zero documents linked.</p>
                      </div>
                    ) : (
                      downloads.map((d, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-black/5 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-white hover:shadow-2xl transition-all duration-700"
                        >
                          <div className="w-14 h-14 rounded-[1.25rem] bg-white border border-black/5 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                            <Download size={22} />
                          </div>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Document Name</label>
                               <input 
                                value={d.name} 
                                onChange={(e) => handleDownloadChange(index, 'name', e.target.value)}
                                placeholder="e.g. Operation Manual V4"
                                className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-black tracking-tight bg-white/40"
                              />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Protocol Type</label>
                               <select 
                                value={d.document_type}
                                onChange={(e) => handleDownloadChange(index, 'document_type', e.target.value)}
                                className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-bold tracking-tight bg-white/40 appearance-none"
                              >
                                <option value="datasheet">Datasheet</option>
                                <option value="manual">Manual</option>
                                <option value="drawing">Drawing</option>
                                <option value="guide">Guide</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Asset URL Signature</label>
                               <input 
                                value={d.file_url} 
                                onChange={(e) => handleDownloadChange(index, 'file_url', e.target.value)}
                                placeholder="https://axion.io/assets/..."
                                className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-[10px] font-black tracking-widest bg-white/40"
                              />
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveDownload(index)}
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={20} />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'application' && (
              <motion.div 
                key="application"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 lg:p-16 space-y-12"
              >
                <div className="max-w-4xl space-y-12">
                  <div>
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Field Application Layer</h3>
                    <p className="text-slate-400 font-medium text-lg italic text-balance">Showcase high-impact deployments of this hardware cluster in enterprise environments.</p>
                  </div>
                  
                  <div className="bg-slate-50/50 p-8 rounded-[1.75rem] border border-black/5">
                    <MediaUploader 
                      files={applications}
                      onFilesChange={setApplications}
                      folder={`products/${watch('slug') || 'unnamed'}/applications`}
                      showPrimaryToggle={false}
                    />
                  </div>

                  <div className="grid gap-6">
                    {applications.map((app, i) => (
                      <div key={i} className="flex gap-8 p-6 bg-white rounded-[1.5rem] border border-black/5 shadow-sm group hover:shadow-2xl transition-all duration-700">
                        <div className="w-24 h-24 rounded-[1.5rem] bg-slate-900 overflow-hidden shrink-0 shadow-2xl">
                          <Image src={app.url} alt="App" width={96} height={96} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000" />
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-8 py-2">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Deployment Context</label>
                             <input 
                              value={app.caption || ''} 
                              onChange={(e) => {
                                const updated = [...applications]
                                updated[i].caption = e.target.value
                                setApplications(updated)
                              }}
                              placeholder="Project Title"
                              className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-black tracking-tight bg-slate-50/50"
                            />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Geographical Layer</label>
                             <input 
                              value={app.location || ''} 
                              onChange={(e) => {
                                const updated = [...applications]
                                updated[i].location = e.target.value
                                setApplications(updated)
                              }}
                              placeholder="e.g. Dubai Marina"
                              className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-bold tracking-tight bg-slate-50/50"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Spatial Console (Save Bar) */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-8 z-[60]">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-[1.75rem] p-6 flex items-center justify-between shadow-[0_32px_120px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0D95F0]/20 to-transparent" />
          
          <div className="flex items-center gap-6 px-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-white/5 flex items-center justify-center text-[#0D95F0]">
               <Terminal size={22} />
            </div>
            <div className="flex flex-col">
              {isDirty ? (
                <div className="flex items-center gap-2 text-amber-400">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Pending Synchronization</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Architecture Synchronized</span>
                </div>
              )}
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-1">Spatial Sync v2.4</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              Abort
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-3 px-10 py-5 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-[#0D95F0]/20 active:scale-95 disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
              {isNew ? 'Initialize Asset' : 'Commit Protocol'}
            </button>
          </div>
        </motion.div>
      </div>
    </form>
  )
}
