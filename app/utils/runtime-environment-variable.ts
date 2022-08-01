export default (key: string) => {
  if (typeof window !== 'undefined' && window.ENV) {
    return window.ENV[key];
  } else {
    return RUNTIME_ENVIRONMENT_VARIABLES[key];
  }
};
