import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tmsSubmitRow]',
})
export class SubmitRowDirective {
  constructor(
    private readonly elementRef: ElementRef,
    private renderer2: Renderer2
  ) {
    this.renderer2.addClass(this.elementRef.nativeElement, 'pt-5');
  }
}
