import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

async function warm(url: string) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, { cache: 'no-store', signal: controller.signal })
    clearTimeout(timeout)
    return { url, ok: res.ok, status: res.status }
  } catch (err) {
    return { url, ok: false, error: (err as Error).message }
  }
}

export async function GET(req: Request) {
  await connectDB()

  const product = await Product.findOne({}, { brandSlug: 1, slug: 1 }).lean()
  const { protocol, host } = new URL(req.url)
  const base = `${protocol}//${host}`

  const targets = ['/products']
  if (product) {
    targets.push(`/products?brand=${product.brandSlug}`)
    targets.push(`/products/${product.slug}`)
  }

  const warmed = await Promise.all(targets.map(path => warm(`${base}${path}`)))

  return NextResponse.json({ ok: true, ts: Date.now(), warmed })
}
