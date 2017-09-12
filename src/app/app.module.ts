import { AdsenseModule } from 'ng2-adsense';
import { CookieLawModule } from 'angular2-cookie-law';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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

// Material 2
import {
  MdSidenavModule,
  MdIconModule,
  MdButtonModule,
  MdListModule,
  MdToolbarModule
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
    CookieLawModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    MdListModule,
    MdToolbarModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS
  ]
})
export class AppModule {

}
