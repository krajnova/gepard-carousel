import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

type BannerData = {
  title: string;
  description: string;
  backgroundPath: string;
  imagePath: string;
  linkText: string;
  url: string;
  highlightText: string;
}
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input() bannerData!: BannerData;

  public get textWithHighlight() {
    const chunks = this.bannerData.description.split(this.bannerData.highlightText);

    return chunks.join(`<span class="highlight">${this.bannerData.highlightText}</span>`)
  }
}
