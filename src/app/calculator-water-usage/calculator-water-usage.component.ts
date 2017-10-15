import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator/calculate-control';
import { Constants } from './../model/constants.model';
import { MeatType } from './../model/meat-type.model';
import { FillableImage } from './../model/animal-image.model';
import { StorageService } from './../services/storage.service';
import { SourceService } from './../services/source.service';

@Component({
  selector: 'calculator-water-usage',
  styleUrls: ['./calculator-water-usage.component.css'],
  templateUrl: './calculator-water-usage.component.html'
})
export class CalculatorWaterUsageComponent implements CalculateControl {
  @Input() public meatTypes: MeatType[];

  public litersUsed: number;
  public averageLitersUsed: number;
  public comparableAmountOfHoursShowered: number;
  public comparableAmountOfMonthsShowered: number;

  public calculated: boolean = false;

  constructor(private storageService: StorageService, private sourceService: SourceService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    const eatsNoMeat = this.storageService.eatsNoMeat();

    let totalLitersPerYear: number = 0;
    let totalAverageLitersPerYear: number = 0;

    for (const meatType of this.meatTypes) {
      const effectiveConsumtionPerWeek = eatsNoMeat
      ? 0
      : this.storageService.consumtionPerWeek(meatType.meatName, meatType.averageConsumtionPerWeek);

      const effectiveConsumtionPerYear = effectiveConsumtionPerWeek * Constants.weeksPerYear;
      const averageConsumtionPerYear = meatType.averageConsumtionPerWeek * Constants.weeksPerYear;

      const litersUsed = effectiveConsumtionPerYear * meatType.waterUsagePerKgWeight;
      const averageLitersUsed = averageConsumtionPerYear * meatType.waterUsagePerKgWeight;

      totalLitersPerYear += litersUsed;
      totalAverageLitersPerYear += averageLitersUsed;
    }

    this.litersUsed = totalLitersPerYear * yearScale;
    this.averageLitersUsed = totalAverageLitersPerYear * yearScale;

    const showerLitersPerMinute = this.sourceService.showerWaterUsagesPerMinute.value;

    this.comparableAmountOfHoursShowered = this.litersUsed / showerLitersPerMinute / 60;
    const daysShowered = this.comparableAmountOfHoursShowered / 24;
    this.comparableAmountOfMonthsShowered = daysShowered / Constants.monthsPerYear;

    this.calculated = true;
  }
}
