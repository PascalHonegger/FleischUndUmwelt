import { CustomTitleService } from './../services/custom-title.service';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  public mealsContainingMeat: number = 5;
  public eatsMeat: boolean;

  constructor(title: CustomTitleService) {
    title.detailTitle = 'Rechner';
    title.description = 'Berechnen Sie, wie Ihr Fleischkonsum die Umwelt belastet';
  }
}
