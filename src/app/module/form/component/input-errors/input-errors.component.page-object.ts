import { PageObject } from '@app/test';
import { InputErrorsComponent } from './input-errors.component';

export class ComponentPageObject extends PageObject<InputErrorsComponent> {
  getText() {
    return this.spectator.element.innerText.trim();
  }
}
