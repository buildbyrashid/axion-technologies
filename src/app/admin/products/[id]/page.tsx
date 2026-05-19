'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Loader2, 
  Info, 
  Image as ImageIcon, 
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import Link from 'next/link'

import SpatialBadge from '@/components/ui/SpatialBadge'
import MediaUploader from '@/components/admin/MediaUploader'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { cn } from '@/lib/utils'

// Zod Schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Product slug is required'),
  category_id: z.string().min(1, 'Please select a main category'),
  subcategory_id: z.string().optional().nullable(),
  short_description: z.string().max(250, 'Short description must be under 250 characters'),
  full_description: z.string().optional(),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
})

const TABS = [
  { id: 'basic', label: 'Basic Information', icon: Info },
  { id: 'media', label: 'Images & Media', icon: ImageIcon },
  { id: 'specs', label: 'Specifications', icon: Cpu },
  { id: 'features', label: 'Features', icon: Sparkles },
  { id: 'accessories', label: 'Accessories', icon: Box },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'application', label: 'Case Studies', icon: Images },
]

export default function ProductEditorPage() {
  const { id } = useParams()
  const router = useRouter()
  const isNew = id === 'new'

  const [activeTab, setActiveTab] = useState('basic')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  
  const [images, setImages] = useState<any[]>([])
  const [specs, setSpecs] = useState<{id?: string, spec_key: string, spec_value: string}[]>([])
  const [features, setFeatures] = useState<{id?: string, title: string, description: string}[]>([])
  const [downloads, setDownloads] = useState<{id?: string, name: string, document_type: string, file_url: string}[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [initialArrays, setInitialArrays] = useState<string>('')

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isDirty: isFormDirty } } = useForm({
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

  const isArraysDirty = initialArrays ? JSON.stringify({ images, specs, features, downloads, applications }) !== initialArrays : false
  const isDirty = isFormDirty || isArraysDirty

  useEffect(() => {
    fetchFormData()
    if (!isNew) fetchProductData()
  }, [id])

  async function fetchFormData() {
    try {
      const res = await fetch('/api/admin/categories')
      const json = await res.json()
      if (json.success) setCategories(json.data)
    } catch { toast.error('Failed to load categories') }
  }

  async function fetchProductData() {
    try {
      const res = await fetch(`/api/admin/products/${id}`)
      const json = await res.json()
      if (!json.success) {
        toast.error('Failed to connect to database')
        router.push('/admin/products')
        return
      }
      const product = json.data

      const gallery = Array.isArray(product.gallery) ? product.gallery : []
      const formattedImages = gallery.map((img: any, i: number) => ({
        id: String(i),
        url: img.url || img,
        is_primary: img.is_primary || i === 0,
        sort_order: i
      }))
      setImages(formattedImages)

      const formattedSpecs = Array.isArray(product.specifications) ? product.specifications : 
        Object.entries(product.specifications || {}).map(([k, v]) => ({ spec_key: k, spec_value: v as string }))
      setSpecs(formattedSpecs)

      const formattedFeatures = Array.isArray(product.features) ? product.features : []
      setFeatures(formattedFeatures)
      
      const formattedDownloads = Array.isArray(product.downloads) ? product.downloads : []
      setDownloads(formattedDownloads)

      const apps = Array.isArray(product.applications) ? product.applications : []
      const formattedApps = apps.map((app: any) => ({
        id: app.id || String(Math.random()),
        url: app.url || app.image_url,
        caption: app.caption,
        location: app.location
      }))
      setApplications(formattedApps)
      
      // Reset form dirty state and save initial arrays for dirty checking
      reset({
        name: product.name,
        slug: product.slug,
        category_id: product.category_id || '',
        subcategory_id: product.subcategory_id || '',
        short_description: product.short_description || '',
        full_description: product.full_description || '',
        is_active: product.is_active,
        is_featured: product.is_featured,
      })
      
      setInitialArrays(JSON.stringify({ 
        images: formattedImages, 
        specs: formattedSpecs, 
        features: formattedFeatures, 
        downloads: formattedDownloads, 
        applications: formattedApps 
      }))
    } catch {
      toast.error('Failed to load product data')
    }
    setLoading(false)
  }

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setSaving(true)
    try {
      const productId = id as string
      const gallery = images.map((img, i) => ({
        url: img.url,
        is_primary: img.is_primary || i === 0,
        sort_order: i
      }))
      const primaryImage = images.find(img => img.is_primary) || images[0]

      const payload = {
        ...values,
        subcategory_id: values.subcategory_id || null,
        featured_image: primaryImage?.url || null,
        gallery,
        specifications: specs,
        features,
        downloads,
        applications: applications.map((app, i) => ({
          url: app.url,
          caption: app.caption,
          location: app.location,
          sort_order: i
        })),
      }

      let res
      if (isNew) {
        // Create then update with full data
        const createRes = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        const createJson = await createRes.json()
        if (!createJson.success) throw new Error(createJson.error || 'Create failed')
        const newId = createJson.data.id
        res = await fetch(`/api/admin/products/${newId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload }),
        })
        const json = await res.json()
        if (!json.success) throw new Error(json.error || 'Save failed')
        toast.success('Product created successfully')
        router.push(`/admin/products/${newId}`)
      } else {
        res = await fetch(`/api/admin/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (!json.success) throw new Error(json.error || 'Save failed')
        toast.success('Product updated successfully')
        fetchProductData()
      }
    } catch (err: any) {
      toast.error('Save failed: ' + err.message)
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
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading product details...</p>
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
              <SpatialBadge variant="blue" pulse={!isNew}>{isNew ? 'New Product' : 'Product Editor'}</SpatialBadge>
              {!isNew && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono opacity-60">ID: {id}</span>}
            </div>
            <h1 className="text-4xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">
              {watch('name') || (isNew ? 'Untitled Product' : 'Loading...')}
            </h1>
          </div>
        </div>

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
                  onClick={() => { setValue('is_active', false); handleSubmit(onSubmit)(); }}
                  disabled={saving}
                  className="flex items-center justify-center h-12 px-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving && !watch('is_active') ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => { setValue('is_active', true); handleSubmit(onSubmit)(); }}
                  disabled={saving}
                  className="flex items-center justify-center h-12 px-8 bg-[#0A1628] hover:bg-[#0D95F0] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-2 group"
                >
                  {saving && watch('is_active') ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Zap size={16} className="text-[#0D95F0] group-hover:text-white transition-colors" />
                  )}
                  Publish
                </button>
              </motion.div>
            ) : (
              watch('is_active') ? (
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
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      SAVED AS DRAFT
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setValue('is_active', true); handleSubmit(onSubmit)(); }}
                    disabled={saving}
                    className="flex items-center justify-center h-12 px-6 bg-[#0A1628] hover:bg-[#0D95F0] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed gap-2 group"
                  >
                    {saving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Zap size={16} className="text-[#0D95F0] group-hover:text-white transition-colors" />
                    )}
                    PUBLISH
                  </button>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Spatial Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4 px-2 bg-[#F8FAFC]/90 backdrop-blur-2xl border-b border-black/5 sticky top-0 z-40 mb-12 shadow-sm -mx-10 lg:-mx-14 px-10 lg:px-14">
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
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
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
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Slug</label>
                    <input 
                      {...register('slug')}
                      placeholder="ultrahd-led-series-2026"
                      className="w-full px-8 py-5 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold font-mono tracking-tight shadow-sm"
                    />
                    {errors.slug && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.slug.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Category</label>
                    <select 
                      {...register('category_id')}
                      className="w-full px-8 py-5 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight shadow-sm appearance-none"
                      onChange={(e) => {
                        register('category_id').onChange(e)
                        setValue('subcategory_id', '')
                      }}
                    >
                      <option value="">Select Main Category</option>
                      {categories.filter(c => !c.parent_id).map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    {errors.category_id && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1">{errors.category_id.message}</p>}
                  </div>

                  {watch('category_id') && categories.some(c => c.parent_id === watch('category_id')) && (
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-Category</label>
                      <select 
                        {...register('subcategory_id')}
                        className="w-full px-8 py-5 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight shadow-sm appearance-none"
                      >
                        <option value="">Select Sub-Category (Optional)</option>
                        {categories.filter(c => c.parent_id === watch('category_id')).map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                </div>

                <div className="flex flex-wrap gap-8 p-8 bg-slate-50/50 rounded-[1.5rem] border border-black/5">
                   <label className="flex items-center gap-4 cursor-pointer">
                      <input type="checkbox" {...register('is_active')} className="sr-only peer" />
                      <div className="relative w-12 h-6 bg-slate-200 peer-checked:bg-emerald-400 rounded-full transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6 shadow-inner"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest peer-checked:text-[#0A1628] transition-colors">Visible to Public</span>
                   </label>
                   <label className="flex items-center gap-4 cursor-pointer">
                      <input type="checkbox" {...register('is_featured')} className="sr-only peer" />
                      <div className="relative w-12 h-6 bg-slate-200 peer-checked:bg-amber-400 rounded-full transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6 shadow-inner"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest peer-checked:text-[#0A1628] transition-colors">Featured Product</span>
                   </label>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Description (Preview)</label>
                  <textarea 
                    {...register('short_description')}
                    rows={4}
                    placeholder="Write a brief overview of this product..."
                    className="w-full px-8 py-6 rounded-[2rem] border border-black/5 bg-slate-50 focus:bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold leading-relaxed tracking-tight shadow-sm resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Description</label>
                  <div className="rounded-[1.5rem] overflow-hidden border border-black/5">
                    <RichTextEditor 
                      content={watch('full_description') || ''} 
                      onChange={(val) => setValue('full_description', val, { shouldDirty: true })}
                      placeholder="Enter detailed product description..."
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
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Product Images</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Upload and manage product photos and gallery images.</p>
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
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Specifications</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Add key technical specifications for this product.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddSpec}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20"
                  >
                    <Plus size={16} />
                    Add Specification
                  </button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {specs.length === 0 ? (
                      <div className="py-32 flex flex-col items-center justify-center text-slate-300 gap-6 opacity-40">
                        <Cpu size={64} />
                        <p className="text-xl font-black tracking-tight">No specifications added yet.</p>
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
                              placeholder="Specification Name (e.g. Pixel Pitch)"
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
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Product Features</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Add the key selling points and features of this product.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddFeature}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20"
                  >
                    <Plus size={16} />
                    Add Feature
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence mode="popLayout">
                    {features.length === 0 ? (
                       <div className="md:col-span-2 py-32 flex flex-col items-center justify-center text-slate-300 gap-6 opacity-40">
                        <Sparkles size={64} />
                        <p className="text-xl font-black tracking-tight">No features added yet.</p>
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
                            placeholder="Feature Title (e.g. Seamless Display)"
                            className="w-full px-6 py-4 rounded-[1.25rem] border border-black/5 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 outline-none text-sm font-black tracking-tight bg-white/40"
                          />
                          <textarea 
                            value={f.description} 
                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                            placeholder="Feature description..."
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
                <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-4">Accessories Management</h3>
                <p className="text-lg text-slate-400 font-medium max-w-sm mx-auto leading-relaxed italic">Managing product accessories and add-ons will be available in a future update.</p>
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
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Downloads & Documents</h3>
                    <p className="text-slate-400 font-medium text-lg italic">Manage Datasheets, Manuals, and Technical Drawings.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddDownload}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20"
                  >
                    <Plus size={16} />
                    Add Document
                  </button>
                </div>

                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {downloads.length === 0 ? (
                      <div className="py-32 flex flex-col items-center justify-center text-slate-300 gap-6 opacity-40">
                        <Download size={64} />
                        <p className="text-xl font-black tracking-tight">No documents added yet.</p>
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
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">Document Type</label>
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
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-1">File URL</label>
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
                    <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter mb-2">Case Studies / Applications</h3>
                    <p className="text-slate-400 font-medium text-lg italic text-balance">Showcase real-world projects and environments where this product was used.</p>
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
                             <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Project Name</label>
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
                             <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Location</label>
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

    </form>
  )
}
