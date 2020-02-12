// Vendor
import Service, {inject as service} from '@ember/service';

// Types
import FastBoot from 'ember-cli-fastboot/services/fastboot';

enum ServiceWorkerActions {
  SKIP_WAITING = 'skipWaiting',
  CHECK_FOR_UPDATES = 'checkForUpdates',
  UNREGISTER = 'unregister'
}

export default class ServiceWorkerService extends Service {
  @service('fastboot')
  fastboot: FastBoot;

  registration?: ServiceWorkerRegistration;
  updateReady: boolean = false;
  updateCallbacks: Array<() => void> = [];

  register(): ServiceWorkerService {
    if (this.fastboot.isFastBoot) return this;
    if (!navigator.serviceWorker) return this;

    this.listenToControllerChange();
    this.listenToUpdates();

    return this;
  }

  checkForUpdates() {
    if (this.updateReady) return;
    if (!this.registration) return;
    if (!this.registration.active) return;

    this.registration.active.postMessage({
      action: ServiceWorkerActions.CHECK_FOR_UPDATES
    });
  }

  onUpdateReady(callback: () => void) {
    this.updateCallbacks = [...this.updateCallbacks, callback];
  }

  update() {
    if (!this.registration) return;
    if (!this.registration.waiting) return;

    this.registration.waiting.postMessage({
      action: ServiceWorkerActions.SKIP_WAITING
    });
  }

  /**
   * Call this method in your client to unregister service workers.
   * You need to set the `SW_DISABLED` environment variable to `true` for the service worker to be completely deleted.
   */
  async unregisterAll() {
    if (this.fastboot.isFastBoot) return;
    if (!navigator.serviceWorker) return;

    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const registration of registrations) {
      if (!registration.active) {
        await registration.unregister();

        return;
      }

      registration.active.postMessage({
        action: ServiceWorkerActions.UNREGISTER
      });
    }
  }

  private listenToUpdates() {
    navigator.serviceWorker
      .getRegistration()
      .then(registration => {
        if (!registration) return;

        this.registration = registration;

        // The window client isn’t currently controlled so it’s a new
        // ServiceWorker that will activate immediately
        if (!navigator.serviceWorker.controller) return;

        if (registration.waiting) {
          this.notifyUpdateReady();

          return;
        }

        if (registration.installing) {
          this.trackInstallingWorker(registration.installing);

          return;
        }

        this.listenToUpdateFound(registration);
      })
      .catch(() => {});
  }

  private listenToControllerChange() {
    // When the user asks to refresh the UI, we’ll need to reload the window
    // but we have to make sure to refresh only once.
    // This works around a bug in “Update on reload”.
    let preventDevToolsReloadLoop = false;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (preventDevToolsReloadLoop) return;
      preventDevToolsReloadLoop = true;

      window.location.reload();
    });
  }

  private listenToUpdateFound(registration: ServiceWorkerRegistration) {
    registration.addEventListener('updatefound', () => {
      if (!registration.installing) return;

      this.trackInstallingWorker(registration.installing);
    });
  }

  private notifyUpdateReady() {
    this.updateCallbacks.forEach(callback => callback.call(this));
  }

  private trackInstallingWorker(serviceWorker: ServiceWorker) {
    serviceWorker.addEventListener('statechange', () => {
      if (serviceWorker.state === 'installed') {
        this.notifyUpdateReady();
      }
    });
  }
}

declare module '@ember/service' {
  interface Registry {
    'service-worker': ServiceWorkerService;
  }
}
