import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator-result/calculate-control';
import { MeatType } from './../model/meat-type.model';
import { SourceService } from './../services/source.service';
import { CalculationService } from './../services/calculation.service';

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

  constructor(private readonly calculationService: CalculationService,
              private readonly sourceService: SourceService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    let totalMeterSquaredPerYear: number = 0;
    let totalAverageMeterSquaredPerYear: number = 0;

    for (const meatType of this.meatTypes) {
      const consumtionPerYear = this.calculationService.consumtionPerYear(meatType);

      const metersUsed = consumtionPerYear.effective * meatType.landUsagePerKgWeight;
      const averageMetersUsed = consumtionPerYear.average * meatType.landUsagePerKgWeight;

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
