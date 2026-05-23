import { NextResponse } from 'next/server'
import { writeFile, mkdir, access, unlink } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const originalName = file.name
    const ext = originalName.split('.').pop() || ''
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName
    
    const sanitizedBase = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')

    let fileName = sanitizedBase ? `${sanitizedBase}.${ext}` : `file.${ext}`
    
    // Relative to the project root
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
    
    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true })
    
    let filePath = join(uploadDir, fileName)

    // Check if file exists, if so append a short unique suffix
    try {
      await access(filePath)
      const suffix = Math.random().toString(36).substring(2, 6)
      fileName = `${sanitizedBase}-${suffix}.${ext}`
      filePath = join(uploadDir, fileName)
    } catch {
      // File does not exist, safe to use fileName
    }

    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/${folder}/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
    })
  } catch (error: any) {
    console.error('Upload API Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json()
    if (!url) {
      return NextResponse.json({ success: false, error: 'No URL provided' }, { status: 400 })
    }

    // Secure path check to prevent directory traversal
    if (!url.startsWith('/uploads/')) {
      return NextResponse.json({ success: false, error: 'Invalid file path' }, { status: 400 })
    }

    const filePath = join(process.cwd(), 'public', url)
    
    try {
      await unlink(filePath)
      return NextResponse.json({ success: true })
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return NextResponse.json({ success: true, message: 'File already deleted' })
      }
      throw err
    }
  } catch (error: any) {
    console.error('Delete File API Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
