'use client'

import { useState, useEffect } from 'react'
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
  '/admin/content/global-cta': 'Global CTA',
  '/admin/content/about': 'About Page',
  '/admin/content/industries': 'Industries',
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
  const breadcrumbs = getBreadcrumbs(pathname)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) setScrolled(isScrolled)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const openCommandPalette = () => {
    // Dispatch a custom event to open the command palette
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true
    })
    document.dispatchEvent(event)
  }

  return (
    <header className={cn(
      "h-24 flex items-center justify-between px-10 lg:px-12 shrink-0 sticky top-0 z-40 transition-all duration-500",
      scrolled ? "bg-white/60 backdrop-blur-3xl border-b border-black/5" : "bg-transparent border-b border-transparent"
    )}>
      {/* Left — Breadcrumbs */}
      <div className="flex items-center gap-6 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={10} className="text-slate-300" />}
              {i < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[#0D95F0] transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#0A1628]">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center — Spotlight Trigger */}
      <div className="flex-1 max-w-2xl px-8 keep-rounded">
        <button
          onClick={openCommandPalette}
          className="w-full relative group outline-none keep-rounded"
        >
          <div className="absolute inset-0 bg-black/[0.03] rounded-2xl blur-xl group-hover:bg-[#0D95F0]/5 transition-all duration-500 keep-rounded" />
          <div className="relative flex items-center gap-4 px-6 py-3.5 bg-white/40 backdrop-blur-md rounded-2xl border border-black/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-black/[0.02] transition-all duration-500 text-left keep-rounded">
            <Search size={18} className="text-slate-300 group-hover:text-[#0D95F0] transition-colors duration-500 keep-rounded" />
            <span className="flex-1 text-sm text-slate-400 font-bold tracking-tight keep-rounded">Search enterprise intelligence...</span>
            <div className="flex items-center gap-1.5 keep-rounded">
              <kbd className="px-2.5 py-1 bg-black/5 rounded-lg text-[10px] font-black text-slate-400 border border-black/5 group-hover:border-[#0D95F0]/20 group-hover:text-[#0D95F0] transition-all keep-rounded">⌘</kbd>
              <kbd className="px-2.5 py-1 bg-black/5 rounded-lg text-[10px] font-black text-slate-400 border border-black/5 group-hover:border-[#0D95F0]/20 group-hover:text-[#0D95F0] transition-all keep-rounded">K</kbd>
            </div>
          </div>
        </button>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative w-11 h-11 rounded-2xl bg-white/40 border border-black/5 flex items-center justify-center text-slate-400 rounded-md hover:text-[#0D95F0] hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
          <Bell size={18} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-[#0D95F0] rounded-full ring-4 ring-white" />
        </button>

        <div className="w-px h-8 bg-black/5 mx-2" />

        {/* User Profile */}
        <button className="flex items-center gap-3 pl-1 pr-5 py-1.5 rounded-full hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group bg-white/40 border border-black/5">
          <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center text-[#0D95F0] text-[10px] font-black shadow-lg group-hover:scale-105 transition-transform duration-500">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-[11px] font-black text-[#0A1628] tracking-tight group-hover:text-[#0D95F0] transition-colors">Admin Core</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Authorized</div>
          </div>
        </button>
      </div>
    </header>
  )
}
