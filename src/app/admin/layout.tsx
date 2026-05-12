'use client'

import { useState, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from '../../components/admin/Sidebar'
import AdminTopbar from '../../components/admin/Topbar'
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
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0D95F0]/3 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0D95F0]/2 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <AdminTopbar />

          <main className="flex-1 overflow-y-auto scroll-smooth">
            <motion.div 
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="p-8 lg:p-10 max-w-[1600px] mx-auto w-full"
            >
              {children}
            </motion.div>
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '16px 20px',
              boxShadow: '0 20px 60px -15px rgba(0,0,0,0.1)',
              fontFamily: 'var(--font-plus-jakarta)',
              fontSize: '14px',
              fontWeight: '600',
            },
          }}
          richColors
        />
      </div>
    </AdminContext.Provider>
  )
}
