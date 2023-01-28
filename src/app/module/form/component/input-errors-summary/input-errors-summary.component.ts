import { Component, Input, ViewChild } from '@angular/core';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'tms-input-errors-summary',
  templateUrl: './input-errors-summary.component.html',
})
export class InputErrorsSummaryComponent {
  @Input() invalidInputComponents: InputComponent[];

  @ViewChild(FormErrorsComponent)
  private formErrorsComponent: FormErrorsComponent;

  focus() {
    this.formErrorsComponent.focus();
  }

  focusOnInputErrors(inputComponent: InputComponent) {
    inputComponent.focusOnErrors();
  }
}
