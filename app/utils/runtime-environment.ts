export const runtime = (key: string): string => {
  if (window?.RUNTIME_ENVIRONMENT) {
    return window.RUNTIME_ENVIRONMENT[key];
  } else {
    return RUNTIME_ENVIRONMENT[key];
  }
};

export const runtimeIsPresent = (key: string): boolean => {
  return Boolean(runtime(key));
};

export const runtimeAsBoolean = (key: string): boolean => {
  return ['true', '1'].includes(runtime(key));
};

export const runtimeAsInteger = (key: string): number => {
  return parseInt(runtime(key), 10);
};

export const runtimeAsArray = (key: string): string[] => {
  const value = runtime(key);
  return Array.isArray(value) ? value.split(',') : [];
};
