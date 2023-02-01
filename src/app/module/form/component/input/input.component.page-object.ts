import { PageObject } from '@app/test';
import {
  InputComponent,
  InputErrorsComponent,
  LabelComponent,
} from '../../component';

export class ComponentPageObject extends PageObject<InputComponent> {
  getInputErrorsComponentInstance() {
    return this.findComponentInstance(InputErrorsComponent);
  }

  getInputField() {
    return this.findElement('input');
  }

  getLabelInstance() {
    return this.findComponentInstance(LabelComponent);
  }

  getLabelText() {
    return this.findElement('tms-label')?.innerText;
  }

  getWarningIcon() {
    const element = this.findElement('tms-icon'); // for some reason, the query 'tms-icon [name="warning"]' does not result in any matches
    if (element && element.getAttribute('name') === 'warning') {
      return element;
    }

    return undefined;
  }

  hasAriaInvalidAttribute() {
    return this.getInputField()?.getAttribute('aria-invalid') === 'true';
  }
}
