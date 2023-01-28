import { PageObject } from '@app/test';
import { LabelComponent } from './label.component';

export class ComponentPageObject extends PageObject<LabelComponent> {
  getForAttribute() {
    return this.getLabel()?.getAttribute('for');
  }

  getLabelText() {
    return this.getInnerTextOf(this.getLabel());
  }

  private getLabel() {
    return this.findElement('label');
  }
}
