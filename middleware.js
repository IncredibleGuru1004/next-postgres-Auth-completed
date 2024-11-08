// middleware/auth.js

import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// const corsOptions = {
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// }

export async function middleware(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  console.log('---------------------------', request)
  console.log("============", !token)
  if (!token) {
    return new NextResponse.json({ error: "Token not provided" }, { status: 401 });
  }
  try {
    const user = await verifyToken(token);
    console.log("+++++++++++++++++++++++++", user)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    request.user = user; // Attach the authenticated user to the request
    return NextResponse.next(); // Proceed to the next middleware or handler
  } catch( error ) {
    return new NextResponse('Unauthorized', {status: 401})
  }
}

export const config = {
  matcher: '/api/users/:path*'
}