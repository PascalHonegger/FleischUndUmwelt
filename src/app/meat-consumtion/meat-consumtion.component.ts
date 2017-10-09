import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const gramPerWeekKey = 'gramPerWeek';
const advancedModeKey = 'advancedMode';

@Component({
  selector: 'meat-consumtion',
  styleUrls: ['./meat-consumtion.component.css'],
  templateUrl: './meat-consumtion.component.html'
})
export class MeatConsumtionComponent implements OnInit {
  @Input() public meatName: string;
  @Input() public gramPerPortion: number;
  @Input() public default: number;
  public readonly maxPortionsPerWeek: number = 21;

  public set advancedMode(value: boolean) {
    if (this._advancedMode === value) {
      return;
    }

    if (!value) {
      // We switched from advanced to simple mode
      this.setBasicBasedOnAdvanced();
    }

    this._advancedMode = value;
    localStorage.setItem(this.storageKey(advancedModeKey), value.toString());
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
    localStorage.setItem(this.storageKey(gramPerWeekKey), value.toString());
    this.effectiveGramPerWeekChange.emit(value);
  }

  public get effectiveGramPerWeek(): number {
    return this._effectiveGramPerWeek;
  }

  @Output()
  public effectiveGramPerWeekChange: EventEmitter<number> = new EventEmitter();

  public gramFormControl = new FormControl(0);

  private _effectiveGramPerWeek: number = 0;
  private _mealsContainingMeat: number = 0;
  private _advancedMode: boolean = false;

  constructor() {
    this.gramFormControl.valueChanges.subscribe((val) => {
      if (!this.gramFormControl.invalid) {
        this.effectiveGramPerWeek = val;
      }
    });
  }

  public ngOnInit() {
    const gramPerWeek = localStorage.getItem(this.storageKey(gramPerWeekKey));
    if (gramPerWeek) {
      const parsedNumber = parseInt(gramPerWeek, 10);
      if (isNaN(parsedNumber)) {
          this.gramFormControl.setValue(this.default);
      } else {
        this.gramFormControl.setValue(parsedNumber);
      }
    } else {
      this.gramFormControl.setValue(this.default);
    }

    if (localStorage.getItem(this.storageKey(advancedModeKey)) === true.toString()) {
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

  private storageKey(subKey: string): string {
    return `consumtion:${this.meatName}:${subKey}`;
  }
}
