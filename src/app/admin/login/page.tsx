'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0A1628] relative overflow-hidden items-center justify-center">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D95F0]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0D95F0]/8 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/[0.07] rounded-full" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative z-10 px-16 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-12 w-52 mb-16">
              <Image
                src="/images/company/logo-dark.png"
                alt="Axion Technology"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h1 className="text-4xl font-extrabold text-white font-sora leading-tight mb-4 tracking-tight">
              Command <br />
              <span className="text-[#0D95F0]">Center</span>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed mb-12">
              Enterprise content management system for Axion Technology's digital infrastructure.
            </p>

            <div className="space-y-5">
              {[
                { icon: Shield, text: 'Secure admin access with role-based permissions' },
                { icon: Lock, text: 'End-to-end encrypted session management' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon size={18} className="text-[#0D95F0]" />
                  </div>
                  <span className="text-white/50 text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center bg-[#F8FAFC] px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <div className="relative h-10 w-44 mb-2">
              <Image
                src="/images/company/logo-light1.png"
                alt="Axion Technology"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D95F0]/10 text-[#0D95F0] rounded-full text-xs font-bold mb-6 tracking-wide">
              <Shield size={12} />
              ADMIN ACCESS
            </div>
            <h2 className="text-3xl font-extrabold text-[#0A1628] font-sora tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Sign in to access the Axion admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <Lock size={14} />
                </div>
                {error}
              </motion.div>
            )}

            {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-[#0D95F0] text-[11px] font-bold flex items-center gap-3">
                 <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Shield size={14} />
                 </div>
                 <div>
                    <div className="uppercase tracking-wider mb-0.5">DEMO MODE ACTIVE</div>
                    <div className="opacity-70 font-medium">Use: admin@axion.com / admin123</div>
                 </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@axiontechnology.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/10 outline-none transition-all text-[#0A1628] font-medium placeholder:text-slate-300 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border border-slate-200 focus:border-[#0D95F0] focus:ring-4 focus:ring-[#0D95F0]/10 outline-none transition-all text-[#0A1628] font-medium placeholder:text-slate-300 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#0D95F0] hover:bg-[#0b82d4] text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#0D95F0]/20 hover:shadow-xl hover:shadow-[#0D95F0]/30 disabled:opacity-60 disabled:cursor-not-allowed mt-8 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-300 mt-10 font-medium">
            Protected by Supabase Auth · Axion Technology © 2026
          </p>
        </motion.div>
      </div>
    </div>
  )
}
