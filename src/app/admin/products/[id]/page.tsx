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
  ChevronRight
} from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import Link from 'next/link'

import FormField from '@/components/admin/FormField'
import MediaUploader from '@/components/admin/MediaUploader'
import RichTextEditor from '@/components/admin/RichTextEditor'
import DragHandle from '@/components/admin/DragHandle'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data'

// Zod Schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Slug is required'),
  category_id: z.string().min(1, 'Category is required'),
  subcategory_id: z.string().optional().nullable(),
  short_description: z.string().max(250, 'Short description is too long'),
  full_description: z.string().optional(),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
})

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: Info },
  { id: 'media', label: 'Media Gallery', icon: ImageIcon },
  { id: 'specs', label: 'Specifications', icon: Settings },
  { id: 'features', label: 'Key Features', icon: Sparkles },
  { id: 'accessories', label: 'Accessories', icon: Box },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'application', label: 'Application Gallery', icon: Images },
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
  
  // States for complex relational data
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
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
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

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
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
        toast.error('Failed to load product')
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
    setImages((product.product_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((img: any) => ({
      id: img.id,
      url: img.image_url,
      is_primary: img.is_primary,
      sort_order: img.sort_order
    })))
    setSpecs((product.product_specifications || []).sort((a: any, b: any) => a.sort_order - b.sort_order))
    setFeatures((product.product_features || []).sort((a: any, b: any) => a.sort_order - b.sort_order))
    setDownloads(product.product_documents || [])
    setApplications((product.product_applications || []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((app: any) => ({
      id: app.id,
      url: app.image_url,
      caption: app.caption,
      location: app.location
    })))

    setLoading(false)
  }

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setSaving(true)
    
    try {
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

      toast.success(isNew ? 'Product created successfully!' : 'Product updated successfully!')
      if (isNew) router.push(`/admin/products/${productId}`)
      else fetchProductData()
      
    } catch (err: any) {
      toast.error('Failed to save product: ' + err.message)
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
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 size={40} className="animate-spin text-[#0D95F0]" />
        <p className="text-slate-400 font-medium animate-pulse">Loading product data...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-32 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products"
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0A1628] hover:border-slate-300 transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#0D95F0] uppercase tracking-widest">{isNew ? 'New Listing' : 'Editing Product'}</span>
              {!isNew && <span className="w-1 h-1 rounded-full bg-slate-300" />}
              {!isNew && <span className="text-xs text-slate-400 font-medium">ID: {id}</span>}
            </div>
            <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">
              {watch('name') || (isNew ? 'Untitled Product' : 'Loading...')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all",
            watch('is_active') ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
          )}>
            {watch('is_active') ? 'PUBLICLY VISIBLE' : 'HIDDEN FROM SITE'}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1 p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-slate-100 sticky top-[72px] z-20 mb-8 shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
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

      {/* Tab Content */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'basic' && (
            <motion.div 
              key="basic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12 space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FormField label="Product Name" required error={errors.name?.message}>
                  <input 
                    {...register('name')}
                    placeholder="e.g. UltraHD LED Series 2026"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium"
                    onBlur={(e) => {
                      if (!watch('slug')) {
                        setValue('slug', e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''), { shouldValidate: true })
                      }
                    }}
                  />
                </FormField>

                <FormField label="Slug (URL Path)" required error={errors.slug?.message}>
                  <input 
                    {...register('slug')}
                    placeholder="ultrahd-led-series-2026"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium bg-slate-50 focus:bg-white"
                  />
                </FormField>

                <FormField label="Category" required error={errors.category_id?.message}>
                  <select 
                    {...register('category_id')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium bg-white"
                    onChange={(e) => {
                      register('category_id').onChange(e)
                      setValue('subcategory_id', '') // Reset subcategory when category changes
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </FormField>

                <FormField label="Subcategory" error={errors.subcategory_id?.message}>
                  <select 
                    {...register('subcategory_id')}
                    disabled={!watch('category_id')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">No Subcategory</option>
                    {subcategories
                      .filter(s => s.category_id === watch('category_id'))
                      .map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                    }
                  </select>
                </FormField>

                <div className="flex items-center gap-8 px-4 py-2 bg-slate-50/50 rounded-2xl border border-slate-50">
                   <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" {...register('is_active')} className="w-5 h-5 rounded border-slate-200 text-[#0D95F0] focus:ring-[#0D95F0]" />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-[#0A1628] transition-colors">Visible to Public</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" {...register('is_featured')} className="w-5 h-5 rounded border-slate-200 text-amber-500 focus:ring-amber-500" />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-[#0A1628] transition-colors">Featured on Home</span>
                   </label>
                </div>
              </div>

              <FormField label="Short Description (Listing Preview)" error={errors.short_description?.message} helperText="Max 250 characters. Appears in search results and category cards.">
                <textarea 
                  {...register('short_description')}
                  rows={3}
                  placeholder="Engineering advanced visual technology for world-class environments..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium resize-none"
                />
              </FormField>

              <FormField label="Full Detailed Description (WYSIWYG)">
                <RichTextEditor 
                  content={watch('full_description') || ''} 
                  onChange={(val) => setValue('full_description', val, { shouldDirty: true })}
                  placeholder="Enter detailed technical description, certifications, and technical background..."
                />
              </FormField>
            </motion.div>
          )}

          {activeTab === 'media' && (
            <motion.div 
              key="media"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12 space-y-8"
            >
              <div className="max-w-4xl">
                <h3 className="text-lg font-bold text-[#0A1628] mb-2">Product Gallery</h3>
                <p className="text-sm text-slate-400 mb-8 font-medium">Upload high-quality images of the product. The cover image will be used as the main display thumbnail.</p>
                
                <MediaUploader 
                  files={images}
                  onFilesChange={setImages}
                  folder={`products/${watch('slug') || 'unnamed'}`}
                  helperText="Recommended: 1920x1080px or higher. Format: JPG, PNG, WEBP."
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'specs' && (
            <motion.div 
              key="specs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-[#0A1628] mb-1">Technical Specifications</h3>
                  <p className="text-sm text-slate-400 font-medium">Add parameters like Brightness, Pixel Pitch, Weight, etc.</p>
                </div>
                <button 
                  type="button"
                  onClick={handleAddSpec}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#0A1628] rounded-xl text-xs font-bold border border-slate-100 transition-all"
                >
                  <Plus size={14} />
                  Add Specification
                </button>
              </div>

              <div className="space-y-3">
                {specs.length === 0 ? (
                  <div className="py-12 border-2 border-dashed border-slate-50 rounded-[2rem] flex flex-col items-center justify-center text-slate-300">
                    <Settings size={32} className="mb-3" />
                    <p className="text-sm font-medium">No specifications added yet</p>
                  </div>
                ) : (
                  specs.map((s, index) => (
                    <div key={index} className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-50 group">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          value={s.spec_key} 
                          onChange={(e) => handleSpecChange(index, 'spec_key', e.target.value)}
                          placeholder="Parameter (e.g. Brightness)"
                          className="px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-bold bg-white"
                        />
                        <input 
                          value={s.spec_value} 
                          onChange={(e) => handleSpecChange(index, 'spec_value', e.target.value)}
                          placeholder="Value (e.g. 6000 nits)"
                          className="px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-medium bg-white"
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveSpec(index)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div 
              key="features"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-[#0A1628] mb-1">Key Selling Points</h3>
                  <p className="text-sm text-slate-400 font-medium">Highlighted technical features that set this product apart.</p>
                </div>
                <button 
                  type="button"
                  onClick={handleAddFeature}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#0A1628] rounded-xl text-xs font-bold border border-slate-100 transition-all"
                >
                  <Plus size={14} />
                  Add Feature
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.length === 0 ? (
                   <div className="md:col-span-2 py-12 border-2 border-dashed border-slate-50 rounded-[2rem] flex flex-col items-center justify-center text-slate-300">
                    <Sparkles size={32} className="mb-3" />
                    <p className="text-sm font-medium">No features added yet</p>
                  </div>
                ) : (
                  features.map((f, index) => (
                    <div key={index} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-50 space-y-4 group relative">
                      <button 
                        type="button" 
                        onClick={() => handleRemoveFeature(index)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                      <input 
                        value={f.title} 
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        placeholder="Feature Title (e.g. Pixel Precision)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-bold bg-white"
                      />
                      <textarea 
                        value={f.description} 
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        placeholder="Detailed description of the feature..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-medium bg-white resize-none"
                      />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'accessories' && (
             <motion.div 
              key="accessories"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12 text-center py-24"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-6">
                <Box size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#0A1628] mb-2">Accessory Manager Coming Soon</h3>
              <p className="text-sm text-slate-400 font-medium max-w-sm mx-auto">This module will allow you to link global accessories and maintenance kits to this product.</p>
            </motion.div>
          )}

          {activeTab === 'downloads' && (
            <motion.div 
              key="downloads"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-[#0A1628] mb-1">Technical Documentation</h3>
                  <p className="text-sm text-slate-400 font-medium">Upload Datasheets, Manuals, and Technical Drawings (PDF/ZIP).</p>
                </div>
                <button 
                  type="button"
                  onClick={handleAddDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#0A1628] rounded-xl text-xs font-bold border border-slate-100 transition-all"
                >
                  <Plus size={14} />
                  Add Document
                </button>
              </div>

              <div className="space-y-4">
                {downloads.length === 0 ? (
                  <div className="py-12 border-2 border-dashed border-slate-50 rounded-[2rem] flex flex-col items-center justify-center text-slate-300">
                    <Download size={32} className="mb-3" />
                    <p className="text-sm font-medium">No documents linked yet</p>
                  </div>
                ) : (
                  downloads.map((d, index) => (
                    <div key={index} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-50 flex flex-col md:flex-row md:items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">
                        <Download size={18} />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input 
                          value={d.name} 
                          onChange={(e) => handleDownloadChange(index, 'name', e.target.value)}
                          placeholder="Document Name (e.g. Tech Datasheet V1)"
                          className="px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-bold bg-white"
                        />
                        <select 
                          value={d.document_type}
                          onChange={(e) => handleDownloadChange(index, 'document_type', e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-medium bg-white"
                        >
                          <option value="datasheet">Datasheet</option>
                          <option value="manual">Operation Manual</option>
                          <option value="drawing">Technical Drawing</option>
                          <option value="guide">Installation Guide</option>
                        </select>
                        <input 
                          value={d.file_url} 
                          onChange={(e) => handleDownloadChange(index, 'file_url', e.target.value)}
                          placeholder="File URL (after storage upload)"
                          className="px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-medium bg-white"
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveDownload(index)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'application' && (
            <motion.div 
              key="application"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 lg:p-12 space-y-8"
            >
              <div className="max-w-4xl">
                <h3 className="text-lg font-bold text-[#0A1628] mb-2">Real-World Applications</h3>
                <p className="text-sm text-slate-400 mb-8 font-medium">Showcase photos of this product in actual project deployments.</p>
                
                <MediaUploader 
                  files={applications}
                  onFilesChange={setApplications}
                  folder={`products/${watch('slug') || 'unnamed'}/applications`}
                  showPrimaryToggle={false}
                  helperText="Upload project photos. Captions can be added below."
                />

                <div className="mt-8 space-y-4">
                  {applications.map((app, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                        <Image src={app.url} alt="App" width={64} height={64} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input 
                          value={app.caption || ''} 
                          onChange={(e) => {
                            const updated = [...applications]
                            updated[i].caption = e.target.value
                            setApplications(updated)
                          }}
                          placeholder="Project Name / Caption"
                          className="px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-bold bg-white"
                        />
                        <input 
                          value={app.location || ''} 
                          onChange={(e) => {
                            const updated = [...applications]
                            updated[i].location = e.target.value
                            setApplications(updated)
                          }}
                          placeholder="Location (e.g. Dubai, UAE)"
                          className="px-4 py-2.5 rounded-xl border border-slate-100 focus:border-[#0D95F0] outline-none text-sm font-medium bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-40">
        <div className="bg-[#0A1628]/95 backdrop-blur-lg border border-white/10 rounded-[2rem] p-4 flex items-center justify-between shadow-2xl shadow-[#0A1628]/30">
          <div className="flex items-center gap-4 px-4">
            {isDirty ? (
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle size={18} />
                <span className="text-sm font-bold tracking-tight">UNSAVED CHANGES</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={18} />
                <span className="text-sm font-bold tracking-tight">ALL CHANGES SAVED</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
             <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-6 py-3 rounded-2xl text-sm font-bold text-white/50 hover:text-white transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20 active:scale-95 disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isNew ? 'Create Product' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
