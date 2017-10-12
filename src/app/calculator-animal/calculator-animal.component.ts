import { AnimalImage } from './../model/animal-image.model';
import { Component, Input } from '@angular/core';

import { MeatType } from './../model/meat-type.model';

@Component({
  selector: 'calculator-animal',
  styleUrls: ['./calculator-animal.component.css'],
  templateUrl: './calculator-animal.component.html'
})
export class CalculatorAnimalComponent {
  @Input() public meatType: MeatType;

  public get effectiveKilledAnimalsPerYear(): number {
    return this.killedAnimalsPerYear(this.meatType.effectiveConsumtionPerWeek);
  }

  public get averageKilledAnimalsPerYear(): number {
    return this.killedAnimalsPerYear(this.meatType.averageConsumtionPerWeek);
  }

  public imageBaseSize: number = 50;

  private readonly weeksPerYear: number = 365 / 7;

  public animalImages(amountOfAnimals: number): AnimalImage[] {
    const result: AnimalImage[] = [];
    // tslint:disable-next-line:max-line-length
    const imagePath = 'https://vignette.wikia.nocookie.net/hayday/images/4/47/Kuh.png/revision/latest?cb=20150703221620&path-prefix=de';

    const fullAnimalImage: AnimalImage = {
      imagePath,
      relativeWidth: 100
    };

    for (let i = 0; i < Math.floor(amountOfAnimals); i++) {
        result.push(fullAnimalImage);
    }

    const overflow = amountOfAnimals % 1;

    if (amountOfAnimals > 0) {
      const partialAnimalImage: AnimalImage = {
        imagePath,
        relativeWidth: overflow * 100
      };

      result.push(partialAnimalImage);
    }

    return result;
  }

  private killedAnimalsPerYear(consumtionPerWeek: number): number {
    return (consumtionPerWeek * this.weeksPerYear) / this.meatType.kgPerAnimal;
  }
}
