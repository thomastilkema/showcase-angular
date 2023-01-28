import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorError } from '../../validator';

@Component({
  selector: 'tms-input-errors',
  templateUrl: './input-errors.component.html',
})
export class InputErrorsComponent implements OnInit {
  @Input() control: FormControl;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit() {
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');
  }

  focus() {
    this.elementRef.nativeElement.focus();
  }

  getFirstValidityMessage() {
    return this.getValidityMessages()[0];
  }

  getValidityMessages() {
    return [
      this.getInvalidEmailMessage(),
      this.getIsRequiredMessage(),
      this.getMinLentghtMessage(),
      this.getUserAlreadyExistsMessage(),
      this.getValuesUnequalMessage(),
    ].filter(Boolean) as string[];
  }

  hasOneValidityMessage() {
    return this.getValidityMessages().length === 1;
  }

  private getIsRequiredMessage() {
    return this.hasError('required')
      ? 'This field is empty but must be filled in since it is required'
      : undefined;
  }

  private getInvalidEmailMessage() {
    return this.hasError('email')
      ? 'Provide a valid email address (like "name@example.com")'
      : undefined;
  }

  private getMinLentghtMessage() {
    const errorKey = 'minlength';
    if (!this.hasError(errorKey)) {
      return undefined;
    }

    const error = this.control.getError(errorKey);
    const charactersTooLittle = error.requiredLength - error.actualLength;
    return `Provide at least ${charactersTooLittle} more character${
      charactersTooLittle === 1 ? '' : 's'
    } as it should have a minimum of ${error.requiredLength} character${
      error.requiredLength === 1 ? '' : 's'
    }`;
  }

  private getUserAlreadyExistsMessage() {
    return this.hasError(ValidatorError.UserWithEmailAddressExists)
      ? 'Provide another email address since there already is a user with this email address'
      : undefined;
  }

  private getValuesUnequalMessage() {
    return this.hasError(ValidatorError.ValuesNotEqual)
      ? 'Make this password equal to the one above'
      : undefined;
  }

  private hasError(errorKey: string) {
    return this.control.hasError(errorKey);
  }
}
