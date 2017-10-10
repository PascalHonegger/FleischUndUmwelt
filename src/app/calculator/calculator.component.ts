import { FormControl, Validators } from '@angular/forms';
import { SourceService } from './../services/source.service';
import { CustomTitleService } from './../services/custom-title.service';
import { Component } from '@angular/core';

const eatsNoMeatKey = 'eatsNoMeat';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  public set eatsNoMeat(value: boolean) {
    if (this._eatsNoMeat === value) {
      return;
    }

    this._eatsNoMeat = value;
    localStorage.setItem(eatsNoMeatKey, value.toString());
  }

  public get eatsNoMeat(): boolean {
    return this._eatsNoMeat;
  }

  private _eatsNoMeat: boolean;

  constructor(public sourceService: SourceService, title: CustomTitleService) {
    title.detailTitle = 'Rechner';
    title.description = 'Berechnen Sie, wie Ihr Fleischkonsum die Umwelt belastet';

    const item = localStorage.getItem(eatsNoMeatKey);
    if (item === true.toString()) {
      this._eatsNoMeat = true;
    } else {
      this._eatsNoMeat = false;
    }
  }
}
