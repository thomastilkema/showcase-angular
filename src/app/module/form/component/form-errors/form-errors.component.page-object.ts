import { PageObject } from '@app/test';
import { FormErrorsComponent } from './form-errors.component';

export class ComponentPageObject extends PageObject<FormErrorsComponent> {
  getProvidedContent() {
    return this.findElement('tms-alert')?.innerText;
  }
}
