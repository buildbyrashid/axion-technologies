import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Force Node.js runtime — avoids Edge Runtime instability on Hostinger
// and prevents the jose/CompressionStream warning causing crash loops.
export const runtime = 'nodejs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-dev-only'
)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  let user = null

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      user = payload
    } catch (err) {
      console.error('JWT Verification failed:', err)
    }
  }

  // Protect admin routes
  if (isAdminRoute && !isLoginPage && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Redirect logged-in users away from login page
  if (isLoginPage && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
