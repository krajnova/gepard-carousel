import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

// implemented using discussion here https://stackoverflow.com/questions/42592156/what-is-the-best-way-to-implement-swipe-navigation-in-angular-2
@Directive({standalone: true, selector: '[swipe]'})
export class SwipeDirective {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  swipeCoordinates = [0, 0];
  swipeTime = new Date().getTime();

  constructor() { }

  @HostListener('touchstart', ['$event']) onSwipeStart($event: TouchEvent) {
    this.onSwipe($event, 'start');
  }

  @HostListener('touchend', ['$event']) onSwipeEnd($event: TouchEvent) {
    this.onSwipe($event, 'end');
  }

  onSwipe(e: TouchEvent, when: string) {
    this.swipe(e, when);
  }

  swipe(e: TouchEvent, when: string): void {
    const coordinates: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoordinates = coordinates;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coordinates[0] - this.swipeCoordinates[0], coordinates[1] - this.swipeCoordinates[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipeDir = direction[0] < 0 ? 'next' : 'previous';
        if (swipeDir === 'next') {
          this.next.emit();
        } else {
          this.previous.emit();
        }
      }
    }
  }
}
