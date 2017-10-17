import { Component } from '@angular/core';

import { CustomTitleService } from './../services/custom-title.service';

@Component({
  selector: 'no-content',
  template: `
    <div>
      <h1>Seite nicht gefunden</h1>
    </div>
  `
})
export class NoContentComponent {
  constructor(title: CustomTitleService) {
    title.detailTitle = '404';
    title.description = 'Seite nicht gefunden';
  }
}
