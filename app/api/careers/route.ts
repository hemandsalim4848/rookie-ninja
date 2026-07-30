import { NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/src/lib/resend'

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c] as string))
}

// In-memory per-instance limiter — resets on cold start / across serverless
// instances, so it's a speed bump against casual spam, not a hard guarantee.
const submissions = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

function isRateLimited(ip: string) {
  const now = Date.now()
  const timestamps = (submissions.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS)
  timestamps.push(now)
  submissions.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT
}

const MAX_FILE_BYTES = 5 * 1024 * 1024

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const website = form.get('website')
    // Honeypot: real users never fill this hidden field
    if (typeof website === 'string' && website) {
      return NextResponse.json({ success: true })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
    }

    const firstName = String(form.get('firstName') || '')
    const lastName = String(form.get('lastName') || '')
    const email = String(form.get('email') || '')
    const phone = String(form.get('phone') || '')
    const jobTitle = String(form.get('jobTitle') || '')
    const coverLetter = String(form.get('coverLetter') || '')

    if (!firstName || !lastName || !email || !jobTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cv = form.get('cv')
    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json({ error: 'CV / Resume is required' }, { status: 400 })
    }
    if (cv.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'CV / Resume is too large (max 5MB)' }, { status: 400 })
    }

    const attachments = [{
      filename: cv.name,
      content: Buffer.from(await cv.arrayBuffer()),
    }]

    await resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.ENQUIRY_EMAIL!,
      replyTo: email,
      subject: `New Job Application — ${escapeHtml(jobTitle)} (${escapeHtml(firstName)} ${escapeHtml(lastName)})`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${escapeHtml(jobTitle)}</p>
        <hr/>
        <p><strong>First Name:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Last Name:</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone Number:</strong> ${escapeHtml(phone) || 'Not provided'}</p>
        <hr/>
        <p><strong>Cover Letter:</strong><br/>${escapeHtml(coverLetter) || 'Not provided'}</p>
      `,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
