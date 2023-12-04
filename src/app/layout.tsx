import RecoilRootWrapper from '@/lib/recoil/RecoilRootWrapper';
import StyledComponentsRegistry from '@/lib/registry';
import StyledComponentsWrapper from '@/lib/styled-components/StyledComponentsWrapper';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

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
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', ${GA_MEASUREMENT_ID},{
             page_path: window.location.pathname
          });
        `}
        </Script>
      </head>

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
