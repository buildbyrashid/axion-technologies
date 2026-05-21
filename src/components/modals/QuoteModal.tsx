"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate captcha
    if (parseInt(formData.captcha) !== captchaQuestion.num1 + captchaQuestion.num2) {
      toast.error("Incorrect captcha answer");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Quote request submitted successfully!");
        setFormData({
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
        onClose();
      } else {
        toast.error(json.error || "Failed to submit quote request");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            className="relative w-full max-w-[900px] bg-white shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-10 md:p-14 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
              <h2 className="text-3xl md:text-[40px] font-extrabold text-primary mb-10 font-sora tracking-tighter leading-none">
                Request a Quote
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {/* Project Status */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      * Project status:
                    </label>
                    <select
                      name="projectStatus"
                      required
                      value={formData.projectStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-slate-700 text-sm font-medium"
                    >
                      <option value="">Select Project Status</option>
                      <option value="Concept / Planning">Concept / Planning</option>
                      <option value="Design Phase">Design Phase</option>
                      <option value="Procurement">Procurement</option>
                      <option value="Ongoing Project">Ongoing Project</option>
                      <option value="Ready for Order">Ready for Order</option>
                    </select>
                  </div>

                  {/* Business Email */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      * Business email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +1 234 567 890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      * Country/Region:
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      placeholder="Enter country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300"
                    />
                  </div>

                  {/* Width */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      Width in mm:
                    </label>
                    <input
                      type="text"
                      name="width"
                      placeholder="Width (optional)"
                      value={formData.width}
                      onChange={handleChange}
                      disabled={formData.uncertainSize}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-sm font-medium disabled:opacity-50 placeholder:text-slate-300"
                    />
                  </div>

                  {/* Height */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      Height in mm:
                    </label>
                    <input
                      type="text"
                      name="height"
                      placeholder="Height (optional)"
                      value={formData.height}
                      onChange={handleChange}
                      disabled={formData.uncertainSize}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-sm font-medium disabled:opacity-50 placeholder:text-slate-300"
                    />
                    <div className="flex items-center space-x-2.5 pt-1.5">
                      <input
                        type="checkbox"
                        id="uncertainSize"
                        name="uncertainSize"
                        checked={formData.uncertainSize}
                        onChange={handleChange}
                        className="h-4 w-4 text-accent border-slate-300 focus:ring-accent/20 transition-all cursor-pointer"
                      />
                      <label htmlFor="uncertainSize" className="text-xs font-semibold text-slate-500 cursor-pointer">
                        Size not yet confirmed
                      </label>
                    </div>
                  </div>

                  {/* Installation Method */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      * Installation method:
                    </label>
                    <select
                      name="installationMethod"
                      required
                      value={formData.installationMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-slate-700 text-sm font-medium"
                    >
                      <option value="">Select Installation Method</option>
                      <option value="Fixed Installation">Fixed Installation</option>
                      <option value="Rental / Staging">Rental / Staging</option>
                      <option value="Wall Mounted">Wall Mounted</option>
                      <option value="Pole Mounted / Hanging">Pole Mounted / Hanging</option>
                      <option value="Custom Structure">Custom Structure</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div className="space-y-2.5">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      * Solution Type:
                    </label>
                    <select
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all text-slate-700 text-sm font-medium"
                    >
                      <option value="">Select Solution Type</option>
                      <option value="LED Display Systems">LED Display Systems</option>
                      <option value="LCD Screens & Interactive Kiosks">LCD Screens & Interactive Kiosks</option>
                      <option value="Lighting Systems">Lighting Systems</option>
                      <option value="Professional Audio Systems">Professional Audio Systems</option>
                      <option value="Power Distribution & Cable Solutions">Power Distribution & Cable Solutions</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2.5">
                  <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                    Project Requirements & Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your project requirements here. Include details like environment, pixel pitch preference, or specific technical needs for a more accurate quote."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all resize-none text-sm font-medium placeholder:text-slate-300"
                  />
                </div>

                {/* Captcha & Submit row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
                  <div className="space-y-3">
                    <label className="block text-[13px] font-bold text-slate-900 uppercase tracking-wider">
                      * Verify you're human
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-bold text-primary bg-slate-100 px-4 py-2.5 border border-slate-200">
                        {captchaQuestion.num1} + {captchaQuestion.num2} =
                      </div>
                      <input
                        type="number"
                        name="captcha"
                        required
                        value={formData.captcha}
                        onChange={handleChange}
                        className="w-20 px-3 py-2.5 bg-slate-50 border border-slate-200 focus:outline-none focus:border-accent transition-all text-sm font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-primary hover:bg-accent hover:shadow-[0_10px_20px_rgba(13,149,240,0.3)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative flex items-center gap-2">
                      {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                      {isSubmitting ? "Submitting..." : "Submit Request Now"}
                    </span>
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
