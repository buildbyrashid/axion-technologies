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
      // Simulate API call ΓÇö replace with actual endpoint
      await new Promise((res) => setTimeout(res, 1200));
      console.log('Form submitted:', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-form-wrapper">
      {status === 'success' ? (
        <div className="contact-form__success" role="alert">
          <CheckCircle size={48} className="contact-form__success-icon" />
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out. Our team will get back to you within 1ΓÇô2 business days.</p>
          <button className="btn btn-primary" onClick={() => setStatus('idle')}>
            Send Another Message
          </button>
        </div>
      ) : (
        <form
          className="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Contact form"
          noValidate
        >
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="cf-name" className="contact-form__label">Full Name *</label>
              <input
                id="cf-name"
                type="text"
                className={`contact-form__input${errors.name ? ' contact-form__input--error' : ''}`}
                placeholder="Your full name"
                {...register('name')}
              />
              {errors.name && (
                <span className="contact-form__error" role="alert">
                  <AlertCircle size={13} /> {errors.name.message}
                </span>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="cf-email" className="contact-form__label">Email Address *</label>
              <input
                id="cf-email"
                type="email"
                className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`}
                placeholder="your@company.com"
                {...register('email')}
              />
              {errors.email && (
                <span className="contact-form__error" role="alert">
                  <AlertCircle size={13} /> {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="cf-company" className="contact-form__label">Company *</label>
              <input
                id="cf-company"
                type="text"
                className={`contact-form__input${errors.company ? ' contact-form__input--error' : ''}`}
                placeholder="Your company name"
                {...register('company')}
              />
              {errors.company && (
                <span className="contact-form__error" role="alert">
                  <AlertCircle size={13} /> {errors.company.message}
                </span>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="cf-phone" className="contact-form__label">Phone Number</label>
              <input
                id="cf-phone"
                type="tel"
                className="contact-form__input"
                placeholder="+971 XX XXX XXXX"
                {...register('phone')}
              />
            </div>
          </div>

          <div className="contact-form__field">
            <label htmlFor="cf-product" className="contact-form__label">Product Interest *</label>
            <select
              id="cf-product"
              className={`contact-form__input contact-form__select${errors.productInterest ? ' contact-form__input--error' : ''}`}
              {...register('productInterest')}
              defaultValue=""
            >
              <option value="" disabled>Select a product categoryΓÇª</option>
              {productOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.productInterest && (
              <span className="contact-form__error" role="alert">
                <AlertCircle size={13} /> {errors.productInterest.message}
              </span>
            )}
          </div>

          <div className="contact-form__field">
            <label htmlFor="cf-details" className="contact-form__label">Project Details *</label>
            <textarea
              id="cf-details"
              rows={5}
              className={`contact-form__input contact-form__textarea${errors.projectDetails ? ' contact-form__input--error' : ''}`}
              placeholder="Tell us about your project, requirements, timeline, and any specific needsΓÇª"
              {...register('projectDetails')}
            />
            {errors.projectDetails && (
              <span className="contact-form__error" role="alert">
                <AlertCircle size={13} /> {errors.projectDetails.message}
              </span>
            )}
          </div>

          {status === 'error' && (
            <div className="contact-form__error-banner" role="alert">
              <AlertCircle size={16} />
              Something went wrong. Please try again or email us directly at sales@axiontechnology.com
            </div>
          )}

          <button
            type="submit"
            id="contact-form-submit"
            className="btn btn-primary contact-form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="contact-form__spinner" aria-hidden="true" />
                SendingΓÇª
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
