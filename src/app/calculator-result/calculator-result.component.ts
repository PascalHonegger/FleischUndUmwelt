import { Component, ViewChildren, AfterViewInit, QueryList } from '@angular/core';

import { CustomTitleService } from './../services/custom-title.service';
import { CalculationService } from './../services/calculation.service';
import { CalculateControl } from './calculate-control';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'calculator-result',
  styleUrls: ['./calculator-result.component.css'],
  templateUrl: './calculator-result.component.html'
})
export class CalculatorResultComponent implements AfterViewInit {
  @ViewChildren('calculateControl') public calculateControls: QueryList<CalculateControl>;

  public calculated: boolean = false;

  public get yearScale(): number {
    return this._yearScale;
  }
  public set yearScale(value: number) {
    if (this._yearScale === value) {
      return;
    }

    this._yearScale = value;
    this.storageService.setYearScale(value);

    this.calculated = false;
    setTimeout(() => {
      this.clearCalculateResults();
      this.runCalculateMethods();
    });
  }

  private _yearScale: number;

  constructor(private readonly storageService: StorageService,
              public readonly calculationService: CalculationService,
              title: CustomTitleService) {
    title.detailTitle = 'Resultat';
    title.description = 'Stellen Sie dar, wie Ihr Fleischkonsum die Umwelt belastet';

    // Load storage saved value
    this._yearScale = this.storageService.yearScale();
  }

  public ngAfterViewInit() {
    setTimeout(() => this.runCalculateMethods());
  }

  private runCalculateMethods() {
    this.calculateControls.forEach((control) => {
      control.calculate(this.yearScale);
    });
    setTimeout(() => this.calculated = true);
  }

  private clearCalculateResults() {
    this.calculateControls.forEach((control) => {
      control.clear();
    });
  }
}
