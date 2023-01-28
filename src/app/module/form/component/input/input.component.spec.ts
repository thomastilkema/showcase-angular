import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@app/module/shared';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent, MockInstance } from 'ng-mocks';
import {
  InputComponent,
  InputErrorsComponent,
  LabelComponent,
} from '../../component';
import { ComponentPageObject } from './input.component.page-object';

describe('The <tms-input> component', () => {
  const createSpectator = createComponentFactory({
    component: InputComponent,
    declarations: [
      MockComponent(IconComponent),
      MockComponent(InputErrorsComponent),
      MockComponent(LabelComponent),
    ],
    imports: [ReactiveFormsModule],
  });

  const setup = () => {
    const formControl = new FormControl();
    const spectator = createSpectator({
      props: {
        control: formControl,
        label: 'Mocked label',
        type: 'email',
      },
    });

    return {
      formControl,
      pageObject: new ComponentPageObject(spectator),
    };
  };

  MockInstance.scope();
  beforeEach(() => {
    MockInstance(
      InputErrorsComponent,
      'focus',
      jasmine.createSpy('focus on input errors')
    );
  });
  afterEach(MockInstance.restore);

  it('should display a label element with the provided label text', () => {
    const { pageObject } = setup();
    expect(pageObject.getLabelText()).toBe('Mocked label');
  });

  describe('when the form control is invalid and marked as dirty', () => {
    it('should display input erros', () => {
      const { formControl, pageObject } = setup();

      formControl.setErrors({ some: 'error' });
      pageObject.detectChanges();
      expect(pageObject.getInputErrorsComponentInstance()).toBeFalsy();

      formControl.markAsDirty();
      pageObject.detectChanges();
      expect(pageObject.getInputErrorsComponentInstance()?.control).toEqual(
        formControl
      );
    });

    it('should display a warning icon', () => {
      const { formControl, pageObject } = setup();

      formControl.setErrors({ some: 'error' });
      pageObject.detectChanges();
      expect(pageObject.getWarningIcon()).toBeFalsy();

      formControl.markAsDirty();
      pageObject.detectChanges();
      expect(pageObject.getWarningIcon()).toBeTruthy();
    });
  });

  it('should display an input field', () => {
    const { pageObject } = setup();

    const inputField = pageObject.getInputField();
    expect(inputField?.getAttribute('type')).toBe('email');
  });

  it('should link the label to input field', () => {
    const { pageObject } = setup();

    const inputField = pageObject.getInputField();
    const labelInstance = pageObject.getLabelInstance();

    expect(labelInstance?.for).toBeTruthy();
    expect(labelInstance?.for).toEqual(
      inputField?.getAttribute('id') as string
    );
  });

  it('should focus on the input errors element when invoking the "focusOnErrors" function', () => {
    const { formControl, pageObject } = setup();

    formControl.setErrors({ some: 'error' });
    formControl.markAsDirty();
    pageObject.detectChanges();

    expect(
      (pageObject.componentInstance as any).inputErrorsComponent.focus
    ).not.toHaveBeenCalled();
    pageObject.componentInstance.focusOnErrors();
    expect(
      (pageObject.componentInstance as any).inputErrorsComponent.focus
    ).toHaveBeenCalledOnceWith();
  });
});
