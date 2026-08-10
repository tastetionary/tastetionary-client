import { TloginCategory } from '@/shared/api/auth';

/**
 * 소셜 로그인 redirect_uri.
 *
 * 인가 코드를 받을 때 쓴 값과, 서버가 그 코드를 액세스 토큰으로 교환할 때 쓰는 값이
 * 완전히 같아야 한다. (한 글자만 달라도 invalid_grant 로 거절한다.)
 *
 * 그래서 인가 요청 쪽(useKakaoLogin / useGoogleLogin)과 토큰 교환 요청 쪽(login/callback)이
 * 이 함수 하나만 쓴다. 값은 실행 중인 origin 에서 만들어지므로 로컬·프로덕션이 각각 자기 주소를 보낸다.
 *
 * 쿼리스트링을 붙이지 않는 이유:
 * 카카오 콘솔의 Redirect URI 는 "경로(Path)에 임의의 파라미터 포함 불가" 라서
 * `?category=kakao` 가 붙은 값은 등록 자체가 안 된다. 등록 목록과 완전 일치하지 않으면
 * 인가 코드 요청이 KOE006(등록하지 않은 리다이렉트 URI)로 거절된다.
 * 어느 소셜에서 왔는지는 OAuth 표준 `state` 파라미터로 실어 보낸다.
 *
 * 예) http://localhost:3000/login/callback
 *     https://tastetionary.com/login/callback
 */
export function getSocialRedirectUri() {
  return `${window.location.origin}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}`;
}

/** 구글 인가 코드 요청 URL. 로그인 버튼과 앱 자동 로그인 두 곳에서 쓰므로 여기서만 만든다. */
export function getGoogleAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: getSocialRedirectUri(),
    response_type: 'code',
    scope: 'email profile',
    state: 'google' satisfies TloginCategory,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
