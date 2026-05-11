'use client';

import LoginSDK from '@/app/_legacy/login/components/LoginSDK';
import GlobalModal from '@/components/Modal/GlobalModal';
import Toast from '@/components/Toast';
import GoogleAnalytics from '@/components/google-analytics';
import MobileLayout from '@/components/layout/mobile-layout';
import { useAxiosInterceptor } from '@/hooks/useAxiosInterceptor';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

/** 홈(`/`)만 전체화면(모바일 레이아웃 미적용). `/select-menu` 등은 제외 */
const FULLSCREEN_EXACT = ['/'] as const;

function isFullscreenRoute(pathname: string | null) {
  if (!pathname) return false;
  return FULLSCREEN_EXACT.some((route) => pathname === route);
}

export default function StyledComponentsWrapper({ children }: { children: ReactNode }) {
  useAxiosInterceptor();
  const pathname = usePathname();
  const wrapWithMobileLayout = !isFullscreenRoute(pathname);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalModal />
      <Toast />
      <GoogleAnalytics />
      <LoginSDK />
      {wrapWithMobileLayout ? <MobileLayout>{children}</MobileLayout> : children}
    </ThemeProvider>
  );
}
