'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Search, Edit2, Trash2, Loader2,
  FolderTree, Activity, Hash, Layers, Zap,
  ChevronDown, ChevronRight, AlertCircle, Check
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SpatialDrawer from '@/components/ui/SpatialDrawer'
import SpatialBadge from '@/components/ui/SpatialBadge'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  parent_id: string | null
  sort_order: number
  is_active: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null)
  const [saving, setSaving] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => { fetchCategories() }, [])

  async function fetchCategories() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/categories')
      const json = await res.json()
      if (json.success) {
        setCategories(json.data)
        // Expand all by default
        const expandMap: Record<string, boolean> = {}
        json.data.forEach((c: Category) => {
          if (!c.parent_id) {
            expandMap[c.id] = true
          }
        })
        setExpandedCategories(expandMap)
      } else {
        toast.error('Failed to load categories')
      }
    } catch {
      toast.error('Connection error')
    }
    setLoading(false)
  }

  const toggleExpand = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }))
  }

  async function handleToggleActive(id: string, active: boolean) {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: active }),
      })
      const json = await res.json()
      if (json.success) {
        setCategories(categories.map(c => c.id === id ? { ...c, is_active: active } : c))
        toast.success(active ? 'Category activated' : 'Category deactivated')
      } else {
        toast.error('Update failed')
      }
    } catch {
      toast.error('Connection failure')
    }
  }

  async function confirmDeleteCategory() {
    if (!deleteTarget) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) {
        setCategories(categories.filter(c => c.id !== deleteTarget.id))
        toast.success('Taxonomy layer removed successfully')
        setDeleteTarget(null)
      } else {
        toast.error('Delete failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('Connection error')
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const name = formData.get('name') as string
    // Automatically generate clean URL slug from the name
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

    const payload = {
      name,
      slug,
      tagline: name, // Default tagline as the name itself for simplicity
      description: (formData.get('description') as string) || null,
      parent_id: (formData.get('parent_id') as string) || null,
      is_active: formData.get('is_active') === '1',
      sort_order: editingCategory?.id ? (editingCategory.sort_order ?? 0) : categories.length,
    }

    const isEdit = !!editingCategory?.id
    try {
      const res = await fetch(
        isEdit ? `/api/admin/categories/${editingCategory!.id}` : '/api/admin/categories',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      const json = await res.json()
      if (json.success) {
        toast.success(isEdit ? 'Category updated successfully' : 'New category created successfully')
        fetchCategories()
        setIsDrawerOpen(false)
        setEditingCategory(null)
      } else {
        toast.error('Save failed: ' + (json.error || 'Unknown error'))
      }
    } catch {
      toast.error('Connection error saving category')
    } finally {
      setSaving(false)
    }
  }

  // Filter main categories and subcategories
  const mainCategories = categories.filter(c => !c.parent_id && (
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  ))

  const subCategories = categories.filter(c => !!c.parent_id)

  const openNewSubCategoryDrawer = (parentCategoryId: string) => {
    setEditingCategory({
      parent_id: parentCategoryId,
      is_active: true
    })
    setIsDrawerOpen(true)
  }

  // Find parent category name if editing/creating a subcategory
  const parentCategory = categories.find(c => c.id === editingCategory?.parent_id)
  const isSubCategory = !!editingCategory?.parent_id
  const isEdit = !!editingCategory?.id

  let drawerTitle = ''
  let drawerDescription = ''

  if (isSubCategory) {
    drawerTitle = isEdit ? 'Edit Sub-Category' : 'Create Sub-Category'
    drawerDescription = parentCategory 
      ? `Add a new sub-category under "${parentCategory.name}".` 
      : 'Add a new sub-category layer to the navigation.'
  } else {
    drawerTitle = isEdit ? 'Edit Main Category' : 'Create Main Category'
    drawerDescription = isEdit 
      ? 'Update main category name and metadata.' 
      : 'Add a new main category layer to the navigation.'
  }

  return (
    <div className="space-y-12 pb-24 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <FolderTree size={20} />
            </div>
            <SpatialBadge variant="blue">Navigation Structure</SpatialBadge>
          </div>
          <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Product Categories</h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">Manage the categories and sub-categories that will display on the website navigation and products catalog.</p>
        </div>
        <button 
          onClick={() => { setEditingCategory({ parent_id: null, is_active: true }); setIsDrawerOpen(true) }}
          className="px-10 py-5 bg-[#0A1628] hover:bg-[#0A1628]/95 text-white rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/10 shrink-0"
        >
          <Plus size={20} />
          Add Main Category
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <div className="absolute inset-0 bg-[#0D95F0]/5 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <Search size={22} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="relative w-full pl-16 pr-8 py-6 rounded-[2rem] border border-black/5 bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-base font-bold tracking-tight shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 px-8 py-4 bg-white border border-black/5 rounded-[1.5rem] shadow-sm shrink-0">
          <Activity size={18} className="text-[#0D95F0]" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{categories.length} Total Categories</span>
        </div>
      </div>

      {/* Main Categories Tree Grid */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-32 flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Booting Taxonomy...</p>
          </div>
        ) : mainCategories.length === 0 ? (
          <div className="py-32 flex flex-col items-center gap-8 bg-white rounded-[1.75rem] border border-black/5 border-dashed opacity-40">
            <Layers size={64} className="text-slate-300" />
            <p className="text-slate-500 font-bold tracking-tight text-xl">Zero structural layers detected.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {mainCategories.map((mainCat) => {
              const mainSubs = subCategories.filter(sub => sub.parent_id === mainCat.id)
              const isExpanded = !!expandedCategories[mainCat.id]

              return (
                <div 
                  key={mainCat.id}
                  className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#0D95F0]/2 transition-all duration-500"
                >
                  {/* Category Header Row */}
                  <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/50 border-b border-slate-100">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <button 
                        onClick={() => toggleExpand(mainCat.id)}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all shrink-0"
                      >
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>

                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0">
                        <Hash size={18} />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-black text-[#0A1628] tracking-tighter truncate">{mainCat.name}</h3>
                          <span className="text-[10px] font-black bg-[#0D95F0]/10 text-[#0D95F0] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Main
                          </span>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic truncate">/{mainCat.slug}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 sm:self-center">
                      <button
                        onClick={() => openNewSubCategoryDrawer(mainCat.id)}
                        className="h-10 px-4 bg-white hover:bg-slate-50 text-[#0D95F0] border border-[#0D95F0]/20 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        <Plus size={14} />
                        Add Sub-Category
                      </button>

                      <SpatialBadge 
                        variant={mainCat.is_active ? 'blue' : 'slate'}
                        onClick={() => handleToggleActive(mainCat.id, !mainCat.is_active)}
                        pulse={mainCat.is_active}
                      >
                        {mainCat.is_active ? 'Online' : 'Deactivated'}
                      </SpatialBadge>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { setEditingCategory(mainCat); setIsDrawerOpen(true) }}
                          className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 text-[#0D95F0] hover:bg-white hover:shadow-lg flex items-center justify-center transition-all hover:scale-105"
                          title="Edit Main Category"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => setDeleteTarget({ id: mainCat.id, name: mainCat.name })}
                          className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 text-rose-500 hover:bg-white hover:shadow-lg flex items-center justify-center transition-all hover:scale-105"
                          title="Delete Main Category"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sub-categories List area */}
                  {isExpanded && (
                    <div className="p-6 bg-white space-y-4">
                      {mainSubs.length === 0 ? (
                        <div className="py-8 text-center text-slate-400 text-xs font-bold italic">
                          No sub-categories created under this category.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mainSubs.map((sub) => (
                            <div 
                              key={sub.id}
                              className="p-5 border border-slate-100 rounded-xl bg-slate-50/30 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                                  L2
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <h4 className="text-sm font-black text-slate-700 truncate tracking-tight">{sub.name}</h4>
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">/{sub.slug}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <SpatialBadge 
                                  variant={sub.is_active ? 'blue' : 'slate'}
                                  onClick={() => handleToggleActive(sub.id, !sub.is_active)}
                                  pulse={sub.is_active}
                                >
                                  {sub.is_active ? 'Live' : 'Draft'}
                                </SpatialBadge>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <button 
                                    onClick={() => { setEditingCategory(sub); setIsDrawerOpen(true) }}
                                    className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 text-[#0D95F0] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                                    title="Edit Subcategory"
                                  >
                                    <Edit2 size={12} />
                                  </button>
                                  <button 
                                    onClick={() => setDeleteTarget({ id: sub.id, name: sub.name })}
                                    className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 text-rose-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
                                    title="Delete Subcategory"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Deployment Drawer */}
      <SpatialDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={drawerTitle}
        description={drawerDescription}
      >
        <form onSubmit={handleSaveCategory} className="space-y-8 py-6">
          <input type="hidden" name="parent_id" value={editingCategory?.parent_id || ''} />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              {isSubCategory ? 'Sub-Category Name' : 'Category Name'}
            </label>
            <input 
              name="name" 
              defaultValue={editingCategory?.name || ''} 
              required
              className="w-full px-6 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight"
              placeholder={isSubCategory ? "e.g. Indoor Rental LED Displays" : "e.g. LED DISPLAY SYSTEMS"}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Description</label>
            <textarea 
              name="description" 
              defaultValue={editingCategory?.description || ''} 
              rows={5}
              className="w-full px-6 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight resize-none leading-relaxed"
              placeholder="Write a brief category description or SEO meta summary..."
            />
          </div>

          <input type="hidden" name="is_active" defaultValue={editingCategory?.is_active !== false ? '1' : '0'} />
          <div className="pt-6 flex items-center gap-4">
             <button
              type="submit" 
              onClick={(e) => { (e.currentTarget.form!.elements.namedItem('is_active') as HTMLInputElement).value = '0'; }}
              disabled={saving}
              className="flex-1 py-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Save Draft
            </button>
            <button
              type="submit" 
              onClick={(e) => { (e.currentTarget.form!.elements.namedItem('is_active') as HTMLInputElement).value = '1'; }}
              disabled={saving}
              className="flex-[2] py-4 rounded-[2.5rem] bg-[#0A1628] text-white text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/20 disabled:opacity-60 flex items-center justify-center gap-3 group"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} className="text-[#0D95F0] group-hover:text-white transition-colors" />}
              {editingCategory?.id ? 'Publish Changes' : (isSubCategory ? 'Publish Sub-Category' : 'Publish Category')}
            </button>
          </div>
        </form>
      </SpatialDrawer>

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
                <h3 className="text-xl font-bold text-[#0A1628] tracking-tight">Delete Category</h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">
                  Are you sure you want to delete <strong className="text-slate-800">"{deleteTarget.name}"</strong>? This will permanently remove it from the database and site navigation.
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
                  onClick={confirmDeleteCategory}
                  className="flex-1 h-12 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-rose-900/10"
                >
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
