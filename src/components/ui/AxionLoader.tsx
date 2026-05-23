"use client";

import { motion } from "framer-motion";

interface AxionLoaderProps {
  message?: string;
  className?: string;
}

export default function AxionLoader({ 
  message = "Initializing Core Infrastructure...", 
  className = "h-[60vh]" 
}: AxionLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-10 ${className}`}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer rotating dashed ring */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 w-full h-full text-slate-200"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        </motion.svg>
        
        {/* Inner rotating solid ring */}
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 w-full h-full text-blue-100"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
        </motion.svg>
        
        {/* Inner pulsating core diamond */}
        <motion.div 
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          className="w-10 h-10 bg-gradient-to-tr from-[#0D95F0] to-[#0A1628] rounded-lg shadow-lg shadow-[#0D95F0]/30 rotate-45 flex items-center justify-center relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-white/20 blur-[2px] rounded-lg" />
        </motion.div>

        {/* Orbiting data packet */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 w-full h-full"
        >
           <div className="absolute top-[2px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#0D95F0] rounded-full shadow-[0_0_12px_rgba(13,149,240,0.9)]" />
        </motion.div>
      </div>
      
      <div className="flex flex-col items-center gap-3">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="flex items-center gap-3"
        >
           <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-300" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0A1628]">Axion System v4.0</span>
           <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-300" />
        </motion.div>
        {message && (
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
