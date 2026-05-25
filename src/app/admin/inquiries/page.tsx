'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  MessageSquare, Search, Trash2, Mail, Building2, Globe2, Calendar,
  ArrowUpRight, Phone, Loader2, X, Star, Activity, UserCircle, Zap,
  SlidersHorizontal, Send, ChevronLeft
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import SpatialBadge from '@/components/ui/SpatialBadge'
import AxionLoader from '@/components/ui/AxionLoader'
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
  source?: string
}

interface QuotePayload {
  projectStatus?: string
  width?: string
  height?: string
  uncertainSize?: boolean
  installationMethod?: string
  solutionType?: string
  requirements?: string
}

function parseQuotePayload(message: string): QuotePayload | null {
  try {
    const parsed = JSON.parse(message)
    if (parsed && (parsed.solutionType || parsed.projectStatus || parsed.installationMethod)) {
      return parsed as QuotePayload
    }
  } catch {
    // Gracefully catch JSON parsing errors for general contacts
  }
  return null
}

function InquiriesPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const typeParam = searchParams.get('type') // 'quotes' or 'contacts'
  const idParam = searchParams.get('id') // Deep-linked Inquiry ID

  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<'all' | 'quotes' | 'contacts'>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchInquiries()
  }, [])

  // Synchronize state with URL search parameters
  useEffect(() => {
    if (typeParam === 'quotes') {
      setSelectedType('quotes')
    } else if (typeParam === 'contacts') {
      setSelectedType('contacts')
    }
  }, [typeParam])

  useEffect(() => {
    if (idParam && inquiries.length > 0) {
      const target = inquiries.find(inq => inq.id === idParam)
      if (target) {
        setSelectedInquiry(target)
        setIsDrawerOpen(true)
        if (target.status === 'new') {
          updateStatus(target.id, 'read')
        }
      }
    }
  }, [idParam, inquiries])

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
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const json = await res.json()
      if (json.success) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: status as any } : inq))
        setSelectedInquiry(prev => prev && prev.id === id ? { ...prev, status: status as any } : prev)
        toast.success(`Inquiry marked as ${status}`)
      } else {
        toast.error('Failed to update status')
      }
    } catch {
      toast.error('Status update failed')
    }
    setUpdating(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this inquiry permanently?')) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) {
        setInquiries(prev => prev.filter(inq => inq.id !== id))
        toast.success('Inquiry deleted')
        setIsDrawerOpen(false)
      } else {
        toast.error('Delete failed')
      }
    } catch {
      toast.error('Delete connection error')
    }
    setUpdating(false)
  }

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch =
      inq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    
    const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus
    
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'quotes' && inq.source === 'quote_form') ||
      (selectedType === 'contacts' && inq.source !== 'quote_form')

    return matchesSearch && matchesStatus && matchesType
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

  if (selectedInquiry) {
    const quoteData = parseQuotePayload(selectedInquiry.message)

    return (
      <div className="space-y-12 pb-24">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              setSelectedInquiry(null)
              const params = new URLSearchParams(searchParams.toString())
              params.delete('id')
              router.push('/admin/inquiries?' + params.toString())
            }} 
            className="w-14 h-14 rounded-[1.5rem] bg-white border border-black/5 flex items-center justify-center text-slate-400 hover:text-[#0D95F0] hover:shadow-xl transition-all group shrink-0"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-4xl font-extrabold text-[#0A1628] tracking-tighter">Inquiry Details</h1>
            <p className="text-slate-500 font-medium italic">Detailed view of client message and contact information.</p>
          </div>
        </div>

        <div className="space-y-12">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: UserCircle, label: 'Contact Name', value: selectedInquiry.name },
              { icon: Mail, label: 'Email Address', value: selectedInquiry.email, link: `mailto:${selectedInquiry.email}` },
              { icon: Phone, label: 'Phone Number', value: selectedInquiry.phone || 'N/A' },
              { icon: Building2, label: 'Company', value: selectedInquiry.company || 'N/A' },
              { icon: Globe2, label: 'Country', value: selectedInquiry.country || 'N/A' },
              { icon: Calendar, label: 'Date Received', value: formatDate(selectedInquiry.created_at) },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[1.5rem] bg-white border border-black/5 hover:border-[#0D95F0]/20 hover:shadow-2xl group transition-all">
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

          {quoteData ? (
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Zap size={18} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">B2B Specifications</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-[2rem] bg-white border border-black/5 shadow-sm relative group hover:border-amber-500/30 transition-all">
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Solution Type</div>
                  <div className="text-xl font-black text-[#0A1628]">{quoteData.solutionType || 'Not Specified'}</div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white border border-black/5 shadow-sm relative group hover:border-[#0D95F0]/30 transition-all">
                  <div className="text-[10px] font-black text-[#0D95F0] uppercase tracking-widest mb-2">Installation Method</div>
                  <div className="text-xl font-black text-[#0A1628]">{quoteData.installationMethod || 'Not Specified'}</div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white border border-black/5 shadow-sm relative group hover:border-emerald-500/30 transition-all">
                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Project Status</div>
                  <div className="text-xl font-black text-[#0A1628]">{quoteData.projectStatus || 'Not Specified'}</div>
                </div>

                <div className="p-8 rounded-[2rem] bg-slate-950 border border-black/5 shadow-2xl relative group hover:scale-[1.01] transition-all md:col-span-3 text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0D95F0]/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Physical Dimensions</div>
                      <div className="text-3xl font-black tracking-tight">
                        {quoteData.width && quoteData.height ? `${quoteData.width}mm (W) x ${quoteData.height}mm (H)` : 'Dimensions Not Provided'}
                      </div>
                    </div>
                    {quoteData.uncertainSize && (
                      <SpatialBadge variant="amber" pulse>Size May Vary / Estimation Needed</SpatialBadge>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-12 rounded-[2.5rem] bg-white border border-black/5 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <h3 className="text-3xl font-black text-[#0A1628] tracking-tighter leading-tight">
                    Special Requirements & Details
                  </h3>
                  <SpatialBadge variant="amber">B2B Deal Details</SpatialBadge>
                </div>
                <div className="h-px bg-black/5 w-24 mb-10" />
                <div className="text-xl leading-relaxed text-slate-600 font-medium italic">
                  {quoteData.requirements ? (
                    quoteData.requirements.split('\n').map((para, i) => <p key={i} className={i > 0 ? 'mt-6' : ''}>{para}</p>)
                  ) : (
                    <span className="text-slate-400">No additional special requirements specified.</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-[2.5rem] bg-white border border-black/5 shadow-sm">
              <h3 className="text-4xl font-black text-[#0A1628] tracking-tighter leading-tight mb-8">
                {selectedInquiry.subject || 'General Inquiry'}
              </h3>
              <div className="h-px bg-black/5 w-24 mb-10" />
              <div className="text-xl leading-relaxed text-slate-600 font-medium italic">
                {selectedInquiry.message.split('\n').map((para, i) => <p key={i} className={i > 0 ? 'mt-6' : ''}>{para}</p>)}
              </div>
            </div>
          )}

          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-end gap-8">
            <button
              onClick={() => handleDelete(selectedInquiry.id)} disabled={updating}
              className="flex items-center gap-3 px-8 py-5 rounded-[2rem] text-rose-500 hover:bg-rose-500 hover:text-white font-black text-xs uppercase tracking-widest transition-all border border-rose-500/10 active:scale-95"
            >
              <Trash2 size={16} /> Delete Inquiry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Header block */}
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

      {/* Symmetrical Segmented Toggle Tabs */}
      <div className="flex items-center p-1.5 bg-slate-100/80 backdrop-blur-md rounded-[2rem] max-w-2xl border border-black/[0.03] shadow-inner relative z-10">
        {[
          { id: 'all', label: 'All Inquiries', count: inquiries.length },
          { id: 'quotes', label: 'B2B Quotations', count: inquiries.filter(i => i.source === 'quote_form').length },
          { id: 'contacts', label: 'General Contacts', count: inquiries.filter(i => i.source !== 'quote_form').length }
        ].map((tab) => {
          const isActive = selectedType === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id as any)}
              className={cn(
                "relative flex-1 py-4 px-6 rounded-[1.75rem] text-xs font-black uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2",
                isActive ? "text-white" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className={cn(
                    "absolute inset-0 rounded-[1.75rem] shadow-lg shadow-black/[0.05]",
                    tab.id === 'quotes' ? "bg-amber-500 shadow-amber-500/20" :
                    tab.id === 'contacts' ? "bg-[#0D95F0] shadow-blue-500/20" :
                    "bg-[#0A1628]"
                  )}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span className={cn(
                "relative z-10 px-2 py-0.5 rounded-lg text-[9px] font-black transition-all",
                isActive ? "bg-white/20 text-white" : "bg-slate-200/60 text-slate-500"
              )}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filter and Search Block */}
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

      {/* Inquiries Table */}
      <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/30 text-left border-b border-black/5">
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Client / Company</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Classification</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Status</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Date Received</th>
                <th className="px-12 py-8 text-right text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <AxionLoader message="Loading Inquiries..." className="py-24" />
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-48 text-center bg-slate-50/30">
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
                      setSelectedInquiry(inq)
                      if (inq.status === 'new') updateStatus(inq.id, 'read')
                      const params = new URLSearchParams(searchParams.toString())
                      params.set('id', inq.id)
                      router.push('/admin/inquiries?' + params.toString())
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
                      {inq.source === 'quote_form' ? (
                        <SpatialBadge variant="amber">B2B Quote</SpatialBadge>
                      ) : (
                        <SpatialBadge variant="blue">General</SpatialBadge>
                      )}
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
                      <button className="w-12 h-12 rounded-[1.25rem] bg-white border border-black/5 flex items-center justify-center text-slate-300 group-hover:bg-[#0D95F0] group-hover:text-white transition-all shadow-xl active:scale-90 inline-flex">
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
    </div>
  )
}

export default function InquiriesPage() {
  return (
    <Suspense fallback={<AxionLoader message="Loading Inquiries..." />}>
      <InquiriesPageContent />
    </Suspense>
  )
}

