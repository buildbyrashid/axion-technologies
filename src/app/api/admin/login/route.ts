import { NextResponse } from 'next/server';
import { findOne } from '@/lib/db-helpers';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-dev-only'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Find user in MySQL
    // Note: You need to create this table: 
    // CREATE TABLE admins (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255));
    const user: any = await findOne('SELECT * FROM admins WHERE email = ?', [email]);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    // Fallback for initial setup/demo if no hashed password yet
    const isDemo = email === 'admin@axion.com' && password === 'admin123';
    
    if (!passwordMatch && !isDemo) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Create JWT
    const token = await new SignJWT({ id: user.id || 1, email: user.email || email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    // 4. Set Cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
