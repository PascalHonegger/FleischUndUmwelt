import { CustomTitleService } from './../services/custom-title.service';
import { Component } from '@angular/core';

const eatsMeatKey = 'eatsMeat';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  public mealsContainingMeat: number = 5;

  public set eatsMeat(value: boolean) {
    if (this._eatsMeat === value) {
      return;
    }

    this._eatsMeat = value;
    localStorage.setItem(eatsMeatKey, value.toString());
  }

  public get eatsMeat(): boolean {
    return this._eatsMeat;
  }

  private _eatsMeat: boolean;

  constructor(title: CustomTitleService) {
    title.detailTitle = 'Rechner';
    title.description = 'Berechnen Sie, wie Ihr Fleischkonsum die Umwelt belastet';

    const item = localStorage.getItem(eatsMeatKey);
    if (item === true.toString()) {
      this._eatsMeat = true;
    } else if (item === false.toString()) {
      this._eatsMeat = false;
    }
  }
}
