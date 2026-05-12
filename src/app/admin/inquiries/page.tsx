'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Mail, 
  Building2, 
  Globe2, 
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  ArrowUpRight,
  User,
  Phone,
  FileText,
  Loader2,
  X,
  Star
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import StatusBadge from '@/components/admin/StatusBadge'
import SlideOver from '@/components/admin/SlideOver'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { MOCK_INQUIRIES } from '@/lib/mock-data'

interface Inquiry {
  id: string
  full_name: string
  email: string
  phone: string | null
  company: string | null
  country: string | null
  subject: string | null
  message: string
  status: 'new' | 'contacted' | 'read' | 'replied' | 'closed' | 'archived'
  created_at: string
}

export default function InquiriesPage() {
  const supabase = createClient()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setInquiries(MOCK_INQUIRIES as any)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) toast.error('Failed to load inquiries')
    else setInquiries(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update status')
    } else {
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: status as any } : inq))
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: status as any })
      }
      toast.success(`Inquiry marked as ${status}`)
    }
    setUpdating(false)
  }

  async function handleDelete() {
    if (!idToDelete) return
    setUpdating(true)
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', idToDelete)

    if (error) {
      toast.error('Delete failed')
    } else {
      setInquiries(inquiries.filter(inq => inq.id !== idToDelete))
      toast.success('Inquiry deleted')
      setIsDeleteDialogOpen(false)
    }
    setUpdating(false)
  }

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    
    const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">Lead Inquiries</h1>
        <p className="text-slate-400 text-sm font-medium mt-1">Manage incoming business requests and client communications</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search inquiries..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/5 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#0D95F0] outline-none transition-all"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="contacted">Contacted</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-6 w-16">#</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Contact</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Subject</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Status</th>
                <th className="text-xs font-bold text-slate-400 uppercase tracking-widest py-4 px-4">Received</th>
                <th className="w-24 py-4 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                     <Loader2 size={32} className="animate-spin text-[#0D95F0] mx-auto mb-2" />
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Fetching Inquiries...</p>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200">
                        <MessageSquare size={32} />
                      </div>
                      <p className="text-slate-400 font-medium">No inquiries found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq, index) => {
                  const isHot = inq.status === 'new' && (inq.company?.length ?? 0) > 3
                  return (
                    <motion.tr 
                      key={inq.id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => {
                        setSelectedInquiry(inq)
                        setIsSlideOverOpen(true)
                        if (inq.status === 'new') updateStatus(inq.id, 'read')
                      }}
                      className="group hover:bg-[#0D95F0]/[0.02] cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                    >
                      <td className="py-4 px-6 text-xs font-bold text-slate-300">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0A1628]">{inq.full_name}</span>
                          <span className="text-[11px] text-slate-400 font-medium">{inq.company || 'Private Individual'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs text-slate-500 font-medium line-clamp-1 max-w-[200px]">
                          {inq.subject || 'General Inquiry'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <StatusBadge status={inq.status as any} />
                          {inq.status === 'new' && (
                            <span className="w-2 h-2 rounded-full bg-[#0D95F0] animate-pulse" />
                          )}
                          {isHot && (
                             <div className="flex items-center gap-1 text-[10px] font-extrabold text-amber-500 uppercase tracking-tight">
                                <Star size={10} fill="currentColor" />
                                Hot Lead
                             </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                          <Clock size={12} />
                          {formatDate(inq.created_at)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#0D95F0] bg-[#0D95F0]/5 border border-[#0D95F0]/10"
                            >
                              <ArrowUpRight size={16} />
                            </button>
                         </div>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail SlideOver */}
      <SlideOver
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title="Inquiry Details"
        description="Review lead information and update status"
        wide
      >
        {selectedInquiry && (
          <div className="space-y-8">
             {/* Status Header */}
             <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0D95F0] shadow-sm">
                      <MessageSquare size={20} />
                   </div>
                   <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</div>
                      <StatusBadge status={selectedInquiry.status as any} className="text-[11px] px-3 py-1.5" />
                   </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <select 
                     value={selectedInquiry.status}
                     onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                     disabled={updating}
                     className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-[#0A1628] outline-none shadow-sm focus:border-[#0D95F0]"
                   >
                     <option value="new">Mark as New</option>
                     <option value="read">Mark as Read</option>
                     <option value="contacted">Mark as Contacted</option>
                     <option value="replied">Mark as Replied</option>
                     <option value="closed">Mark as Closed</option>
                     <option value="archived">Archive Inquiry</option>
                   </select>
                </div>
             </div>

             {/* Contact Details Grid */}
             <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: User, label: 'Full Name', value: selectedInquiry.full_name },
                  { icon: Mail, label: 'Email Address', value: selectedInquiry.email, link: `mailto:${selectedInquiry.email}` },
                  { icon: Phone, label: 'Phone Number', value: selectedInquiry.phone || '—' },
                  { icon: Building2, label: 'Company', value: selectedInquiry.company || '—' },
                  { icon: Globe2, label: 'Country', value: selectedInquiry.country || '—' },
                  { icon: Calendar, label: 'Received On', value: formatDate(selectedInquiry.created_at) },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1 text-slate-400">
                      <item.icon size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                    </div>
                    {item.link ? (
                      <a href={item.link} className="text-sm font-bold text-[#0D95F0] hover:underline">{item.value}</a>
                    ) : (
                      <div className="text-sm font-bold text-[#0A1628]">{item.value}</div>
                    )}
                  </div>
                ))}
             </div>

             {/* Message Content */}
             <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <FileText size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Inquiry Message</span>
                </div>
                <div className="p-6 rounded-[2rem] bg-white border border-slate-100 text-sm leading-relaxed text-slate-600 font-medium shadow-sm">
                   <div className="font-bold text-[#0A1628] mb-4 text-base">{selectedInquiry.subject || 'General Inquiry'}</div>
                   {selectedInquiry.message.split('\n').map((para, i) => (
                     <p key={i} className={i > 0 ? 'mt-3' : ''}>{para}</p>
                   ))}
                </div>
             </div>

             {/* Bottom Actions */}
             <div className="flex justify-end gap-3 pt-6">
                <button
                  onClick={() => {
                    setIdToDelete(selectedInquiry.id)
                    setIsDeleteDialogOpen(true)
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 text-xs font-bold transition-all"
                >
                  <Trash2 size={14} />
                  Delete Permanently
                </button>
             </div>
          </div>
        )}
      </SlideOver>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        loading={updating}
        title="Delete Inquiry"
        description="Are you sure you want to delete this inquiry? This action cannot be undone."
      />
    </div>
  )
}
