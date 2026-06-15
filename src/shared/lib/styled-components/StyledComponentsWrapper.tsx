'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import LoginSDK from '@/app/_legacy/login/components/LoginSDK';
import { useAxiosInterceptor } from '@/shared/hooks/useAxiosInterceptor';
import GoogleAnalytics from '@/shared/ui/google-analytics';
import MobileLayout from '@/shared/ui/layout/mobile-layout';
import GlobalModal from '@/shared/ui/Modal/GlobalModal';
import Toast from '@/shared/ui/Toast';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

/** 홈(`/`)만 전체화면(모바일 레이아웃 미적용). `/select-menu` 등은 제외 */
const FULLSCREEN_EXACT = ['/'] as const;

function isFullscreenRoute(pathname: string | null) {
  if (!pathname) return false;
  return FULLSCREEN_EXACT.some(route => pathname === route);
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
