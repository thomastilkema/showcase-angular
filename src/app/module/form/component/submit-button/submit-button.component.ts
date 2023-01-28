import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-submit-button',
  templateUrl: './submit-button.component.html',
})
export class SubmitButtonComponent {
  @ViewChild('button', { static: true })
  private buttonElement: ElementRef<HTMLButtonElement>;

  focus() {
    this.buttonElement.nativeElement.focus();
  }
}
