'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  GripVertical,
  Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'sonner'
import SlideOver from '@/components/admin/SlideOver'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import FormField from '@/components/admin/FormField'
import DragHandle from '@/components/admin/DragHandle'
import { MOCK_CATEGORIES } from '@/lib/mock-data'

interface Category {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  sort_order: number
  is_active: boolean
}

function SortableRow({ 
  category, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: { 
  category: Category
  onEdit: (c: Category) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, active: boolean) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr 
      ref={setNodeRef} 
      style={style}
      className={cn(
        "group border-b border-slate-50 hover:bg-slate-50/50 transition-colors",
        isDragging && "bg-white shadow-lg"
      )}
    >
      <td className="py-4 px-4">
        <DragHandle listeners={listeners} attributes={attributes} />
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#0A1628]">{category.name}</span>
          <span className="text-xs text-slate-400 font-medium">/{category.slug}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-xs text-slate-500 font-medium line-clamp-1 max-w-[200px]">
          {category.tagline || '—'}
        </span>
      </td>
      <td className="py-4 px-4">
        <button
          onClick={() => onToggleActive(category.id, !category.is_active)}
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
            category.is_active 
              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
          )}
        >
          {category.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
          {category.is_active ? 'Active' : 'Hidden'}
        </button>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(category)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0D95F0] hover:bg-[#0D95F0]/5 transition-all"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => onDelete(category.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setCategories(MOCK_CATEGORIES)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      toast.error('Failed to load categories')
    } else {
      setCategories(data || [])
    }
    setLoading(false)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id)
      const newIndex = categories.findIndex((c) => c.id === over.id)

      const newOrder = arrayMove(categories, oldIndex, newIndex)
      setCategories(newOrder)

      // Update sort_order in database
      const updates = newOrder.map((cat, index) => ({
        id: cat.id,
        sort_order: index,
      }))

      const { error } = await supabase.from('categories').upsert(updates)
      if (error) {
        toast.error('Failed to update order')
        fetchCategories() // revert on error
      } else {
        toast.success('Order updated')
      }
    }
  }

  async function handleToggleActive(id: string, active: boolean) {
    const { error } = await supabase
      .from('categories')
      .update({ is_active: active })
      .eq('id', id)

    if (error) {
      toast.error('Update failed')
    } else {
      setCategories(categories.map(c => c.id === id ? { ...c, is_active: active } : c))
      toast.success(active ? 'Category activated' : 'Category hidden')
    }
  }

  async function handleDelete() {
    if (!selectedCategoryId) return
    setSaving(true)
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', selectedCategoryId)

    if (error) {
      toast.error('Delete failed')
    } else {
      setCategories(categories.filter(c => c.id !== selectedCategoryId))
      toast.success('Category deleted')
      setIsDeleteDialogOpen(false)
    }
    setSaving(false)
  }

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      is_active: true,
      sort_order: editingCategory?.id ? editingCategory.sort_order : categories.length
    }

    let result
    if (editingCategory?.id) {
      result = await supabase
        .from('categories')
        .update(data)
        .eq('id', editingCategory.id)
    } else {
      result = await supabase
        .from('categories')
        .insert([data])
    }

    if (result.error) {
      toast.error('Save failed: ' + result.error.message)
    } else {
      toast.success(editingCategory?.id ? 'Category updated' : 'Category created')
      fetchCategories()
      setIsSlideOverOpen(false)
      setEditingCategory(null)
    }
    setSaving(false)
  }

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">Categories</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Manage your product catalog structure</p>
        </div>
        <button 
          onClick={() => {
            setEditingCategory(null)
            setIsSlideOverOpen(true)
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D95F0] hover:bg-[#0b82d4] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0D95F0]/20"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="w-12 py-4 px-4"></th>
                  <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Category</th>
                  <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Tagline</th>
                  <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Status</th>
                  <th className="w-24 py-4 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <Loader2 size={32} className="animate-spin text-[#0D95F0] mx-auto" />
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-slate-400 font-medium">
                      {searchQuery ? 'No categories found matching your search' : 'No categories yet. Click "Add Category" to get started.'}
                    </td>
                  </tr>
                ) : (
                  <SortableContext 
                    items={filteredCategories.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredCategories.map((category) => (
                      <SortableRow 
                        key={category.id} 
                        category={category} 
                        onEdit={(cat) => {
                          setEditingCategory(cat)
                          setIsSlideOverOpen(true)
                        }}
                        onDelete={(id) => {
                          setSelectedCategoryId(id)
                          setIsDeleteDialogOpen(true)
                        }}
                        onToggleActive={handleToggleActive}
                      />
                    ))}
                  </SortableContext>
                )}
              </tbody>
            </table>
          </DndContext>
        </div>
      </div>

      {/* Add/Edit SlideOver */}
      <SlideOver
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        description={editingCategory ? 'Update existing category details' : 'Create a new product category'}
      >
        <form onSubmit={handleSaveCategory} className="space-y-6">
          <FormField label="Category Name" required>
            <input 
              name="name"
              defaultValue={editingCategory?.name || ''}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium"
              placeholder="e.g. LED Display Systems"
              onBlur={(e) => {
                const name = e.target.value
                const slugInput = (e.target.form as HTMLFormElement).elements.namedItem('slug') as HTMLInputElement
                if (slugInput && !slugInput.value) {
                  slugInput.value = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }
              }}
            />
          </FormField>

          <FormField label="Slug (URL Path)" required helperText="Auto-generated from name. Use lowercase and hyphens.">
            <input 
              name="slug"
              defaultValue={editingCategory?.slug || ''}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium bg-slate-50 focus:bg-white"
              placeholder="e.g. led-display-systems"
            />
          </FormField>

          <FormField label="Tagline">
            <input 
              name="tagline"
              defaultValue={editingCategory?.tagline || ''}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium"
              placeholder="Short catchy phrase"
            />
          </FormField>

          <FormField label="Description">
            <textarea 
              name="description"
              defaultValue={editingCategory?.description || ''}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium resize-none"
              placeholder="Describe what this category covers..."
            />
          </FormField>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsSlideOverOpen(false)}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-[#0D95F0] text-white text-sm font-bold hover:bg-[#0b82d4] transition-all shadow-lg shadow-[#0D95F0]/20 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </SlideOver>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        loading={saving}
        title="Delete Category"
        description="Are you sure you want to delete this category? This will also affect products linked to it."
      />
    </div>
  )
}
