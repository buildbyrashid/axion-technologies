"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    projectStatus: "",
    email: "",
    phone: "",
    country: "",
    width: "",
    height: "",
    uncertainSize: false,
    installationMethod: "",
    type: "",
    message: "",
    captcha: "",
  });

  const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0 });

  useEffect(() => {
    if (isOpen) {
      setCaptchaQuestion({
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10),
      });
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate captcha
    if (parseInt(formData.captcha) !== captchaQuestion.num1 + captchaQuestion.num2) {
      alert("Incorrect captcha answer");
      return;
    }
    console.log("Form submitted:", formData);
    // Add your submission logic here
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[900px] bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-10 md:p-14 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
              <h2 className="text-[42px] font-bold text-[#111111] mb-10 font-sora tracking-tight">
                Send a Comment
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {/* Project Status */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      * Project status:
                    </label>
                    <select
                      name="projectStatus"
                      required
                      value={formData.projectStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-[#666666] text-sm"
                    >
                      <option value="">Select Project status:</option>
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Business Email */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      * Business email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Business email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-sm placeholder:text-[#D1D5DB]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      Phone:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-sm"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      * Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-sm"
                    />
                  </div>

                  {/* Width */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      Width in millimeter:
                    </label>
                    <input
                      type="text"
                      name="width"
                      placeholder="Width in millimeter"
                      value={formData.width}
                      onChange={handleChange}
                      disabled={formData.uncertainSize}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-sm disabled:opacity-50"
                    />
                  </div>

                  {/* Height */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      Height in millimeter:
                    </label>
                    <input
                      type="text"
                      name="height"
                      placeholder="Height in millimeter"
                      value={formData.height}
                      onChange={handleChange}
                      disabled={formData.uncertainSize}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-sm disabled:opacity-50"
                    />
                    <div className="flex items-center justify-end space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="uncertainSize"
                        name="uncertainSize"
                        checked={formData.uncertainSize}
                        onChange={handleChange}
                        className="h-4 w-4 text-accent border-[#E5E7EB] rounded focus:ring-0 transition-all"
                      />
                      <label htmlFor="uncertainSize" className="text-sm text-[#666666]">
                        Uncertain size
                      </label>
                    </div>
                  </div>

                  {/* Installation Method */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      * Installation method:
                    </label>
                    <select
                      name="installationMethod"
                      required
                      value={formData.installationMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-[#666666] text-sm"
                    >
                      <option value="">right structure and a more accurate quote.</option>
                      <option value="Wall Mount">Wall Mount</option>
                      <option value="Hanging">Hanging</option>
                      <option value="Standing">Standing</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      * Type:
                    </label>
                    <select
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all text-[#666666] text-sm"
                    >
                      <option value="">Select * Type</option>
                      <option value="LED Display">LED Display</option>
                      <option value="LCD Video Wall">LCD Video Wall</option>
                      <option value="Interactive Panel">Interactive Panel</option>
                    </select>
                  </div>
                </div>

                {/* Message & Captcha row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Describe your project requirements here. The more details you provide (such as application, screen size, and indoor/outdoor environment), the faster we can send you a tailored proposal and accurate quote."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-0 focus:border-slate-300 transition-all resize-none text-sm placeholder:text-[#D1D5DB]"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[15px] font-[800] text-[#111111]">
                      *Enter the answer
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="text-base text-[#111111]">
                        {captchaQuestion.num1} + {captchaQuestion.num2} =
                      </div>
                      <input
                        type="number"
                        name="captcha"
                        required
                        value={formData.captcha}
                        onChange={handleChange}
                        className="w-20 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded focus:outline-none focus:border-slate-300 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="bg-[#006644] hover:bg-[#005533] text-white font-bold py-3 px-8 rounded-sm transition-all shadow-md active:scale-[0.98] text-[15px]"
                  >
                    Get Quote Now
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
