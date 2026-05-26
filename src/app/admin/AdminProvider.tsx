'use client'

import { useState, createContext, useContext } from 'react'
import { ThemeProvider } from 'next-themes'

interface AdminContextType {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
}

export const AdminContext = createContext<AdminContextType>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
})

export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
        {children}
      </AdminContext.Provider>
    </ThemeProvider>
  )
}
