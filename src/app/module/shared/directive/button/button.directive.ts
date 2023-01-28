import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tmsButton]',
})
export class ButtonDirective {
  constructor(
    private readonly elementRef: ElementRef,
    private renderer2: Renderer2
  ) {
    [
      'bg-sky-600',
      'hover:bg-sky-700',
      'py-3',
      'px-4',
      'rounded-sm',
      'text-white',
      'transition-colors',
    ].forEach((className) => {
      this.renderer2.addClass(this.elementRef.nativeElement, className);
    });
  }
}
