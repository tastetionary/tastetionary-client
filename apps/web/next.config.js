const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

/**
 * Sentry 빌드 옵션. v8 부터 withSentryConfig 는 2-인자라서
 * 웹팩 플러그인 설정과 SDK 옵션이 이 객체 하나로 합쳐졌다.
 *
 * v7 에서 쓰던 것 중 사라졌거나 뺀 항목:
 * - hideSourceMaps: v8 부터 기본 동작이라 옵션 자체가 없어졌다.
 * - transpileClientSDK: IE11 호환용이라 제거됐다. 번들만 커져서 되살리지 않는다.
 * - tunnelRoute: 광고 차단기 우회용으로 앱 서버를 경유시키는데, 서버 부하를 늘려서 켜지 않는다.
 */
const SentryBuildOptions = {
  // Suppresses source map uploading logs during build
  silent: true,
  org: 'tastionary',
  project: 'taste-client',
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_KEY, // An auth token is required for uploading source maps.

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // v10 에서 disableLogger / automaticVercelMonitors 는 webpack 아래로 옮겨졌다.
  webpack: {
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    treeshake: {
      removeDebugLogging: true,
    },

    // Enables automatic instrumentation of Vercel Cron Monitors.
    automaticVercelMonitors: true,
  },

  // Sentry API가 간헐적으로 5xx(504 gateway timeout 등)를 반환할 때
  // 릴리즈 생성/소스맵 업로드 실패가 빌드 전체를 죽이지 않도록 경고로 강등한다.
  errorHandler: err => {
    // eslint-disable-next-line no-console
    console.warn(`Sentry CLI Plugin: ${err.message}`);
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // packages/ui 는 빌드 단계 없이 소스(TSX)를 그대로 내보낸다. Next 가 직접 트랜스파일한다.
  transpilePackages: ['@tastetionary/ui'],

  staticPageGenerationTimeout: 600,
  // Next 16 부터 dev/build 모두 Turbopack 이 기본이라 이 함수는 평소에 쓰이지 않는다.
  // `next build --webpack` 으로 되돌릴 때를 위한 탈출구로 남겨둔다.
  // (SVGR 룰은 아래 turbopack.rules 와 짝을 이룬다. 한쪽만 고치면 그쪽 SVG import 가 깨진다.)
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // 실제로 쓰이는 쪽. 위 webpack() 은 Turbopack 에서 동작하지 않으므로 SVGR 룰을 여기 선언한다.
  turbopack: {
    // 모노레포 루트를 가리켜야 한다. pnpm 은 실제 패키지 실체를 워크스페이스 루트의
    // node_modules/.pnpm 아래에 두고 apps/web/node_modules 에는 심볼릭 링크만 만든다.
    // 여기를 apps/web 으로 좁히면 Turbopack 이 next 패키지 실체를 찾지 못해 빌드가 깨진다.
    root: path.join(__dirname, '..', '..'),

    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  rewrites: async () => {
    return [
      {
        source: '/apis/:path*',
        destination: process.env.NEXT_PUBLIC_SERVER_URL,
      },
      {
        // 이 경로는 세그먼트 없이 쿼리스트링만 붙여 호출한다 (`/search-image-api?query=...`).
        // Next 16 의 path-to-regexp 는 접두/접미가 없는 `:path*`(= `/search-image-api:path*`)를
        // 거부하므로 자리표시자를 떼고 정확히 매칭한다. 쿼리스트링은 리라이트가 그대로 넘긴다.
        source: '/search-image-api',
        destination: (process.env.NEXT_PUBLIC_SEARCH_IMAGE_SERVER_URL ?? '').replace(/\/?:path\*$/, ''),
      },
    ];
  },
};

module.exports = withSentryConfig(nextConfig, SentryBuildOptions);
