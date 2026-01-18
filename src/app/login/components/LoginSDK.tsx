'use client';

import Script from 'next/script';

export default function LoginSDK() {
  const handleKakaoLoad = () => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY!);
      console.log('Kakao SDK 초기화 완료:', window.Kakao.isInitialized());
    }
  };

  return (
    <>
      {/* kakao */}
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js"
        integrity="sha384-kLbo2SvoNtOFiniJ1EQ9o2iDA8i3xp+O6Cns+L5cd4RsOJfl+43z5pvieT2ayq3C"
        crossOrigin="anonymous"
        onLoad={handleKakaoLoad}
        strategy="afterInteractive"
      />

      {/* naver */}
      <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" defer rel="preconnect" />
    </>
  );
}
