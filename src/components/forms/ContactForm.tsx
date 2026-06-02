'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(1, 'Company name is required'),
  phone: z.string().optional(),
  productInterest: z.string().min(1, 'Please select a product category'),
  projectDetails: z.string().min(10, 'Please provide at least 10 characters about your project'),
});

type FormData = z.infer<typeof schema>;

const productOptions = [
  'LED Display Systems',
  'LCD Screens & Interactive Kiosks',
  'Lighting Systems',
  'Professional Audio Systems',
  'Power Distribution & Cable Solutions',
  'Multiple Categories / Full Solution',
  'Other / General Enquiry',
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1200));
      console.log('Form submitted:', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6 bg-slate-50 border border-slate-100 shadow-sm" role="alert">
        <CheckCircle size={64} className="text-accent mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-primary mb-4 font-sora">Message Sent Successfully!</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Thank you for reaching out to Axion Technology. Our team will review your request and get back to you within 1–2 business days.
        </p>
        <button 
          className="bg-primary hover:bg-accent text-white font-bold py-3 px-8 transition-all duration-300" 
          onClick={() => setStatus('idle')}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Contact form"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="cf-name" className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
            Full Name *
          </label>
          <input
            id="cf-name"
            type="text"
            className={`w-full px-4 py-3.5 bg-white border ${errors.name ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-accent/10'} focus:outline-none focus:ring-2 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300 shadow-sm`}
            placeholder="Your full name"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-xs text-red-500 font-medium flex items-center mt-1" role="alert">
              <AlertCircle size={12} className="mr-1" /> {errors.name.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="cf-email" className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
            Business Email *
          </label>
          <input
            id="cf-email"
            type="email"
            className={`w-full px-4 py-3.5 bg-white border ${errors.email ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-accent/10'} focus:outline-none focus:ring-2 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300 shadow-sm`}
            placeholder="your@company.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-xs text-red-500 font-medium flex items-center mt-1" role="alert">
              <AlertCircle size={12} className="mr-1" /> {errors.email.message}
            </span>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="cf-company" className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
            Company *
          </label>
          <input
            id="cf-company"
            type="text"
            className={`w-full px-4 py-3.5 bg-white border ${errors.company ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-accent/10'} focus:outline-none focus:ring-2 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300 shadow-sm`}
            placeholder="Your company name"
            {...register('company')}
          />
          {errors.company && (
            <span className="text-xs text-red-500 font-medium flex items-center mt-1" role="alert">
              <AlertCircle size={12} className="mr-1" /> {errors.company.message}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="cf-phone" className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            id="cf-phone"
            type="tel"
            className="w-full px-4 py-3.5 bg-white border border-slate-200 focus:ring-accent/10 focus:outline-none focus:ring-2 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300 shadow-sm"
            placeholder="+1 234 567 890"
            {...register('phone', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              }
            })}
          />
        </div>
      </div>

      {/* Product Interest */}
      <div className="space-y-2">
        <label htmlFor="cf-product" className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
          Product Interest *
        </label>
        <select
          id="cf-product"
          className={`w-full px-4 py-3.5 bg-white border ${errors.productInterest ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-accent/10'} focus:outline-none focus:ring-2 focus:border-accent transition-all text-sm font-medium shadow-sm appearance-none cursor-pointer`}
          {...register('productInterest')}
          defaultValue=""
        >
          <option value="" disabled>Select a product category...</option>
          {productOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.productInterest && (
          <span className="text-xs text-red-500 font-medium flex items-center mt-1" role="alert">
            <AlertCircle size={12} className="mr-1" /> {errors.productInterest.message}
          </span>
        )}
      </div>

      {/* Project Details */}
      <div className="space-y-2">
        <label htmlFor="cf-details" className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">
          Project Details *
        </label>
        <textarea
          id="cf-details"
          rows={5}
          className={`w-full px-4 py-3.5 bg-white border ${errors.projectDetails ? 'border-red-400 focus:ring-red-50' : 'border-slate-200 focus:ring-accent/10'} focus:outline-none focus:ring-2 focus:border-accent transition-all text-sm font-medium placeholder:text-slate-300 shadow-sm resize-none`}
          placeholder="Tell us about your project, requirements, timeline, and any specific needs..."
          {...register('projectDetails')}
        />
        {errors.projectDetails && (
          <span className="text-xs text-red-500 font-medium flex items-center mt-1" role="alert">
            <AlertCircle size={12} className="mr-1" /> {errors.projectDetails.message}
          </span>
        )}
      </div>

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm flex items-center" role="alert">
          <AlertCircle size={16} className="mr-2" />
          Something went wrong. Please try again or email us directly at sales@axiontechnology.com
        </div>
      )}

      <button
        type="submit"
        className="w-full group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-primary hover:bg-accent hover:shadow-[0_10px_20px_rgba(13,149,240,0.3)] active:scale-95 disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} className="mr-2" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
