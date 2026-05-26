import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdmin } from '@/app/admin/AdminProvider'
import { Plus, Bell, Search, ChevronRight, CheckCircle2, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

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
    let label = breadcrumbMap[currentPath] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    if (label.length > 20) {
      label = label.substring(0, 8) + '...'
    }
    crumbs.push({ label, href: currentPath })
  }

  return crumbs
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const router = useRouter()
  const breadcrumbs = getBreadcrumbs(pathname)
  const [scrolled, setScrolled] = useState(false)

  // Notification state
  const [inquiries, setInquiries] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) setScrolled(isScrolled)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  useEffect(() => {
    fetchNewInquiries()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  const fetchNewInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries?status=new')
      const json = await res.json()
      if (json.success) {
        setInquiries(json.data)
      }
    } catch (e) {
      console.error('Failed to fetch new inquiries', e)
    }
  }

  const markAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' })
      })
      setInquiries(prev => prev.filter(inq => inq.id !== id))
    } catch (e) {
      console.error('Failed to mark inquiry as read', e)
    }
  }

  const markAllAsRead = async () => {
    try {
      for (const inq of inquiries) {
        await fetch(`/api/admin/inquiries/${inq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'read' })
        })
      }
      setInquiries([])
      setShowNotifications(false)
    } catch (e) {
      console.error('Failed to mark all as read', e)
    }
  }

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
      scrolled ? "bg-white/60 backdrop-blur-3xl border-b border-black/5 dark:border-white/10" : "bg-transparent border-b border-transparent"
    )}>
      {/* Left — Breadcrumbs */}
      <div className="flex items-center gap-6 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-300">
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={10} className="text-slate-300" />}
              {i < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[#0D95F0] dark:hover:text-[#0D95F0] transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#0A1628] dark:text-white">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center — Spotlight Trigger */}
      <div className="flex-1 max-w-2xl px-8 keep-rounded">
        <div
          role="button"
          tabIndex={0}
          onClick={openCommandPalette}
          onKeyDown={(e) => e.key === 'Enter' && openCommandPalette()}
          className="w-full relative group outline-none keep-rounded cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/[0.03] dark:bg-white/[0.03] rounded-2xl blur-xl group-hover:bg-[#0D95F0]/5 transition-all duration-500 keep-rounded" />
          <div className="relative flex items-center gap-4 px-6 py-3.5 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] group-hover:bg-white dark:group-hover:bg-black group-hover:shadow-2xl group-hover:shadow-black/[0.02] transition-all duration-500 text-left keep-rounded">
            <Search size={18} className="text-slate-300 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 group-hover:text-[#0D95F0] transition-colors duration-500 keep-rounded" />
            <span className="flex-1 text-sm text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 font-bold tracking-tight keep-rounded">Search enterprise intelligence...</span>
            <div className="flex items-center gap-1.5 keep-rounded">
              <kbd className="px-2.5 py-1 bg-black/5 dark:bg-white/5 rounded-lg text-[10px] font-black text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 border border-black/5 dark:border-white/5 group-hover:border-[#0D95F0]/20 group-hover:text-[#0D95F0] transition-all keep-rounded">⌘</kbd>
              <kbd className="px-2.5 py-1 bg-black/5 dark:bg-white/5 rounded-lg text-[10px] font-black text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 border border-black/5 dark:border-white/5 group-hover:border-[#0D95F0]/20 group-hover:text-[#0D95F0] transition-all keep-rounded">K</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-11 h-11 rounded-full bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 hover:text-[#0D95F0] hover:bg-white dark:hover:bg-black hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
          >
            <Bell size={18} />
            {inquiries.length > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D95F0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0D95F0] border-2 border-white"></span>
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/10 border border-black/5 dark:border-white/10 overflow-hidden z-50">
              <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <span className="text-xs font-black uppercase tracking-widest text-[#0A1628] dark:text-white">Notifications</span>
                {inquiries.length > 0 && (
                  <button onClick={markAllAsRead} className="text-[10px] font-black uppercase tracking-widest text-[#0D95F0] hover:underline flex items-center gap-1">
                    <CheckCheck size={12} /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {inquiries.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 text-sm font-medium">
                    No new inquiries
                  </div>
                ) : (
                  inquiries.map(inq => (
                    <div 
                      key={inq.id} 
                      onClick={() => {
                        setShowNotifications(false);
                        router.push(`/admin/inquiries?id=${inq.id}`)
                      }}
                      className="p-4 border-b border-black/5 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group flex gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black text-[#0A1628] dark:text-white truncate pr-2">{inq.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 shrink-0">{new Date(inq.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-300 truncate">{inq.subject || inq.message}</p>
                      </div>
                      <button 
                        onClick={(e) => markAsRead(inq.id, e)}
                        className="text-slate-300 hover:text-[#0D95F0] opacity-0 group-hover:opacity-100 transition-all shrink-0 self-center"
                        title="Mark as read"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-black/5 dark:bg-white/10 mx-2" />

        <ThemeToggle />

        {/* User Profile */}
        <Link href="/admin/settings" className="flex items-center gap-3 pl-1 pr-5 py-1.5 rounded-full hover:bg-white dark:hover:bg-black hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/5">
          <div className="w-9 h-9 rounded-full bg-slate-950 dark:bg-white dark:bg-slate-900 flex items-center justify-center text-[#0D95F0] text-[10px] font-black shadow-lg group-hover:scale-105 transition-transform duration-500">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-[11px] font-black text-[#0A1628] dark:text-white tracking-tight group-hover:text-[#0D95F0] transition-colors">Admin Core</div>
            <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-300 uppercase tracking-[0.15em]">Authorized</div>
          </div>
        </Link>
      </div>
    </header>
  )
}
