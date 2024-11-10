'use client';

import Script from 'next/script';

export default function LoginSDK() {
  return (
    <>
      {/* kakao */}
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" rel="preconnect" />

      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.3/kakao.min.js"
        integrity="sha384-kLbo2SvoNtOFiniJ1EQ9o2iDA8i3xp+O6Cns+L5cd4RsOJfl+43z5pvieT2ayq3C"
        crossOrigin="anonymous"
      />

      {/* naver */}
      <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" defer rel="preconnect" />
    </>
  );
}
