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
    window.Kakao.Auth.authorize({
      redirectUri: getSocialRedirectUri('kakao'),
    });
  };

  return { loginHandler };
}
