import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator/calculate-control';
import { Constants } from './../model/constants.model';
import { MeatType } from './../model/meat-type.model';
import { FillableImage } from './../model/animal-image.model';
import { StorageService } from './../services/storage.service';
import { SourceService } from './../services/source.service';

@Component({
  selector: 'calculator-land-usage',
  styleUrls: ['./calculator-land-usage.component.css'],
  templateUrl: './calculator-land-usage.component.html'
})
export class CalculatorLandUsageComponent implements CalculateControl {
  @Input() public meatTypes: MeatType[];

  public metersSquared: number;
  public averageMetersSquared: number;
  public comparableAmountOfTennisFields: number;

  public calculated: boolean = false;

  constructor(private storageService: StorageService, private sourceService: SourceService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    const eatsNoMeat = this.storageService.eatsNoMeat();

    let totalMeterSquaredPerYear: number = 0;
    let totalAverageMeterSquaredPerYear: number = 0;

    for (const meatType of this.meatTypes) {
      const effectiveConsumtionPerWeek = eatsNoMeat
      ? 0
      : this.storageService.consumtionPerWeek(meatType.meatName, meatType.averageConsumtionPerWeek);

      const effectiveConsumtionPerYear = effectiveConsumtionPerWeek * Constants.weeksPerYear;
      const averageConsumtionPerYear = meatType.averageConsumtionPerWeek * Constants.weeksPerYear;

      const metersUsed = effectiveConsumtionPerYear * meatType.landUsagePerKgWeight;
      const averageMetersUsed = averageConsumtionPerYear * meatType.landUsagePerKgWeight;

      totalMeterSquaredPerYear += metersUsed;
      totalAverageMeterSquaredPerYear += averageMetersUsed;
    }

    this.metersSquared = totalMeterSquaredPerYear * yearScale;
    this.averageMetersSquared = totalAverageMeterSquaredPerYear * yearScale;

    const tennisFieldMetersSquared = this.sourceService.tennisFieldArea.value;

    this.comparableAmountOfTennisFields = this.metersSquared / tennisFieldMetersSquared;

    this.calculated = true;
  }
}
