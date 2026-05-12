'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAdmin } from '@/app/admin/layout'
import { Plus, Bell, Search, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/inquiries': 'Inquiries',
  '/admin/content': 'Homepage',
  '/admin/content/about': 'About Page',
  '/admin/content/industries': 'Industries',
  '/admin/content/why-axion': 'Why Axion',
  '/admin/content/offices': 'Offices',
  '/admin/settings': 'Settings',
}

function getBreadcrumbs(pathname: string) {
  const crumbs: { label: string; href: string }[] = [
    { label: 'Admin', href: '/admin' },
  ]

  if (pathname === '/admin') return crumbs

  const segments = pathname.replace('/admin/', '').split('/')
  let currentPath = '/admin'

  for (const segment of segments) {
    currentPath += `/${segment}`
    const label = breadcrumbMap[currentPath] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    crumbs.push({ label, href: currentPath })
  }

  return crumbs
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const { sidebarCollapsed } = useAdmin()
  const breadcrumbs = getBreadcrumbs(pathname)
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard'

  return (
    <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 shrink-0 sticky top-0 z-30">
      {/* Left — Breadcrumbs */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="text-slate-200" />}
              {i < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="text-slate-400 hover:text-[#0D95F0] transition-colors font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#0A1628] font-bold">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 w-64 group focus-within:border-[#0D95F0]/30 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0D95F0]/5 transition-all">
          <Search size={15} className="text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 font-medium w-full"
          />
          <kbd className="hidden lg:inline-flex px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-400 border border-slate-200">⌘K</kbd>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0A1628] hover:border-slate-200 transition-all">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#0D95F0] rounded-full border-2 border-white" />
        </button>

        {/* Quick Add */}
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0A1628] hover:bg-[#0A1628]/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#0A1628]/10"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Product</span>
        </Link>

        <div className="w-px h-8 bg-slate-100 mx-1" />

        {/* User Profile */}
        <button className="flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full hover:bg-slate-50 transition-all group">
           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D95F0] to-[#0A1628] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[#0D95F0]/20">
              AD
           </div>
           <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-[#0A1628] tracking-tight">Admin User</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Super Admin</div>
           </div>
        </button>
      </div>
    </header>
  )
}
