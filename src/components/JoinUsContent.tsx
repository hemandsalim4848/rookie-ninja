'use client';

import { useState } from 'react';
import Animate from './Animate';
import SectionHeader from './SectionHeader';

const reasons = [
  {
    title: 'Shape the Future',
    body: "Rookie Ninja doesn't follow trends — we set them. Be at the forefront of groundbreaking solutions, developing cutting-edge technology and engineering transformative ideas that create a lasting impact.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Learn from the Best',
    body: 'Collaborate with industry veterans, tech gurus, and visionaries. With mentorship programs, training initiatives, and access to the latest tools, you will have everything you need to become a true tech ninja.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
  },
  {
    title: 'Embrace the Ninja Culture',
    body: "We're not just a company — we're a tight-knit family. Our culture fosters collaboration, camaraderie, and a healthy dose of fun. From team-building to hackathons and game nights — ready to unleash your inner Ninja?",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Dare to Dream Big',
    body: 'We value initiative, creativity, and a fearless attitude toward innovation. We challenge conventions and disrupt the industry. If you are passionate about pushing boundaries, Rookie Ninja is where dreams become reality.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
      </svg>
    ),
  },
  {
    title: 'Work-Life Synergy',
    body: 'A happy ninja is a productive ninja. We offer flexible work arrangements, remote options, and wellness programs to help you thrive personally and professionally. Find the perfect balance between work and life.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/>
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    title: 'Solve Real-World Challenges',
    body: 'Tired of mundane tasks? You will tackle real-world challenges that push boundaries — creating scalable solutions for global clients, optimising complex workflows, and designing cutting-edge distribution strategies.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

const openings = [
  {
    title: 'Product Manager — Display Solutions',
    location: 'Dubai',
    type: 'Full-Time',
    experience: '3 – 5 Years',
    note: 'UAE Experience Preferred',
    department: 'Product',
  },
  {
    title: 'Product Manager — Gaming',
    location: 'Dubai',
    type: 'Full-Time',
    experience: '3 – 4 Years',
    note: 'UAE Experience Preferred',
    department: 'Product',
  },
  {
    title: 'Product Sales Specialist — Print',
    location: 'Dubai',
    type: 'Full-Time',
    experience: '2 – 4 Years',
    note: 'UAE Experience Preferred',
    department: 'Sales',
  },
  {
    title: 'Product Sales Specialist — Scan',
    location: 'Dubai',
    type: 'Full-Time',
    experience: '2 – 4 Years',
    note: 'UAE Experience Preferred',
    department: 'Sales',
  },
  {
    title: 'Accountant',
    location: 'Dubai',
    type: 'Full-Time',
    experience: '1 – 3 Years',
    note: 'UAE Experience Preferred',
    department: 'Finance',
  },
  {
    title: 'Business Operations Manager',
    location: 'Dubai',
    type: 'Full-Time',
    experience: '5 – 8+ Years',
    note: 'Senior Role',
    department: 'Operations',
  },
];

const departments = ['All', 'Product', 'Sales', 'Finance', 'Operations'];

const deptColors: Record<string, string> = {
  Product:    'bg-accent/10 text-accent',
  Sales:      'bg-emerald-50 text-emerald-600',
  Finance:    'bg-amber-50 text-amber-600',
  Operations: 'bg-purple-50 text-purple-600',
};

export default function JoinUsContent() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [applyOpen, setApplyOpen]       = useState(false);
  const [applyJob, setApplyJob]         = useState('');
  const [submitted, setSubmitted]       = useState(false);

  const filtered = activeFilter === 'All'
    ? openings
    : openings.filter(o => o.department === activeFilter);

  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 60% at 75% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Floating stats */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2
                        hidden lg:flex flex-col gap-4 z-[2]">
          {[
            { value: `${openings.length}`, label: 'Open Positions'  },
            { value: 'Dubai',              label: 'Based In'         },
            { value: 'Full-Time',          label: 'Employment Type'  },
          ].map(({ value, label }) => (
            <div key={label}
                 className="px-6 py-4 rounded-xl border border-white/10
                            bg-white/[0.05] backdrop-blur-sm min-w-[180px]">
              <div className="font-display text-[22px] font-bold text-accent
                              leading-none mb-1">
                {value}
              </div>
              <div className="font-body text-[11px] text-white/40 uppercase
                              tracking-[0.1em]">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6
                        pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              We're Hiring
            </div>
          </Animate>
          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,62px)]
                           leading-[1.1] tracking-[-0.02em] mb-6 max-w-2xl">
              Join the <span className="text-accent">Ninja Squad</span>
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-white/60
                          leading-[1.8] max-w-xl mb-10">
              Are you ready to join a team that embraces innovation, challenges
              the status quo, and drives technological excellence? We are looking
              for bold, passionate individuals to join our mission.
            </p>
          </Animate>
          <Animate type="fade-up" delay={300}>
            <a href="#openings"
               className="inline-flex items-center gap-2 font-body text-[13px]
                          font-medium text-white bg-accent px-6 py-3 rounded-xl
                          no-underline transition-all duration-200
                          hover:opacity-85 hover:-translate-y-px
                          shadow-[0_4px_16px_rgba(21,167,220,0.3)]">
              View Open Roles
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </Animate>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Why Rookie Ninja"
              heading="Your Next Career Destination"
              subheading="At Rookie Ninja, we are on a mission to revolutionise the tech industry — and we need bold, passionate people like you."
              align="center"
            />
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {reasons.map((r, i) => (
              <Animate key={r.title} type="fade-up" delay={i * 70}>
                <ReasonCard {...r} />
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK QUOTE BANNER ── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)'
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(21,167,220,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <Animate type="fade-up">
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <p className="font-body text-[11px] font-medium tracking-[0.2em]
                          uppercase text-accent mb-4">
              Our Philosophy
            </p>
            <blockquote className="font-display text-[clamp(22px,3.5vw,38px)]
                                   font-bold text-white leading-[1.3] max-w-3xl mx-auto">
              "We believe in the power of teamwork to drive success — working
              together as equals to
              <span className="text-accent"> redefine the IT realm.</span>"
            </blockquote>
            <p className="font-body text-[13px] text-white/30 mt-5">
              — Rookie Ninja
            </p>
          </div>
        </Animate>
      </section>

      {/* ── CURRENT OPENINGS ── */}
      <section id="openings" className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Current Openings"
              heading="Find Your Role"
              subheading="Go through our openings below and get ready to unleash your innermost Ninja."
              align="center"
            />
          </Animate>

          {/* Filter tabs */}
          <Animate type="fade-up" delay={100}>
            <div className="flex items-center justify-center gap-2.5 mt-10 mb-10
                            flex-wrap">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveFilter(dept)}
                  className={`font-body text-[13px] font-medium px-5 py-2
                              rounded-xl border transition-all duration-200
                              ${activeFilter === dept
                                ? 'bg-accent text-white border-accent shadow-[0_4px_16px_rgba(21,167,220,0.3)]'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-accent/40 hover:text-accent'}`}
                >
                  {dept}
                  {dept !== 'All' && (
                    <span className={`ml-2 text-[11px] px-1.5 py-0.5 rounded-md
                                      ${activeFilter === dept
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-100 text-gray-400'}`}>
                      {openings.filter(o => o.department === dept).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Animate>

          {/* Job cards */}
          <div className="flex flex-col gap-4">
            {filtered.map((job, i) => (
              <Animate key={job.title} type="fade-up" delay={i * 60}>
                <JobCard
                  {...job}
                  onApply={() => {
                    setApplyJob(job.title);
                    setApplyOpen(true);
                    setSubmitted(false);
                  }}
                />
              </Animate>
            ))}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-[15px] text-gray-400">
                No openings in this category right now.
              </p>
            </div>
          )}

          {/* Open application */}
          <Animate type="fade-up">
            <div className="mt-10 p-8 rounded-2xl border border-dashed
                            border-accent/30 bg-accent/[0.02] text-center">
              <p className="font-body text-[13px] text-gray-400 mb-3">
                Don't see a role that fits? We're always open to great talent.
              </p>
              <button
                onClick={() => {
                  setApplyJob('Open Application');
                  setApplyOpen(true);
                  setSubmitted(false);
                }}
                className="inline-flex items-center gap-2 font-body text-[13px]
                           font-medium text-accent border border-accent/40
                           px-5 py-2.5 rounded-xl transition-all duration-200
                           hover:bg-accent/10">
                Send Open Application
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </Animate>

        </div>
      </section>

      {/* ── APPLY MODAL ── */}
      {applyOpen && (
        <ApplyModal
          jobTitle={applyJob}
          submitted={submitted}
          onSubmit={() => setSubmitted(true)}
          onClose={() => setApplyOpen(false)}
        />
      )}

    </main>
  );
}

/* ── Reason Card ── */
function ReasonCard({
  title, body, icon,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-8
                    border border-gray-100 overflow-hidden
                    shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-accent/20
                    hover:shadow-[0_12px_40px_rgba(21,167,220,0.1)]
                    flex flex-col">

      <div className="absolute inset-x-0 bottom-0 h-0 bg-accent/[0.03]
                      transition-all duration-300 group-hover:h-full
                      rounded-2xl pointer-events-none" />

      <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full
                      bg-gray-100 transition-all duration-300
                      group-hover:bg-accent group-hover:top-4 group-hover:bottom-4" />

      <div className="relative w-11 h-11 rounded-xl mb-6
                      bg-gray-50 border border-gray-100
                      flex items-center justify-center text-gray-400
                      transition-all duration-300 group-hover:scale-110
                      group-hover:bg-accent/10 group-hover:border-accent/20
                      group-hover:text-accent">
        {icon}
      </div>

      <h3 className="relative font-display text-[16px] font-bold text-navy
                     tracking-[-0.01em] mb-3 transition-colors duration-300
                     group-hover:text-accent">
        {title}
      </h3>

      <div className="w-6 h-px bg-gray-200 mb-3 transition-all duration-300
                      group-hover:w-10 group-hover:bg-accent/40" />

      <p className="relative font-body text-[13px] leading-[1.7] font-light
                    text-gray-400">
        {body}
      </p>
    </div>
  );
}

/* ── Job Card ── */
function JobCard({
  title, location, type, experience, note, department, onApply,
}: {
  title: string;
  location: string;
  type: string;
  experience: string;
  note: string;
  department: string;
  onApply: () => void;
}) {
  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center
                    justify-between gap-5 bg-white rounded-2xl p-6
                    border border-gray-100 transition-all duration-300
                    hover:border-accent/20
                    hover:shadow-[0_8px_32px_rgba(21,167,220,0.08)]">

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl
                      bg-gradient-to-r from-accent/60 via-accent to-accent/60
                      scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left" />

      <div className="flex-1">
        {/* Department badge */}
        <span className={`inline-block font-body text-[10px] font-medium
                          uppercase tracking-[0.1em] px-2.5 py-1 rounded-lg mb-3
                          ${deptColors[department]}`}>
          {department}
        </span>

        <h3 className="font-display text-[17px] font-bold text-navy mb-3
                       transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          {/* Location */}
          <div className="flex items-center gap-1.5 font-body text-[12px]
                          text-gray-400">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" strokeWidth="1.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 1a5 5 0 00-5 5c0 4 5 9 5 9s5-5 5-9a5 5 0 00-5-5z"/>
              <circle cx="8" cy="6" r="1.5"/>
            </svg>
            {location}
          </div>

          <span className="w-1 h-1 rounded-full bg-gray-200" />

          {/* Type */}
          <div className="flex items-center gap-1.5 font-body text-[12px]
                          text-gray-400">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" strokeWidth="1.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="14" height="10" rx="2"/>
              <path d="M1 6h14"/>
            </svg>
            {type}
          </div>

          <span className="w-1 h-1 rounded-full bg-gray-200" />

          {/* Experience */}
          <div className="flex items-center gap-1.5 font-body text-[12px]
                          text-gray-400">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                 stroke="currentColor" strokeWidth="1.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6"/>
              <polyline points="8 5 8 8 10 9"/>
            </svg>
            {experience}
          </div>

          <span className="w-1 h-1 rounded-full bg-gray-200" />

          {/* Note */}
          <span className="font-body text-[11px] text-accent font-medium
                           bg-accent/8 px-2 py-0.5 rounded-lg">
            {note}
          </span>
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={onApply}
        className="shrink-0 inline-flex items-center gap-2 font-body text-[13px]
                   font-medium text-white bg-accent px-5 py-2.5 rounded-xl
                   transition-all duration-200
                   hover:opacity-85 hover:-translate-y-px
                   shadow-[0_4px_16px_rgba(21,167,220,0.25)]
                   whitespace-nowrap">
        Apply Now
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

/* ── Apply Modal ── */
function ApplyModal({
  jobTitle, submitted, onSubmit, onClose,
}: {
  jobTitle: string;
  submitted: boolean;
  onSubmit: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ background: 'rgba(8,18,34,0.75)', backdropFilter: 'blur(6px)' }}
    >
      <div className="relative bg-white rounded-2xl w-full max-w-lg
                      shadow-[0_24px_80px_rgba(0,0,0,0.3)] overflow-hidden
                      animate-fade-up">

        <div className="h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

        <div className="flex items-start justify-between px-8 pt-7 pb-5
                        border-b border-gray-100">
          <div>
            <h2 className="font-display text-[20px] font-bold text-navy
                           tracking-[-0.01em]">
              Apply for Role
            </h2>
            <p className="font-body text-[13px] text-accent font-medium mt-0.5">
              {jobTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400
                       flex items-center justify-center transition-all duration-200
                       hover:bg-gray-100 hover:text-gray-600 shrink-0 ml-4">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent
                            flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.6"
                   strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="font-display text-[20px] font-bold text-navy mb-2">
              Application Sent!
            </h3>
            <p className="font-body text-[14px] text-gray-400 font-light mb-6">
              Thank you for applying. Our team will review your application
              and get back to you within 5 business days.
            </p>
            <button
              onClick={onClose}
              className="font-body text-[13px] text-accent border border-accent/40
                         px-5 py-2.5 rounded-xl transition-all duration-200
                         hover:bg-accent/10">
              Close
            </button>
          </div>
        ) : (
          <form
            className="px-8 py-6 flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First Name" type="text"  placeholder="John"             required />
              <FormField label="Last Name"  type="text"  placeholder="Doe"              required />
            </div>
            <FormField label="Email Address" type="email" placeholder="john@email.com" required />
            <FormField label="Phone Number"  type="tel"   placeholder="+971 50 000 0000" />

            {/* CV Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[12px] font-medium text-gray-600
                                uppercase tracking-[0.08em]">
                Upload CV / Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="font-body text-[13px] text-gray-500
                           border border-gray-200 rounded-xl px-4 py-2.5
                           outline-none transition-all duration-200
                           focus:border-accent focus:ring-2 focus:ring-accent/10
                           file:mr-3 file:py-1 file:px-3 file:rounded-lg
                           file:border-0 file:text-[12px] file:font-medium
                           file:bg-accent/10 file:text-accent
                           hover:file:bg-accent/20 cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[12px] font-medium text-gray-600
                                uppercase tracking-[0.08em]">
                Cover Letter <span className="text-gray-300 normal-case">(optional)</span>
              </label>
              <textarea
                placeholder="Tell us why you'd be a great Ninja..."
                rows={3}
                className="font-body text-[14px] text-navy placeholder:text-gray-300
                           border border-gray-200 rounded-xl px-4 py-3 outline-none
                           transition-all duration-200 focus:border-accent
                           focus:ring-2 focus:ring-accent/10 resize-none"
              />
            </div>

            <button
              type="submit"
              className="font-body text-[14px] font-medium text-white
                         bg-accent py-3 rounded-xl transition-all duration-200
                         hover:opacity-85 hover:-translate-y-px
                         shadow-[0_4px_20px_rgba(21,167,220,0.3)] mt-1">
              Submit Application →
            </button>

            <p className="font-body text-[11px] text-gray-400 text-center">
              We review all applications and respond within 5 business days.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({
  label, type, placeholder, required,
}: {
  label: string; type: string; placeholder: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[12px] font-medium text-gray-600
                        uppercase tracking-[0.08em]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="font-body text-[14px] text-navy placeholder:text-gray-300
                   border border-gray-200 rounded-xl px-4 py-2.5 outline-none
                   transition-all duration-200 focus:border-accent
                   focus:ring-2 focus:ring-accent/10"
      />
    </div>
  );
}