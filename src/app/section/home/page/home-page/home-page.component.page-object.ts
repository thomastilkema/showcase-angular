import { PageObject } from '@app/test';
import { HomePageComponent } from './home-page.component';

export class ComponentPageObject extends PageObject<HomePageComponent> {
  getPageTitle() {
    return this.findElement('h1')?.innerText.trim();
  }
}