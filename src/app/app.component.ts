import {Component, OnInit} from '@angular/core';
import {BannerComponent, BannerData} from "./banner/banner.component";
import {CarouselComponent} from "./carousel/carousel.component";
import {ApiService} from "./api/api.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BannerComponent, CarouselComponent, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  bannersData: BannerData[] | null = null;

  constructor(private readonly apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getBanners().subscribe(data => {
      this.bannersData = data.banners;
    });
  }
}
