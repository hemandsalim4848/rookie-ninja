import { NextResponse } from 'next/server'
import { resend, FROM_EMAIL, ENQUIRY_RECIPIENTS } from '@/src/lib/resend'

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
    const contentType = req.headers.get('content-type') || ''
    let data: Record<string, string>

    if (contentType.includes('application/json')) {
      data = await req.json()
    } else {
      const form = await req.formData()
      data = Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]))
    }

    const { name, email, category, license, vendor, website } = data

    // Honeypot: real users never fill this hidden field
    if (website) {
      return NextResponse.json({ success: true })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const interest = category || license || 'Not specified'
    const vendorLabel = vendor || 'Unknown vendor'

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ENQUIRY_RECIPIENTS,
      replyTo: email,
      subject: `New Vendor Quote Request — ${escapeHtml(vendorLabel)}`,
      html: `
        <h2>New Vendor Quote Request</h2>
        <p><strong>Vendor Page:</strong> ${escapeHtml(vendorLabel)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Interested In:</strong> ${escapeHtml(interest)}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 })
  }
}
