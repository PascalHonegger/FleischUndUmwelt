import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    private readonly gramPerWeekKey = 'kgPerWeek';
    private readonly advancedModeKey = 'advancedMode';
    private readonly eatsNoMeatKey = 'eatsNoMeat';
    private readonly yearScaleKey = 'yearScale';

    public eatsNoMeat(): boolean {
        return this.getBoolean(this.eatsNoMeatKey, false);
    }
    public setEatsNoMeat(value: boolean) {
        return localStorage.setItem(this.eatsNoMeatKey, value.toString());
    }

    public consumtionPerWeek(meatName: string, fallback: number): number {
        return this.getNumber(this.consumtionPerWeekKey(meatName), fallback);
    }
    public setConsumtionPerWeek(meatName: string, value: number) {
        return localStorage.setItem(this.consumtionPerWeekKey(meatName), value.toString());
    }

    public yearScale(): number {
        return this.getNumber(this.yearScaleKey, 1);
    }
    public setYearScale(value: number) {
        return localStorage.setItem(this.yearScaleKey, value.toString());
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
