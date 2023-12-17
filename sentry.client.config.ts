// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { ErrorEvent } from '@sentry/types';
import axios from 'axios';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
      networkDetailAllowUrls: [window.location.origin, /^\/apis\/v1\/[^\/]+(\/[^\/]+)*$/],
      networkRequestHeaders: ['X-Custom-Header'],
      networkResponseHeaders: ['X-Custom-Header'],
    }),
  ],
  beforeSend: process.env.NODE_ENV === 'production' ? (event, hint) => sendErrorMessage(event, hint) : undefined, // 에러를 Sentry에게 전달하기 전 처리할 수 있는 hook
});

const sendErrorMessage = (event: ErrorEvent, hint: Sentry.EventHint) => {
  let errorMsg = '';

  const hintMsg: any = hint.originalException || hint.syntheticException;

  errorMsg = `*🚨 Error*
  - [${event.request?.url}](${event.request?.url})
  - ${hintMsg?.message ?? ''}`;

  const body = {
    chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID, // 텔레그램의 CHAT_ID
    text: errorMsg,
    parse_mode: 'Markdown',
  };

  axios({
    method: 'POST',
    url: `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_TOKEN}/sendMessage`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: body,
  }).then(() => {
    console.log('Error logged!', hint.originalException || hint.syntheticException);
  });

  return event;
};
