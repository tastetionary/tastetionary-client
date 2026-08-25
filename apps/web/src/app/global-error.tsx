'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

/**
 * 루트 레이아웃까지 무너진 렌더링 에러를 받는 최후의 경계.
 *
 * App Router 에서는 이 파일이 없으면 React 렌더링 에러가 Sentry 로 올라가지 않는다.
 * 루트 레이아웃을 대체하므로 <html>/<body> 를 직접 그려야 하고,
 * 이 안에서는 전역 프로바이더가 죽어 있을 수 있으니 의존성 없이 최소한으로만 쓴다.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: 20,
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#37474F',
          background: '#ffffff',
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>문제가 발생했습니다</h1>
        <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: '#78909C' }}>
          잠시 후 다시 시도해주세요.
          <br />
          문제가 계속되면 잠시 뒤에 접속해주세요.
        </p>
        <button
          type="button"
          onClick={() => window.location.assign('/')}
          style={{
            marginTop: 8,
            padding: '12px 24px',
            fontSize: 14,
            color: '#ffffff',
            background: '#FF5601',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          홈으로 이동
        </button>
      </body>
    </html>
  );
}
