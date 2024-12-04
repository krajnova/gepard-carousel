import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BannerData} from "../banner/banner.component";

type BannersResponse = {
  banners: BannerData[];
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  bannersUrl = 'assets/carousel.json'

  constructor(private http: HttpClient) { }

  getBanners() {
    return this.http.get<BannersResponse>(this.bannersUrl);
  }
}
