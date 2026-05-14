"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Phone, Send } from "lucide-react";

export default function ProductInquirySection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry submitted! Our team will contact you shortly.");
  };

  return (
    <section className="bg-[#001a33] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sky-400 font-bold tracking-widest uppercase text-[10px] mb-4">
              Contact Engineering
            </div>
            <h2 className="text-xl lg:text-2xl font-extrabold text-white leading-tight mb-4">
              Ready to Spec Your Project?
            </h2>
            <p className="mb-4 text-[11px] leading-5 text-white/70">
              Our technical sales team provides full system drawings, BOM
              optimization, and localized support for global deployments.
            </p>

            <div className="flex flex-col gap-3">
              {[
                {
                  href: "https://wa.me/yournumber",
                  icon: <MessageSquare size={16} />,
                  label: "WhatsApp Inquiry",
                },
                {
                  href: "mailto:sales@axiontechnology.com",
                  icon: <Mail size={16} />,
                  label: "Email Sales Team",
                },
                {
                  href: "tel:+123456789",
                  icon: <Phone size={16} />,
                  label: "Call Regional Office",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-sky-400/40 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-white transition-all flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-white text-xs">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Regional office note */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-1.5">
                Regional Offices
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Middle East · Southeast Asia · Europe · Africa
                <br />
                24 / 7 technical support across all regions.
              </p>
            </div>
          </motion.div>

          {/* Right: Quick contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 h-full flex flex-col"
          >
            <h3 className="text-base font-extrabold text-white mb-1">
              Quick Inquiry
            </h3>
            <p className="text-white/50 text-[11px] mb-5">
              Fill in your details and we will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-sky-400 focus:bg-white/10 outline-none text-white text-xs font-medium transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-sky-400 focus:bg-white/10 outline-none text-white text-xs font-medium transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-sky-400 focus:bg-white/10 outline-none text-white text-xs font-medium transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-sky-400 focus:bg-white/10 outline-none text-white text-xs font-medium transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Project Details
                </label>
                <textarea
                  name="details"
                  rows={4}
                  value={form.details}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-sky-400 focus:bg-white/10 outline-none text-white text-xs font-medium transition-all resize-none placeholder:text-white/20"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 h-10 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Send size={13} />
                Submit Technical Inquiry
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}