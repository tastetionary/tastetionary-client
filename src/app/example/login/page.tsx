'use client';

import Script from 'next/script';

export default function Login() {
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID_V2, // 네이버 개발자 센터에서 받은 클라이언트 ID
      callbackUrl: 'http://localhost:3000/example/login/callback', // 콜백 URL
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 60 },
    });
    naverLogin.init();
  };

  return (
    <>
      <Script
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
        onLoad={() => {
          initializeNaverLogin();
        }}
      />
      <div id="naverIdLogin" />
      <button>네이버 로그인</button>
    </>
  );
}
