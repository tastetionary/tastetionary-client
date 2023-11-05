'use client';

import GlobalModal from '@/components/Modal/GlobalModal';
import Toast from '@/components/Toast';
import GridLayout from '@/components/layout/grid-layout';
import MobileLayout from '@/components/layout/mobile-layout';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import ReactQueryProvider from '../react-query/ReactQueryProvider';

export default function StyledComponentsWrapper({ children }: { children: ReactNode }) {
  return (
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
  );
}
