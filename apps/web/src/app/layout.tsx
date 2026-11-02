import { Metadata } from 'next';
import localFont from 'next/font/local';
// globals.css 는 컴포넌트 트리보다 먼저 와야 한다.
// 나중에 어딘가에서 CSS 를 import 하면 그게 먼저 실려서 Tailwind preflight 가 덮어써 버린다.
import '@/styles/globals.css';
import RootLayoutProviders from '@/app/RootLayoutProviders';

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
        {/*
          next/script 대신 순수 <script> 를 쓴다.
          next/script 는 클라이언트에서 태그를 주입하면서 `data-nscript` 속성을 붙이는데,
          AdSense 스크립트가 자기가 실린 태그의 속성을 검사하다 이걸 모르는 속성이라고 경고한다.
          React 19 는 async <script> 를 알아서 <head> 로 끌어올리고 중복도 제거해준다.
        */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1106497460474641"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${subFont.variable} ${mainFont.variable}`} suppressHydrationWarning>
        <RootLayoutProviders>{children}</RootLayoutProviders>
      </body>
    </html>
  );
}
