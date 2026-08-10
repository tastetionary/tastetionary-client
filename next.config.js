const { withSentryConfig } = require('@sentry/nextjs');

// Injected content via Sentry wizard below
const SentryOptions = {
  sentry: {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
};

const SentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: 'tastionary',
  project: 'taste-client',
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_KEY, // An auth token is required for uploading source maps.

  // Sentry API가 간헐적으로 5xx(504 gateway timeout 등)를 반환할 때
  // 릴리즈 생성/소스맵 업로드 실패가 빌드 전체를 죽이지 않도록 경고로 강등한다.
  // (기본 동작은 compilation.errors에 push해서 "Failed to compile"로 이어짐)
  errorHandler: (err, _invokeErr, compilation) => {
    compilation.warnings.push(new Error(`Sentry CLI Plugin: ${err.message}`));
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
  compiler: {
    styledComponents: true,
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

module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions, SentryOptions);
