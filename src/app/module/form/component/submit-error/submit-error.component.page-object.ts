import { PageObject } from '@app/test';
import { SubmitErrorComponent } from './submit-error.component';

export class ComponentPageObject extends PageObject<SubmitErrorComponent> {
  getForErrorsContent() {
    return this.findElement('tms-form-errors')?.innerText.trim();
  }
}
