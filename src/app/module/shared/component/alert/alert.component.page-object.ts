import { PageObject } from '@app/test';
import { IconComponent } from '../icon/icon.component';
import { AlertComponent } from './alert.component';

export class ComponentPageObject extends PageObject<AlertComponent> {
  getDisplayedIcon() {
    return this.getIconComponentInstance()?.name;
  }

  getIconComponentInstance() {
    return this.findComponentInstance(IconComponent);
  }

  getProvidedContent() {
    return this.findElement('tms-icon + div')?.innerText?.trim();
  }

  hasAlertRole() {
    return this.findElement('div')?.getAttribute('role') === 'alert';
  }
}
