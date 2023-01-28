import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { waitFor } from '@app/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-form-errors',
  templateUrl: './form-errors.component.html',
})
export class FormErrorsComponent implements OnInit {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit() {
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');
  }

  focus() {
    waitFor(
      () => this.isVisible(),
      () => this.elementRef.nativeElement.focus()
    );
  }

  private isVisible() {
    return this.elementRef.nativeElement.offsetParent !== null;
  }
}
