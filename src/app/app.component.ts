import { Component, isDevMode } from '@angular/core';

import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { CustomTitleService } from './services/custom-title.service';
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

  // Injection required by Angulartics2
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              public titleService: CustomTitleService) {
    if (isDevMode()) {
      // No caching in dev mode
      return;
    }
  }
}
