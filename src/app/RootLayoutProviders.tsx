'use client';

import { Suspense, useEffect, type ReactNode } from 'react';
import ReactQueryProvider from '@/lib/react-query/ReactQueryProvider';
import StyledComponentsRegistry from '@/lib/registry';
import StyledComponentsWrapper from '@/lib/styled-components/StyledComponentsWrapper';

export default function RootLayoutProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleAppMessage = (event: CustomEvent) => {
      const { type, payload } = event.detail;

      if (type === 'LOGIN_SUCCESS_FROM_BROWSER') {
        const { accessToken, refreshToken } = payload;

        if (accessToken) {
          // 토큰 저장 (예: zustand, localStorage, cookie 등)
          // setAuth({ accessToken, refreshToken });
          // 필요시 페이지 새로고침 또는 홈으로 이동
          // window.location.reload();
          // router.push('/');
        }
      }
    };

    window.addEventListener('appMessage', handleAppMessage as EventListener);
    return () => window.removeEventListener('appMessage', handleAppMessage as EventListener);
  }, []);

  return (
    <ReactQueryProvider>
      <StyledComponentsRegistry>
        <StyledComponentsWrapper>
          <Suspense fallback={<div></div>}>{children}</Suspense>
        </StyledComponentsWrapper>
      </StyledComponentsRegistry>
    </ReactQueryProvider>
  );
}
