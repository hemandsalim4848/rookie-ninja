import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
    const { name, email, phone, message, product, brand, website } = await req.json()

    // Honeypot: real users never fill this hidden field
    if (website) {
      return NextResponse.json({ success: true })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Rookie Ninja Enquiry" <${process.env.SMTP_USER}>`,
      to: process.env.ENQUIRY_EMAIL,
      replyTo: email,
      subject: `New Enquiry — ${escapeHtml(product)} (${escapeHtml(brand)})`,
      html: `
        <h2>New Product Enquiry</h2>
        <p><strong>Product:</strong> ${escapeHtml(product)}</p>
        <p><strong>Brand:</strong> ${escapeHtml(brand)}</p>
        <hr/>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone) || 'Not provided'}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message)}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}