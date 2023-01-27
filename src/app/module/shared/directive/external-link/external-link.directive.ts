import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tmsExternalLink]',
})
export class ExternalLinkDirective {
  constructor(
    private readonly elementRef: ElementRef,
    private renderer2: Renderer2
  ) {
    this.renderer2.setAttribute(
      this.elementRef.nativeElement,
      'rel',
      'noreferrer'
    );
    this.renderer2.setAttribute(
      this.elementRef.nativeElement,
      'target',
      '_blank'
    );
  }
}
