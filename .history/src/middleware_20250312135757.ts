import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname === '/tool') {
    response.headers.set('x-page-type', 'tool');
  }

  return response;
}