'use client'

import { useState, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from '../../components/admin/Sidebar'
import AdminTopbar from '../../components/admin/Topbar'
import CommandPalette from '../../components/admin/CommandPalette'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'

interface AdminContextType {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
}

export const AdminContext = createContext<AdminContextType>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
})

export const useAdmin = () => useContext(AdminContext)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  // Login page gets its own layout (no sidebar/topbar)
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <AdminContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
        {/* Spatial Background Architecture */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#0D95F0]/[0.03] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-200/[0.2] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white rounded-full blur-[160px] opacity-40 pointer-events-none" />
        
        <AdminSidebar />
        <CommandPalette />

        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <AdminTopbar />

          <main className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide">
            <motion.div 
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="p-10 lg:p-14 max-w-[1800px] mx-auto w-full min-h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '24px',
              padding: '20px 24px',
              boxShadow: '0 32px 80px -20px rgba(0,0,0,0.15)',
              fontFamily: 'inherit',
              fontSize: '14px',
              fontWeight: '800',
            },
          }}
          richColors
        />
      </div>
    </AdminContext.Provider>
  )
}
