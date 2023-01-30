import { PageObject } from '@app/test';
import { DashboardPageComponent } from './dashboard-page.component';

export class ComponentPageObject extends PageObject<DashboardPageComponent> {
  getLogOutButton() {
    return this.findElement('button');
  }

  getTitle() {
    return this.getInnerTextByCss('h1');
  }
}
