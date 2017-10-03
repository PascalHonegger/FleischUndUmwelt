import { AdsenseModule } from 'ng2-adsense';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { FactsComponent } from './facts';
import { AboutComponent } from './about';
import { CalculatorComponent } from './calculator';
import { NoContentComponent } from './no-content';

// Services
import { CustomTitleService } from './services/custom-title-service';

// Material 2
import {
  MATERIAL_COMPATIBILITY_MODE,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatSliderModule,
  MatRadioModule,
  MatTabsModule
} from '@angular/material';
import 'hammerjs';

import '../styles/styles.scss';
import '../styles/headings.css';

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
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-5587044720123310'
    }),
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSliderModule,
    MatRadioModule,
    FlexLayoutModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    CustomTitleService,
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ]
})
export class AppModule {

}
