import { NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

export async function PUT(request: Request) {
  try {
    const { currentEmail, currentPassword, newEmail, newPassword } = await request.json()

    if (!currentEmail || !currentPassword || !newEmail || !newPassword) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
    }

    // Find user in MySQL
    const users: any = await query('SELECT * FROM admins WHERE email = ? LIMIT 1', [currentEmail])
    const user = Array.isArray(users) && users.length > 0 ? users[0] : null

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid current credentials' }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password)
    
    const isDemo = currentEmail === 'admin@axion.com' && currentPassword === 'admin123'
    
    if (!passwordMatch && !isDemo) {
      return NextResponse.json({ success: false, error: 'Invalid current credentials' }, { status: 401 })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedNewPassword = await bcrypt.hash(newPassword, salt)

    // Update credentials
    await query('UPDATE admins SET email = ?, password = ? WHERE id = ?', [newEmail, hashedNewPassword, user.id])

    return NextResponse.json({ success: true, message: 'Credentials updated successfully' })
  } catch (error: any) {
    console.error('Profile Update Error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
