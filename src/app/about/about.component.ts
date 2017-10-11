import { Component } from '@angular/core';

import { CustomTitleService } from './../services/custom-title.service';

@Component({
  selector: 'about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(titleService: CustomTitleService) {
    titleService.detailTitle = 'Impressum';
    titleService.description = 'Nehmen Sie Kontakt mit uns auf';
  }
}
