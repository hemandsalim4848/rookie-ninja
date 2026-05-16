import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-white py-20 px-4 font-body">
      <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
        <h2 className="font-display font-bold text-navy leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Get <span className="text-accent">in Touch</span>
            </h2>
        <p className="text-gray-600 text-md max-w-2xl mx-auto">
          We'd love to hear from you. Please fill out the form below, and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.08)] border border-gray-50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-navy ml-1">Full Name *</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-navy ml-1">Company</label>
            <input 
              type="text" 
              placeholder="Your Company"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-navy ml-1">Email Address *</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-navy ml-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+971 50 123 4567"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-navy ml-1">Subject *</label>
            <select 
  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-white appearance-none text-gray-500"
  defaultValue=""
  required
>
  <option value="" disabled>
    Select a subject
  </option>
  <option value="sales">Sales Inquiry</option>
  <option value="support">Technical Support</option>
  <option value="other">Other</option>
</select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-navy ml-1">How can we help you? *</label>
            <textarea 
              rows={4}
              placeholder="Tell us how we can help you..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300 resize-none"
              required
            ></textarea>
          </div>

          {/* Consent Checkbox */}
          <div className="md:col-span-2 flex items-start gap-3 py-2">
            <input 
              type="checkbox" 
              id="consent" 
              className="mt-1 h-4 w-4 rounded border-gray-300 text-navy focus:ring-accent"
              required
            />
            <label htmlFor="consent" className="text-sm text-gray-500 leading-snug">
              I agree to receive communications from Rookie Ninja. I understand I can unsubscribe at any time.*
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              className="bg-black hover:bg-navy text-white font-semibold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Send Message
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default ContactSection;