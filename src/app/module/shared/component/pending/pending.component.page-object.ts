import { PageObject } from '@app/test';
import { PendingComponent } from './pending.component';

export class ComponentPageObject extends PageObject<PendingComponent> {
  getProvidedContent() {
    return this.getInnerTextOf(this.getContentElement());
  }

  isBlurred() {
    return this.getContentElement()?.classList.contains('blur-sm') ?? false;
  }

  isPending() {
    return this.isBlurred();
  }

  isSpinnerVisible() {
    return Boolean(this.findElement('tms-spinner'));
  }

  private getContentElement() {
    return this.findElement('div > div');
  }
}
