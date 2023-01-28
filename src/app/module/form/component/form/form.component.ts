import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { waitFor } from '@app/core';
import { Observable, take } from 'rxjs';
import { markAllAsDirty } from '../../helper';
import { InputErrorsSummaryComponent } from '../input-errors-summary/input-errors-summary.component';
import { InputComponent } from '../input/input.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { SubmitErrorComponent } from '../submit-error/submit-error.component';

@Component({
  selector: 'tms-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  isPending = false;
  shouldDisplayInputErrorsSummary = false;
  shouldDisplaySubmitErrors = false;

  @ContentChild(SubmitErrorComponent)
  private submitErrorComponent: SubmitErrorComponent;

  @ContentChildren(InputComponent, { descendants: true })
  private inputComponents: QueryList<InputComponent>;

  @ContentChild(SubmitButtonComponent, { descendants: true })
  private submitButtonComponent: SubmitButtonComponent;

  @Input() formGroup: FormGroup;
  @Input() submitRequest$: Observable<unknown>;

  @Output() submitEvent = new EventEmitter();
  @Output() submitErrorEvent = new EventEmitter();
  @Output() submitSuccessEvent = new EventEmitter();

  @ViewChild(InputErrorsSummaryComponent)
  private inputErrorsSummaryComponent: InputErrorsSummaryComponent;

  getInvalidInputComponents() {
    return this.inputComponents.filter(
      (inputComponent) => inputComponent.control.invalid
    );
  }

  onSubmit() {
    if (this.isPending) {
      return;
    }

    /*
     * We need this not-so-pretty trick because form fields have `{ updateOn: 'blur' }`. When this sbumission was triggered whith pressing
     * the Enter button with one of the fields still having focus, then values and validity of the form are not yet up to date.
     *
     * We use this instead of `formGroup.updateValueAndValidity()` since that function needs some time for the validity to become up to
     * date.
     */
    this.focusOnSubmitButton();

    markAllAsDirty(this.formGroup);
    this.shouldDisplayInputErrorsSummary = true;
    this.shouldDisplaySubmitErrors = false;
    this.submitEvent.emit(this.formGroup.value);

    if (this.formGroup.valid) {
      this.executeSubmitRequest();
      return;
    }

    this.focusOnErrors(() => this.inputErrorsSummaryComponent);
  }

  private executeSubmitRequest() {
    this.isPending = true;

    this.submitRequest$.pipe(take(1)).subscribe({
      next: (response) => {
        this.isPending = false;
        this.submitSuccessEvent.emit(response);
      },
      error: (error) => {
        this.shouldDisplaySubmitErrors = true;
        this.isPending = false;
        this.submitErrorEvent.emit(error);
        this.focusOnErrors(() => this.submitErrorComponent);
      },
    });
  }

  private focusOnErrors(
    getComponent: () =>
      | InputErrorsSummaryComponent
      | SubmitErrorComponent
      | null
  ) {
    waitFor(
      () => getComponent(),
      () => {
        const component = getComponent();
        component?.focus();
      }
    );
  }

  private focusOnSubmitButton() {
    if (this.submitButtonComponent) {
      this.submitButtonComponent.focus();
    }
  }
}
