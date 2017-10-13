import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { FillableImage } from './../model/fillable-image.model';

@Component({
  selector: 'fillable-image-display',
  styleUrls: ['./fillable-image-display.component.css'],
  templateUrl: './fillable-image-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillableImageDisplayComponent {
  @Input() public imageWidth: number;
  @Input() public imageHeight: number;
  @Input() public amountOfImages: number;
  @Input() public imageName: string;

  public get fillableImages(): FillableImage[] {
    const result: FillableImage[] = [];
    const imagePath = `/assets/img/${this.imageName}.png`;
    const outlineImagePath = `/assets/img/${this.imageName}-outline.png`;

    const fullAnimalImage: FillableImage = {
      imagePath,
      outlineImagePath,
      relativeWidth: 100
    };

    for (let i = 0; i < Math.floor(this.amountOfImages); i++) {
        result.push(fullAnimalImage);
    }

    const overflow = this.amountOfImages % 1;

    if (this.amountOfImages > 0) {
      const partialAnimalImage: FillableImage = {
        imagePath,
        outlineImagePath,
        relativeWidth: overflow * 100
      };

      result.push(partialAnimalImage);
    }

    return result;
  }
}
