import { PendingComponent } from '@app/module/shared';
import { PageObject } from '@app/test';
import { FormComponent, InputErrorsSummaryComponent } from '../../component';

export class ComponentPageObject extends PageObject<FormComponent> {
  getInputErrorsSummaryInstance() {
    return this.findComponentInstance(InputErrorsSummaryComponent);
  }

  getProvidedContentText() {
    return this.getInnerTextOf(this.nativeElement);
  }

  getSubmitError() {
    return this.getInnerTextByCss('tms-submit-error');
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
