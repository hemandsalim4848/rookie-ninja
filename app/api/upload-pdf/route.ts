import { NextResponse } from 'next/server'
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { r2, R2_BUCKET, R2_PUBLIC_URL } from '@/src/lib/r2'
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

  const key = `datasheets/${Date.now()}-${file.name}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await r2.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: 'application/pdf',
  }))

  return NextResponse.json({ url: `${R2_PUBLIC_URL}/${key}` })
}

export async function DELETE(req: Request) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'No url' }, { status: 400 })

  const key = url.replace(`${R2_PUBLIC_URL}/`, '')
  await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }))

  return NextResponse.json({ success: true })
}
