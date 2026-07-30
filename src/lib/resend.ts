import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// Falls back to Resend's shared test domain until rookie-ninja.com is
// verified in Resend (Domains → Add Domain) — real domain gives better
// deliverability and lets the "from" address match the brand.
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Rookie Ninja <onboarding@resend.dev>'

// All form submissions (contact, careers, support, enquiry, partner-registration,
// vendor-quote) go to every address here. ENQUIRY_EMAIL_CC is a temporary second
// recipient while the primary ENQUIRY_EMAIL inbox isn't accessible to the team
// verifying delivery — remove it once that's no longer needed.
export const ENQUIRY_RECIPIENTS = [process.env.ENQUIRY_EMAIL, process.env.ENQUIRY_EMAIL_CC]
  .filter((email): email is string => Boolean(email))
