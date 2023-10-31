'use client';

import GlobalModal from '@/components/Modal/GlobalModal';
import Toast from '@/components/Toast';
import GridLayout from '@/components/layout/grid-layout';
import MobileLayout from '@/components/layout/mobile-layout';
import ReactQueryProvider from '@/lib/react-query/ReactQueryProvider';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import localFont from 'next/font/local';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>맛셔너리</title>
        <meta name="description" content="직장인 점심 메뉴 & 식당 추첨 서비스 (우리회사 근처 맛집 나무위키)" />
        <link rel="icon" type="image/png" href="%PUBLIC_URL%/favivon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="%PUBLIC_URL%/favivon/favicon-16x16.png" sizes="16x16" />
      </head>
      <body className={`${subFont.variable} ${mainFont.variable}`}>
        <StyledComponentsRegistry>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <GlobalModal />
              <Toast />
              <ReactQueryProvider>
                <MobileLayout>
                  <GridLayout>{children}</GridLayout>
                </MobileLayout>
              </ReactQueryProvider>
            </ThemeProvider>
          </RecoilRoot>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
