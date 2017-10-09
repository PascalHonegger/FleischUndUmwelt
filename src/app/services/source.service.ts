import { Fact } from './../model/Fact';
import { ISource } from './../model/ISource';
import { Injectable } from '@angular/core';

// tslint:disable:max-line-length

@Injectable()
export class SourceService {
    public meatIndustryDeforestation = new Fact(
        550000000000,
        (val) => `Aufgrund der Viehwirtschaft wurden ${val * this.tenToThePower(-9)} Milliarden m² Regenwald gerodeter`
    );

    //#region Meat per portion
    public amountOfMeatPerSmallPortion = new Fact(
        0.150,
        (val) => `Eine kleine Portion Fleisch umfasst ~${val * this.tenToThePower(3)}g`
    );
    public amountOfMeatPerLargePortion = new Fact(
        0.200,
        (val) => `Eine grosse Portion Fleisch umfasst ~${val * this.tenToThePower(3)}g`
    );

    public amountOfWingedMeatPerSmallPortion = new Fact(
        0.120,
        (val) => `Eine kleine Portion Geflügelfleisch umfasst ~${val * this.tenToThePower(3)}g`
    );
    public amountOfWingedMeatPerLargePortion = new Fact(
        0.150,
        (val) => `Eine grosse Portion Schweinefleisch umfasst ~${val * this.tenToThePower(3)}g`
    );

    public amountOfFishPerPortion = new Fact(
        0.200,
        (val) => `Ein Fischfilet umfasst ~${val * this.tenToThePower(3)}g`
    );
    //#endregion

    //#region Meat per animal
    public amountOfBeefPerCow = new Fact(
        10,
        (val) => `Eine Kuh liefert ~${val}kg Rindfleisch`
    );

    public amountOfVealPerCalf = new Fact(
        10,
        (val) => `Ein Kalb liefert ~${val}kg Kalbfleisch`
    );

    public amountOfChickenMeatPerChicken = new Fact(
        0.600,
        (val) => `Ein Hähnchen liefert ~${val * this.tenToThePower(3)}g Hähnchenfleisch`
    );

    public amountOfPorkPerPig = new Fact(
        1.5,
        (val) => `Ein Schwein liefert ~${val}kg Schweinefleisch`
    );
    //#endregion

    public sources: ISource[] = [
        {
            title: 'Cowspiracy: The Sustainability Secret',
            url: 'https://static1.squarespace.com/static/544dc5a1e4b07e8995e3effa/t/54e4d927e4b0aaf066abfcf0/1424283943008/Cowspiracy-Infographic-Metric.png',
            description: 'Ein Dokumentarfilm aus dem jahre 2014, welcher sich mit dem Einfluss der Fleischindustrie auf die Umwelt beschäftigt',
            facts: [
                 this.meatIndustryDeforestation
             ]
        },
        {
            title: 'kochenOHNE',
            url: 'https://www.kochenohne.de/ratgeber/portionsgroessen-tabelle/',
            description: 'Ein spezielles Rezeptportal für Menschen mit Lebensmittelunverträglicheiten und -allergien',
            facts: [
                 this.amountOfMeatPerSmallPortion,
                 this.amountOfMeatPerLargePortion,
                 this.amountOfWingedMeatPerSmallPortion,
                 this.amountOfWingedMeatPerLargePortion,
                 this.amountOfFishPerPortion
             ]
        },
        {
            title: 'Pascals Gehirn',
            url: null,
            description: 'Aus der Luft gegriffene Zahlen, welche noch recherchiert werden müssen',
            facts: [
                 this.amountOfBeefPerCow,
                 this.amountOfVealPerCalf,
                 this.amountOfChickenMeatPerChicken,
                 this.amountOfPorkPerPig
             ]
        }
    ];

    private tenToThePower(exponential: number) {
        return Math.pow(10, exponential);
    }
}
