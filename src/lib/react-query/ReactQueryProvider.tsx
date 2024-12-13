'use client';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { Hydrate, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React, { useState } from 'react';

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 3 * 60 * 1000,
            retry: false,
            cacheTime: 3 * 60 * 1000,
            refetchOnWindowFocus: false,
            retryDelay: 1000,
          },
        },
      })
  );

  const persister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  return (
    <PersistQueryClientProvider client={client} persistOptions={{ persister }}>
      <Hydrate state={null}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}

export default ReactQueryProvider;
