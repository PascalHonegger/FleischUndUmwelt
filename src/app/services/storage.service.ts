import { Injectable } from '@angular/core';

import { Fact } from './../model/fact.model';
import { Source } from './../model/source.model';

@Injectable()
export class StorageService {
    private readonly gramPerWeekKey = 'kgPerWeek';
    private readonly advancedModeKey = 'advancedMode';
    private readonly eatsNoMeatKey = 'eatsNoMeat';
    private readonly showInputsKey = 'showInputs';

    public eatsNoMeat(): boolean {
        return this.getBoolean(this.eatsNoMeatKey, false);
    }
    public setEatsNoMeat(value: boolean) {
        return localStorage.setItem(this.eatsNoMeatKey, value.toString());
    }

    public showInputs(fallback: boolean): boolean {
        return this.getBoolean(this.showInputsKey, fallback);
    }
    public setShowInputs(value: boolean) {
        return localStorage.setItem(this.showInputsKey, value.toString());
    }

    public consumtionPerWeek(meatName: string, fallback: number): number {
        return this.getNumber(this.consumtionPerWeekKey(meatName), fallback);
    }
    public setConsumtionPerWeek(meatName: string, value: number) {
        return localStorage.setItem(this.consumtionPerWeekKey(meatName), value.toString());
    }

    public consumtionIsAdvanced(meatName: string, fallback: boolean): boolean {
        return this.getBoolean(this.consumtionIsAdvancedKey(meatName), fallback);
    }
    public setConsumtionIsAdvanced(meatName: string, value: boolean) {
        return localStorage.setItem(this.consumtionIsAdvancedKey(meatName), value.toString());
    }

    private consumtionPerWeekKey(meatName: string): string {
        return `consumtion:${meatName}:${this.gramPerWeekKey}`;
    }

    private consumtionIsAdvancedKey(meatName: string): string {
        return `consumtion:${meatName}:${this.advancedModeKey}`;
    }

    private getNumber(key: string, fallback: number): number | undefined {
        const item = localStorage.getItem(key);
        if (item) {
            const parsedNumber = parseFloat(item);
            if (isNaN(parsedNumber)) {
                return fallback;
            } else {
                return parsedNumber;
            }
        } else {
            return fallback;
        }
    }

    private getBoolean(key: string, fallback: boolean): boolean | undefined {
        const item = localStorage.getItem(key);
        switch (item) {
            case true.toString():
                return true;
            case false.toString():
                return false;
            default:
                return fallback;
        }
    }
}
