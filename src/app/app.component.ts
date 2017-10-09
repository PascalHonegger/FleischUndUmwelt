import { CustomTitleService } from './services/custom-title.service';
import { Component, isDevMode } from '@angular/core';
import { ILink } from './model/ILink';

@Component({
  selector: 'app',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public links: ILink[] = [{
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
