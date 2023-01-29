import { Route } from '@app/core';
import { FormComponent, InputComponent } from '@app/module/form';
import { PageObject } from '@app/test';
import { SignUpFormComponent } from './sign-up-form.component';

export class ComponentPageObject extends PageObject<SignUpFormComponent> {
  getFormComponentInstance() {
    return this.findComponentInstance(FormComponent);
  }

  getInputComponenInstanceByLabel(label: string): InputComponent | null {
    return (
      this.getInputComponentInstances().find(
        (inputComponentInstance) => inputComponentInstance.label === label
      ) ?? null
    );
  }

  getNumberOfInputFields() {
    return this.getInputComponentInstances().length;
  }

  getSubmitError() {
    return this.getInnerTextByCss('tms-submit-error');
  }

  hasLinkToLoginPage() {
    return Boolean(this.findElement(`a[href="${Route.LogIn}"]`));
  }

  hasSubmitButton() {
    return Boolean(this.findElement('tms-submit-button'));
  }

  private getInputComponentInstances(): InputComponent[] {
    return this.findComponentInstances(InputComponent);
  }
}
