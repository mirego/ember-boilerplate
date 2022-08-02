declare const RUNTIME_ENVIRONMENT: any;
declare const window: any;

export default (key: string) => {
  if (typeof window !== 'undefined' && window.RUNTIME_ENVIRONMENT) {
    return window.RUNTIME_ENVIRONMENT[key];
  } else {
    return RUNTIME_ENVIRONMENT[key];
  }
};
