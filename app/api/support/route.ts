import { NextResponse } from 'next/server'
import { randomInt } from 'node:crypto'
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

const MAX_FILES = 3
const MAX_FILE_BYTES = 3 * 1024 * 1024

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const website = form.get('website')
    // Honeypot: real users never fill this hidden field
    if (typeof website === 'string' && website) {
      return NextResponse.json({ success: true, ticketId: '' })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
    }

    const name = String(form.get('name') || '')
    const company = String(form.get('company') || '')
    const email = String(form.get('email') || '')
    const phone = String(form.get('phone') || '')
    const brand = String(form.get('brand') || '')
    const productModel = String(form.get('productModel') || '')
    const serialNumber = String(form.get('serialNumber') || '')
    const priority = String(form.get('priority') || '')
    const issueType = String(form.get('issueType') || '')
    const description = String(form.get('description') || '')

    if (!name || !email || !brand || !productModel || !priority || !issueType || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const files = form.getAll('attachments').filter((f): f is File => f instanceof File && f.size > 0)
    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `You can attach up to ${MAX_FILES} files` }, { status: 400 })
    }
    for (const f of files) {
      if (f.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `${f.name} is too large (max 3MB per file)` }, { status: 400 })
      }
    }
    const attachments = await Promise.all(
      files.map(async (f) => ({
        filename: f.name,
        content: Buffer.from(await f.arrayBuffer()),
      }))
    )

    const ticketId = `RN-${new Date().getFullYear()}-${String(randomInt(0, 10000)).padStart(4, '0')}`

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
      from: `"Rookie Ninja Support" <${process.env.SMTP_USER}>`,
      to: process.env.ENQUIRY_EMAIL,
      replyTo: email,
      subject: `[${ticketId}] Support Ticket — ${escapeHtml(brand)} (${escapeHtml(priority)})`,
      html: `
        <h2>New Support Ticket — ${ticketId}</h2>
        <p><strong>Priority:</strong> ${escapeHtml(priority)}</p>
        <p><strong>Issue Type:</strong> ${escapeHtml(issueType)}</p>
        <hr/>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company) || 'Not provided'}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone) || 'Not provided'}</p>
        <hr/>
        <p><strong>Brand / Vendor:</strong> ${escapeHtml(brand)}</p>
        <p><strong>Product Model:</strong> ${escapeHtml(productModel)}</p>
        <p><strong>Serial Number:</strong> ${escapeHtml(serialNumber) || 'Not provided'}</p>
        <hr/>
        <p><strong>Description:</strong><br/>${escapeHtml(description)}</p>
      `,
      attachments,
    })

    return NextResponse.json({ success: true, ticketId })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to submit support ticket' }, { status: 500 })
  }
}
