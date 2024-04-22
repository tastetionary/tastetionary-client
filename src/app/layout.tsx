import StyledComponentsRegistry from '@/lib/registry';
import StyledComponentsWrapper from '@/lib/styled-components/StyledComponentsWrapper';
import '@/styles/globals.css';
import { Metadata } from 'next';
import localFont from 'next/font/local';

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
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${subFont.variable} ${mainFont.variable}`} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <StyledComponentsWrapper>{children}</StyledComponentsWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
