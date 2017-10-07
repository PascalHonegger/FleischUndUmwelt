import { Routes } from '@angular/router';
import { FactsComponent } from './facts/facts.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AboutComponent } from './about/about.component';
import { NoContentComponent } from './no-content/no-content.component';

export const ROUTES: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'facts', component: FactsComponent },
  { path: 'impressum', component: AboutComponent },
  { path: '**', component: NoContentComponent }
];
