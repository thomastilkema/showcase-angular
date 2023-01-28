import { PageObject } from '@app/test';
import { InputErrorsSummaryComponent } from './input-errors-summary.component';

export class ComponentPageObject extends PageObject<InputErrorsSummaryComponent> {
  getContent() {
    return this.spectator.element.innerText.trim();
  }

  getErrorButtons() {
    return this.findElements('button');
  }
}
