import { cookies } from 'next/headers';
import nookies from 'nookies';

export function getServerToken() {
  const cookieStore = cookies();
  const ctx = { req: { headers: { cookie: cookieStore.toString() } } };
  return nookies.get(ctx).token;
}

export function setCookie(name: string, value: string, options?: any) {
  const ctx = { res: {} }; // 서버 응답 컨텍스트 (필요 시 확장 가능)
  nookies.set(ctx, name, value, {
    maxAge: 30 * 24 * 60 * 60, // 기본 30일
    path: '/',
    ...options,
  });
}

export function deleteCookie(name: string) {
  const ctx = { res: {} }; // 서버 응답 컨텍스트 (필요 시 확장 가능)
  nookies.destroy(ctx, name, { path: '/' });
}
