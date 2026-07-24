import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// Falls back to Resend's shared test domain until rookie-ninja.com is
// verified in Resend (Domains → Add Domain) — real domain gives better
// deliverability and lets the "from" address match the brand.
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Rookie Ninja <onboarding@resend.dev>'
