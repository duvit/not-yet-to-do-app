import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopExpansion]',
})
export class StopExpansion {
  @HostListener('click', ['$event'])
  @HostListener('keydown', ['$event'])
  stop(event: Event) {
    event.stopPropagation();
  }
}
