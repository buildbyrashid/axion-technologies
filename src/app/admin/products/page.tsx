'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Plus, Search, Edit2, Trash2, Loader2, Package, Eye,
  SlidersHorizontal, AlertCircle, Star, Check, Database, HelpCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import AxionLoader from '@/components/ui/AxionLoader'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  category_id: string
  subcategory_id: string | null
  category_name: string | null
  is_active: boolean
  is_featured: boolean
  featured_image: string | null
  created_at: string
}

interface Category {
  id: string
  name: string
  parent_id?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ])
      const [pJson, cJson] = await Promise.all([productsRes.json(), categoriesRes.json()])
      if (pJson.success) setProducts(pJson.data)
      else toast.error('Failed to load products')
      if (cJson.success) setCategories(cJson.data)
      else toast.error('Failed to load categories')
    } catch { toast.error('Connection error') }
    setLoading(false)
  }

  async function handleToggleActive(id: string, active: boolean) {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: active }),
      })
      const json = await res.json()
      if (json.success) {
        setProducts(products.map(p => p.id === id ? { ...p, is_active: active } : p))
        toast.success(active ? 'Product set to Active' : 'Product set to Inactive')
      } else { toast.error('Update failed') }
    } catch { toast.error('Connection failure') }
  }

  async function confirmDeleteProduct() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) {
        setProducts(products.filter(p => p.id !== deleteTarget.id))
        toast.success('Product deleted successfully')
        setDeleteTarget(null)
      } else {
        toast.error('Delete failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('Connection error')
    } finally {
      setDeleting(false)
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                            p.category_id === selectedCategory ||
                            p.subcategory_id === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-12 pb-24 text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[1.5rem] bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] shadow-inner">
                 <Package size={24} />
              </div>
              <SpatialBadge variant="blue">Products Manager</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">Products Directory</h1>
           <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">Create, edit, and organize the hardware products showcasing our 20+ years of industry experience.</p>
        </div>
        
        <Link 
          href="/admin/products/new"
          className="group relative px-10 py-5 bg-[#0A1628] text-white rounded-[2.5rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms]" />
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add New Product
        </Link>
      </div>

      {/* Control Console */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/40 backdrop-blur-3xl p-6 rounded-[1.75rem] border border-black/5 shadow-sm">
         <div className="relative flex-1 max-w-xl group">
            <div className="absolute inset-0 bg-[#0D95F0]/5 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
            <input 
               type="text" 
               placeholder="Search products..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="relative w-full pl-16 pr-8 py-5 rounded-[2rem] border border-black/5 bg-white shadow-sm focus:shadow-2xl focus:shadow-[#0D95F0]/10 outline-none transition-all text-sm font-black tracking-tight placeholder:text-slate-300"
            />
         </div>

         <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-3">
               <SlidersHorizontal size={18} className="absolute left-5 text-slate-300 pointer-events-none" />
               <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-black/5 rounded-[2rem] pl-14 pr-12 py-5 text-[10px] sm:text-xs font-black text-[#0A1628] uppercase tracking-widest focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all cursor-pointer w-full max-w-xs appearance-none shadow-sm hover:shadow-lg truncate"
               >
                  <option value="all">All Categories</option>
                  {categories.filter(c => !c.parent_id).map(mainCat => (
                     <optgroup key={mainCat.id} label={mainCat.name} className="font-black text-[#0A1628] bg-slate-50 py-2">
                        <option value={mainCat.id} className="font-bold text-slate-700 bg-white py-1">All {mainCat.name}</option>
                        {categories.filter(c => c.parent_id === mainCat.id).map(subCat => (
                           <option key={subCat.id} value={subCat.id} className="font-medium text-slate-500 bg-white py-1 ml-4">&nbsp;&nbsp;— {subCat.name}</option>
                        ))}
                     </optgroup>
                  ))}
               </select>
            </div>
         </div>
      </div>

      {/* Corporate Data Table Container */}
      <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm">
        {loading ? (
          <AxionLoader message="Loading products..." className="py-32" />
        ) : filteredProducts.length === 0 ? (
          <div className="py-32 text-center">
            <Package size={64} className="text-slate-300 mx-auto mb-6 opacity-40" />
            <p className="text-slate-500 font-bold tracking-tight text-xl">No matching products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="py-6 px-8 w-24">Image</th>
                  <th className="py-6 px-6">Product Details</th>
                  <th className="py-6 px-6">Category</th>
                  <th className="py-6 px-6 w-36">Status</th>
                  <th className="py-6 px-8 w-44 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr 
                    key={product.id}
                    className="hover:bg-slate-50/50 transition-colors duration-200 group"
                  >
                    {/* Thumbnail Column */}
                    <td className="py-6 px-8">
                      <div className="relative w-14 h-14 bg-slate-900 border border-slate-100 overflow-hidden flex items-center justify-center">
                        {product.featured_image ? (
                          <Image 
                            src={product.featured_image} 
                            alt={product.name} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <Package size={20} className="text-slate-600" />
                        )}
                      </div>
                    </td>

                    {/* Product Details Column */}
                    <td className="py-6 px-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-black text-slate-800 tracking-tight group-hover:text-[#0D95F0] transition-colors">
                            {product.name}
                          </span>
                          {product.is_featured && (
                            <span className="px-2 py-0.5 bg-amber-50 border border-amber-100 text-amber-600 text-[9px] font-black uppercase tracking-wider rounded-md flex items-center gap-1">
                              <Star size={8} fill="currentColor" />
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Database size={10} className="text-slate-300" />
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                            /{product.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0D95F0]" />
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
                          {product.category_name || 'Uncategorized'}
                        </span>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-6 px-6">
                      <button
                        onClick={() => handleToggleActive(product.id, !product.is_active)}
                        className="focus:outline-none"
                      >
                        <SpatialBadge 
                          variant={product.is_active ? 'blue' : 'slate'}
                          pulse={product.is_active}
                        >
                          {product.is_active ? 'Active' : 'Inactive'}
                        </SpatialBadge>
                      </button>
                    </td>

                    {/* Actions Column */}
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/product/${product.slug}`} 
                          target="_blank"
                          className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-white hover:text-[#0D95F0] hover:shadow-md border border-slate-200/50 flex items-center justify-center text-slate-500 transition-all hover:scale-105"
                          title="View Detail (Live)"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-white hover:text-emerald-500 hover:shadow-md border border-slate-200/50 flex items-center justify-center text-slate-500 transition-all hover:scale-105"
                          title="Edit Product"
                        >
                          <Edit2 size={15} />
                        </Link>
                        <button 
                          onClick={() => setDeleteTarget({ id: product.id, name: product.name })}
                          className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-white hover:text-rose-500 hover:shadow-md border border-slate-200/50 flex items-center justify-center text-slate-500 transition-all hover:scale-105"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Drawer */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
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
                <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">Delete Product</h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-slate-800">"{deleteTarget.name}"</strong>? This action cannot be undone.
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
                  disabled={deleting}
                  onClick={confirmDeleteProduct}
                  className="flex-1 h-12 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-rose-900/10 flex items-center justify-center gap-2"
                >
                  {deleting ? <Loader2 size={16} className="animate-spin" /> : null}
                  CONFIRM DELETE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
