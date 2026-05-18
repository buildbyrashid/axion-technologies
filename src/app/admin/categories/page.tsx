'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Search, Edit2, Trash2, GripVertical, Loader2,
  FolderTree, Activity, Hash, Layers, Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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
  sort_order: number
  is_active: boolean
}

function SortableCategoryItem({ 
  category, onEdit, onDelete, onToggleActive 
}: { 
  category: Category
  onEdit: (c: Category) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, active: boolean) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id })
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 50 : 0 }

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={cn(
        "group relative flex items-center gap-6 p-6 bg-white rounded-[1.5rem] border border-black/5 transition-all duration-500",
        isDragging ? "shadow-2xl shadow-black/10 opacity-60 scale-[1.02]" : "hover:shadow-xl hover:shadow-[#0D95F0]/5"
      )}
    >
      <div 
        {...attributes} {...listeners}
        className="w-12 h-12 rounded-2xl bg-slate-50 border border-black/5 flex items-center justify-center text-slate-300 hover:text-[#0D95F0] hover:bg-white hover:shadow-lg transition-all cursor-grab active:cursor-grabbing shrink-0"
      >
        <GripVertical size={20} />
      </div>

      <div className="flex-1 flex items-center gap-6 min-w-0">
        <div className="w-14 h-14 rounded-[1.25rem] bg-slate-950 text-white flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Hash size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-xl font-black text-[#0A1628] tracking-tighter truncate group-hover:text-[#0D95F0] transition-colors">{category.name}</h3>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic truncate">/{category.slug}</p>
        </div>
      </div>

      <div className="hidden lg:block flex-1 min-w-0 px-4">
        <p className="text-sm text-slate-400 font-bold tracking-tight line-clamp-1 italic">
          {category.tagline || '— System Default Architecture —'}
        </p>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        <SpatialBadge 
          variant={category.is_active ? 'blue' : 'slate'}
          onClick={() => onToggleActive(category.id, !category.is_active)}
          pulse={category.is_active}
        >
          {category.is_active ? 'Online' : 'Encrypted'}
        </SpatialBadge>

        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={() => onEdit(category)}
            className="w-12 h-12 rounded-2xl bg-white border border-black/5 text-[#0D95F0] shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(category.id)}
            className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 border border-black/5 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <Layers size={120} />
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => { fetchCategories() }, [])

  async function fetchCategories() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/categories')
      const json = await res.json()
      if (json.success) setCategories(json.data)
      else toast.error('Failed to load categories')
    } catch {
      toast.error('Connection error')
    }
    setLoading(false)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex(c => c.id === active.id)
      const newIndex = categories.findIndex(c => c.id === over.id)
      const newOrder = arrayMove(categories, oldIndex, newIndex)
      setCategories(newOrder)

      const updates = newOrder.map((cat, index) => ({ id: cat.id, sort_order: index }))
      const res = await fetch('/api/admin/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })
      const json = await res.json()
      if (json.success) toast.success('Architecture Optimized')
      else { toast.error('Failed to update order'); fetchCategories() }
    }
  }

  async function handleToggleActive(id: string, active: boolean) {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: active }),
    })
    const json = await res.json()
    if (json.success) {
      setCategories(categories.map(c => c.id === id ? { ...c, is_active: active } : c))
      toast.success(active ? 'Layer Synced' : 'Layer Encrypted')
    } else {
      toast.error('Update failed')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Decommission this architectural layer?')) return
    setSaving(true)
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (json.success) {
      setCategories(categories.filter(c => c.id !== id))
      toast.success('Layer Purged')
    } else {
      toast.error('Decommission failed')
    }
    setSaving(false)
  }

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const payload = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      tagline: (formData.get('tagline') as string) || null,
      description: (formData.get('description') as string) || null,
      is_active: editingCategory?.id ? (editingCategory.is_active ?? true) : true,
      sort_order: editingCategory?.id ? (editingCategory.sort_order ?? 0) : categories.length,
    }

    const isEdit = !!editingCategory?.id
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
      toast.success(isEdit ? 'Architecture Refined' : 'New Layer Deployed')
      fetchCategories()
      setIsDrawerOpen(false)
      setEditingCategory(null)
    } else {
      toast.error('Save failed: ' + (json.error || 'Unknown error'))
    }
    setSaving(false)
  }

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
              <FolderTree size={20} />
            </div>
            <SpatialBadge variant="blue" pulse>Catalog Architecture</SpatialBadge>
          </div>
          <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter">Taxonomy & Clusters</h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">Configure the hierarchical metadata structure for the enterprise asset grid.</p>
        </div>
        <button 
          onClick={() => { setEditingCategory(null); setIsDrawerOpen(true) }}
          className="px-10 py-5 bg-[#0A1628] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-black/10 shrink-0"
        >
          <Plus size={24} />
          Deploy New Layer
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <div className="absolute inset-0 bg-[#0D95F0]/5 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <Search size={22} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
          <input 
            type="text" placeholder="Identify layers by signature..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="relative w-full pl-16 pr-8 py-6 rounded-[2rem] border border-black/5 bg-white focus:ring-8 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-base font-bold tracking-tight shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 px-8 py-4 bg-white border border-black/5 rounded-[1.5rem] shadow-sm shrink-0">
          <Activity size={18} className="text-[#0D95F0]" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{filteredCategories.length} Layers Verified</span>
        </div>
      </div>

      <div className="space-y-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {loading ? (
            <div className="py-32 flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Booting Taxonomy...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="py-32 flex flex-col items-center gap-8 bg-white rounded-[1.75rem] border border-black/5 border-dashed opacity-40">
              <Layers size={64} className="text-slate-300" />
              <p className="text-slate-500 font-bold tracking-tight text-xl">Zero structural layers detected.</p>
            </div>
          ) : (
            <SortableContext items={filteredCategories.map(c => c.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredCategories.map(category => (
                    <SortableCategoryItem 
                      key={category.id} category={category}
                      onEdit={cat => { setEditingCategory(cat); setIsDrawerOpen(true) }}
                      onDelete={handleDelete}
                      onToggleActive={handleToggleActive}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          )}
        </DndContext>
      </div>

      <SpatialDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingCategory ? 'Refine Structural Layer' : 'Deploy New Architecture'}
        description={editingCategory ? 'Modifying existing catalog metadata signature.' : 'Configuring a new hierarchical asset cluster.'}
      >
        <form onSubmit={handleSaveCategory} className="space-y-8 py-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Layer Designation</label>
            <input 
              name="name" defaultValue={editingCategory?.name || ''} required
              className="w-full px-6 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight"
              placeholder="e.g. Holographic Displays"
              onBlur={e => {
                const slugInput = (e.target.form as HTMLFormElement).elements.namedItem('slug') as HTMLInputElement
                if (slugInput && !slugInput.value) slugInput.value = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Slug Signature</label>
            <input 
              name="slug" defaultValue={editingCategory?.slug || ''} required
              className="w-full px-6 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold font-mono tracking-tight"
              placeholder="e.g. holographic-displays"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Tagline</label>
            <input 
              name="tagline" defaultValue={editingCategory?.tagline || ''}
              className="w-full px-6 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight"
              placeholder="Short catchy technical phrase"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Metadata Description</label>
            <textarea 
              name="description" defaultValue={editingCategory?.description || ''} rows={5}
              className="w-full px-6 py-5 rounded-2xl border border-black/5 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-[#0D95F0]/5 focus:border-[#0D95F0]/20 outline-none transition-all text-sm font-bold tracking-tight resize-none leading-relaxed"
              placeholder="Detailed technical specifications of this cluster layer..."
            />
          </div>
          <div className="pt-6">
            <button
              type="submit" disabled={saving}
              className="w-full py-6 rounded-[2.5rem] bg-[#0A1628] text-white text-sm font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/20 disabled:opacity-60 flex items-center justify-center gap-4"
            >
              {saving ? <Loader2 size={24} className="animate-spin" /> : <Zap size={24} className="text-[#0D95F0]" />}
              {editingCategory ? 'Commit Protocol Changes' : 'Initialize Global Deployment'}
            </button>
          </div>
        </form>
      </SpatialDrawer>
    </div>
  )
}
