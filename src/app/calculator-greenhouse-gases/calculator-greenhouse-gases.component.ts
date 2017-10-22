import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator-result/calculate-control';
import { Constants } from './../model/constants.model';
import { MeatType } from './../model/meat-type.model';
import { SourceService } from './../services/source.service';
import { CalculationService } from './../services/calculation.service';

@Component({
  selector: 'calculator-greenhouse-gases',
  styleUrls: ['./calculator-greenhouse-gases.component.css'],
  templateUrl: './calculator-greenhouse-gases.component.html'
})
export class CalculatorGreenhouseGasesComponent implements CalculateControl {
  @Input() public meatTypes: MeatType[];

  public kgCo2: number;
  public averageKgCo2: number;
  public comparableDrivenMeters: number;
  public averageDrivenMeters: number;
  public comparableAmountOfCarYears: number;
  public comparableAmountOfCarDays: number;

  public calculated: boolean = false;

  constructor(private readonly calculationService: CalculationService,
              private readonly sourceService: SourceService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    let totalKgCo2PerYear: number = 0;
    let totalAverageKgCo2PerYear: number = 0;

    for (const meatType of this.meatTypes) {
      const consumtionPerYear = this.calculationService.consumtionPerYear(meatType);

      const kgCo2Produced = consumtionPerYear.effective * meatType.kgCo2PerKgWeight;
      const averageKgCo2Produced = consumtionPerYear.average * meatType.kgCo2PerKgWeight;

      totalKgCo2PerYear += kgCo2Produced;
      totalAverageKgCo2PerYear += averageKgCo2Produced;
    }

    this.kgCo2 = totalKgCo2PerYear * yearScale;
    this.averageKgCo2 = totalAverageKgCo2PerYear * yearScale;

    const kgCo2PerMeter = this.sourceService.kgCo2PerMeter.value;

    this.comparableDrivenMeters = this.kgCo2 / kgCo2PerMeter;
    this.averageDrivenMeters = this.averageKgCo2 / kgCo2PerMeter;

    const metersDrivenPerYear = this.sourceService.metersDrivenPerYear.value;

    this.comparableAmountOfCarYears = this.comparableDrivenMeters / metersDrivenPerYear;
    this.comparableAmountOfCarDays = this.comparableAmountOfCarYears * Constants.daysPerYear;

    this.calculated = true;
  }
}
