import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { CalculatorComponent } from './calculator';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rechner', component: CalculatorComponent },
  { path: 'impressum', component: AboutComponent },
  { path: '**', component: NoContentComponent },
];
