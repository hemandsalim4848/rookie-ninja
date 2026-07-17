'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

/* ── Brands we service ── */
const brands = [
  { name: 'Kodak Alaris', logo: '/logos/Kodak-alaris-logo.png' },
  { name: 'Canon', logo: '/logos/canon-logo.png' },
  { name: 'Brother', logo: '/logos/brother-logo.png' },
  { name: 'Czur', logo: '/logos/czur-logo.webp' },
  { name: 'Colortrac', logo: '/logos/colortrac-logo.png' },
  { name: 'Viewsonic', logo: '/logos/viewsonic-logo.webp' },
  { name: 'Dicota', logo: '/logos/dicota-logo.webp' },
  { name: 'UNV', logo: '/logos/unv-logo.svg' },
  { name: 'Aerocool', logo: '/logos/aerocool-logo.svg' },
  { name: 'MSI', logo: '/logos/msi-logo.png' },
  { name: 'Silex', logo: '/logos/silex-logo.png' },
  { name: 'Ezofis', logo: '/logos/ezofis-logo.png' },
  { name: 'Aztech', logo: '/logos/aztech-logo.png' },
  { name: 'Deli', logo: '/logos/deli-logo.png' },
  { name: 'Contex', logo: '/logos/contex-logo.png' },
  { name: 'Dahua', logo: '/logos/dahua-logo.png' },
  { name: 'Ricoh', logo: '/logos/ricoh-logo.svg' },
  { name: 'Fujitsu', logo: '/logos/fujitsu-logo.svg' },
  { name: 'IRIS', logo: '/logos/iris-logo.svg' },
];

const brandOptions = [...brands.map(b => b.name), 'Other'];

const featuredBrandNames = ['Kodak Alaris', 'Canon', 'Viewsonic', 'Brother', 'Colortrac'];
const featuredBrands = featuredBrandNames.map(n => brands.find(b => b.name === n)!);

/* ── What you can count on ── */
const counts = [
  'A unique ticket ID for every request, sent to you instantly.',
  'Clear updates at every stage — assessment, repair, and closure.',
  'Warranty, out-of-warranty, and AMC contract support.',
  'On-site, carry-in, and remote service options.',
  'A final service report on every closed ticket.',
];

/* ── Support channels ── */
const channels = [
  {
    title: 'Submit a Ticket',
    desc: 'Fill our online form for tracked, structured support. Best for hardware faults and product issues.',
    action: { label: 'Open Form ↓', href: '#support-form' },
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    title: 'Email Us',
    desc: 'Write to our service team directly for non-urgent queries or documentation requests.',
    action: { label: 'sales@rookie-ninja.com', href: 'mailto:sales@rookie-ninja.com' },
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Call Us',
    desc: 'Speak directly with our Dubai-based team for urgent or complex technical issues.',
    action: { label: '+971 4 296 5256', href: 'tel:+97142965256' },
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <path d="M3 2h3l1.5 3.5L6 7a9 9 0 004 4l1.5-1.5L15 11v3a1 1 0 01-1 1A13 13 0 012 3a1 1 0 011-1z"
              stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ── Submission benefits ── */
const benefits = [
  { title: 'Unique Ticket ID', desc: "You'll receive a Ticket ID instantly — use it to track your request." },
  { title: 'Auto-Acknowledgement', desc: 'An email confirmation is sent immediately to your inbox.' },
  { title: 'End-to-End Updates', desc: 'We keep you informed at every stage — from assignment to resolution.' },
];

/* ── FAQs ── */
const faqs = [
  {
    q: 'How do I find my Ticket ID after submitting?',
    a: 'Your Ticket ID (format: RN-YYYY-XXXX) is displayed on the confirmation screen immediately after submission and is also included in the auto-acknowledgement email sent to your address.',
  },
  {
    q: 'What is your typical response time?',
    a: 'Critical issues are addressed the same business day. Standard tickets receive a first response within 24 hours. General queries are handled within 1–2 business days.',
  },
  {
    q: 'Does Rookie Ninja provide on-site support?',
    a: 'Yes. For hardware faults that cannot be resolved remotely, our engineers can be dispatched on-site within the UAE and select regions. This will be coordinated after initial diagnosis.',
  },
  {
    q: 'Which brands does Rookie Ninja support?',
    a: 'We provide after-sales support for every brand in our distribution portfolio. Select the relevant brand when filling the form — if you don\'t see it listed, choose "Other" and our team will get in touch.',
  },
  {
    q: 'Can I reopen a closed ticket?',
    a: 'Yes. If your issue recurs after closure, reply to the original ticket email with your Ticket ID and the issue will be escalated with full history intact — no need to submit a new form.',
  },
  {
    q: 'Is this support available outside the UAE?',
    a: 'Yes. We serve 42+ countries across the Middle East, Africa, and CIS region. Remote support is available across all these territories; on-site visits depend on location.',
  },
];

const priorities = [
  'Low — General query',
  'Medium — Intermittent issue',
  'High — Device not working',
  'Critical — Business halted',
];

const issueTypes = [
  'Hardware Fault',
  'Software / Driver Issue',
  'Connectivity Problem',
  'Print / Scan Quality',
  'Installation & Setup',
  'Warranty Claim',
  'General Enquiry',
];

export default function SupportContent() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', brand: '',
    productModel: '', serialNumber: '', priority: '', issueType: '',
    description: '', website: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const chosen = Array.from(e.target.files || []).slice(0, 3);
    setFiles(chosen);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      files.forEach(f => body.append('attachments', f));

      const res = await fetch('/api/support', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');

      setTicketId(data.ticketId);
      setForm({
        name: '', company: '', email: '', phone: '', brand: '',
        productModel: '', serialNumber: '', priority: '', issueType: '',
        description: '', website: '',
      });
      setFiles([]);
    } catch (err: any) {
      setError(err?.message === 'Too many requests, please try again later'
        ? 'Too many requests — please try again in a few minutes.'
        : 'Something went wrong. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 60% at 75% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`,
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Decorative right panel */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 z-[1]
                        hidden lg:flex flex-col gap-4">
          {[
            { label: 'First Response', value: '24h' },
            { label: 'Countries Covered', value: '42+' },
            { label: 'Brand Partners', value: '20+' },
          ].map(({ label, value }) => (
            <div key={label}
                 className="flex items-center gap-4 px-5 py-4 rounded-xl
                            border border-white/10 bg-white/[0.05]
                            backdrop-blur-sm min-w-[200px]">
              <span className="font-display font-bold text-accent"
                    style={{ fontSize: '28px', lineHeight: 1 }}>
                {value}
              </span>
              <span className="font-body text-white/60" style={{ fontSize: '13px' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Rookie Ninja Care &amp; Support
            </div>
          </Animate>
          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,60px)]
                           leading-[1.1] tracking-[-0.02em] mb-5 max-w-xl">
              We&apos;ve Got Your <span className="text-accent">Tech Covered</span>.
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-white/60
                          leading-[1.8] max-w-md mb-8">
              Fast, reliable support for the products you distribute and use.
              From ticket intake to resolution — our team is with you every step of the way.
            </p>
          </Animate>
          <Animate type="fade-up" delay={300}>
            <a href="#support-form"
               className="inline-flex items-center gap-2 font-body text-[14px] font-medium
                          text-white bg-accent px-6 py-3.5 rounded-xl no-underline
                          transition-all duration-200 hover:opacity-85 hover:-translate-y-px
                          shadow-[0_4px_20px_rgba(21,167,220,0.3)]">
              Submit a Support Ticket
              <span>↓</span>
            </a>
          </Animate>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <Animate type="fade-right">
            <div>
              <SectionHeader
                label="Who We Are"
                heading="One service team for every brand we distribute."
                align="left"
              />
              <p className="font-body text-[15px] text-gray-500 leading-[1.8] font-light mb-4">
                Rookie Ninja Distribution stands behind the products we sell. Our dedicated
                service team, led by our Service Head, manages your request from the moment
                it&apos;s raised to the moment it&apos;s resolved — coordinating directly with
                brand engineers and our own technicians so you don&apos;t have to.
              </p>
              <p className="font-body text-[15px] text-gray-500 leading-[1.8] font-light">
                Every request becomes a tracked ticket with a unique reference, so nothing
                slips through the cracks and you always know where things stand.
              </p>
            </div>
          </Animate>

          <Animate type="fade-left" delay={100}>
            <div className="flex flex-col gap-3">
              <p className="font-body text-[11px] font-semibold text-accent
                            uppercase tracking-[0.14em] mb-1">
                What You Can Count On
              </p>
              {counts.map((c) => (
                <div key={c}
                     className="flex items-start gap-3 p-4 rounded-xl
                                border border-gray-100 bg-gray-50/60
                                transition-all duration-300
                                hover:border-accent/20
                                hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)]">
                  <div className="w-6 h-6 rounded-lg bg-accent/10 text-accent
                                  flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.4"
                         strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-body text-[13.5px] text-navy leading-[1.6]">{c}</p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── BRANDS WE SERVICE ── */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Brands We Service"
              heading="Authorised support across leading brands."
              subheading="We provide service and warranty support for every brand in our distribution portfolio. Each brand follows its own verified service path."
              align="center"
            />
          </Animate>
          <Animate type="fade-up" delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredBrands.map(b => (
                <div key={b.name}
                     className="bg-white border border-gray-100 rounded-2xl p-5
                                flex items-center justify-center h-[88px]
                                transition-all duration-200
                                hover:border-accent/50
                                hover:shadow-[0_4px_20px_rgba(21,167,220,0.1)]">
                  <img src={b.logo} alt={b.name} className="max-h-12 max-w-[80px] object-contain" />
                </div>
              ))}
              <div className="bg-accent rounded-2xl p-5 h-[88px] flex flex-col
                              items-center justify-center text-center">
                <span className="font-body text-[13px] font-semibold text-white">
                  + More Brands
                </span>
                <span className="font-body text-[11px] text-white/75 leading-snug mt-0.5">
                  All portfolio brands supported
                </span>
              </div>
            </div>
          </Animate>
          <Animate type="fade-up" delay={150}>
            <p className="font-body text-[13px] text-gray-400 text-center mt-8 max-w-xl mx-auto">
              Don&apos;t see your brand? If you bought it from Rookie Ninja, we&apos;ll still
              help — select &quot;Other&quot; in the form below and our team will get in touch.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── HOW TO REACH US ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="How To Reach Us"
              heading="Pick Your Support Channel"
              subheading="Multiple ways to get in touch — use whichever works best for your situation."
              align="center"
            />
          </Animate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {channels.map((c, i) => (
              <Animate key={c.title} type="fade-up" delay={i * 80}>
                <div className="h-full flex flex-col p-6 rounded-2xl border border-gray-100
                                bg-gray-50/60 transition-all duration-300
                                hover:border-accent/20
                                hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)]">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent
                                  flex items-center justify-center shrink-0 mb-4">
                    {c.icon}
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-navy mb-2">
                    {c.title}
                  </h3>
                  <p className="font-body text-[13.5px] text-gray-500 leading-[1.6] font-light mb-4 flex-1">
                    {c.desc}
                  </p>
                  <a href={c.action.href}
                     className="font-body text-[13px] font-semibold text-accent
                                no-underline hover:text-[#0d8fb8] transition-colors w-fit">
                    {c.action.label}
                  </a>
                </div>
              </Animate>
            ))}
          </div>
          <Animate type="fade-up" delay={260}>
            <div className="mt-5 flex items-center gap-3 p-5 rounded-xl
                            border border-accent/20 bg-accent/[0.05]">
              <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent
                              flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.8"
                     strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
              </div>
              <p className="font-body text-[13px] text-navy/70">
                <span className="font-semibold text-navy">Response Times — </span>
                Critical issues: same day. Standard tickets: within 24 hours. Queries: 1–2 business days.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── SUBMIT A REQUEST ── */}
      <section id="support-form" className="py-24 px-6 border-t border-gray-100 scroll-mt-24"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12">

          {/* Left — benefits */}
          <Animate type="fade-right">
            <div>
              <SectionHeader
                label="Submit A Request"
                heading="Raise a Support Ticket"
                subheading="Fill in your details and our team will get back to you within 24 business hours. Critical issues are handled same-day."
                align="left"
              />
              <div className="flex flex-col gap-3">
                {benefits.map(b => (
                  <div key={b.title}
                       className="flex items-start gap-3 p-4 rounded-xl bg-white
                                  border border-gray-100">
                    <div className="w-6 h-6 rounded-lg bg-accent/10 text-accent
                                    flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2.4"
                           strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-[13.5px] font-semibold text-navy mb-0.5">
                        {b.title}
                      </p>
                      <p className="font-body text-[13px] text-gray-500 leading-[1.5] font-light">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Animate>

          {/* Right — form */}
          <Animate type="fade-left" delay={100}>
            <div className="bg-white rounded-2xl border border-gray-100 p-8
                            shadow-[0_8px_40px_rgba(0,0,0,0.06)]">

              {ticketId ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent
                                  flex items-center justify-center mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.6"
                         strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-[22px] font-bold text-navy mb-2">
                    Ticket Submitted!
                  </h3>
                  <p className="font-body text-[14px] text-gray-400 font-light mb-4 max-w-sm">
                    We&apos;ll get back to you within 24 hours. Keep this reference handy:
                  </p>
                  <p className="font-display text-[20px] font-bold text-accent
                                bg-accent/10 px-5 py-2.5 rounded-xl tracking-wide mb-6">
                    {ticketId}
                  </p>
                  <button
                    onClick={() => setTicketId('')}
                    className="font-body text-[13px] text-accent border
                               border-accent/40 px-5 py-2.5 rounded-xl
                               transition-all duration-200 hover:bg-accent/10">
                    Submit Another Ticket
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <h3 className="font-display text-[17px] font-bold text-navy -mt-1 mb-1">
                    Support Request Form
                  </h3>
                  <p className="font-body text-[12px] text-gray-400 -mt-2 mb-1">
                    All fields marked with * are required.
                  </p>

                  {/* Honeypot */}
                  <input
                    type="text" name="website" value={form.website}
                    onChange={e => update('website', e.target.value)}
                    tabIndex={-1} autoComplete="off" aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required value={form.name} onChange={v => update('name', v)} placeholder="John Doe" />
                    <Field label="Company Name" value={form.company} onChange={v => update('company', v)} placeholder="Your Company" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Email Address" type="email" required value={form.email} onChange={v => update('email', v)} placeholder="john@example.com" />
                    <Field label="Phone Number" type="tel" value={form.phone} onChange={v => update('phone', v)} placeholder="+971 50 123 4567" />
                  </div>

                  <Select label="Brand / Vendor" required value={form.brand} onChange={v => update('brand', v)} placeholder="Select brand" options={brandOptions} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Product Model" required value={form.productModel} onChange={v => update('productModel', v)} placeholder="e.g. imageCLASS MF445dw" />
                    <Field label="Serial Number" value={form.serialNumber} onChange={v => update('serialNumber', v)} placeholder="Optional" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select label="Priority" required value={form.priority} onChange={v => update('priority', v)} placeholder="Select priority" options={priorities} />
                    <Select label="Issue Type" required value={form.issueType} onChange={v => update('issueType', v)} placeholder="Select issue type" options={issueTypes} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] font-medium
                                      text-gray-600 uppercase tracking-[0.08em]">
                      Issue Description *
                    </label>
                    <textarea
                      required rows={4}
                      value={form.description}
                      onChange={e => update('description', e.target.value)}
                      placeholder="Describe the issue in as much detail as possible..."
                      className="font-body text-[14px] text-navy placeholder:text-gray-300
                                 border border-gray-200 rounded-xl px-4 py-2.5
                                 outline-none transition-all duration-200
                                 focus:border-accent focus:ring-2 focus:ring-accent/10
                                 resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] font-medium
                                      text-gray-600 uppercase tracking-[0.08em]">
                      Attach Photos / Files (optional)
                    </label>
                    <input
                      type="file" multiple
                      accept="image/*,.pdf"
                      onChange={onFilesChange}
                      className="font-body text-[13px] text-gray-500
                                 border border-gray-200 rounded-xl px-4 py-2.5
                                 outline-none file:mr-3 file:py-1.5 file:px-3
                                 file:rounded-lg file:border-0 file:bg-accent/10
                                 file:text-accent file:text-[12px] file:font-medium
                                 focus:border-accent transition-all duration-200"
                    />
                    {files.length > 0 && (
                      <p className="font-body text-[11px] text-gray-400">
                        {files.map(f => f.name).join(', ')}
                      </p>
                    )}
                    <p className="font-body text-[11px] text-gray-400">
                      Up to 3 files, 3MB each.
                    </p>
                  </div>

                  {error && <p className="font-body text-[13px] text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="font-body text-[14px] font-medium text-white
                               bg-accent py-3.5 rounded-xl transition-all duration-200
                               hover:opacity-85 hover:-translate-y-px disabled:opacity-50
                               disabled:hover:translate-y-0
                               shadow-[0_4px_20px_rgba(21,167,220,0.3)] mt-1">
                    {sending ? 'Submitting...' : 'Submit Support Ticket →'}
                  </button>

                  <p className="font-body text-[11px] text-gray-400 text-center">
                    Your information is securely handled and never shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Common Questions"
              heading="Support FAQs"
              subheading="Answers to questions we hear most from our partners and customers."
              align="center"
            />
          </Animate>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <Animate key={f.q} type="fade-up" delay={i * 40}>
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4
                                 px-5 py-4 text-left bg-gray-50/60 hover:bg-gray-50
                                 transition-colors duration-200"
                    >
                      <span className="font-body text-[14px] font-medium text-navy">
                        {f.q}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                           className={`shrink-0 text-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6"
                              strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 py-4 border-t border-gray-100">
                        <p className="font-body text-[13.5px] text-gray-500 leading-[1.7] font-light">
                          {f.a}
                        </p>
                      </div>
                    )}
                  </div>
                </Animate>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

/* ── Reusable form field ── */
function Field({
  label, type = 'text', placeholder, required, value, onChange,
}: {
  label: string; type?: string; placeholder: string; required?: boolean;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[12px] font-medium
                        text-gray-600 uppercase tracking-[0.08em]">
        {label}{required && ' *'}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="font-body text-[14px] text-navy placeholder:text-gray-300
                   border border-gray-200 rounded-xl px-4 py-2.5
                   outline-none transition-all duration-200
                   focus:border-accent focus:ring-2 focus:ring-accent/10"
      />
    </div>
  );
}

/* ── Reusable select field ── */
function Select({
  label, placeholder, required, value, onChange, options,
}: {
  label: string; placeholder: string; required?: boolean;
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[12px] font-medium
                        text-gray-600 uppercase tracking-[0.08em]">
        {label}{required && ' *'}
      </label>
      <select
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="font-body text-[14px] border border-gray-200 rounded-xl px-4 py-2.5
                   outline-none transition-all duration-200 bg-white appearance-none
                   focus:border-accent focus:ring-2 focus:ring-accent/10"
        style={{ color: value ? '#0A1628' : '#9CA3AF' }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => (
          <option key={o} value={o} style={{ color: '#0A1628' }}>{o}</option>
        ))}
      </select>
    </div>
  );
}
