import { PageObject } from '@app/test';
import { LabelComponent } from './label.component';

export class ComponentPageObject extends PageObject<LabelComponent> {
  getForAttribute() {
    return this.getLabel()?.getAttribute('for');
  }

  getLabelText() {
    return this.getLabel()?.innerText.trim();
  }

  private getLabel() {
    return this.findElement('label');
  }
}
