import ReactQueryProvider from '@/lib/react-query/ReactQueryProvider';
import StyledComponentsRegistry from '@/lib/registry';
import StyledComponentsWrapper from '@/lib/styled-components/StyledComponentsWrapper';
import '@/styles/globals.css';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense, useEffect } from 'react';

const mainFont = localFont({
  src: '../assets/fonts/Galmuri9.woff2',
  display: 'swap',
  variable: '--Galmuri-9',
});

const subFont = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--Pretendard-Variable',
});

export const metadata: Metadata = {
  title: '맛셔너리',
  description: '직장인 점심 메뉴 & 식당 추첨 서비스 (우리회사 근처 맛집 나무위키)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleAppMessage = (event: CustomEvent) => {
      const { type, payload } = event.detail;

      if (type === 'LOGIN_SUCCESS_FROM_BROWSER') {
        const { accessToken, refreshToken } = payload;
        console.log('🔵 외부 브라우저에서 토큰 수신:', { accessToken, refreshToken });

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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${subFont.variable} ${mainFont.variable}`} suppressHydrationWarning>
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <StyledComponentsWrapper>
              <Suspense fallback={<div></div>}>{children}</Suspense>
            </StyledComponentsWrapper>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
