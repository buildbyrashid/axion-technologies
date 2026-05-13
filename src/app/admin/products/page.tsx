'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Loader2,
  Package,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Star,
  Activity,
  Box,
  Layers,
  ArrowUpRight,
  Sparkles,
  SearchCode,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Database
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  category_id: string
  is_active: boolean
  is_featured: boolean
  created_at: string
  categories: {
    name: string
  } | null
  subcategories: {
    name: string
  } | null
  product_images: {
    image_url: string
    is_primary: boolean
  }[]
}

interface Category {
  id: string
  name: string
}

export default function ProductsPage() {
  const supabase = createClient()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (isDemo) {
      setProducts(MOCK_PRODUCTS as any)
      setCategories(MOCK_CATEGORIES as any)
      setLoading(false)
      return
    }

    setLoading(true)
    const [productsRes, categoriesRes] = await Promise.all([
      supabase
        .from('products')
        .select(`
          *,
          categories(name),
          subcategories(name),
          product_images(image_url, is_primary)
        `)
        .order('created_at', { ascending: false }),
      supabase
        .from('categories')
        .select('id, name')
        .order('name')
    ])

    if (productsRes.error) toast.error('Failed to load products')
    else setProducts(productsRes.data || [])

    if (categoriesRes.error) toast.error('Failed to load categories')
    else setCategories(categoriesRes.data || [])

    setLoading(false)
  }

  async function handleToggleActive(id: string, active: boolean) {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      const { error } = await supabase
        .from('products')
        .update({ is_active: active })
        .eq('id', id)
      if (error) {
        toast.error('Update failed')
        return
      }
    }
    setProducts(products.map(p => p.id === id ? { ...p, is_active: active } : p))
    toast.success(active ? 'Asset Synchronized' : 'Asset Hidden')
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently decommission this asset?')) return
    
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!isDemo) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      if (error) {
        toast.error('Decommission failed')
        return
      }
    }
    setProducts(products.filter(p => p.id !== id))
    toast.success('Asset removed from core')
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-12 pb-24">
      {/* Premium Spatial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[1.5rem] bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] shadow-inner">
                 <Package size={24} />
              </div>
              <SpatialBadge variant="blue" pulse>Enterprise Repository</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">Asset Inventory</h1>
           <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed italic">Global resource catalog and spatial hardware distribution center.</p>
        </div>
        
        <Link 
          href="/admin/products/new"
          className="group relative px-10 py-5 bg-[#0A1628] text-white rounded-[2.5rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms]" />
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Initialize Asset
        </Link>
      </div>

      {/* Control Console */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/40 backdrop-blur-3xl p-6 rounded-[3rem] border border-black/5 shadow-2xl shadow-black/[0.02]">
         <div className="relative flex-1 max-w-xl group">
            <div className="absolute inset-0 bg-[#0D95F0]/5 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
            <input 
               type="text" 
               placeholder="Search registry by identity or slug..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="relative w-full pl-16 pr-8 py-5 rounded-[2rem] border border-black/5 bg-white shadow-sm focus:shadow-2xl focus:shadow-[#0D95F0]/10 outline-none transition-all text-sm font-black tracking-tight placeholder:text-slate-300"
            />
         </div>

         <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100/50 p-1.5 rounded-[1.75rem] border border-black/5">
               <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-3 rounded-[1.25rem] transition-all",
                    viewMode === 'grid' ? "bg-white text-[#0A1628] shadow-xl" : "text-slate-400 hover:text-slate-600"
                  )}
               >
                  <LayoutGrid size={18} />
               </button>
               <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-3 rounded-[1.25rem] transition-all",
                    viewMode === 'list' ? "bg-white text-[#0A1628] shadow-xl" : "text-slate-400 hover:text-slate-600"
                  )}
               >
                  <List size={18} />
               </button>
            </div>

            <div className="w-px h-10 bg-black/5 mx-2" />

            <div className="relative flex items-center gap-3">
               <SlidersHorizontal size={18} className="absolute left-5 text-slate-300 pointer-events-none" />
               <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-black/5 rounded-[2rem] pl-14 pr-10 py-4.5 text-sm font-black text-[#0A1628] uppercase tracking-widest focus:border-[#0D95F0] outline-none transition-all cursor-pointer min-w-[240px] appearance-none shadow-sm hover:shadow-lg"
               >
                  <option value="all">Global Sectors</option>
                  {categories.map(cat => (
                     <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
               </select>
            </div>
         </div>
      </div>

      {/* Dynamic Assets Canvas */}
      <div className={cn(
        "grid gap-8 transition-all duration-700",
        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[450px] rounded-[3.5rem] bg-slate-50/50 animate-pulse border border-black/5 shadow-inner" />
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full py-48 text-center bg-slate-50/30 rounded-[4rem] border-2 border-dashed border-black/5">
               <div className="flex flex-col items-center gap-8 opacity-30">
                  <Package size={80} className="text-slate-300" strokeWidth={1} />
                  <p className="text-slate-500 font-black tracking-[0.2em] text-xl uppercase">Sector Registry Empty</p>
               </div>
            </div>
          ) : (
            filteredProducts.map((product, index) => {
              const primaryImage = product.product_images.find(img => img.is_primary) || product.product_images[0]
              
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
                  className={cn(
                    "group bg-white rounded-[3.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 relative flex flex-col",
                    viewMode === 'list' && "flex-row h-48"
                  )}
                >
                  {/* Visual Canvas */}
                  <div className={cn(
                    "relative overflow-hidden bg-slate-100",
                    viewMode === 'grid' ? "aspect-[4/3]" : "w-64 h-full shrink-0"
                  )}>
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                     {primaryImage ? (
                        <Image 
                           src={primaryImage.image_url} 
                           alt={product.name} 
                           fill 
                           className="object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                           <Box size={viewMode === 'grid' ? 64 : 40} strokeWidth={1} />
                        </div>
                     )}
                     
                     {/* Floating Intelligence Overlays */}
                     <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
                        {product.is_featured && (
                           <SpatialBadge variant="amber" pulse>
                              <Sparkles size={10} className="mr-1.5" fill="currentColor" />
                              Elite Rank
                           </SpatialBadge>
                        )}
                        <SpatialBadge variant={product.is_active ? 'blue' : 'slate'}>
                           {product.is_active ? 'Broadcast Active' : 'Protocol Hidden'}
                        </SpatialBadge>
                     </div>
                     
                     <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-between">
                        <Link 
                           href={`/products/${product.slug}`} 
                           target="_blank"
                           className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2.5 hover:bg-white hover:text-[#0A1628] transition-all shadow-2xl"
                        >
                           Live Stream <ExternalLink size={14} />
                        </Link>
                        <div className="flex items-center gap-3">
                           <Link 
                              href={`/admin/products/${product.id}`}
                              className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0A1628] shadow-2xl hover:scale-110 transition-transform"
                           >
                              <Edit2 size={18} />
                           </Link>
                           <button 
                              onClick={() => handleDelete(product.id)}
                              className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
                           >
                              <Trash2 size={18} />
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Narrative Infrastructure */}
                  <div className={cn(
                    "p-10 flex-1 flex flex-col",
                    viewMode === 'list' && "justify-center"
                  )}>
                     <div className="mb-8 flex-1">
                        <div className="flex items-center gap-2.5 mb-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#0D95F0]" />
                           <span className="text-[10px] font-black text-[#0D95F0] uppercase tracking-[0.3em]">
                              {product.categories?.name || 'Unmapped Protocol'}
                           </span>
                        </div>
                        <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter leading-tight group-hover:text-[#0D95F0] transition-colors duration-500">
                           {product.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-3">
                           <Database size={12} className="text-slate-300" />
                           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] font-mono opacity-60">
                              SIG: {product.slug.toUpperCase()}
                           </p>
                        </div>
                     </div>

                     <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-full">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Synchronized</span>
                        </div>
                        <Link 
                           href={`/admin/products/${product.id}`}
                           className="flex items-center gap-3 text-[11px] font-black text-[#0A1628] uppercase tracking-[0.2em] group/btn"
                        >
                           Configure Architecture <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </Link>
                     </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
