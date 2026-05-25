'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '@/app/admin/AdminProvider'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  MessageSquare,
  FileText,
  Globe2,
  Building2,
  Home,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Zap,
  Activity,
  ShieldCheck,
  Terminal,
  Megaphone,
  LineChart
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
      { name: 'Global CTA', href: '/admin/content/global-cta', icon: Megaphone },
      { name: 'About Page', href: '/admin/content/about', icon: FileText },
      { name: 'Solutions Page', href: '/admin/content/solutions', icon: Activity },
      { name: 'Industries', href: '/admin/content/industries', icon: Building2 },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { sidebarCollapsed, setSidebarCollapsed } = useAdmin()
  const [mobileOpen, setMobileOpen] = useState(false)

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full relative">
      {/* Background Decor Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 to-[#0A1628]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />

      {/* Logo Area */}
      <div className="relative z-10 px-8 pt-10 pb-8 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-4 group">
          {!sidebarCollapsed ? (
            <div className="relative h-10 w-44 group-hover:scale-105 transition-transform duration-700">
              <Image
                src="/images/company/logo-dark.png"
                alt="Axion"
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-[1.5rem] bg-gradient-to-br from-[#0D95F0] to-[#0A1628] shadow-2xl shadow-[#0D95F0]/20 flex items-center justify-center text-white group-hover:rotate-12 transition-all duration-700">
              <Zap size={24} fill="currentColor" />
            </div>
          )}
        </Link>
      </div>

      {/* Nav Sections */}
      <nav className="relative z-10 flex-1 px-4 py-4 space-y-10 overflow-y-auto scrollbar-hide">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-4">
            {!sidebarCollapsed && (
              <span className="px-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2 block">
                {section.title}
              </span>
            )}
            <div className="space-y-2">
              {section.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'group flex items-center gap-4 px-5 py-4 rounded-[1.75rem] text-[13px] font-black transition-all duration-700 relative overflow-hidden',
                      active
                        ? 'text-white'
                        : 'text-white/40 hover:text-white/80'
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-gradient-to-r from-[#0D95F0] to-[#0D95F0]/60 z-0"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-4">
                      <item.icon size={20} strokeWidth={active ? 2.5 : 2} className={cn('transition-all duration-700', active ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-white/20 group-hover:text-[#0D95F0]')} />
                      {!sidebarCollapsed && <span className="tracking-tight">{item.name}</span>}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="relative z-10 p-5 border-t border-white/[0.05] bg-black/40">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex items-center gap-4 w-full px-5 py-4 rounded-[1.5rem] text-xs font-black text-white/20 hover:text-white hover:bg-white/[0.03] transition-all duration-500"
          >
            <ChevronLeft size={18} className={cn('transition-transform duration-700', sidebarCollapsed && 'rotate-180')} />
            {!sidebarCollapsed && <span className="tracking-widest uppercase">Contract Interface</span>}
          </button>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={cn(
              'flex items-center gap-4 w-full px-5 py-4 rounded-[1.5rem] text-xs font-black text-white/10 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-500',
            )}
          >
            <LogOut size={18} />
            {!sidebarCollapsed && <span className="tracking-widest uppercase">Terminate Access</span>}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 110 : 340 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="hidden lg:flex flex-col bg-slate-950/90 backdrop-blur-[60px] border border-white/[0.08] h-[calc(100vh-2.5rem)] m-5 rounded-[2.5rem] shrink-0 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative z-50"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-10 right-10 z-[100] w-20 h-20 rounded-[2.5rem] bg-[#0D95F0] text-white flex items-center justify-center shadow-2xl shadow-[#0D95F0]/40 active:scale-90 transition-all"
      >
        <Menu size={28} />
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
              className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-2xl z-[110]"
            />
            <motion.aside
              initial={{ x: -340 }}
              animate={{ x: 0 }}
              exit={{ x: -340 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-80 bg-slate-950 z-[120] shadow-2xl border-r border-white/5"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-10 right-8 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 hover:text-white"
              >
                <X size={24} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[200]"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl z-[210] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
                  <LogOut size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0A1628] tracking-tight mb-2">Terminate Session?</h3>
                  <p className="text-sm text-slate-500 font-medium">You will need to sign in again to access the admin portal.</p>
                </div>
                <div className="w-full flex flex-col gap-3 pt-4">
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-rose-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-rose-600 transition-colors"
                  >
                    Confirm Termination
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
