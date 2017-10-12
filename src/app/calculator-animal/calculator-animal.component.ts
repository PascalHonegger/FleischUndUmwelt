import { Component, Input } from '@angular/core';

import { CalculateControl } from './../calculator/calculate-control';
import { MeatType } from './../model/meat-type.model';
import { StorageService } from './../services/storage.service';
import { AnimalImage } from './../model/animal-image.model';

@Component({
  selector: 'calculator-animal',
  styleUrls: ['./calculator-animal.component.css'],
  templateUrl: './calculator-animal.component.html'
})
export class CalculatorAnimalComponent implements CalculateControl {
  @Input() public meatType: MeatType;

  public calculated: boolean = false;

  public effectiveConsumtionPerWeek: number;

  public effectiveKilledAnimalsPerYear: number;
  public averageKilledAnimalsPerYear: number;

  public animalImages: AnimalImage[];
  public imageBaseSize: number = 50;

  public readonly weeksPerYear: number = 365 / 7;

  constructor(private storageService: StorageService) {
  }

  public clear(): void {
    this.calculated = false;
  }

  public calculate(): void {
    const averageConsumtion = this.meatType.averageConsumtionPerWeek;

    this.effectiveConsumtionPerWeek =
      this.storageService.consumtionPerWeek(this.meatType.meatName, averageConsumtion);

    this.effectiveKilledAnimalsPerYear = this.killedAnimalsPerYear(this.effectiveConsumtionPerWeek);
    this.averageKilledAnimalsPerYear = this.killedAnimalsPerYear(averageConsumtion);

    this.animalImages = this.calculateAnimalImages(this.effectiveKilledAnimalsPerYear);

    this.calculated = true;
  }

  private calculateAnimalImages(amountOfAnimals: number): AnimalImage[] {
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
