import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomTitleService {
    // TODO Kürzer damit lesbarer? private static baseTitle: string = 'Fleisch&U';
    private static baseTitle: string = 'Fleisch und Umwelt';

    public description: string;
    private _detailTitle: string;

    constructor(private readonly browserTitle: Title) {
    }

    public set detailTitle(detailText: string) {
        this._detailTitle = detailText;

        this.browserTitle.setTitle(CustomTitleService.baseTitle + ' - ' + detailText);
    }
    public get detailTitle(): string {
        return this._detailTitle;
    }
}
