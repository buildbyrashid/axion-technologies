'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Settings as SettingsIcon, Save, KeyRound, Mail, ShieldAlert } from 'lucide-react'
import SpatialBadge from '@/components/ui/SpatialBadge'

export default function SettingsPage() {
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirm(true)
  }

  const confirmUpdate = async () => {
    setShowConfirm(false)
    setIsUpdating(true)

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentEmail,
          currentPassword,
          newEmail,
          newPassword
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success('Credentials updated successfully. Please use them on your next login.')
        setCurrentEmail('')
        setCurrentPassword('')
        setNewEmail('')
        setNewPassword('')
      } else {
        toast.error(json.error || 'Failed to update credentials.')
      }
    } catch (e) {
      toast.error('Connection error.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.5rem] bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] shadow-inner">
              <SettingsIcon size={24} />
            </div>
            <SpatialBadge variant="blue" pulse>System Configuration</SpatialBadge>
          </div>
          <h1 className="text-5xl font-extrabold text-[#0A1628] tracking-tighter leading-tight">Admin Settings</h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed italic">Update your administrator credentials and platform settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] border border-black/5 p-10 lg:p-14 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D95F0]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-[#0A1628] tracking-tight flex items-center gap-3">
                <ShieldAlert className="text-[#0D95F0]" size={24} />
                Security Credentials
              </h2>
              <p className="text-sm font-medium text-slate-500 italic">Enter your current credentials to authorize changes to your administrator account.</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-4">Current Email (Username)</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
                    <input
                      type="email"
                      value={currentEmail}
                      onChange={e => setCurrentEmail(e.target.value)}
                      required
                      placeholder="admin@axion.com"
                      className="w-full pl-14 pr-6 py-4 rounded-[1.75rem] bg-slate-50 border border-black/5 focus:border-[#0D95F0]/50 focus:bg-white outline-none transition-all text-sm font-black text-[#0A1628] placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-4">Current Password</label>
                  <div className="relative group">
                    <KeyRound size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-14 pr-6 py-4 rounded-[1.75rem] bg-slate-50 border border-black/5 focus:border-[#0D95F0]/50 focus:bg-white outline-none transition-all text-sm font-black text-[#0A1628] placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-black/5 my-4" />

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D95F0] pl-4">New Email (Username)</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      required
                      placeholder="newadmin@axion.com"
                      className="w-full pl-14 pr-6 py-4 rounded-[1.75rem] bg-slate-50 border border-black/5 focus:border-[#0D95F0]/50 focus:bg-white outline-none transition-all text-sm font-black text-[#0A1628] placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D95F0] pl-4">New Password</label>
                  <div className="relative group">
                    <KeyRound size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D95F0] transition-colors" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-14 pr-6 py-4 rounded-[1.75rem] bg-slate-50 border border-black/5 focus:border-[#0D95F0]/50 focus:bg-white outline-none transition-all text-sm font-black text-[#0A1628] placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full mt-4 flex items-center justify-center gap-3 px-8 py-5 bg-[#0D95F0] hover:bg-[#0A1628] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#0D95F0]/20 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isUpdating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  <>
                    <Save size={18} /> Update Credentials
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[200]"
            onClick={() => setShowConfirm(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl z-[210] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0D95F0]" />
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#0D95F0]/10 flex items-center justify-center text-[#0D95F0] shadow-inner">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0A1628] tracking-tight mb-2">Confirm Update</h3>
                <p className="text-sm text-slate-500 font-medium">Are you sure you want to change your administrator credentials?</p>
              </div>
              <div className="w-full flex flex-col gap-3 pt-4">
                <button
                  onClick={confirmUpdate}
                  className="w-full py-4 bg-[#0D95F0] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#0A1628] transition-colors"
                >
                  Yes, Update Now
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
