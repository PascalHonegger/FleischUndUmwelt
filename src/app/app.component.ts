import { CustomTitleService } from './services/custom-title.service';
import { Component, isDevMode } from '@angular/core';
import { Link } from './model/link.model';

@Component({
  selector: 'app',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public links: Link[] = [{
    url: ['/'],
    matIcon: 'sort',
    content: 'Rechner'
  }, {
    url: ['/facts'],
    matIcon: 'info_outline',
    content: 'Fakten'
  }, {
    url: ['/impressum'],
    matIcon: 'contact_mail',
    content: 'Kontakt'
  }];

  constructor(public titleService: CustomTitleService) {
    if (isDevMode()) {
      // No caching in dev mode
      return;
    }

    const OfflinePluginRuntime = require('offline-plugin/runtime');

    OfflinePluginRuntime.install({
      onUpdating: () => {
        console.debug('SW Event:', 'onUpdating');
      },
      onUpdateReady: () => {
        console.debug('SW Event:', 'onUpdateReady');
        // Tells to new SW to take control immediately
        OfflinePluginRuntime.applyUpdate();
      },
      onUpdated: () => {
        console.debug('SW Event:', 'onUpdated');
        // Reload the webpage to load into the new version
        window.location.reload();
      },
      onUpdateFailed: () => {
        console.debug('SW Event:', 'onUpdateFailed');
      }
    });
  }
}
