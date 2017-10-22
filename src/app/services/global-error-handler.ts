import { Injectable, ErrorHandler, Injector } from '@angular/core';

import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private readonly injector: Injector) {
    }

    public handleError(error: any): void {
        this.injector.get(Angulartics2GoogleAnalytics)
            .exceptionTrack({
                fatal: true,
                description: error.message ? error.message : error.toString()
            });

        throw error;
    }
}
