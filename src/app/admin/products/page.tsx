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
  Star
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import StatusBadge from '@/components/admin/StatusBadge'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data'

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
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
    const { error } = await supabase
      .from('products')
      .update({ is_active: active })
      .eq('id', id)

    if (error) {
      toast.error('Update failed')
    } else {
      setProducts(products.map(p => p.id === id ? { ...p, is_active: active } : p))
      toast.success(active ? 'Product activated' : 'Product hidden')
    }
  }

  async function handleDelete() {
    if (!selectedProductId) return
    setSaving(true)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', selectedProductId)

    if (error) {
      toast.error('Delete failed')
    } else {
      setProducts(products.filter(p => p.id !== selectedProductId))
      toast.success('Product deleted')
      setIsDeleteDialogOpen(false)
    }
    setSaving(false)
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">Products</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage your enterprise product catalog</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20 active:scale-95"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#0D95F0] outline-none transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-xs font-bold text-slate-400 uppercase tracking-widest">
            {filteredProducts.length} Products Found
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-6 w-16 text-center">#</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Product Info</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Category</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Status</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Featured</th>
                <th className="w-24 py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={32} className="animate-spin text-[#0D95F0]" />
                      <span className="text-sm text-slate-400 font-medium">Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200">
                        <Package size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 font-bold">No products found</p>
                        <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => {
                  const primaryImage = product.product_images.find(img => img.is_primary) || product.product_images[0]
                  
                  return (
                    <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-center text-xs font-bold text-slate-300">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-4 px-4 min-w-[280px]">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                            {primaryImage ? (
                              <Image 
                                src={primaryImage.image_url} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Package size={20} />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-[#0A1628] truncate">{product.name}</span>
                            <span className="text-[11px] text-slate-400 font-medium truncate italic tracking-tight">/{product.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#0A1628] text-[10px] font-bold w-fit">
                            {product.categories?.name || 'Uncategorized'}
                          </span>
                          {product.subcategories && (
                            <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-tight">
                              ↳ {product.subcategories.name}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => handleToggleActive(product.id, !product.is_active)}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all",
                            product.is_active 
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          )}
                        >
                          {product.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                          {product.is_active ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        {product.is_featured ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider border border-amber-100/50">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-300 font-bold uppercase tracking-widest ml-4">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/products/${product.slug}`} 
                            target="_blank"
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0D95F0] hover:bg-[#0D95F0]/5 transition-all"
                            title="Preview on site"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <Link 
                            href={`/admin/products/${product.id}`}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#0D95F0] hover:bg-[#0D95F0]/5 transition-all"
                            title="Edit product"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button 
                            onClick={() => {
                              setSelectedProductId(product.id)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        loading={saving}
        title="Delete Product"
        description="Are you sure you want to permanently delete this product? All related specifications, images, and files will also be removed."
      />
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
