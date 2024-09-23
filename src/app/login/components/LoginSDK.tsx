'use client';

import Script from 'next/script';

export default function LoginSDK() {
  return (
    <>
      {/* kakao */}
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" rel="preconnect" />
    </>
  );
}
