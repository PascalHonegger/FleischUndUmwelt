import { Component } from '@angular/core';

import { CalculationService } from './../services/calculation.service';
import { CustomTitleService } from './../services/custom-title.service';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  constructor(public readonly calculationService: CalculationService,
              title: CustomTitleService) {
    title.detailTitle = 'Rechner';
    title.description = 'Berechnen Sie, wie Ihr Fleischkonsum die Umwelt belastet';
  }
}
