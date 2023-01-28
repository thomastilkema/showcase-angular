import { PageObject } from '@app/test';
import { SignUpPageComponent } from './sign-up-page.component';

export class ComponentPageObject extends PageObject<SignUpPageComponent> {
  getPageTitle() {
    return this.getInnerTextByCss('h1');
  }
}
