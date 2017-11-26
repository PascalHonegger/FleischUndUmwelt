import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-ch';

registerLocaleData(localeDeCh);

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';

// Different sites
import { FactsComponent } from './facts/facts.component';
import { AboutComponent } from './about/about.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorResultComponent } from './calculator-result/calculator-result.component';

// Others
import { MeatConsumtionComponent } from './meat-consumtion/meat-consumtion.component';
import {
  FillableImageDisplayComponent
} from './fillable-image-display/fillable-image-display.component';

// Sub-Calculators
import {
  CalculatorAnimalComponent
} from './calculator-animal/calculator-animal.component';
import {
  CalculatorGreenhouseGasesComponent
} from './calculator-greenhouse-gases/calculator-greenhouse-gases.component';
import {
  CalculatorLandUsageComponent
} from './calculator-land-usage/calculator-land-usage.component';
import {
  CalculatorWaterUsageComponent
} from './calculator-water-usage/calculator-water-usage.component';

// 404 not found page
import { NoContentComponent } from './no-content/no-content.component';

// Services
import { CustomTitleService } from './services/custom-title.service';
import { SourceService } from './services/source.service';
import { StorageService } from './services/storage.service';
import { CalculationService } from './services/calculation.service';
import { GlobalErrorHandler } from './services/global-error-handler';

// Google Analytics
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

// Material 2
import {
  MatButtonModule,
  MatToolbarModule,
  MatSliderModule,
  MatTableModule,
  MatInputModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatCardModule,
  MatProgressBarModule,
  MatSelectModule,
  MatChipsModule
} from '@angular/material';
import 'hammerjs';

import '../styles/styles.scss';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    CalculatorComponent,
    CalculatorResultComponent,
    FactsComponent,
    NoContentComponent,
    MeatConsumtionComponent,
    FillableImageDisplayComponent,
    CalculatorAnimalComponent,
    CalculatorGreenhouseGasesComponent,
    CalculatorLandUsageComponent,
    CalculatorWaterUsageComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    MatButtonModule,
    MatToolbarModule,
    MatSliderModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatChipsModule,
    FlexLayoutModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    Title,
    CustomTitleService,
    SourceService,
    StorageService,
    CalculationService,
    { provide: LOCALE_ID, useValue: 'de-CH' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class AppModule {

}
