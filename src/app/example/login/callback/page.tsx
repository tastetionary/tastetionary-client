'use client';

import { useEffect } from 'react';

export default function LoginCallback() {
  useEffect(() => {
    // 토큰값을 받아오는 처리 진행하기! -> 백엔드로 로직을 바꿔 넣어야함!
    console.log('url', window.location.href);
  }, []);
  return <div>하이</div>;
}
