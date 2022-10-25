declare global {
  // This fixes Workbox typings for version 5.0
  interface ExtendableEvent extends Event {
    waitUntil(fn: Promise<any>): void;
  }

  // This fixes Workbox typings for version 5.0
  interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Promise<Response> | Response): Promise<Response>;
  }

  interface Window {
    RUNTIME_ENVIRONMENT: Record<string, string>;
  }

  const RUNTIME_ENVIRONMENT: Record<string, string>;
}

export {};
