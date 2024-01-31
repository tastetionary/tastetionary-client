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
  org: '4f7ce7821843',
  project: 'tastetionary',
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_KEY, // An auth token is required for uploading source maps.
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  experimental: {
    appDir: true,
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
        destination: process.env.NEXT_PUBLIC_DEV_SERVER_URL,
      },
      {
        source: '/search-image-api:path*',
        destination: process.env.NEXT_PUBLIC_SEARCH_IMAGE_SERVER_URL,
      },
    ];
  },
};

module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions, SentryOptions);
