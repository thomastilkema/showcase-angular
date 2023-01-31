import { Route } from '@app/core';
import { FormComponent, InputComponent } from '@app/module/form';
import { PageObject } from '@app/test';
import { LogInFormComponent } from './log-in-form.component';

export class ComponentPageObject extends PageObject<LogInFormComponent> {
  getFormComponentInstance() {
    return this.findComponentInstance(FormComponent);
  }

  getInputComponenInstanceByLabel(label: string) {
    return this.getInputComponentInstances().find(
      (inputComponentInstance) => inputComponentInstance.label === label
    );
  }

  getNumberOfInputFields() {
    return this.getInputComponentInstances().length;
  }

  getSubmitError() {
    return this.getInnerTextByCss('tms-submit-error');
  }

  hasLinkToSignupPage() {
    return Boolean(this.findElement(`a[href="${Route.SignUp}"]`));
  }

  hasSubmitButton() {
    return Boolean(this.findElement('tms-submit-button'));
  }

  private getInputComponentInstances() {
    return this.findComponentInstances(InputComponent);
  }
}
