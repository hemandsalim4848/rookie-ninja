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
    const { name, company, email, phone, geos, website } = await req.json()

    // Honeypot: real users never fill this hidden field
    if (website) {
      return NextResponse.json({ success: true })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
    }

    if (!name || !company || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const geosList = Array.isArray(geos) && geos.length ? geos.map(escapeHtml).join(', ') : 'Not specified'

    await resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.ENQUIRY_EMAIL!,
      replyTo: email,
      subject: `New Partner Registration — ${escapeHtml(company)}`,
      html: `
        <h2>New Partner Registration</h2>
        <p><strong>Partner Representative Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Contact Number:</strong> ${escapeHtml(phone)}</p>
        <hr/>
        <p><strong>Geographies Interested In:</strong> ${geosList}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to submit registration' }, { status: 500 })
  }
}
