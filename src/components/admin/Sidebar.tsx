'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useAdmin } from '@/app/admin/layout'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  MessageSquare,
  Settings,
  FileText,
  Globe2,
  Building2,
  Sparkles,
  Home,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Zap,
  Activity,
  ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navSections = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    ],
  },
  {
    title: 'Content',
    items: [
      { name: 'Homepage', href: '/admin/content', icon: Home },
      { name: 'About Page', href: '/admin/content/about', icon: FileText },
      { name: 'Industries', href: '/admin/content/industries', icon: Building2 },
      { name: 'Why Axion', href: '/admin/content/why-axion', icon: Sparkles },
      { name: 'Offices', href: '/admin/content/offices', icon: Globe2 },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const { sidebarCollapsed, setSidebarCollapsed } = useAdmin()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Area */}
      <div className="px-6 pt-7 pb-6 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          {!sidebarCollapsed ? (
            <div className="relative h-9 w-40">
              <Image
                src="/images/company/logo-dark.png"
                alt="Axion"
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-[#0D95F0] flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
          )}
        </Link>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center text-white/30 hover:text-white/60 transition-all"
        >
          <ChevronLeft size={14} className={cn('transition-transform', sidebarCollapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Nav Sections */}
      <nav className="flex-1 px-3 py-2 space-y-6 overflow-y-auto scrollbar-hide">
        {navSections.map((section) => (
          <div key={section.title}>
            {!sidebarCollapsed && (
              <span className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2 block">
                {section.title}
              </span>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative',
                      active
                        ? 'bg-gradient-to-r from-[#0D95F0]/10 to-transparent text-[#0D95F0]'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#0D95F0] rounded-r-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <item.icon size={18} className={cn(active ? 'text-[#0D95F0]' : 'text-white/30 group-hover:text-white/50')} />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {!sidebarCollapsed && (
        <div className="px-6 py-6 mt-auto">
          <div className="p-4 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[#0D95F0]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            
            <div className="relative z-10 flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#0D95F0]/10 flex items-center justify-center">
                <Activity size={14} className={cn("text-[#0D95F0]", process.env.NEXT_PUBLIC_SUPABASE_URL ? "animate-pulse" : "")} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">System Pulse</div>
                <div className={cn("text-xs font-bold", process.env.NEXT_PUBLIC_SUPABASE_URL ? "text-emerald-400" : "text-[#0D95F0]")}>
                  {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Healthy' : 'Demo Active'}
                </div>
              </div>
            </div>
            
            <div className="space-y-1.5 relative z-10">
               <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-white/30">
                  <span>Connection</span>
                  <span className={cn(process.env.NEXT_PUBLIC_SUPABASE_URL ? "text-emerald-400" : "text-[#0D95F0]")}>
                    {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Live' : 'Mock'}
                  </span>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: process.env.NEXT_PUBLIC_SUPABASE_URL ? '100%' : '60%' }}
                    transition={{ duration: 2, repeat: process.env.NEXT_PUBLIC_SUPABASE_URL ? Infinity : 0 }}
                    className={cn("h-full", process.env.NEXT_PUBLIC_SUPABASE_URL ? "bg-emerald-400/50" : "bg-[#0D95F0]/50")}
                  />
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom — Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all',
          )}
        >
          <LogOut size={18} />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 80 : 272 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col bg-[#0A1628] border-r border-white/5 h-full shrink-0 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-[#0A1628] text-white flex items-center justify-center shadow-xl"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-[#0A1628] z-[70] shadow-2xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-white"
              >
                <X size={16} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
