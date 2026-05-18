import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
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

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
    
    // Relative to the project root
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
    
    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true })
    
    const filePath = join(uploadDir, fileName)
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
