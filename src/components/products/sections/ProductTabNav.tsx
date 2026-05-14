"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Settings, Box, FileText, Images } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "features",      label: "Features",        icon: <CheckCircle2 size={15} /> },
  { id: "specs",         label: "Specifications",   icon: <Settings size={15} /> },
  { id: "accessories",   label: "Accessories",      icon: <Box size={15} /> },
  { id: "downloads",     label: "Downloads",        icon: <FileText size={15} /> },
  { id: "applications",  label: "Applications",     icon: <Images size={15} /> },
];

interface Props {
  activeSection: string;
}

export default function ProductTabNav({ activeSection }: Props) {
  const [active, setActive] = useState(activeSection);
  const [stuck, setStuck] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Highlight active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setStuck(window.scrollY > 80);

      // Higher threshold for detection
      const threshold = 160; 

      for (const tab of [...tabs].reverse()) {
        const el = document.getElementById(`section-${tab.id}`);
        if (el && window.scrollY + threshold >= el.offsetTop) {
          setActive(tab.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tab = activeTabRef.current;
      
      const scrollLeft = tab.offsetLeft - (container.clientWidth / 2) + (tab.clientWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [active]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const offset = 100;
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }
  };

  return (
    <div
      className={cn(
        "sticky top-[68px] z-30 transition-all duration-300",
        stuck ? "bg-[#0a1628] shadow-lg border-b border-white/10" : "bg-white border-b border-slate-100"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div 
          ref={scrollContainerRef}
          className="flex gap-1 overflow-x-auto scrollbar-hide md:justify-center"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={active === tab.id ? activeTabRef : null}
              onClick={() => scrollTo(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all duration-300",
                active === tab.id
                  ? (stuck ? "border-sky-400 text-sky-400" : "border-sky-500 text-sky-600")
                  : (stuck ? "border-transparent text-white/50 hover:text-white" : "border-transparent text-slate-400 hover:text-slate-700")
              )}
            >
              <span className={cn("transition-colors duration-300", active === tab.id ? "" : (stuck ? "text-white/40" : "text-slate-400"))}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
