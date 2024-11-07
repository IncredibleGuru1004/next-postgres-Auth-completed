// middleware/auth.js

import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  console.log('---------------', token)

  if (!token) {
    return NextResponse.json({ error: "Token not provided" }, { status: 401 });
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  request.user = user; // Attach the authenticated user to the request
  return NextResponse.next(); // Proceed to the next middleware or handler
}

export const config = {
  matcher: '/api/users/:path*'
}