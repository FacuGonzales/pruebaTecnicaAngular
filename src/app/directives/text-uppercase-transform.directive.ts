import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextUppercaseTransform]',
  standalone: true
})
export class TextUppercaseTransformDirective {

  constructor(private element: ElementRef) { }

  @HostListener('input') OnInput() {
    const input: HTMLInputElement = this.element.nativeElement;
    input.value = input.value.toUpperCase();
  }
}
