import { CustomTitleService } from './../services/custom-title-service';
import { Component } from '@angular/core';

@Component({
  selector: 'facts',
  styleUrls: [ './facts.component.css' ],
  templateUrl: './facts.component.html'
})
export class FactsComponent {
  constructor(title: CustomTitleService) {
    title.detailTitle = 'Fakten';
  }
}
