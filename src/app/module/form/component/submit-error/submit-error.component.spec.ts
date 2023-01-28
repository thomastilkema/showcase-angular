import { createHostFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { FormErrorsComponent, SubmitErrorComponent } from '../../component';
import { ComponentPageObject } from './submit-error.component.page-object';

describe('The <tms-submit-error> component', () => {
  const createSpectator = createHostFactory({
    component: SubmitErrorComponent,
    declarations: [MockComponent(FormErrorsComponent)],
  });

  const setup = () => {
    const spectator = createSpectator(
      '<tms-submit-error>Mocked submit error here</tms-submit-error>'
    );
    return { pageObject: new ComponentPageObject(spectator) };
  };

  it('should display the provided submit error in a <tms-form-errors> component', () => {
    const { pageObject } = setup();

    expect(pageObject.getForErrorsContent()).toBe('Mocked submit error here');
  });

  it('should focus on the form errors component when invoking the "focus" function', () => {
    const { pageObject } = setup();

    // We need a type of "any" to access a private property :(
    const componentInstance: any = pageObject.componentInstance;
    componentInstance.formErrorsComponent = {
      focus: jasmine.createSpy('focus'),
    };
    componentInstance.focus();
    expect(
      componentInstance.formErrorsComponent.focus
    ).toHaveBeenCalledOnceWith();
  });
});
