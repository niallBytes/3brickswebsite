import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', '']
    const allowedExts = ['jpg', 'jpeg', 'png', 'pdf']
    const fileExt = (file.name || '').split('.').pop().toLowerCase()

    if (!allowedMimes.includes(file.type) && !allowedExts.includes(fileExt)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, PDF allowed.' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()

    if (arrayBuffer.byteLength > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum 10MB allowed.' },
        { status: 400 }
      )
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'floor-plans')
    await mkdir(uploadDir, { recursive: true })

    const uniqueName = `floor-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
    const fullPath = path.join(uploadDir, uniqueName)

    await writeFile(fullPath, Buffer.from(arrayBuffer))

    return NextResponse.json({
      ok: true,
      url: `/uploads/floor-plans/${uniqueName}`
    })

  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}