import { CalculateControl } from './calculate-control';
import { StorageService } from './../services/storage.service';
import { MeatType } from './../model/meat-type.model';
import { Component, ViewChildren, AfterViewInit, QueryList } from '@angular/core';

import { SourceService } from './../services/source.service';
import { CustomTitleService } from './../services/custom-title.service';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements AfterViewInit {
  @ViewChildren('calculateControl') public calculateControls: QueryList<CalculateControl>;

  public meatTypes: MeatType[];
  public calculated: boolean = false;

  public set showInputs(value: boolean) {
    if (this._showInputs === value) {
      return;
    }

    this._showInputs = value;
    this.storageService.setShowInputs(value);

    if (!value) {
      this.calculated = false;
      setTimeout(() => {
        this.runCalculateMethods();
      });
    }
  }

  public get showInputs(): boolean {
    return this._showInputs;
  }

  public set eatsNoMeat(value: boolean) {
    if (this._eatsNoMeat === value) {
      return;
    }

    this._eatsNoMeat = value;
    this.storageService.setEatsNoMeat(value);
  }

  public get eatsNoMeat(): boolean {
    return this._eatsNoMeat;
  }

  private _showInputs: boolean;
  private _eatsNoMeat: boolean;

  constructor(private storageService: StorageService,
              sourceService: SourceService,
              title: CustomTitleService) {
    title.detailTitle = 'Rechner';
    title.description = 'Berechnen Sie, wie Ihr Fleischkonsum die Umwelt belastet';

    // Available meats
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
        waterUsagePerKgWeight: sourceService.litersOfWaterPerKgBeef.value
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
        waterUsagePerKgWeight: sourceService.litersOfWaterPerKgPork.value
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
        waterUsagePerKgWeight: sourceService.litersOfWaterPerKgChickenMeat.value
      }
    ];

    // Load storage saved value
    this._eatsNoMeat = this.storageService.eatsNoMeat();
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      if (this.storageService.showInputs(true)) {
        this._showInputs = true;
      } else {
        this._showInputs = false;
        this.runCalculateMethods();
      }
    });
  }

  private runCalculateMethods() {
    this.calculateControls.forEach((control) => {
      control.calculate();
    });
    this.calculated = true;
  }

  private clearCalculateResults() {
    this.calculateControls.forEach((control) => {
      control.clear();
    });
  }
}
