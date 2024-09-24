'use client';

import Script from 'next/script';

export default function LoginSDK() {
  return (
    <>
      {/* kakao */}
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" rel="preconnect" />

      {/* naver */}
      <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" defer rel="preconnect" />
    </>
  );
}
