import { PendingComponent } from '@app/module/shared';
import { PageObject } from '@app/test';
import { FormComponent, InputErrorsSummaryComponent } from '../../component';

export class ComponentPageObject extends PageObject<FormComponent> {
  getInputErrorsSummaryInstance() {
    return this.findComponentInstance(InputErrorsSummaryComponent);
  }

  getProvidedContentText() {
    return this.nativeElement.innerText;
  }

  getSubmitError() {
    return this.findElement('tms-submit-error')?.innerText?.trim();
  }

  isDisplayedAsPending() {
    const pendingComponentInstance =
      this.findComponentInstance(PendingComponent);
    return pendingComponentInstance?.isPending ?? false;
  }

  isInputErrorsSummaryDisplayed() {
    return Boolean(this.getInputErrorsSummaryInstance());
  }

  submitForm() {
    const formDebugElement = this.findDebugElement('form');
    if (formDebugElement) {
      formDebugElement.triggerEventHandler('ngSubmit');
      this.detectChanges();
    }
  }
}
