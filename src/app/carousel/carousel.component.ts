import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SwipeDirective} from "../swipe/swipe.directive";
import {BannerComponent, BannerData} from "../banner/banner.component";
import {NgForOf, NgIf} from "@angular/common";
import {animate, group, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    SwipeDirective,
    BannerComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './carousel.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':increment', [
        query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition(':decrement', [
        query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
        group([
          query(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('300ms ease-out', style({ transform: 'translateX(100%)' }))], {
            optional: true,
          }),
        ]),
      ]),
    ])
  ]
})

export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides!: BannerData[];
  currentSlide = 0;
  transitionCounter = 0;
  timeoutId = 0;

  ngOnInit() {
   this.automaticSlideChange();
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

  automaticSlideChange() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.showNext()
    }, 10000)
  }

  showNext() {
    this.automaticSlideChange();
    this.currentSlide = this.currentSlide + 1 === this.slides.length ? 0 : this.currentSlide + 1;
    this.transitionCounter++;
  }

  showPrevious() {
    this.automaticSlideChange();
    this.currentSlide = this.currentSlide - 1 === -1 ? this.slides.length - 1 : this.currentSlide - 1;
    this.transitionCounter--;
  }
}
