// 서버/엣지 런타임에서 Sentry 를 초기화한다.
//
// v10 부터는 `sentry.server.config.ts` / `sentry.edge.config.ts` 대신
// Next 의 instrumentation 훅이 규약이다. 두 런타임 설정이 같아서 한 번에 처리한다.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }
}

/** 서버 컴포넌트/라우트 핸들러에서 터진 에러를 Sentry 로 보낸다. (Next 15 훅) */
export const onRequestError = Sentry.captureRequestError;
