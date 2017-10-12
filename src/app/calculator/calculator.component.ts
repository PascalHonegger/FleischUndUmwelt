import { MeatType } from './../model/meat-type.model';
import { Component } from '@angular/core';

import { SourceService } from './../services/source.service';
import { CustomTitleService } from './../services/custom-title.service';

const eatsNoMeatKey = 'eatsNoMeat';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  public meatTypes: MeatType[];

  public set eatsNoMeat(value: boolean) {
    if (this._eatsNoMeat === value) {
      return;
    }

    this._eatsNoMeat = value;
    localStorage.setItem(eatsNoMeatKey, value.toString());
  }

  public get eatsNoMeat(): boolean {
    return this._eatsNoMeat;
  }

  private _eatsNoMeat: boolean;

  constructor(sourceService: SourceService, title: CustomTitleService) {
    title.detailTitle = 'Rechner';
    title.description = 'Berechnen Sie, wie Ihr Fleischkonsum die Umwelt belastet';

    // Available meats
    this.meatTypes = [
      {
        meatName: 'Rindfleisch',
        animalName: 'Rind',
        animalNamePlural: 'Rinder',
        averageConsumtionPerWeek: sourceService.kgOfBeefPerPersonPerWeek.value,
        effectiveConsumtionPerWeek: 0,
        kgCo2PerKgWeight: sourceService.kgCo2PerPerKgBeef.value,
        kgPerAnimal: sourceService.kgOfBeefPerCow.value,
        kgPerPortion: sourceService.kgOfMeatPerPortion.value,
        landUsagePerKgWeight: sourceService.landUsedPerKgBeef.value,
        waterUsagePerKgWeight: sourceService.litersOfWaterPerKgBeef.value
      },
      {
        meatName: 'Schweinefleisch',
        animalName: 'Schwein',
        animalNamePlural: 'Schweine',
        averageConsumtionPerWeek: sourceService.kgOfPorkPerPersonPerWeek.value,
        effectiveConsumtionPerWeek: 0,
        kgCo2PerKgWeight: sourceService.kgCo2PerPerKgPork.value,
        kgPerAnimal: sourceService.kgOfPorkPerPig.value,
        kgPerPortion: sourceService.kgOfMeatPerPortion.value,
        landUsagePerKgWeight: sourceService.landUsedPerKgPork.value,
        waterUsagePerKgWeight: sourceService.litersOfWaterPerKgPork.value
      },
      {
        meatName: 'Pouletfleisch',
        animalName: 'Huhn',
        animalNamePlural: 'Hühner',
        averageConsumtionPerWeek: sourceService.kgOfChickenMeatPerPersonPerWeek.value,
        effectiveConsumtionPerWeek: 0,
        kgCo2PerKgWeight: sourceService.kgCo2PerPerKgChickenMeat.value,
        kgPerAnimal: sourceService.kgOfChickenMeatPerChicken.value,
        kgPerPortion: sourceService.kgOfMeatPerPortion.value,
        landUsagePerKgWeight: sourceService.landUsedPerKgChickenMeat.value,
        waterUsagePerKgWeight: sourceService.litersOfWaterPerKgChickenMeat.value
      }
    ];

    // Load storage saved value
    const item = localStorage.getItem(eatsNoMeatKey);
    if (item === true.toString()) {
      this._eatsNoMeat = true;
    } else {
      this._eatsNoMeat = false;
    }
  }
}
