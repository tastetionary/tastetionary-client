'use client';

import LoginSDK from '@/app/login/components/LoginSDK';
import GlobalModal from '@/components/Modal/GlobalModal';
import Toast from '@/components/Toast';
import GoogleAnalytics from '@/components/google-analytics';
import MobileLayout from '@/components/layout/mobile-layout';
import { useAxiosInterceptor } from '@/hooks/useAxiosInterceptor';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

export default function StyledComponentsWrapper({ children }: { children: ReactNode }) {
  useAxiosInterceptor();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalModal />
      <Toast />
      <GoogleAnalytics />
      <LoginSDK />
      <MobileLayout>{children}</MobileLayout>
    </ThemeProvider>
  );
}
