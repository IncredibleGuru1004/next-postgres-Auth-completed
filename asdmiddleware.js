import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  console.log('middleware', verifyToken(token), token);
  
  if (verifyToken(token)) {
    return NextResponse.next(request);
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/users:path*',
};