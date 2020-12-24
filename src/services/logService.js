import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const obj = {
  init,
  log,
};

function init() {
  Sentry.init({
    dsn:
      'https://43d7f9bf268644fcbe1ac9932e2cb74e@o495292.ingest.sentry.io/5569038',
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default obj;
