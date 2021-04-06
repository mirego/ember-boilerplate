declare module '@sentry/ember' {
  import {BrowserOptions} from '@sentry/browser';
  export function InitSentryForEmber(_runtimeConfig: BrowserOptions): void;
  export * from '@sentry/browser';
}
