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
  staticPageGenerationTimeout: 600,
  // 빌드는 lint로 차단하지 않음. lint는 `pnpm lint` / `pnpm fix`로 별도 실행.
  // (TypeScript 타입 에러는 그대로 빌드를 실패시킴)
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  rewrites: async () => {
    return [
      {
        source: '/apis/:path*',
        destination: process.env.NEXT_PUBLIC_SERVER_URL,
      },
      {
        source: '/search-image-api:path*',
        destination: process.env.NEXT_PUBLIC_SEARCH_IMAGE_SERVER_URL,
      },
    ];
  },
};

module.exports = withSentryConfig(nextConfig, SentryBuildOptions);
