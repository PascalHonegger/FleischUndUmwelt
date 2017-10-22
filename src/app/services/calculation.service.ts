import { Injectable } from '@angular/core';

import { SourceService } from './source.service';
import { StorageService } from './storage.service';
import { MeatType } from './../model/meat-type.model';
import { Constants } from './../model/constants.model';

@Injectable()
export class CalculationService {
    public get eatsNoMeat(): boolean {
        return this._eatsNoMeat;
    }
    public set eatsNoMeat(value: boolean) {
        if (this._eatsNoMeat === value) {
            return;
        }

        this._eatsNoMeat = value;
        this.storageService.setEatsNoMeat(value);
    }

    public meatTypes: MeatType[];

    private _eatsNoMeat: boolean;

    constructor(private readonly storageService: StorageService,
                sourceService: SourceService) {
        // Load storage saved value
        this._eatsNoMeat = this.storageService.eatsNoMeat();

        this.meatTypes = [
            {
              meatName: 'Rindfleisch',
              animalName: 'Rind',
              animalNamePlural: 'Rinder',
              imageBaseName: 'cow',
              averageConsumtionPerWeek: sourceService.kgOfBeefPerPersonPerWeek.value,
              kgCo2PerKgWeight: sourceService.kgCo2PerPerKgBeef.value,
              kgPerAnimal: sourceService.kgOfBeefPerCow.value,
              kgPerPortion: sourceService.kgOfMeatPerPortion.value,
              landUsagePerKgWeight: sourceService.landUsedPerKgBeef.value,
              waterUsagePerKgWeight: sourceService.litersOfWaterPerKgBeef.value,
              imageWidth: 153,
              imageHeight: 92.4
            },
            {
              meatName: 'Schweinefleisch',
              animalName: 'Schwein',
              animalNamePlural: 'Schweine',
              imageBaseName: 'pig',
              averageConsumtionPerWeek: sourceService.kgOfPorkPerPersonPerWeek.value,
              kgCo2PerKgWeight: sourceService.kgCo2PerPerKgPork.value,
              kgPerAnimal: sourceService.kgOfPorkPerPig.value,
              kgPerPortion: sourceService.kgOfMeatPerPortion.value,
              landUsagePerKgWeight: sourceService.landUsedPerKgPork.value,
              waterUsagePerKgWeight: sourceService.litersOfWaterPerKgPork.value,
              imageWidth: 110.55,
              imageHeight: 56.7
            },
            {
              meatName: 'Pouletfleisch',
              animalName: 'Huhn',
              animalNamePlural: 'Hühner',
              imageBaseName: 'chicken',
              averageConsumtionPerWeek: sourceService.kgOfChickenMeatPerPersonPerWeek.value,
              kgCo2PerKgWeight: sourceService.kgCo2PerPerKgChickenMeat.value,
              kgPerAnimal: sourceService.kgOfChickenMeatPerChicken.value,
              kgPerPortion: sourceService.kgOfWingedMeatPerPortion.value,
              landUsagePerKgWeight: sourceService.landUsedPerKgChickenMeat.value,
              waterUsagePerKgWeight: sourceService.litersOfWaterPerKgChickenMeat.value,
              imageWidth: 49.335,
              imageHeight: 60.83
            }
          ];
    }

    public consumtionPerYear(meat: MeatType): { effective: number, average: number} {
        const effectiveConsumtionPerWeek = this.eatsNoMeat
        ? 0
        : this.storageService.consumtionPerWeek(meat.meatName, meat.averageConsumtionPerWeek);

        const effectiveConsumtionPerYear = effectiveConsumtionPerWeek * Constants.weeksPerYear;
        const averageConsumtionPerYear = meat.averageConsumtionPerWeek * Constants.weeksPerYear;

        return { effective: effectiveConsumtionPerYear, average: averageConsumtionPerYear };
    }
}
