import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import {
  FormErrorsComponent,
  InputComponent,
  InputErrorsSummaryComponent,
} from '../../component';
import { ComponentPageObject } from './input-errors-summary.component.page-object';

describe('The <tms-input-errors-summary> component', () => {
  const createSpectator = createComponentFactory({
    component: InputErrorsSummaryComponent,
    declarations: [MockComponent(FormErrorsComponent)],
  });

  const getMockedInputComponents = () => {
    const createMockedInputComponent = (label: string) =>
      ({
        focusOnErrors: jasmine.createSpy('focusOnErrors'),
        label,
      } as unknown as InputComponent);

    return [
      createMockedInputComponent('Label of invalid field #1'),
      createMockedInputComponent('Label of invalid field #2'),
    ];
  };

  const setup = () => {
    const spectator = createSpectator({
      props: {
        invalidInputComponents: getMockedInputComponents(),
      },
    });

    return { pageObject: new ComponentPageObject(spectator) };
  };

  it('should display a message mentioning which fields contain errors', () => {
    const { pageObject } = setup();

    expect(pageObject.getContent()).toContain(
      'The following form fields contain one or more errors'
    );

    const errorButtons = pageObject.getErrorButtons();
    expect(errorButtons.length).toBe(2);

    errorButtons.forEach((errorButton, index) => {
      expect(pageObject.getInnerTextOf(errorButton)).toBe(
        pageObject.componentInstance.invalidInputComponents[index].label
      );
    });
  });

  it('should focus on the specific errors of the input when clicking on an error in this summary', () => {
    const { pageObject } = setup();

    const firstErrorButton = pageObject.getErrorButtons()[0];
    const firstInputComponent =
      pageObject.componentInstance.invalidInputComponents[0];

    expect(firstInputComponent.focusOnErrors).not.toHaveBeenCalled();
    pageObject.click(firstErrorButton);
    expect(firstInputComponent.focusOnErrors).toHaveBeenCalledOnceWith();
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
