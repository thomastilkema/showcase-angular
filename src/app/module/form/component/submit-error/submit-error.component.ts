import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-submit-error',
  templateUrl: './submit-error.component.html',
})
export class SubmitErrorComponent {
  @ViewChild(FormErrorsComponent)
  private formErrorsComponent: FormErrorsComponent;

  focus() {
    this.formErrorsComponent.focus();
  }
}
