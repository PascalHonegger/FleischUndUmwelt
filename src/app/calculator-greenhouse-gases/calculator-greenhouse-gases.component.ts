import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator/calculate-control';
import { Constants } from './../model/constants.model';
import { MeatType } from './../model/meat-type.model';
import { FillableImage } from './../model/animal-image.model';
import { StorageService } from './../services/storage.service';
import { SourceService } from './../services/source.service';

@Component({
  selector: 'calculator-greenhouse-gases',
  styleUrls: ['./calculator-greenhouse-gases.component.css'],
  templateUrl: './calculator-greenhouse-gases.component.html'
})
export class CalculatorGreenhouseGasesComponent implements CalculateControl {
  @Input() public meatTypes: MeatType[];

  public kgCo2: number;
  public comparableDrivenMeters: number;
  public comparableAmountOfCarYears: number;

  public get comparableAmountOfCarDays(): number {
    return this.comparableAmountOfCarYears * Constants.daysPerYear;
  }

  public calculated: boolean = false;

  constructor(private storageService: StorageService, private sourceService: SourceService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    const eatsNoMeat = this.storageService.eatsNoMeat();

    let totalKgCo2PerYear: number = 0;

    for (const meatType of this.meatTypes) {
      const effectiveConsumtionPerWeek = eatsNoMeat
      ? 0
      : this.storageService.consumtionPerWeek(meatType.meatName, meatType.averageConsumtionPerWeek);

      const effectiveConsumtionPerYear = effectiveConsumtionPerWeek * Constants.weeksPerYear;

      const kgCo2Produced = effectiveConsumtionPerYear * meatType.kgCo2PerKgWeight;

      totalKgCo2PerYear += kgCo2Produced;
    }

    this.kgCo2 = totalKgCo2PerYear * yearScale;

    const kgCo2PerMeter = this.sourceService.kgCo2PerMeter.value;

    this.comparableDrivenMeters = this.kgCo2 / kgCo2PerMeter;

    const metersDrivenPerYear = this.sourceService.metersDrivenPerYear.value;

    this.comparableAmountOfCarYears = this.comparableDrivenMeters / metersDrivenPerYear;

    this.calculated = true;
  }
}
