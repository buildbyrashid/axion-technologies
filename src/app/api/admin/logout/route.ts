import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ success: true })
    
    // Clear the admin_token cookie by setting maxAge to 0
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Logout Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
