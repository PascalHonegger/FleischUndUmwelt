import { FormControl, Validators } from '@angular/forms';
import { SourceService } from './../services/source.service';
import { CustomTitleService } from './../services/custom-title.service';
import { Component } from '@angular/core';

const eatsMeatKey = 'eatsMeat';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  public eatsMeatFormControl = new FormControl(undefined, Validators.required);

  constructor(public sourceService: SourceService, title: CustomTitleService) {
    title.detailTitle = 'Rechner';
    title.description = 'Berechnen Sie, wie Ihr Fleischkonsum die Umwelt belastet';

    const item = localStorage.getItem(eatsMeatKey);
    if (item === true.toString()) {
      this.eatsMeatFormControl.setValue(true);
    } else if (item === false.toString()) {
      this.eatsMeatFormControl.setValue(false);
    }

    this.eatsMeatFormControl.valueChanges.subscribe(
      (val) => {
        if (val !== undefined) {
          localStorage.setItem(eatsMeatKey, val.toString());
        }
      });
  }
}
