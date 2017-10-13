import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator/calculate-control';
import { Constants } from './../model/constants.model';
import { MeatType } from './../model/meat-type.model';
import { StorageService } from './../services/storage.service';
import { FillableImage } from './../model/fillable-image.model';

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

  constructor(private storageService: StorageService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(yearScale: number): void {
    const averageConsumtion = this.meatType.averageConsumtionPerWeek;

    const effectiveConsumtionPerWeek = this.storageService.eatsNoMeat()
      ? 0
      : this.storageService.consumtionPerWeek(this.meatType.meatName, averageConsumtion);

    const kgPerAnimal = this.meatType.kgPerAnimal;

    const effectiveConsumtionPerYear = effectiveConsumtionPerWeek * Constants.weeksPerYear;
    const averageConsumtionPerYear = averageConsumtion * Constants.weeksPerYear;

    this.effectiveConsumtion = effectiveConsumtionPerYear * yearScale;
    this.averageConsumtion = averageConsumtionPerYear * yearScale;

    this.effectiveKilledAnimals = this.effectiveConsumtion / kgPerAnimal;
    this.averageKilledAnimals = this.averageConsumtion / kgPerAnimal;

    this.calculated = true;
  }
}
