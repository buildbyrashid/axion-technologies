"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Info, 
  Settings, 
  Box, 
  FileText, 
  Images,
  MessageSquare,
  Mail,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProductDownload {
  title: string;
  type: string;
  size: string;
  url: string;
}

interface ProductPageProps {
  title: string;
  category: string;
  description: string;
  heroImage: string;
  keySpecs: ProductSpec[];
  features: ProductFeature[];
  specifications: ProductSpec[];
  accessories: ProductSpec[];
  downloads: ProductDownload[];
  gallery: string[];
}

export default function ProductPageLayout({
  title,
  category,
  description,
  heroImage,
  keySpecs,
  features,
  specifications,
  accessories,
  downloads,
  gallery,
}: ProductPageProps) {
  const [activeTab, setActiveTab] = useState("features");

  const tabs = [
    { id: "features", label: "Features", icon: <CheckCircle2 size={16} /> },
    { id: "specs", label: "Specifications", icon: <Settings size={16} /> },
    { id: "accessories", label: "Accessories", icon: <Box size={16} /> },
    { id: "downloads", label: "Downloads", icon: <FileText size={16} /> },
    { id: "applications", label: "Applications", icon: <Images size={16} /> },
  ];

  return (
    <div className="product-page bg-white">
      {/* 1. Product Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-[120px] pb-24 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroImage} 
            alt={title} 
            fill 
            className="object-cover opacity-30 grayscale scale-110"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.15)_0%,transparent_70%)] bg-gradient-to-r from-primary via-primary/95 to-transparent" />
        
        <div className="container-custom relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none-none bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-8">
                <Info size={14} /> {category}
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold font-sora leading-[1.1] mb-8 tracking-tight">
                {title}
              </h1>
              <p className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                {description}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
                {keySpecs.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">{spec.label}</span>
                    <span className="text-lg font-bold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-5">
                <Button className="rounded-none-none bg-accent hover:bg-white hover:text-accent h-16 px-10 text-lg font-bold group shadow-lg shadow-accent/20 transition-all duration-300">
                  Request Quote <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="rounded-none-none border-white/20 text-white hover:bg-white/10 h-16 px-10 text-lg font-bold transition-all duration-300">
                  Contact Specialist
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full rounded-none-none overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] border border-white/10"
            >
              <Image 
                src={heroImage} 
                alt={title} 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended Product Tabs */}
      <section className="relative z-20 -mt-10">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-white/90 backdrop-blur-md rounded-none-none shadow-2xl border border-slate-200/50 max-w-fit mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-none-none text-sm font-bold transition-all duration-300 whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                    : "text-slate-500 hover:text-primary hover:bg-slate-100"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="py-24">
            <AnimatePresence mode="wait">
              {activeTab === "features" && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-16">
                    <div className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Engineering Excellence</div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">Key Technical Advantages</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                      <div key={index} className="p-10 bg-white rounded-none-none border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/20 group">
                        <div className="w-16 h-16 rounded-none-none bg-slate-50 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                          {feature.icon || <CheckCircle2 size={32} />}
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-lg">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-16">
                    <div className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Technical Data</div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">Detailed Specifications</h2>
                  </div>
                  <div className="bg-white rounded-none-none border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {specifications.map((spec, index) => (
                          <tr key={index} className="border-bottom border-slate-100 group">
                            <th className="py-6 px-8 bg-slate-50/50 w-1/3 font-bold text-primary group-hover:bg-slate-50 transition-colors">
                              {spec.label}
                            </th>
                            <td className="py-6 px-8 text-slate-600 group-hover:text-primary transition-colors">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "accessories" && (
                <motion.div
                  key="accessories"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-16">
                    <div className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Complete Solution</div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">Optional Accessories</h2>
                  </div>
                  <div className="bg-white rounded-none-none border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {accessories.map((item, index) => (
                          <tr key={index} className="border-bottom border-slate-100 group">
                            <th className="py-6 px-8 bg-slate-50/50 w-1/3 font-bold text-primary group-hover:bg-slate-50 transition-colors">
                              {item.label}
                            </th>
                            <td className="py-6 px-8 text-slate-600 group-hover:text-primary transition-colors">
                              {item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "downloads" && (
                <motion.div
                  key="downloads"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-16">
                    <div className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Resources</div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">Technical Downloads</h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    {downloads.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-6 bg-slate-50 rounded-none-none border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:border-accent/20 group cursor-pointer">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-none-none bg-white flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all">
                            <Download size={24} />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-primary mb-1">{file.title}</div>
                            <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{file.type} • {file.size}</div>
                          </div>
                        </div>
                        <Button variant="ghost" className="rounded-none-none text-accent font-bold hover:bg-accent hover:text-white transition-all">
                          Download Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "applications" && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  <div className="text-center mb-16">
                    <div className="text-accent font-bold tracking-widest uppercase text-xs mb-4">Case Studies</div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">Application Gallery</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((img, index) => (
                      <div key={index} className="relative aspect-video rounded-none-none overflow-hidden group cursor-pointer">
                        <Image 
                          src={img} 
                          alt={`Application ${index + 1}`} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                           <Button className="rounded-none-none bg-white text-primary font-bold hover:bg-accent hover:text-white border-none shadow-xl">
                             View Project
                           </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Inquiry Section */}
      <section className="pb-32">
        <div className="container-custom">
          <div className="relative overflow-hidden bg-primary rounded-none-[3rem] p-10 lg:p-20 text-white">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/20 blur-[120px] rounded-none-none -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 blur-[80px] rounded-none-none pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <div className="text-accent font-bold tracking-widest uppercase text-sm mb-6">Contact Engineering</div>
                <h2 className="text-4xl lg:text-6xl font-extrabold font-sora leading-tight mb-8">Ready to Spec Your Project?</h2>
                <p className="text-xl text-white/70 mb-12 max-w-lg leading-relaxed">
                  Our technical sales team provides full system drawings, BOM optimization, and localized support for global deployments.
                </p>
                
                <div className="grid grid-cols-1 gap-4 max-w-sm">
                  <a href="https://wa.me/your-number" className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-none-none hover:bg-white/10 hover:border-accent transition-all group">
                    <div className="w-12 h-12 rounded-none-none bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <MessageSquare size={20} />
                    </div>
                    <span className="font-bold text-lg">WhatsApp Inquiry</span>
                  </a>
                  <a href="mailto:sales@axiontechnology.com" className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-none-none hover:bg-white/10 hover:border-accent transition-all group">
                    <div className="w-12 h-12 rounded-none-none bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <span className="font-bold text-lg">Email Sales Team</span>
                  </a>
                  <a href="tel:+123456789" className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-none-none hover:bg-white/10 hover:border-accent transition-all group">
                    <div className="w-12 h-12 rounded-none-none bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <span className="font-bold text-lg">Call Regional Office</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-none-[2.5rem] p-10 lg:p-12 shadow-2xl">
                 <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                        <input type="text" className="w-full p-4 rounded-none-none bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-accent focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                        <input type="text" className="w-full p-4 rounded-none-none bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-accent focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Email</label>
                      <input type="email" className="w-full p-4 rounded-none-none bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-accent focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Details</label>
                      <textarea rows={4} className="w-full p-4 rounded-none-none bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-accent focus:bg-white transition-all outline-none text-slate-900 font-medium resize-none"></textarea>
                    </div>
                    <Button className="w-full h-16 bg-accent text-white font-bold text-xl rounded-none-none hover:scale-[1.02] shadow-xl shadow-accent/20 active:scale-[0.98] transition-all">
                      Submit Technical Inquiry
                    </Button>
                 </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

