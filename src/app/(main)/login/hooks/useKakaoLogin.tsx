import { getSocialRedirectUri } from '../lib/socialRedirectUri';

export default function useKakaoLogin() {
  const loginHandler = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      console.error('Kakao SDK가 초기화되지 않았습니다.');
      return;
    }

    // Kakao.Auth.authorize()를 통한 간편 로그인
    // redirectUri 에는 쿼리를 붙이지 않는다(카카오 콘솔에 등록 불가). 소셜 구분은 state 로 넘긴다.
    window.Kakao.Auth.authorize({
      redirectUri: getSocialRedirectUri(),
      state: 'kakao',
    });
  };

  return { loginHandler };
}
