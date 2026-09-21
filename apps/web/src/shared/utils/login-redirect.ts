/**
 * 로그인 후 돌아갈 경로.
 *
 * 소셜 로그인은 카카오/구글을 거쳐 /login/callback 으로 돌아오므로 쿼리로는 경로를 이어 붙일 수 없다.
 * 같은 탭에서 이어지는 흐름이라 sessionStorage 에 잠시 담아 둔다.
 */
const KEY = 'login-redirect';
const DEFAULT_PATH = '/explore';

export const saveLoginRedirect = (path: string) => {
  try {
    sessionStorage.setItem(KEY, path);
  } catch {
    // 저장소를 못 쓰면 로그인 후 기본 경로로 간다
  }
};

export const consumeLoginRedirect = () => {
  try {
    const path = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);

    // 외부 주소(//evil.com 등)로 튕기지 않도록 내부 경로만 허용하고, 로그인 화면으로 되돌아가지 않게 한다
    if (!path || !path.startsWith('/') || path.startsWith('//') || path.startsWith('/login')) return DEFAULT_PATH;

    return path;
  } catch {
    return DEFAULT_PATH;
  }
};
