'use client';

import { useEffect } from 'react';

export default function useNaverLogin() {
  const initNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: `${window.location.origin}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}`,
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 60 },
      callbackHandle: true,
    });

    naverLogin.init();
  };

  const loginHandler = () => {
    const naverLoginBtn = document.getElementById('naverIdLogin')?.firstChild as HTMLElement;

    if (!naverLoginBtn) return;

    naverLoginBtn.click();
  };

  useEffect(() => {
    const checkNaverScript = setInterval(() => {
      if (window.naver && window.naver.LoginWithNaverId) {
        clearInterval(checkNaverScript);
        initNaverLogin();
      }
    }, 100); // 100ms마다 체크

    return () => clearInterval(checkNaverScript); // 컴포넌트 언마운트 시 클리어
  }, []);

  return { loginHandler };
}
