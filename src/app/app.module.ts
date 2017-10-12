import { AdsenseModule } from 'ng2-adsense';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { FactsComponent } from './facts/facts.component';
import { AboutComponent } from './about/about.component';
import { CalculatorComponent } from './calculator/calculator.component';
import {
  CalculatorAnimalComponent
} from './calculator-animal/calculator-animal.component';
import { MeatConsumtionComponent } from './meat-consumtion/meat-consumtion.component';
import { NoContentComponent } from './no-content/no-content.component';

// Services
import { CustomTitleService } from './services/custom-title.service';
import { SourceService } from './services/source.service';
import { StorageService } from './services/storage.service';

// Material 2
import {
  MatButtonModule,
  MatToolbarModule,
  MatSliderModule,
  MatRadioModule,
  MatTableModule,
  MatInputModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatCardModule
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
    FactsComponent,
    NoContentComponent,
    MeatConsumtionComponent,
    CalculatorAnimalComponent
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
    AdsenseModule.forRoot({
      adClient: 'ca-pub-5587044720123310'
    }),
    MatButtonModule,
    MatToolbarModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatCardModule,
    FlexLayoutModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    Title,
    CustomTitleService,
    SourceService,
    StorageService,
    { provide: LOCALE_ID, useValue: 'de-CH' }
  ]
})
export class AppModule {

}
