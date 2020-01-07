export default config;

/**
 * Type declarations for
 *    import config from './config/environment'
 *
 * For now these need to be managed by the developer
 * since different ember addons can materialize new entries.
 */
declare const config: {
  environment: 'development' | 'test' | 'production';
  modulePrefix: string;
  podModulePrefix: string;
  locationType: string;
  rootURL: string;

  APP: {
    ALLOW_SITE_INDEXATION: boolean;
    VERSION: string;
  };

  apollo: {
    API_URL: string;
    SSR_CACHE_KEY: string;
  };

  contentSecurity: {
    'default-src': string | string[];
    'form-action': string | string[];
    'media-src': string | string[];
    'script-src': string | string[];
    'font-src': string | string[];
    'connect-src': string | string[];
    'style-src': string | string[];
  };

  fastboot: {
    fastbootHeader: boolean;
    hostWhitelist: string[];
  };

  intl: {
    ASYNC_TRANSLATIONS: boolean;
    LOCALES: string[];
    TRANSLATIONS_CACHE_KEY: string;
  };

  sentry: {
    enabled: boolean;
    dsn: string;
    environment: string;
    release: string;
    whitelistUrls: string[];
    debug: boolean;
  };
};
