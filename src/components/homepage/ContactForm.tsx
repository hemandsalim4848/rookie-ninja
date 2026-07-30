'use client';

import { useState } from 'react';

const subjectLabels: Record<string, string> = {
  sales: 'Sales Inquiry',
  support: 'Technical Support',
  other: 'Other',
};

const ContactSection = () => {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: '', website: '',
  });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const [firstName, ...rest] = form.name.trim().split(/\s+/);
      const lastName = rest.join(' ') || firstName;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: subjectLabels[form.subject] || form.subject,
          message: form.message,
          source: 'contact',
          website: form.website,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');

      setSubmitted(true);
      setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '', website: '' });
      setConsent(false);
    } catch (err: any) {
      setError(err?.message === 'Too many requests, please try again later'
        ? 'Too many requests — please try again in a few minutes.'
        : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

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
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent
                            flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.6"
                   strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="font-display text-[22px] font-bold text-navy mb-2">
              Message Sent!
            </h3>
            <p className="font-body text-[14px] text-gray-400 font-light">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 font-body text-[13px] text-accent border
                         border-accent/40 px-5 py-2.5 rounded-xl
                         transition-all duration-200 hover:bg-accent/10">
              Send Another
            </button>
          </div>
        ) : (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

          {/* Honeypot */}
          <input
            type="text" value={form.website}
            onChange={(e) => update('website', e.target.value)}
            tabIndex={-1} autoComplete="off" aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px opacity-0"
          />

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-navy ml-1">Full Name *</label>
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-sm font-semibold text-navy ml-1">Company *</label>
            <input
              id="company"
              type="text"
              placeholder="Your Company"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300" required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-navy ml-1">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-semibold text-navy ml-1">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              placeholder="+971 50 123 4567"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300" required
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="subject" className="text-sm font-semibold text-navy ml-1">Subject *</label>
            <select
  id="subject"
  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-white appearance-none text-gray-500"
  value={form.subject}
  onChange={(e) => update('subject', e.target.value)}
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
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300 resize-none"
              required
            ></textarea>
          </div>

          {/* Consent Checkbox */}
          <div className="md:col-span-2 flex items-start gap-3 py-2">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-navy focus:ring-accent"
              required
            />
            <label htmlFor="consent" className="text-sm text-gray-500 leading-snug">
              I agree to receive communications from Rookie Ninja. I understand I can unsubscribe at any time.*
            </label>
          </div>

          {error && (
            <div className="md:col-span-2">
              <p className="font-body text-[13px] text-red-500 text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={sending}
              className="bg-black hover:bg-navy text-white font-semibold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {sending ? 'Sending...' : 'Send Message'}
              {!sending && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>

        </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
