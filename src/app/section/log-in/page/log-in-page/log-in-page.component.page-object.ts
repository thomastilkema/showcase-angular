import { PageObject } from '@app/test';
import { LogInPageComponent } from './log-in-page.component';

export class ComponentPageObject extends PageObject<LogInPageComponent> {
  getPageTitle() {
    return this.findElement('h1')?.innerText.trim();
  }
}
