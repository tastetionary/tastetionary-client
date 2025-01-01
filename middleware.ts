import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token && (request.nextUrl.pathname.startsWith('/mypage') || request.nextUrl.pathname === '/select-restaurant')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
