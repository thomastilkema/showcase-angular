import { PageObject } from '@app/test';
import { SubmitButtonComponent } from './submit-button.component';

export class ComponentPageObject extends PageObject<SubmitButtonComponent> {
  getButtonText() {
    return this.getButton()?.innerText.trim();
  }

  getButtonType() {
    return this.getButton()?.getAttribute('type');
  }

  hasButtonAttribute(attribute: string) {
    return Boolean(this.getButton()?.hasAttribute(attribute));
  }

  private getButton() {
    return this.findElement<HTMLButtonElement>('button');
  }
}
