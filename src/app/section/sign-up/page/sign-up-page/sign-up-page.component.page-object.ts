import { PageObject } from '@app/test';
import { SignUpFormComponent } from '../../component';
import { SignUpPageComponent } from './sign-up-page.component';

export class ComponentPageObject extends PageObject<SignUpPageComponent> {
  getRemarksContent() {
    return this.getInnerTextByCss('ul');
  }

  getSignupFormComponentInstance() {
    return this.findComponentInstance(SignUpFormComponent);
  }

  getSignupSuccessMessage() {
    return this.getInnerTextByCss('tms-alert');
  }

  isSignupFormVisible() {
    return Boolean(this.getSignupFormComponentInstance());
  }

  isSignupSuccessMessageVisible() {
    return this.getSignupSuccessMessage() !== undefined;
  }
}
