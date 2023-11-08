import RecoilRootWrapper from '@/lib/recoil/RecoilRootWrapper';
import StyledComponentsRegistry from '@/lib/registry';
import StyledComponentsWrapper from '@/lib/styled-components/StyledComponentsWrapper';
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
      <head></head>
      <body className={`${subFont.variable} ${mainFont.variable}`}>
        <StyledComponentsRegistry>
          <RecoilRootWrapper>
            <StyledComponentsWrapper>{children}</StyledComponentsWrapper>
          </RecoilRootWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
