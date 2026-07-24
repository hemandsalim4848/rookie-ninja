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

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, company, message, source, website } = await req.json()

    // Honeypot: real users never fill this hidden field
    if (website) {
      return NextResponse.json({ success: true })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
    }

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const label = source === 'quote' ? 'Quote Request' : 'Contact Form'

    await resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.ENQUIRY_EMAIL!,
      replyTo: email,
      subject: `New ${label} — ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html: `
        <h2>New ${label}</h2>
        <p><strong>First Name:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Last Name:</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Email Address:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone Number:</strong> ${escapeHtml(phone) || 'Not provided'}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
        <hr/>
        <p><strong>Message:</strong><br/>${escapeHtml(message) || 'Not provided'}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
