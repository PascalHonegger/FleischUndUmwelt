import { Injectable } from '@angular/core';

import { Fact } from './../model/fact.model';
import { Source } from './../model/source.model';
import { Constants } from './../model/constants.model';

// tslint:disable:max-line-length

@Injectable()
export class SourceService {
    //#region Meat per portion
    public kgOfMeatPerPortion = new Fact(
        0.200,
        (val) => `Eine Portion Fleisch umfasst ${val * this.tenToThePower(3)}g`
    );
    public kgOfWingedMeatPerPortion = new Fact(
        0.150,
        (val) => `Eine Portion Geflügelfleisch umfasst ${val * this.tenToThePower(3)}g`
    );
    //#endregion

    //#region Water per meat
    public litersOfWaterPerKgBeef = new Fact(
        15400,
        (val) => `Ein Kg Rindfleisch verbraucht bei der Erzeugung ${val} Liter Wasser`
    );
    public litersOfWaterPerKgPork = new Fact(
        6000,
        (val) => `Ein Kg Schweinefleisch verbraucht bei der Erzeugung ${val} Liter Wasser`
    );
    public litersOfWaterPerKgChickenMeat = new Fact(
        4300,
        (val) => `Ein Kg Pouletfleisch verbraucht bei der Erzeugung ${val} Liter Wasser`
    );
    //#endregion

    //#region Land per meat
    public landUsedPerKgBeef = new Fact(
        33.1,
        (val) => `Ein Kg Rindfleisch verbraucht bei der Erzeugung ${val}m² Land (Tierhaltung & Nahrung für die Tiere)`
    );
    public landUsedPerKgPork = new Fact(
        9.1,
        (val) => `Ein Kg Schweinefleisch verbraucht bei der Erzeugung ${val}m² Land (Tierhaltung & Nahrung für die Tiere)`
    );
    public landUsedPerKgChickenMeat = new Fact(
        5.8,
        (val) => `Ein Kg Pouletfleisch verbraucht bei der Erzeugung ${val}m² Land (Tierhaltung & Nahrung für die Tiere)`
    );
    //#endregion

    //#region Meat per animal
    public kgOfBeefPerCow = new Fact(
        256.8,
        (val) => `Eine Rind liefert ${val}kg Rindfleisch`
    );
    public kgOfPorkPerPig = new Fact(
        87.8,
        (val) => `Ein Schwein liefert ${val}kg Schweinefleisch`
    );
    public kgOfChickenMeatPerChicken = new Fact(
        2,
        (val) => `Ein Huhn liefert ${val}kg Pouletfleisch`
    );
    //#endregion

    //#region Meat per person
    public kgOfBeefPerPersonPerWeek = new Fact(
        13.99 / Constants.weeksPerYear,
        (val) => `Ein Schweizer verzehrt pro Woche ${Math.round(val * this.tenToThePower(3))}g Rindfleisch`
    );
    public kgOfPorkPerPersonPerWeek = new Fact(
        22.49 / Constants.weeksPerYear,
        (val) => `Ein Schweizer verzehrt pro Woche ${Math.round(val * this.tenToThePower(3))}g Schweinefleisch`
    );
    public kgOfChickenMeatPerPersonPerWeek = new Fact(
        12.04 / Constants.weeksPerYear,
        (val) => `Eine Schweizer verzehrt pro Woche ${Math.round(val * this.tenToThePower(3))}g Geflügelfleisch`
    );
    //#endregion

    //#region CO2 per meat
    public kgCo2PerPerKgBeef = new Fact(
        13.311,
        (val) => `Ein Kg Rindfleisch erzeugt ${val * this.tenToThePower(3)}g CO₂`
    );
    public kgCo2PerPerKgPork = new Fact(
        3.252,
        (val) => `Ein Kg Schweinefleisch erzeugt ${val * this.tenToThePower(3)}g CO₂`
    );
    public kgCo2PerPerKgChickenMeat = new Fact(
        3.508,
        (val) => `Ein Kg Pouletfleisch erzeugt ${val * this.tenToThePower(3)}g CO₂`
    );
    //#endregion

    //#region Tennis
    public tennisFieldArea = new Fact(
        261,
        (val) => `Ein Tennisplatz (Doppelspiel) hat eine Fläche von ${val}m²`
    );
    //#endregion

    //#region Tennis
    public showerWaterUsagesPerMinute = new Fact(
        12,
        (val) => `Eine Dusche verbraucht pro Minute ${val} Liter`
    );
    //#endregion

    //#region Car industry
    public metersDrivenPerYear = new Fact(
        13469000,
        (val) => `Ein Personenwagen in der Schweiz legt ${val * this.tenToThePower(-3)} Kilometer pro Jahr zurück`
    );
    public kgCo2PerMeter = new Fact(
        0.00013,
        (val) => `In der Schweiz zugelassene Personnenwagen emittieren ${val * this.tenToThePower(6)} Gramm CO₂ pro Kilometer`
    );
    //#endregion

    public sources: Source[] = [
        {
            title: 'kochenOHNE',
            url: 'https://www.kochenohne.de/ratgeber/portionsgroessen-tabelle/',
            description: 'Ein Rezeptportal für Menschen mit Allergien',
            facts: [
                this.kgOfMeatPerPortion,
                this.kgOfWingedMeatPerPortion
            ]
        },
        {
            title: 'Schweizer Bauernverband',
            url: 'https://www.sbv-usp.ch/de/',
            description: 'Dachverband der Schweizer Bäuerinnen und Bauern, welcher die Interessen der Landwirte und Landwirtinnen vertritt',
            facts: [
                this.kgOfBeefPerCow,
                this.kgOfPorkPerPig
            ]
        },
        {
            title: 'blitzrechner',
            url: 'https://www.blitzrechner.de/fleisch',
            description: 'Rechenportal rund um Alltagsfragen',
            facts: [
                this.kgCo2PerPerKgBeef,
                this.kgCo2PerPerKgPork,
                this.kgCo2PerPerKgChickenMeat
            ]
        },
        {
            title: 'Landwirtschaft.ch',
            url: 'https://www.landwirtschaft.ch/',
            description: 'Informationen rund um die Schweizer Landwirtschaft',
            facts: [
                this.kgOfChickenMeatPerChicken
            ]
        },
        {
            title: 'Proviande',
            url: 'https://www.proviande.ch/',
            description: 'Die Branchenorganisation der Schweizer Fleischwirtschaft',
            facts: [
                this.kgOfBeefPerPersonPerWeek,
                this.kgOfPorkPerPersonPerWeek,
                this.kgOfChickenMeatPerPersonPerWeek
            ]
        },
        {
            title: 'Swissveg',
            url: 'https://www.swissveg.ch/umwelt',
            description: 'Die grösste Interessenvertretung vegetarisch und vegan lebender Menschen in der Schweiz',
            facts: [
                this.litersOfWaterPerKgBeef,
                this.litersOfWaterPerKgPork,
                this.litersOfWaterPerKgChickenMeat
            ]
        },
        {
            title: 'DESTATIS',
            url: 'https://www.destatis.de/DE/Publikationen/Thematisch/UmweltoekonomischeGesamtrechnungen/FachberichtFlaechenbelegung5385101109004.pdf?__blob=publicationFile',
            description: 'Statistisches Bundesamt Deutschland',
            facts: [
                this.landUsedPerKgBeef,
                this.landUsedPerKgPork,
                this.landUsedPerKgChickenMeat
            ]
        },
        {
            title: 'Der Bundesrat',
            url: 'https://www.admin.ch/gov/de/start/dokumentation/medienmitteilungen.msg-id-2019.html',
            description: 'Das Portal der Schweizer Regierung',
            facts: [
                this.metersDrivenPerYear
            ]
        },
        {
            title: 'ASTRA',
            url: 'https://www.astra.admin.ch/astra/de/home/fachleute/fahrzeuge/homologation/co2-emissionen-von-personenwagen.html',
            description: 'Bundesamt für Strassen',
            facts: [
                this.kgCo2PerMeter
            ]
        },
        {
            title: 'Swiss Tennis',
            url: 'https://www.swisstennis.ch/play-tennis/allgemein/pl%C3%A4tze-und-infrastruktur',
            description: 'Schweizer Tennisklub',
            facts: [
                this.tennisFieldArea
            ]
        },
        {
            title: 'Saxoboard',
            url: 'https:// www.saxoboard.net/wasserverbrauch-duschen.html',
            description: 'Ein europaweit fertigender Hersteller für bodengleiche Duschsysteme und Wellnessanlagen',
            facts: [
                this.showerWaterUsagesPerMinute
            ]
        }
    ];

    private tenToThePower(exponential: number) {
        return Math.pow(10, exponential);
    }
}
