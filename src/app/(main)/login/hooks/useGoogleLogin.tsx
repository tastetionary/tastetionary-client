import { getGoogleAuthUrl } from '../lib/socialRedirectUri';

export default function useGoogleLogin() {
  // 웹의 구글 로그인 핸들러 수정
  const loginHandler = () => {
    // 앱(WebView) 환경인지 확인
    const isInApp = typeof window !== 'undefined' && window.ReactNativeWebView;

    if (isInApp) {
      // 앱에 구글 로그인 요청
      window?.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'REQUEST_GOOGLE_LOGIN',
          payload: {},
        })
      );
    } else {
      // 웹 브라우저 또는 시스템 브라우저에서 실행
      // URL 파라미터에서 앱에서 왔는지 확인
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl');

      // 앱에서 온 경우 returnUrl 저장
      if (returnUrl) {
        sessionStorage.setItem('app_return_url', returnUrl);
      }

      // Google OAuth URL로 이동 (client_id 가 없으면 null 이라 이동하지 않는다)
      const authUrl = getGoogleAuthUrl();
      if (!authUrl) return;

      window.location.href = authUrl;
    }
  };

  return { loginHandler };
}
