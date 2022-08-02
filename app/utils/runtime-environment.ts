// NOTE: This is where we figure out if we use the client-side or server-side runtime environment
export default (key: string) => {
  if (typeof window !== 'undefined' && window.RUNTIME_ENVIRONMENT) {
    return window.RUNTIME_ENVIRONMENT[key];
  } else {
    return RUNTIME_ENVIRONMENT[key];
  }
};
