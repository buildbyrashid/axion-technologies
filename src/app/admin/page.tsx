'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, FolderTree, MessageSquare, TrendingUp,
  Plus, ArrowRight, Clock, User, Building2, Mail,
  Zap, Eye, Globe2, ChevronRight, ArrowUpRight, Activity,
  Sparkles, ShieldCheck, Terminal, Cpu, Layers, BarChart3,
  Search,
  Box
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_STATS, MOCK_INQUIRIES } from '@/lib/mock-data'
import SpatialBadge from '@/components/ui/SpatialBadge'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  totalInquiries: number
  newInquiries: number
  activeProducts: number
}

interface RecentInquiry {
  id: string
  full_name: string
  company: string
  email: string
  status: string
  created_at: string
  country: string
}

export default function AdminDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0, totalCategories: 0, totalInquiries: 0, newInquiries: 0, activeProducts: 0
  })
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL

    if (isDemo) {
      setStats(MOCK_STATS)
      setRecentInquiries(MOCK_INQUIRIES as any)
      setLoading(false)
      return
    }

    try {
      const [products, categories, inquiries, newInq, activeProds] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
      ])

      setStats({
        totalProducts: products.count || 0,
        totalCategories: categories.count || 0,
        totalInquiries: inquiries.count || 0,
        newInquiries: newInq.count || 0,
        activeProducts: activeProds.count || 0,
      })

      const { data: recent } = await supabase
        .from('inquiries')
        .select('id, full_name, company, email, status, created_at, country')
        .order('created_at', { ascending: false })
        .limit(8)

      setRecentInquiries(recent || [])
    } catch (err) {
      console.error('Dashboard load error:', err)
    } finally {
      setLoading(false)
    }
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="relative w-16 h-16">
           <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
           <div className="absolute inset-0 border-4 border-[#0D95F0] border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Initializing Core Infrastructure...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Premium Spatial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[1.5rem] bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] shadow-inner">
                 <Terminal size={24} />
              </div>
              <SpatialBadge variant="blue" pulse>Live Operational Core</SpatialBadge>
           </div>
           <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">Command Center</h1>
           <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed italic">Global telemetry hub for asset configuration and enterprise intelligence.</p>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="px-8 py-4 bg-white border border-black/5 rounded-[2rem] shadow-sm hidden lg:flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                 <Activity size={18} className="text-emerald-500" />
              </div>
              <div>
                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">System Sync</div>
                 <div className="text-sm font-black text-[#0A1628]">99.98% Uptime</div>
              </div>
           </div>
           <Link 
             href="/admin/products/new"
             className="px-10 py-5 bg-[#0A1628] text-white rounded-[2.5rem] text-sm font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-black/20"
           >
             <Plus size={20} />
             Initialize Asset
           </Link>
        </div>
      </div>

      {/* Main Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Metric: Inquiries (Priority Focus) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-4 bg-slate-950 text-white rounded-[3.5rem] p-12 relative overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0D95F0]/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:bg-[#0D95F0]/25 transition-colors duration-[1.5s]" />
          
          <div className="relative z-10 h-full flex flex-col lg:flex-row gap-16">
             <div className="flex-1 space-y-10">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-[2rem] bg-white/10 flex items-center justify-center text-[#0D95F0] shadow-2xl">
                      <MessageSquare size={28} />
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1.5">Lead Intelligence</div>
                      <SpatialBadge variant="blue" pulse>Action Required</SpatialBadge>
                   </div>
                </div>
                <div>
                   <div className="text-8xl font-black tracking-tighter mb-4 tabular-nums">{stats.newInquiries}</div>
                   <div className="text-sm font-black text-white/40 uppercase tracking-[0.3em] ml-2">Unprocessed Signals</div>
                </div>
                <Link href="/admin/inquiries" className="inline-flex items-center gap-4 px-8 py-4 bg-[#0D95F0] text-white rounded-[1.75rem] font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#0A1628] transition-all duration-500 group/link">
                   Synchronize CRM <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
             </div>
             
             {/* Telemetry Viz */}
             <div className="w-full lg:w-72 h-full flex flex-col justify-end pt-12 space-y-6">
                <div className="flex items-end gap-2.5 h-40">
                   {[40, 75, 50, 95, 60, 85, 100].map((h, i) => (
                     <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 1.2, type: 'spring', stiffness: 100 }}
                        className="flex-1 bg-white/5 rounded-t-xl group-hover:bg-[#0D95F0]/30 transition-all duration-700 relative overflow-hidden"
                     >
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
                     </motion.div>
                   ))}
                </div>
                <div className="flex justify-between items-center px-2">
                   <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Weekly Signal Delta</div>
                   <div className="text-[10px] font-black text-emerald-400">+12%</div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Metric: Asset Repository */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 bg-white rounded-[3.5rem] p-12 border border-black/5 relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0D95F0]/5 rounded-full blur-[80px] group-hover:bg-[#0D95F0]/10 transition-colors duration-[1s]" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="w-16 h-16 rounded-[2rem] bg-blue-50 text-[#0D95F0] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-700">
              <Box size={28} />
            </div>
            <div>
               <div className="text-7xl font-black text-[#0A1628] tracking-tighter mb-2 tabular-nums">{stats.totalProducts}</div>
               <div className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Universal Assets</div>
            </div>
          </div>
        </motion.div>

        {/* Performance Architecture Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-6 bg-white rounded-[4rem] p-16 border border-black/5 relative overflow-hidden group shadow-sm"
        >
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-slate-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-20 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0]">
                    <BarChart3 size={18} />
                 </div>
                 <span className="text-[10px] font-black text-[#0D95F0] uppercase tracking-[0.3em]">Market Dynamics</span>
              </div>
              <h2 className="text-4xl font-black text-[#0A1628] tracking-tighter">Engagement Telemetry</h2>
              <p className="text-slate-500 text-lg font-medium max-w-xl italic leading-relaxed">Predictive behavior analysis and inbound traffic density mapping.</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="px-6 py-3 rounded-2xl bg-slate-100/50 border border-black/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">Protocol: 30-Day Window</div>
               <div className="flex -space-x-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 shadow-xl overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-950 flex items-center justify-center text-white text-[10px] font-black z-10">
                     +28
                  </div>
               </div>
            </div>
          </div>

          <div className="relative h-[400px] w-full z-10 bg-slate-50/30 rounded-[3rem] p-8 border border-black/[0.03]">
             <svg viewBox="0 0 1000 250" className="w-full h-full preserve-3d">
                <defs>
                   <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D95F0" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0D95F0" stopOpacity="0" />
                   </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, ease: [0.23, 1, 0.32, 1] }}
                  d="M0,200 C100,180 200,240 300,150 C400,60 500,130 600,110 C700,90 800,50 900,70 L1000,30"
                  fill="none"
                  stroke="#0D95F0"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="drop-shadow-[0_10px_20px_rgba(13,149,240,0.3)]"
                />
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 2 }}
                  d="M0,200 C100,180 200,240 300,150 C400,60 500,130 600,110 C700,90 800,50 900,70 L1000,30 V250 H0 Z"
                  fill="url(#chartGlow)"
                />
             </svg>
             
             {/* Spotlight HUD */}
             <div className="absolute top-12 left-[35%] -translate-x-1/2 p-6 bg-slate-950 text-white rounded-[2rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.4)] opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#0D95F0]">
                   <TrendingUp size={24} />
                </div>
                <div>
                   <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Sector Surge</div>
                   <div className="text-lg font-black tracking-tighter">+248% Engagement</div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Categories Metric */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2 bg-white rounded-[3.5rem] p-12 border border-black/5 relative overflow-hidden group shadow-sm"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="w-16 h-16 rounded-[2rem] bg-violet-50 text-violet-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-700">
              <FolderTree size={28} />
            </div>
            <div>
               <div className="text-7xl font-black text-[#0A1628] tracking-tighter mb-2 tabular-nums">{stats.totalCategories}</div>
               <div className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Asset Clusters</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Operations Portal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-4 bg-white rounded-[3.5rem] p-12 border border-black/5 flex flex-col md:flex-row gap-8 shadow-sm"
        >
           {[
             { label: 'System Protocol', icon: ShieldCheck, color: 'text-emerald-500', href: '/admin/settings', desc: 'Manage access layers' },
             { label: 'Feature Stack', icon: Sparkles, color: 'text-amber-500', href: '/admin/categories', desc: 'Optimize asset taxonomy' },
             { label: 'Global Registry', icon: Globe2, color: 'text-[#0D95F0]', href: '/admin/products', desc: 'Sync inventory core' },
           ].map((action, i) => (
             <Link 
               key={i}
               href={action.href}
               className="flex-1 flex flex-col p-8 rounded-[2.5rem] bg-slate-50 border border-black/5 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-700 group"
             >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-700">
                   <action.icon size={24} className={action.color} />
                </div>
                <div className="space-y-1">
                   <div className="text-sm font-black text-[#0A1628] tracking-tight">{action.label}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{action.desc}</div>
                </div>
                <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                   <span className="text-[9px] font-black uppercase tracking-widest text-[#0D95F0]">Execute</span>
                   <ArrowUpRight size={18} className="text-slate-300 group-hover:text-[#0D95F0] transition-colors" />
                </div>
             </Link>
           ))}
        </motion.div>
      </div>

      {/* Intelligence Stream Table */}
      <div className="bg-white rounded-[4rem] border border-black/5 overflow-hidden shadow-sm relative group/table">
        <div className="absolute inset-0 bg-[#0D95F0]/[0.02] opacity-0 group-hover/table:opacity-100 transition-opacity pointer-events-none" />
        
        <div className="p-12 border-b border-black/5 flex items-center justify-between bg-slate-50/50 relative z-10">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-[#0A1628] text-white flex items-center justify-center shadow-xl">
                    <Activity size={20} />
                 </div>
                 <h2 className="text-3xl font-black text-[#0A1628] tracking-tighter">Live Intelligence Stream</h2>
              </div>
              <p className="text-slate-400 text-base font-medium italic">High-frequency inbound signal telemetry from enterprise clusters.</p>
           </div>
           <Link href="/admin/inquiries" className="px-10 py-5 bg-white border border-black/5 rounded-[2rem] text-xs font-black uppercase tracking-widest text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all shadow-2xl shadow-black/5">
              Initialize Full CRM
           </Link>
        </div>
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/30 text-left border-b border-black/5">
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Partner Entity</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Operational Priority</th>
                <th className="px-12 py-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Temporal Delta</th>
                <th className="px-12 py-8 text-right text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Technical Core</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {recentInquiries.map((inq, i) => (
                <tr key={inq.id} className="group hover:bg-slate-50/80 transition-all duration-500">
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform duration-700">
                        {inq.full_name?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-base font-black text-[#0A1628] tracking-tight">{inq.full_name}</div>
                        <div className="text-[11px] font-black text-slate-300 uppercase tracking-widest mt-1">{inq.company || 'Private Node'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                     <SpatialBadge variant={inq.status === 'new' ? 'blue' : 'slate'} pulse={inq.status === 'new'}>
                        {inq.status === 'new' ? 'Priority Alpha' : 'Signal Logged'}
                     </SpatialBadge>
                  </td>
                  <td className="px-12 py-10 text-sm font-black text-slate-400 tracking-tight uppercase">
                    {timeAgo(inq.created_at)}
                  </td>
                  <td className="px-12 py-10 text-right">
                    <button className="w-12 h-12 rounded-[1.25rem] bg-white border border-black/5 flex items-center justify-center text-slate-300 group-hover:bg-[#0D95F0] group-hover:text-white transition-all shadow-xl group-hover:shadow-[#0D95F0]/20 active:scale-90">
                       <ArrowUpRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
