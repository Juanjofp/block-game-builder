import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { LogService } from 'services/log/log-service';

function parseMessages(msg: string | {}) {
    return JSON.stringify(msg);
}
export function buildSentryLogService(): LogService {
    Sentry.init({
        dsn: 'https://28787d92dbd041af941df5f9db423782@o1097812.ingest.sentry.io/6119585',
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0
    });

    return {
        info: (...args) => console.log('INFO', ...args.map(parseMessages)),
        warn: (...args) => console.log('WARNING', ...args.map(parseMessages)),
        error: (...args) => console.log('ERROR', ...args.map(parseMessages))
    };
}
