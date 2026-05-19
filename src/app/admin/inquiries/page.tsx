'use client'

import { useState, useEffect } from 'react'
import { 
  MessageSquare, Search, Trash2, Mail, Building2, Globe2, Calendar,
  ArrowUpRight, Phone, Loader2, X, Star, Activity, UserCircle, Zap,
  SlidersHorizontal, Send
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import SpatialDrawer from '@/components/ui/SpatialDrawer'
import SpatialBadge from '@/components/ui/SpatialBadge'
import { cn } from '@/lib/utils'

interface Inquiry {
  id: string
  name: string
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
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => { fetchInquiries() }, [])

  async function fetchInquiries() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/inquiries')
      const json = await res.json()
      if (json.success) setInquiries(json.data)
      else toast.error('Failed to load inquiries')
    } catch {
      toast.error('Connection error')
    }
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const json = await res.json()
    if (json.success) {
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: status as any } : inq))
      if (selectedInquiry?.id === id) setSelectedInquiry({ ...selectedInquiry, status: status as any })
      toast.success(`Inquiry marked as ${status}`)
    } else {
      toast.error('Failed to update status')
    }
    setUpdating(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this inquiry permanently?')) return
    setUpdating(true)
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (json.success) {
      setInquiries(inquiries.filter(inq => inq.id !== id))
      toast.success('Inquiry deleted')
      setIsDrawerOpen(false)
    } else {
      toast.error('Delete failed')
    }
    setUpdating(false)
  }

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch =
      inq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'blue'
      case 'read': return 'slate'
      case 'contacted': return 'amber'
      case 'replied': return 'emerald'
      default: return 'slate'
    }
  }

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.5rem] bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] shadow-inner">
              <MessageSquare size={24} />
            </div>
            <SpatialBadge variant="blue" pulse>Client Relations</SpatialBadge>
          </div>
          <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">Client Inquiries</h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed italic">Global business inquiries and corporate communications.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/40 backdrop-blur-3xl p-6 rounded-[1.75rem] border border-black/5 shadow-2xl shadow-black/[0.02]">
        <div className="relative flex-1 max-w-xl group">
          <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
          <input 
            type="text" placeholder="Search by client name, email, or company..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="relative w-full pl-16 pr-8 py-5 rounded-[2rem] border border-black/5 bg-white shadow-sm outline-none transition-all text-sm font-black tracking-tight placeholder:text-slate-300"
          />
        </div>
        <div className="relative flex items-center gap-3">
          <SlidersHorizontal size={18} className="absolute left-5 text-slate-300 pointer-events-none" />
          <select 
            value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}
            className="bg-white border border-black/5 rounded-[2rem] pl-14 pr-10 py-4 text-sm font-black text-[#0A1628] uppercase tracking-widest focus:border-[#0D95F0] outline-none cursor-pointer min-w-[240px] appearance-none shadow-sm"
          >
            <option value="all">All Inquiries</option>
            <option value="new">Action Required (New)</option>
            <option value="read">Archived (Read)</option>
            <option value="contacted">In Discussion</option>
            <option value="replied">Followed Up</option>
            <option value="closed">Closed Cases</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/30 text-left border-b border-black/5">
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Client / Company</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Status</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Date Received</th>
                <th className="px-12 py-8 text-right text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-48 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Inquiries...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-48 text-center bg-slate-50/30">
                    <div className="flex flex-col items-center gap-8 opacity-30">
                      <Activity size={80} className="text-slate-300" strokeWidth={1} />
                      <p className="text-slate-500 font-black tracking-[0.2em] text-xl uppercase">No Inquiries Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq, index) => (
                  <motion.tr
                    key={inq.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}
                    onClick={() => {
                      setSelectedInquiry(inq); setIsDrawerOpen(true)
                      if (inq.status === 'new') updateStatus(inq.id, 'read')
                    }}
                    className="group hover:bg-slate-50/80 cursor-pointer transition-all duration-500"
                  >
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform duration-700">
                          {inq.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="text-base font-black text-[#0A1628] tracking-tight">{inq.name}</div>
                          <div className="text-[11px] font-black text-slate-300 uppercase tracking-widest mt-1">{inq.company || 'Private'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-4">
                        <SpatialBadge variant={getStatusVariant(inq.status) as any} pulse={inq.status === 'new'}>
                          {inq.status}
                        </SpatialBadge>
                        {inq.status === 'new' && (
                          <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                            <Star size={12} fill="currentColor" /> Priority
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-12 py-10 text-sm font-black text-slate-400 tracking-tight uppercase">{formatDate(inq.created_at)}</td>
                    <td className="px-12 py-10 text-right">
                      <button className="w-12 h-12 rounded-[1.25rem] bg-white border border-black/5 flex items-center justify-center text-slate-300 group-hover:bg-[#0D95F0] group-hover:text-white transition-all shadow-xl active:scale-90">
                        <ArrowUpRight size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SpatialDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Inquiry Details" description="Detailed view of client message and contact information.">
        {selectedInquiry && (
          <div className="space-y-12 py-8">
            <div className="p-10 bg-slate-950 text-white rounded-[1.75rem] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D95F0]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-[#0D95F0] shadow-2xl">
                    <Activity size={32} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Current Status</div>
                    <SpatialBadge variant={getStatusVariant(selectedInquiry.status) as any} pulse={selectedInquiry.status === 'new'}>
                      {selectedInquiry.status.toUpperCase()}
                    </SpatialBadge>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Update Status</div>
                  <select
                    value={selectedInquiry.status}
                    onChange={e => updateStatus(selectedInquiry.id, e.target.value)}
                    disabled={updating}
                    className="bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white outline-none focus:bg-white focus:text-[#0A1628] transition-all cursor-pointer min-w-[240px]"
                  >
                    <option value="new">Action Required (New)</option>
                    <option value="read">Archived (Read)</option>
                    <option value="contacted">In Discussion (Contacted)</option>
                    <option value="replied">Followed Up (Replied)</option>
                    <option value="closed">Closed Cases (Closed)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: UserCircle, label: 'Contact Name', value: selectedInquiry.name },
                { icon: Mail, label: 'Email Address', value: selectedInquiry.email, link: `mailto:${selectedInquiry.email}` },
                { icon: Phone, label: 'Phone Number', value: selectedInquiry.phone || 'N/A' },
                { icon: Building2, label: 'Company', value: selectedInquiry.company || 'N/A' },
                { icon: Globe2, label: 'Country', value: selectedInquiry.country || 'N/A' },
                { icon: Calendar, label: 'Date Received', value: formatDate(selectedInquiry.created_at) },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[1.5rem] bg-slate-50 border border-black/5 hover:bg-white hover:shadow-2xl group transition-all">
                  <div className="flex items-center gap-3 mb-4 text-slate-400 group-hover:text-[#0D95F0] transition-colors">
                    <item.icon size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                  {item.link ? (
                    <a href={item.link} className="text-lg font-black text-[#0D95F0] hover:underline block truncate tracking-tight">{item.value}</a>
                  ) : (
                    <div className="text-lg font-black text-[#0A1628] truncate tracking-tight">{item.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-12 rounded-[2.5rem] bg-white border border-black/5 shadow-sm">
              <h3 className="text-4xl font-black text-[#0A1628] tracking-tighter leading-tight mb-8">
                {selectedInquiry.subject || 'General Inquiry'}
              </h3>
              <div className="h-px bg-black/5 w-24 mb-10" />
              <div className="text-lg leading-relaxed text-slate-500 font-medium italic">
                {selectedInquiry.message.split('\n').map((para, i) => <p key={i} className={i > 0 ? 'mt-6' : ''}>{para}</p>)}
              </div>
            </div>

            <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <a href={`mailto:${selectedInquiry.email}`} className="flex items-center gap-3 px-8 py-5 bg-[#0A1628] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                  <Send size={16} /> Reply via Email
                </a>
              </div>
              <button
                onClick={() => handleDelete(selectedInquiry.id)} disabled={updating}
                className="flex items-center gap-3 px-8 py-5 rounded-[2rem] text-rose-500 hover:bg-rose-500 hover:text-white font-black text-xs uppercase tracking-widest transition-all border border-rose-500/10 active:scale-95"
              >
                <Trash2 size={16} /> Delete Inquiry
              </button>
            </div>
          </div>
        )}
      </SpatialDrawer>
    </div>
  )
}
