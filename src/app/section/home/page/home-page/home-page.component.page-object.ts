import { PageObject } from '@app/test';
import { HomePageComponent } from './home-page.component';

export class ComponentPageObject extends PageObject<HomePageComponent> {
  hasAppInformation() {
    return this.findElements('tms-expandable').length > 0;
  }

  getPageTitle() {
    return this.getInnerTextByCss('h1');
  }
}
