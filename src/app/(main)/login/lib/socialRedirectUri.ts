import { TloginCategory } from '@/shared/api/auth';

/**
 * 소셜 로그인 redirect_uri.
 *
 * 인가 코드를 받을 때 쓴 값과, 서버가 그 코드를 액세스 토큰으로 교환할 때 쓰는 값이
 * 완전히 같아야 한다. (카카오는 쿼리스트링 한 글자만 달라도 invalid_grant 로 거절한다.)
 *
 * 그래서 인가 요청 쪽(useKakaoLogin / useGoogleLogin)과 토큰 교환 요청 쪽(login/callback)이
 * 이 함수 하나만 쓴다. 값은 실행 중인 origin 에서 만들어지므로 로컬·프로덕션이 각각 자기 주소를 보낸다.
 *
 * 예) http://localhost:3000/login/callback?category=kakao
 *     https://tastetionary.vercel.app/login/callback?category=kakao
 */
export function getSocialRedirectUri(category: TloginCategory) {
  return `${window.location.origin}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}?category=${category}`;
}
