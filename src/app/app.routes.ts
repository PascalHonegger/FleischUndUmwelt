import { Routes } from '@angular/router';
import { FactsComponent } from './facts';
import { CalculatorComponent } from './calculator';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'facts', component: FactsComponent },
  { path: 'impressum', component: AboutComponent },
  { path: '**', component: NoContentComponent }
];
