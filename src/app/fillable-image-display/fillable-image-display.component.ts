import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fillable-image-display',
  styleUrls: ['./fillable-image-display.component.css'],
  templateUrl: './fillable-image-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillableImageDisplayComponent {
  @Input() public imageWidth: number;
  @Input() public imageHeight: number;
  @Input() public describingTitle: number;

  @Input()
  public set amountOfImages(value: number) {
    this.arrayWithLength = new Array(Math.floor(value));

    const overflow = value % 1;

    this.partialImageWidth = overflow > 0.009 ? overflow * 100 : null;
    this.fullAmountOfImages = value;
  }

  @Input() public set imageName(value: string) {
    this.imagePath = `/assets/img/${value}.png`;
    this.outlineImagePath = `/assets/img/${value}-outline.png`;
  }

  public imagePath: string;
  public outlineImagePath: string;
  public fullAmountOfImages: number;

  public arrayWithLength: void[];
  public partialImageWidth: number | null;
}
