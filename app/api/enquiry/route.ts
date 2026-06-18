import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, product, brand } = await req.json()

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
      subject: `New Enquiry — ${product} (${brand})`,
      html: `
        <h2>New Product Enquiry</h2>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Brand:</strong> ${brand}</p>
        <hr/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}