'use client';

import { Suspense, type ReactNode } from 'react';
import AppShell from '@/shared/lib/app-shell';
import ReactQueryProvider from '@/shared/lib/react-query/ReactQueryProvider';

export default function RootLayoutProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <AppShell>
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </AppShell>
    </ReactQueryProvider>
  );
}
