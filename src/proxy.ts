import { NextRequest, NextResponse } from 'next/server';

/**
 * 로그인이 필요한 경로.
 *
 * Next 16 에서 `middleware` 관례가 `proxy` 로 바뀌었다.
 * 런타임은 nodejs 고정이며 edge 로는 설정할 수 없다.
 *
 * 식당 고르기는 계정에 저장된 지역(`user.area`)을 기준으로 추첨하므로 로그인 사용자만 쓸 수 있다.
 *
 * 서버 컴포넌트에서 `redirect()`로 막지 않는 이유:
 * 루트 레이아웃이 children을 `<Suspense>`로 감싸고 있어, 쉘이 먼저 흘러나간 뒤에 던져진
 * redirect는 307 응답이 되지 못하고 클라이언트 렌더링으로 전환돼 빈 화면이 된다.
 */
const PROTECTED_PATHS = ['/select-restaurant'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`));

  if (!isProtected) return NextResponse.next();

  if (request.cookies.get('token')?.value) return NextResponse.next();

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/select-restaurant', '/select-restaurant/:path*'],
};
