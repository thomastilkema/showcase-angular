import { PageObject } from '@app/test';
import { InputErrorsSummaryComponent } from './input-errors-summary.component';

export class ComponentPageObject extends PageObject<InputErrorsSummaryComponent> {
  getContent() {
    return this.getInnerTextOf(this.spectator.element);
  }

  getErrorButtons() {
    return this.findElements('button');
  }
}
