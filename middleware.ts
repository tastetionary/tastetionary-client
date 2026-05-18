import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_PREFIXES = ['/select-menu'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') return NextResponse.next();

  const isAllowed = ALLOWED_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  if (isAllowed) return NextResponse.next();

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico|apple-icon|image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|ico)$).*)'],
};
