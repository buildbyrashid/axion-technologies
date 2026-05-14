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
  Star,
  Activity,
  UserCircle,
  Zap,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Send
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import SpatialDrawer from '@/components/ui/SpatialDrawer'
import SpatialBadge from '@/components/ui/SpatialBadge'
import { MOCK_INQUIRIES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    if (isDemo) {
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
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    
    if (!isDemo) {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)
      if (error) {
        toast.error('Failed to update status')
        setUpdating(false)
        return
      }
    }

    setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: status as any } : inq))
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: status as any })
    }
    toast.success(`Inquiry marked as ${status}`)
    setUpdating(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this inquiry permanently?')) return
    
    setUpdating(true)
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL
    
    if (!isDemo) {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)
      if (error) {
        toast.error('Delete failed')
        setUpdating(false)
        return
      }
    }

    setInquiries(inquiries.filter(inq => inq.id !== id))
    toast.success('Inquiry deleted')
    setIsDrawerOpen(false)
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'blue'
      case 'read': return 'slate'
      case 'contacted': return 'amber'
      case 'replied': return 'emerald'
      case 'closed': return 'slate'
      default: return 'slate'
    }
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Premium Spatial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[1.5rem] bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] shadow-inner">
                 <MessageSquare size={24} />
              </div>
              <SpatialBadge variant="blue" pulse>Inbound Intelligence</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">Partner Leads</h1>
           <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed italic">Global lead intelligence and partner communication management.</p>
        </div>
      </div>

      {/* CRM Console Control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/40 backdrop-blur-3xl p-6 rounded-[3rem] border border-black/5 shadow-2xl shadow-black/[0.02]">
         <div className="relative flex-1 max-w-xl group">
            <div className="absolute inset-0 bg-[#0D95F0]/5 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
            <input 
               type="text" 
               placeholder="Search by partner identity or domain..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="relative w-full pl-16 pr-8 py-5 rounded-[2rem] border border-black/5 bg-white shadow-sm focus:shadow-2xl focus:shadow-[#0D95F0]/10 outline-none transition-all text-sm font-black tracking-tight placeholder:text-slate-300"
            />
         </div>

         <div className="flex items-center gap-6">
            <div className="relative flex items-center gap-3">
               <SlidersHorizontal size={18} className="absolute left-5 text-slate-300 pointer-events-none" />
               <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-white border border-black/5 rounded-[2rem] pl-14 pr-10 py-4.5 text-sm font-black text-[#0A1628] uppercase tracking-widest focus:border-[#0D95F0] outline-none transition-all cursor-pointer min-w-[240px] appearance-none shadow-sm hover:shadow-lg"
               >
                  <option value="all">All Intelligence</option>
                  <option value="new">Priority Alpha (New)</option>
                  <option value="read">Archived (Read)</option>
                  <option value="contacted">In Discussion</option>
                  <option value="replied">Followed Up</option>
                  <option value="closed">Closed Cases</option>
               </select>
            </div>
         </div>
      </div>

      {/* Signal Stream Architecture */}
      <div className="bg-white rounded-[4rem] border border-black/5 overflow-hidden shadow-sm relative group/table">
        <div className="overflow-x-auto relative z-10">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/30 text-left border-b border-black/5">
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Intelligence Origin</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Operational Status</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Temporal Delta</th>
                <th className="px-12 py-8 text-right text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Mission Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-48 text-center">
                      <div className="flex flex-col items-center gap-6">
                         <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0D95F0] rounded-full animate-spin" />
                         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Decoding Signals...</p>
                      </div>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-48 text-center bg-slate-50/30">
                    <div className="flex flex-col items-center gap-8 opacity-30">
                      <Activity size={80} className="text-slate-300" strokeWidth={1} />
                      <p className="text-slate-500 font-black tracking-[0.2em] text-xl uppercase">No Signals Detected</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq, index) => (
                  <motion.tr 
                    key={inq.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => {
                      setSelectedInquiry(inq)
                      setIsDrawerOpen(true)
                      if (inq.status === 'new') updateStatus(inq.id, 'read')
                    }}
                    className="group hover:bg-slate-50/80 cursor-pointer transition-all duration-500"
                  >
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform duration-700">
                          {inq.full_name?.charAt(0)}
                        </div>
                        <div>
                          <div className="text-base font-black text-[#0A1628] tracking-tight">{inq.full_name}</div>
                          <div className="text-[11px] font-black text-slate-300 uppercase tracking-widest mt-1">{inq.company || 'Private Asset'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-4">
                        <SpatialBadge 
                          variant={getStatusVariant(inq.status)}
                          pulse={inq.status === 'new'}
                        >
                          {inq.status}
                        </SpatialBadge>
                        {inq.status === 'new' && (
                           <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                              <Star size={12} fill="currentColor" />
                              Priority
                           </div>
                        )}
                      </div>
                    </td>
                    <td className="px-12 py-10 text-sm font-black text-slate-400 tracking-tight uppercase">
                      {formatDate(inq.created_at)}
                    </td>
                    <td className="px-12 py-10 text-right">
                       <button className="w-12 h-12 rounded-[1.25rem] bg-white border border-black/5 flex items-center justify-center text-slate-300 group-hover:bg-[#0D95F0] group-hover:text-white transition-all shadow-xl group-hover:shadow-[#0D95F0]/20 active:scale-90">
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

      {/* Inquiry Detail SpatialDrawer */}
      <SpatialDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Intelligence Report"
        description="Detailed signal analysis and partner communication data."
      >
        {selectedInquiry && (
          <div className="space-y-12 py-8">
             {/* Operational Status Card */}
             <div className="p-10 bg-slate-950 text-white rounded-[3rem] relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D95F0]/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-[2.5rem] bg-white/10 flex items-center justify-center text-[#0D95F0] shadow-2xl">
                         <Activity size={32} />
                      </div>
                      <div>
                         <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Operational Protocol</div>
                         <SpatialBadge variant={getStatusVariant(selectedInquiry.status)} pulse={selectedInquiry.status === 'new'}>
                            {selectedInquiry.status.toUpperCase()}
                         </SpatialBadge>
                      </div>
                   </div>
                   
                   <div className="flex flex-col gap-3">
                      <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Transition Status</div>
                      <select 
                        value={selectedInquiry.status}
                        onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                        disabled={updating}
                        className="bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white outline-none focus:bg-white focus:text-[#0A1628] transition-all cursor-pointer min-w-[240px]"
                      >
                        <option value="new">Priority Alpha (New)</option>
                        <option value="read">Archive Signal (Read)</option>
                        <option value="contacted">Initiate Comms (Contacted)</option>
                        <option value="replied">Mission Update (Replied)</option>
                        <option value="closed">Decommission (Closed)</option>
                      </select>
                   </div>
                </div>
             </div>

             {/* Partner Intelligence Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: UserCircle, label: 'Asset Lead', value: selectedInquiry.full_name },
                  { icon: Mail, label: 'Comms Channel', value: selectedInquiry.email, link: `mailto:${selectedInquiry.email}` },
                  { icon: Phone, label: 'Direct Line', value: selectedInquiry.phone || 'N/A' },
                  { icon: Building2, label: 'Entity Identity', value: selectedInquiry.company || 'Direct Partner' },
                  { icon: Globe2, label: 'Geo-Origin', value: selectedInquiry.country || 'Global Core' },
                  { icon: Calendar, label: 'Signal Logged', value: formatDate(selectedInquiry.created_at) },
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-black/5 transition-all hover:bg-white hover:shadow-2xl hover:shadow-black/[0.02] group">
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

             {/* Intelligence Payload */}
             <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-400 ml-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0D95F0]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Signal Payload</span>
                </div>
                <div className="p-12 rounded-[4rem] bg-white border border-black/5 shadow-sm space-y-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                      <Zap size={160} />
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-4xl font-black text-[#0A1628] tracking-tighter leading-tight mb-8">
                         {selectedInquiry.subject || 'Standard Mission Objective'}
                      </h3>
                      <div className="h-px bg-black/5 w-24 mb-10" />
                      <div className="text-lg leading-relaxed text-slate-500 font-medium italic">
                         {selectedInquiry.message.split('\n').map((para, i) => (
                           <p key={i} className={i > 0 ? 'mt-6' : ''}>{para}</p>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Operations Hub */}
             <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                   <button className="flex items-center gap-3 px-8 py-5 bg-[#0A1628] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 group">
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Dispatch Response
                   </button>
                   <button className="flex items-center gap-3 px-8 py-5 bg-white border border-black/5 text-[#0A1628] rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                      <X size={16} />
                      Ignore Signal
                   </button>
                </div>
                
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  disabled={updating}
                  className="flex items-center gap-3 px-8 py-5 rounded-[2rem] text-rose-500 hover:bg-rose-500 hover:text-white font-black text-xs uppercase tracking-widest transition-all border border-rose-500/10 active:scale-95"
                >
                  <Trash2 size={16} />
                  Purge Intelligence
                </button>
             </div>
          </div>
        )}
      </SpatialDrawer>
    </div>
  )
}
