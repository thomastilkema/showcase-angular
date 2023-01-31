import { PageObject } from '@app/test';
import { LogInFormComponent } from '../../component';
import { LogInPageComponent } from './log-in-page.component';

export class ComponentPageObject extends PageObject<LogInPageComponent> {
  getFakeUserCredentials() {
    return this.getInnerTextByCss('p');
  }

  getLoginFormComponentInstance() {
    return this.findComponentInstance(LogInFormComponent);
  }
}
