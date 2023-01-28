import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { uniqueId } from 'lodash';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
  selector: 'tms-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  id = uniqueId('input-');

  @Input() control: AbstractControl;
  @Input() label: string;
  @Input() type: 'email' | 'password' | 'text' = 'text';

  @ViewChild(InputErrorsComponent)
  private inputErrorsComponent: InputErrorsComponent;

  focusOnErrors() {
    this.inputErrorsComponent.focus();
  }

  getControl() {
    return this.control as FormControl;
  }

  shouldDisplayInputErrors() {
    return this.control.invalid && this.control.dirty;
  }
}
