'use client';

import LoginSDK from '@/app/login/components/LoginSDK';
import GlobalModal from '@/components/Modal/GlobalModal';
import Toast from '@/components/Toast';
import GoogleAnalytics from '@/components/google-analytics';
import GridLayout from '@/components/layout/grid-layout';
import MobileLayout from '@/components/layout/mobile-layout';
import { useAxiosInterceptor } from '@/hooks/useAxiosInterceptor';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import ReactQueryProvider from '../react-query/ReactQueryProvider';

export default function StyledComponentsWrapper({ children }: { children: ReactNode }) {
  useAxiosInterceptor();

  return (
    <ThemeProvider theme={theme}>
      <ReactQueryProvider>
        <GlobalStyle />
        <GlobalModal />
        <Toast />
        <GoogleAnalytics />
        <LoginSDK />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <MobileLayout>
            <GridLayout>{children}</GridLayout>
          </MobileLayout>
        </GoogleOAuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
