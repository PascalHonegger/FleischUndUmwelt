import { Fact } from './../model/Fact';
import { IFact } from './../model/IFact';
import { ISource } from './../model/ISource';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

// tslint:disable:max-line-length

@Injectable()
export class SourceService {
    public meatIndustryDeforestation: IFact = new Fact(
        550000000000,
        (val) => `Aufgrund der Viehwirtschaft wurden ${val * this.tenToThePower(-9)} Milliarden m² Regenwald gerodeter`
    );

    public sources: ISource[] = [
        {
            title: 'Cowspiracy: The Sustainability Secret',
            url: 'https://static1.squarespace.com/static/544dc5a1e4b07e8995e3effa/t/54e4d927e4b0aaf066abfcf0/1424283943008/Cowspiracy-Infographic-Metric.png',
            description: 'Ein Dokumentarfilm aus dem jahre 2014, welcher sich mit dem Einfluss der Fleischindustrie auf die Umwelt beschäftigt',
            facts: [
                 this.meatIndustryDeforestation
             ]
        }
    ];

    private tenToThePower(exponential: number) {
        return Math.pow(10, exponential);
    }
}
