import { ButtonDirective } from '@app/module/shared';
import { createHostFactory } from '@ngneat/spectator';
import { MockDirective } from 'ng-mocks';
import { SubmitButtonComponent } from './submit-button.component';
import { ComponentPageObject } from './submit-button.component.page-object';

describe('The <tms-submit-button> component', () => {
  const createSpectator = createHostFactory({
    component: SubmitButtonComponent,
    declarations: [MockDirective(ButtonDirective)],
  });

  const setup = () => {
    const spectator = createSpectator(
      '<tms-submit-button>Mocked button text</tms-submit-button>'
    );
    return { pageObject: new ComponentPageObject(spectator) };
  };

  it('should display a submit button', () => {
    const { pageObject } = setup();

    expect(pageObject.getButtonType()).toBe('submit');
  });

  it('should display the provided button text', () => {
    const { pageObject } = setup();

    expect(pageObject.getButtonText()).toBe('Mocked button text');
  });

  it('should have button styling applied', () => {
    const { pageObject } = setup();

    expect(pageObject.hasButtonAttribute('tmsButton')).toBe(true);
  });

  it('should put focus on the element when invoking the "focus" function', () => {
    const { pageObject } = setup();

    // We need a type of "any" to access a private property :(
    const componentInstance: any = pageObject.componentInstance;
    componentInstance.buttonElement.nativeElement = {
      focus: jasmine.createSpy('focus'),
    };
    componentInstance.focus();
    expect(
      componentInstance.buttonElement.nativeElement.focus
    ).toHaveBeenCalledOnceWith();
  });
});
