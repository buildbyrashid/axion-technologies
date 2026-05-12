'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import {
  Package, FolderTree, MessageSquare, TrendingUp,
  Plus, ArrowRight, Clock, User, Building2, Mail,
  Zap, Eye, Globe2, ChevronRight
} from 'lucide-react'
import StatusBadge from '@/components/admin/StatusBadge'
import { cn } from '@/lib/utils'
import { MOCK_STATS, MOCK_INQUIRIES } from '@/lib/mock-data'

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
    // Check if we are in demo mode
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

  const metricCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', lightBg: 'bg-blue-50', lightText: 'text-blue-600' },
    { label: 'Categories', value: stats.totalCategories, icon: FolderTree, color: 'bg-violet-500', lightBg: 'bg-violet-50', lightText: 'text-violet-600' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: MessageSquare, color: 'bg-amber-500', lightBg: 'bg-amber-50', lightText: 'text-amber-600' },
    { label: 'Active Products', value: stats.activeProducts, icon: TrendingUp, color: 'bg-emerald-500', lightBg: 'bg-emerald-50', lightText: 'text-emerald-600' },
  ]

  const quickActions = [
    { label: 'Add New Product', description: 'Create a product listing', href: '/admin/products/new', icon: Plus, color: 'text-[#0D95F0]' },
    { label: 'Review Inquiries', description: 'Check new submissions', href: '/admin/inquiries', icon: Eye, color: 'text-amber-500' },
    { label: 'Manage Categories', description: 'Organize your catalog', href: '/admin/categories', icon: FolderTree, color: 'text-violet-500' },
    { label: 'Update Settings', description: 'WhatsApp, emails, SEO', href: '/admin/settings', icon: Globe2, color: 'text-emerald-500' },
  ]

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
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-[#0D95F0] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628] font-sora tracking-tight">
          Command Center
        </h1>
        <p className="text-slate-400 text-sm font-medium mt-1">
          Overview of your Axion Technology digital platform
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-[2rem] border border-slate-100 p-7 hover:shadow-xl hover:shadow-[#0D95F0]/5 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0D95F0]/5 to-transparent rounded-bl-[60px] -mr-6 -mt-6" />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110', card.lightBg)}>
                <card.icon size={22} className={card.lightText} />
              </div>
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-200 group-hover:text-[#0D95F0] transition-colors">
                <Zap size={14} />
              </div>
            </div>
            <div className="text-4xl font-extrabold text-[#0A1628] font-sora relative z-10">{card.value}</div>
            <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.15em] relative z-10">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Stats Chart */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0A1628] rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden group shadow-2xl shadow-[#0A1628]/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D95F0]/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0D95F0]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Lead Traffic Performance</h2>
            <p className="text-white/40 text-sm font-medium">Real-time engagement and inquiry trends across global markets.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold">Last 30 Days</div>
             <button className="w-10 h-10 rounded-xl bg-[#0D95F0] text-white flex items-center justify-center shadow-lg shadow-[#0D95F0]/20"><TrendingUp size={18} /></button>
          </div>
        </div>

        {/* Mock Chart SVG */}
        <div className="relative h-64 w-full">
           <svg viewBox="0 0 1000 250" className="w-full h-full preserve-3d">
              <defs>
                 <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0D95F0" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0D95F0" stopOpacity="0" />
                 </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,200 Q150,180 250,120 T500,140 T750,60 T1000,100"
                fill="none"
                stroke="#0D95F0"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                d="M0,200 Q150,180 250,120 T500,140 T750,60 T1000,100 V250 H0 Z"
                fill="url(#chartGradient)"
              />
              {/* Data Points */}
              {[250, 500, 750, 1000].map((x, i) => (
                <motion.circle
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + i * 0.2 }}
                  cx={x} cy={i === 0 ? 120 : i === 1 ? 140 : i === 2 ? 60 : 100}
                  r="5"
                  fill="#0D95F0"
                  className="shadow-lg shadow-[#0D95F0]"
                />
              ))}
           </svg>
           
           {/* Chart Labels */}
           <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] font-bold text-white/20 uppercase tracking-widest pt-4">
              <span>Week 01</span>
              <span>Week 02</span>
              <span>Week 03</span>
              <span>Week 04</span>
           </div>
        </div>
      </motion.div>

      {/* Main Grid: Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-base font-bold text-[#0A1628] mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-white flex items-center justify-center transition-all border border-slate-100">
                  <action.icon size={18} className={action.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#0A1628]">{action.label}</div>
                  <div className="text-xs text-slate-400">{action.description}</div>
                </div>
                <ChevronRight size={16} className="text-slate-200 group-hover:text-[#0D95F0] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#0A1628]">Recent Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-[#0D95F0] hover:text-[#0b82d4] transition-colors flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare size={32} className="mx-auto text-slate-200 mb-3" />
              <p className="text-sm text-slate-400">No inquiries yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D95F0]/20 to-[#0A1628]/10 flex items-center justify-center text-[#0D95F0] text-xs font-bold shrink-0">
                    {inquiry.full_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0A1628] truncate">{inquiry.full_name}</span>
                      {inquiry.company && (
                        <span className="text-xs text-slate-400 truncate hidden sm:inline">· {inquiry.company}</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 truncate">{inquiry.email}</div>
                  </div>
                  <StatusBadge status={inquiry.status as any} />
                  <span className="text-[11px] text-slate-300 font-medium hidden md:block whitespace-nowrap">
                    {timeAgo(inquiry.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
