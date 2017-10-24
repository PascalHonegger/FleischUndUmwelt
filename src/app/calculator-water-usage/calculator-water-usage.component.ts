import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator-result/calculate-control';
import { Constants } from './../model/constants.model';
import { MeatType } from './../model/meat-type.model';
import { SourceService } from './../services/source.service';
import { CalculationService } from './../services/calculation.service';

@Component({
  selector: 'calculator-water-usage',
  styleUrls: ['./calculator-water-usage.component.css'],
  templateUrl: './calculator-water-usage.component.html'
})
export class CalculatorWaterUsageComponent implements CalculateControl {
  @Input() public meatTypes: MeatType[];

  public litersUsed: number;
  public averageLitersUsed: number;
  public comparableAmountOfDaysShowered: number;
  public comparableAmountOfMonthsShowered: number;
  public averageAmountOfMonthsShowered: number;

  public calculated: boolean = false;

  constructor(private readonly calculationService: CalculationService,
              private readonly sourceService: SourceService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    let totalLitersPerYear: number = 0;
    let totalAverageLitersPerYear: number = 0;

    for (const meatType of this.meatTypes) {
      const consumtionPerYear = this.calculationService.consumtionPerYear(meatType);

      const litersUsed = consumtionPerYear.effective * meatType.waterUsagePerKgWeight;
      const averageLitersUsed = consumtionPerYear.average * meatType.waterUsagePerKgWeight;

      totalLitersPerYear += litersUsed;
      totalAverageLitersPerYear += averageLitersUsed;
    }

    this.litersUsed = totalLitersPerYear * yearScale;
    this.averageLitersUsed = totalAverageLitersPerYear * yearScale;

    const showerLitersPerMinute = this.sourceService.showerWaterUsagesPerMinute.value;

    const comparableAmountOfHoursShowered = this.litersUsed / showerLitersPerMinute / 60;
    this.comparableAmountOfDaysShowered = comparableAmountOfHoursShowered / 24;
    const averageAmountOfHoursShowered = this.averageLitersUsed / showerLitersPerMinute / 60 / 24;

    // tslint:disable-next-line:max-line-length
    this.comparableAmountOfMonthsShowered = this.comparableAmountOfDaysShowered / Constants.monthsPerYear;
    this.averageAmountOfMonthsShowered = averageAmountOfHoursShowered / Constants.monthsPerYear;

    this.calculated = true;
  }
}
