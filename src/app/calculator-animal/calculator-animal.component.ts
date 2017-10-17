import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator-result/calculate-control';
import { MeatType } from './../model/meat-type.model';
import { CalculationService } from './../services/calculation.service';

@Component({
  selector: 'calculator-animal',
  styleUrls: ['./calculator-animal.component.css'],
  templateUrl: './calculator-animal.component.html'
})
export class CalculatorAnimalComponent implements CalculateControl {
  @Input() public meatType: MeatType;

  public calculated: boolean = false;
  public effectiveKilledAnimals: number;
  public averageKilledAnimals: number;

  public effectiveConsumtion: number;
  public averageConsumtion: number;

  constructor(private readonly calculationService: CalculationService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    const consumtionPerYear = this.calculationService.consumtionPerYear(this.meatType);

    this.effectiveConsumtion = consumtionPerYear.effective * yearScale;
    this.averageConsumtion = consumtionPerYear.average * yearScale;

    const kgPerAnimal = this.meatType.kgPerAnimal;

    this.effectiveKilledAnimals = this.effectiveConsumtion / kgPerAnimal;
    this.averageKilledAnimals = this.averageConsumtion / kgPerAnimal;

    this.calculated = true;
  }
}
