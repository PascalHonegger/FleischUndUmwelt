import { Injectable } from '@angular/core';

import { Fact } from './../model/fact.model';
import { Source } from './../model/source.model';

// tslint:disable:max-line-length

@Injectable()
export class SourceService {
    //#region Natural ressource Land
    public meatIndustryDeforestation = new Fact(
        550000000000,
        (val) => `Aufgrund der Viehwirtschaft wurden ${val * this.tenToThePower(-9)} Milliarden m² Regenwald gerodeter`
    );
    //#endregion

    //#region Meat per portion
    public kgOfMeatPerPortion = new Fact(
        0.200,
        (val) => `Eine Portion Fleisch umfasst ${val * this.tenToThePower(3)}g`
    );
    public kgOfWingedMeatPerPortion = new Fact(
        0.150,
        (val) => `Eine Portion Geflügelfleisch umfasst ${val * this.tenToThePower(3)}g`
    );
    public kgOfFishPerPortion = new Fact(
        0.200,
        (val) => `Ein Fischfilet umfasst ${val * this.tenToThePower(3)}g`
    );
    //#endregion

    //#region Water per meat
    public litersOfWaterPerKgBeef = new Fact(
        15415,
        (val) => `Ein Kg Rindfleisch verbraucht bei der Erzeugung ${val} Liter Wasser`
    );
    public litersOfWaterPerKgPork = new Fact(
        5988,
        (val) => `Ein Kg Schweinefleisch verbraucht bei der Erzeugung ${val} Liter Wasser`
    );
    public litersOfWaterPerKgChickenMeat = new Fact(
        4325,
        (val) => `Ein Kg Pouletfleisch verbraucht bei der Erzeugung ${val} Liter Wasser`
    );
    //#endregion

    //#region Land per meat
    public landUsedPerKgBeef = new Fact(
        33,
        (val) => `Ein Kg Rindfleisch verbraucht bei der Erzeugung ${val}m² Land (Tierhaltung & Nahrung für die Tiere)`
    );
    public landUsedPerKgPork = new Fact(
        9,
        (val) => `Ein Kg Schweinefleisch verbraucht bei der Erzeugung ${val}m² Land (Tierhaltung & Nahrung für die Tiere)`
    );
    public landUsedPerKgChickenMeat = new Fact(
        9,
        (val) => `Ein Kg Pouletfleisch verbraucht bei der Erzeugung ${val}m² Land (Tierhaltung & Nahrung für die Tiere)`
    );
    //#endregion

    //#region Meat per animal
    public kgOfBeefPerCow = new Fact(
        515,
        (val) => `Eine Rind liefert ${val}kg Rindfleisch`
    );
    public kgOfPorkPerPig = new Fact(
        100,
        (val) => `Ein Schwein liefert ${val}kg Schweinefleisch`
    );
    public kgOfChickenMeatPerChicken = new Fact(
        0.600,
        (val) => `Ein Huhn liefert ${val * this.tenToThePower(3)}g Pouletfleisch`
    );
    //#endregion

    //#region Meat per person
    public kgOfBeefPerPersonPerWeek = new Fact(
        0.250,
        (val) => `Ein Deutscher verzehrt pro Woche ${val * this.tenToThePower(3)}g Rindfleisch`
    );
    public kgOfPorkPerPersonPerWeek = new Fact(
        1.015,
        (val) => `Ein Deutscher verzehrt pro Woche ${val}kg Schweinefleisch`
    );
    public kgOfChickenMeatPerPersonPerWeek = new Fact(
        0.373,
        (val) => `Eine Deutscher verzehrt pro Woche ${val * this.tenToThePower(3)}g Pouletfleisch`
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

    //#region
    public tennisFieldArea = new Fact(
        261,
        (val) => `Ein Tennisplatz (Doppelspiel) hat eine Fläche von ${val}m²`
    );
    //#endregion

    //#region Car industry
    public metersDrivenPerYear = new Fact(
        13469000,
        (val) => `Ein Personenwagen in der Schweiz legt durchschnittlich ${val * this.tenToThePower(-3)} Kilometer pro Jahr zurück`
    );
    public kgCo2PerMeter = new Fact(
        0.00013,
        (val) => `In der Schweiz zugelassene Personnenwagen erreichen durchschnittlich ${val * this.tenToThePower(6)} Gramm CO₂ pro Kilometer`
    );
    //#endregion

    public sources: Source[] = [
        {
            title: 'Cowspiracy: The Sustainability Secret',
            url: 'https://static1.squarespace.com/static/544dc5a1e4b07e8995e3effa/t/54e4d927e4b0aaf066abfcf0/1424283943008/Cowspiracy-Infographic-Metric.png',
            description: 'Ein Dokumentarfilm (2014), welcher sich mit dem Einfluss der Fleischindustrie auf die Umwelt beschäftigt',
            facts: [
                 this.meatIndustryDeforestation
             ]
        },
        {
            title: 'kochenOHNE',
            url: 'https://www.kochenohne.de/ratgeber/portionsgroessen-tabelle/',
            description: 'Ein Rezeptportal für Menschen mit Allergien',
            facts: [
                 this.kgOfMeatPerPortion,
                 this.kgOfWingedMeatPerPortion,
                 this.kgOfFishPerPortion
             ]
        },
        {
            title: 'Lebensmittellexikon',
            url: 'https://www.lebensmittellexikon.de/',
            description: 'Ein Nachschlagewerk im deutschsprachigen Raum mit Begriffen zu alltäglichen und exotischen Lebensmitteln',
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
                 this.litersOfWaterPerKgBeef,
                 this.litersOfWaterPerKgPork,
                 this.litersOfWaterPerKgChickenMeat,
                 this.landUsedPerKgBeef,
                 this.landUsedPerKgPork,
                 this.landUsedPerKgChickenMeat,
                 this.kgCo2PerPerKgBeef,
                 this.kgCo2PerPerKgPork,
                 this.kgCo2PerPerKgChickenMeat,
                 this.kgOfBeefPerPersonPerWeek,
                 this.kgOfPorkPerPersonPerWeek,
                 this.kgOfChickenMeatPerPersonPerWeek
             ]
        },
        {
            title: 'Swissveg',
            url: 'https://www.swissveg.ch/umwelt',
            description: 'Ein Nachschlagewerk im deutschsprachigen Raum mit Begriffen zu alltäglichen und exotischen Lebensmitteln',
            facts: [
                this.kgOfBeefPerCow,
                this.kgOfPorkPerPig
             ]
        },
        {
            title: 'NZZ',
            url: 'https://www.nzz.ch/newzzD5GEZYDI-12-1.419614',
            description: 'Neue Zürcher Zeitung',
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
            title: 'Pascals Gehirn',
            url: null,
            description: 'Aus der Luft gegriffene oder schnell zusammengesuchte Zahlen, welche noch recherchiert werden müssen',
            facts: [
                 this.kgOfChickenMeatPerChicken
             ]
        }
    ];

    private tenToThePower(exponential: number) {
        return Math.pow(10, exponential);
    }
}
