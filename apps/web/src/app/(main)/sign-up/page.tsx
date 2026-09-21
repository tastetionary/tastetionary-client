'use client';

import dynamic from 'next/dynamic';

// 퍼널의 단계별 컨텍스트는 sessionStorage 에 있다. 서버는 이 값을 알 수 없어 항상 첫 단계를 그리므로,
// 중간 단계에서 새로고침하면 hydration 이 어긋난다. 그래서 클라이언트에서만 렌더링한다.
const SignUpComponent = dynamic(() => import('./components/sign-up-component'), { ssr: false });

export default function SignUp() {
  return <SignUpComponent />;
}
