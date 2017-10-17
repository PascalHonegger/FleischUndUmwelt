import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { StorageService } from './../services/storage.service';

const maxPortionsPerWeek: number = 20;

@Component({
  selector: 'meat-consumtion',
  styleUrls: ['./meat-consumtion.component.css'],
  templateUrl: './meat-consumtion.component.html'
})
export class MeatConsumtionComponent implements OnInit {
  @Input() public meatName: string;
  @Input() public gramPerPortion: number;
  @Input() public defaultInKg: number;

  public set advancedMode(value: boolean) {
    if (this._advancedMode === value) {
      return;
    }

    if (!value) {
      // We switched from advanced to simple mode
      this.setBasicBasedOnAdvanced();
    }

    this._advancedMode = value;
    this.storageService.setConsumtionIsAdvanced(this.meatName, value);
  }

  public get advancedMode(): boolean {
    return this._advancedMode;
  }

  public set mealsContainingMeat(value: number) {
    this._mealsContainingMeat = value;

    this.setAdvancedBasedOnBasic();
  }

  public get mealsContainingMeat(): number {
    return this._mealsContainingMeat;
  }

  public set effectiveGramPerWeek(value: number) {
    if (value === this._effectiveGramPerWeek) {
      return;
    }
    this._effectiveGramPerWeek = value;
    this.storageService.setConsumtionPerWeek(this.meatName, value / 1000);
  }

  public get effectiveGramPerWeek(): number {
    return this._effectiveGramPerWeek;
  }

  public gramFormControl = new FormControl(0);

  private _effectiveGramPerWeek: number = 0;
  private _mealsContainingMeat: number = 0;
  private _advancedMode: boolean = false;

  constructor(private readonly storageService: StorageService) {
    this.gramFormControl.valueChanges.subscribe((val) => {
      if (!this.gramFormControl.invalid && !isNaN(val)) {
        this.effectiveGramPerWeek = val;
      }
    });
  }

  public ngOnInit() {
    this.gramFormControl.setValidators([
      Validators.required,
      Validators.pattern('\\d*'),
      Validators.max(maxPortionsPerWeek * this.gramPerPortion)]);

    const consumtionInKg = this.storageService.consumtionPerWeek(this.meatName, this.defaultInKg);
    this.gramFormControl.setValue(consumtionInKg * 1000);

    if (this.storageService.consumtionIsAdvanced(this.meatName, false)) {
      this._advancedMode = true;
    } else {
      this._advancedMode = false;
      this.setBasicBasedOnAdvanced();
    }
  }

  private setBasicBasedOnAdvanced() {
    this.mealsContainingMeat = Math.round(this.effectiveGramPerWeek / this.gramPerPortion);
  }

  private setAdvancedBasedOnBasic() {
    this.gramFormControl.setValue(this.mealsContainingMeat * this.gramPerPortion);
  }
}
