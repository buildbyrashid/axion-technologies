'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User, ArrowRight, Shield, Activity, ShieldCheck } from 'lucide-react'
export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid username or password. Please try again.');
        setLoading(false)
        return
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError('Unable to sign in right now. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-900 relative overflow-hidden corporate-sharp-theme">
      {/* Background Decor Layer */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-slate-50 to-white opacity-80 pointer-events-none" />
      
      {/* Left Panel — Branding (Spatial Identity) */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden items-center justify-center bg-[#0A1628]">
        {/* Deep Spatial Background */}
        <div className="absolute inset-0">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0D95F0]/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0D95F0]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
           <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]" />
           <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-transparent to-[#0A1628]" />
        </div>

        <div className="relative z-10 px-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-16"
          >
            <div className="relative h-14 w-60">
              <Image
                src="/images/company/logo-dark.png"
                alt="Axion Technology"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#0D95F0] shadow-2xl">
                     <Shield size={24} />
                  </div>
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Admin Portal</div>
               </div>
               <h1 className="text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                  Manage your <br />
                  <span className="text-[#0D95F0]">business.</span>
               </h1>
               <p className="text-white/40 text-xl font-medium max-w-md leading-relaxed">
                  Sign in to update content, manage enquiries, and keep the Axion Technology website up to date.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-10">
               {[
                 { icon: ShieldCheck, label: 'Security', value: 'Encrypted' },
                 { icon: Activity, label: 'Status', value: 'Online' },
               ].map((item, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.6 + i * 0.2 }}
                   className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10"
                 >
                   <item.icon size={20} className="text-[#0D95F0] mb-3" />
                   <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">{item.label}</div>
                   <div className="text-sm font-black text-white tracking-tight">{item.value}</div>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Spatial Login Terminal */}
      <div className="flex-1 flex items-center justify-center relative z-20 px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile Identity */}
          <div className="lg:hidden mb-12 flex justify-center">
             <div className="relative h-12 w-48">
               <Image
                 src="/images/company/logo-light1.png"
                 alt="Axion"
                 fill
                 className="object-contain"
                 priority
               />
             </div>
          </div>

          <div className="mb-12">
            <h2 className="text-5xl font-black text-[#0A1628] dark:text-white tracking-tighter mb-3 leading-tight">Sign in</h2>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-300 text-lg font-medium">Use your staff account to access the admin dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-rose-50 border border-rose-100 text-rose-500 text-sm font-black flex items-center gap-4 shadow-2xl shadow-rose-500/10"
              >
                <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                  <Lock size={18} />
                </div>
                {error}
              </motion.div>
            )}

            <div className="space-y-3 group/input">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-[#0D95F0] transition-colors" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="Enter your username"
                  className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 focus:border-[#0D95F0]/20 focus:ring-8 focus:ring-[#0D95F0]/5 outline-none transition-all text-[#0A1628] dark:text-white font-black text-sm tracking-tight placeholder:text-slate-300 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-3 group/input">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-[#0D95F0] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-16 pr-14 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 focus:border-[#0D95F0]/20 focus:ring-8 focus:ring-[#0D95F0]/5 outline-none transition-all text-[#0A1628] dark:text-white font-black text-sm tracking-tight placeholder:text-slate-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0D95F0] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-[2.5rem] bg-[#0A1628] text-white font-black text-xs uppercase tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-4 shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-12 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                </>
              )}
            </button>
          </form>

          <div className="mt-16 flex flex-col items-center gap-6">
             <div className="flex items-center gap-6 opacity-30">
                <Shield size={16} />
                <div className="h-4 w-px bg-slate-300" />
                <Activity size={16} />
             </div>
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
               Axion Technology · Admin Portal
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
