import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  styleUrls: ['./calculator.component.css'],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  public mealsContainingMeat: number = 5;
  public meatEaterType: MeatEaterType = 'meat';

  public meatEaterTypes: Array<{ display: string, value: MeatEaterType }> = [
    {
      display: 'Fleischfresser',
      value: 'meat'
    },
    {
      display: 'Vegetarier',
      value: 'vegetarian'
    },
    {
      display: 'Veganer',
      value: 'vegan'
    },
  ];
}

export type MeatEaterType = 'meat' | 'vegetarian' | 'vegan';
