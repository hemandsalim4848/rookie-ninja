import { NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'
import { requireAdmin } from '@/src/lib/requireAdmin'

export async function POST(req: Request) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files allowed' }, { status: 400 })
  }

  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 })
  }

  const blob = await put(`datasheets/${Date.now()}-${file.name}`, file, {
    access: 'public',
    contentType: 'application/pdf',
  })

  return NextResponse.json({ url: blob.url })
}

export async function DELETE(req: Request) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'No url' }, { status: 400 })
  await del(url)
  return NextResponse.json({ success: true })
}
