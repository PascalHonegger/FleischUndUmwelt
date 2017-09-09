import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.css'],
  template: `
    <nav>
      <a [routerLink]=" ['./'] ">Start</a>
      <a [routerLink]=" ['./rechner'] ">Rechner</a>
      <a [routerLink]=" ['./impressum'] ">Impressum</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <!--
    <footer>
      <ng2-adsense></ng2-adsense>
    </footer>
    -->
  `
})
export class AppComponent {
  constructor() {
    if (isDevMode()) {
      // No caching in dev mode
      return;
    }

    const OfflinePluginRuntime = require('offline-plugin/runtime');

    OfflinePluginRuntime.install({
      onUpdating: () => {
        console.log('SW Event:', 'onUpdating');
      },
      onUpdateReady: () => {
        console.log('SW Event:', 'onUpdateReady');
        // Tells to new SW to take control immediately
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: () => {
        console.log('SW Event:', 'onUpdated');
        // Reload the webpage to load into the new version
        window.location.reload();
      },
      onUpdateFailed: () => {
        console.log('SW Event:', 'onUpdateFailed');
      }
    });
  }
}
