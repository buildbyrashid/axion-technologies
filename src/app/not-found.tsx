"use client";

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#021752] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#0D95F0]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#0D95F0]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="mb-8 relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Lost in Space
            </h2>
          </div>
        </div>

        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or never existed in this dimension.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-4 bg-[#0D95F0] hover:bg-[#0D95F0]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            Axion Technology — Engineering the Future
          </p>
        </div>
      </div>
    </div>
  );
}
