import { fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PendingComponent } from '@app/module/shared';
import { createHostFactory } from '@ngneat/spectator';
import { MockComponents, MockInstance } from 'ng-mocks';
import { delay, of, tap, throwError } from 'rxjs';
import {
  FormComponent,
  InputComponent,
  InputErrorsSummaryComponent,
  SubmitButtonComponent,
  SubmitErrorComponent,
} from '../../component';
import { ComponentPageObject } from './form.component.page-object';

describe('The <tms-form> component', () => {
  const createSpectator = createHostFactory({
    component: FormComponent,
    declarations: [
      ...MockComponents(
        InputComponent,
        InputErrorsSummaryComponent,
        PendingComponent,
        SubmitErrorComponent,
        SubmitButtonComponent
      ),
    ],
    imports: [ReactiveFormsModule],
  });

  const setFormControlErrors = (formGroup: FormGroup) => {
    formGroup.controls['mocked1'].setErrors({ someError: true });
  };

  const setup = (isSuccess = true) => {
    const formGroup = new FormGroup({
      mocked1: new FormControl(),
      mocked2: new FormControl(),
    });

    const onSubmitSpy = jasmine.createSpy('onSubmitSpy');
    const onSubmitErrorSpy = jasmine.createSpy('onSubmitErrorSpy');
    const onSubmitSuccessSpy = jasmine.createSpy('onSubmitSuccessSpy');

    const submitRequest$ = isSuccess
      ? of(true)
      : throwError(() => new Error('mocked error'));

    const spectator = createSpectator(
      `
      <tms-form
        [formGroup]="formGroup"
        [submitRequest$]="submitRequest$"
        (submitEvent)="onSubmitSpy()"
        (submitErrorEvent)="onSubmitErrorSpy($event)"
        (submitSuccessEvent)="onSubmitSuccessSpy($event)"
      >
        <tms-submit-error>
          This is a provided mocked submit error
        </tms-submit-error>

        <p>This is some provided content</p>

        <tms-input
          [control]="formGroup.controls['mocked1']"
          label="Mocked input #1"
          name="mocked-input"
        ></tms-input>

        <tms-input
          [control]="formGroup.controls['mocked2']"
          label="Mocked input #2"
          name="mocked-input-2"
        ></tms-input>

        <p>This is also some provided content</p>

        <tms-submit-button>Submit button</tms-submit-button>
      </tms-form>`,
      {
        hostProps: {
          formGroup,
          onSubmitSpy,
          onSubmitErrorSpy,
          onSubmitSuccessSpy,
          submitRequest$,
        },
      }
    );

    const pageObject = new ComponentPageObject(spectator);
    return {
      formGroup,
      onSubmitSpy,
      onSubmitErrorSpy,
      onSubmitSuccessSpy,
      pageObject,
    };
  };

  MockInstance.scope();
  beforeEach(() => {
    MockInstance(
      InputErrorsSummaryComponent,
      'focus',
      jasmine.createSpy('focus on input errors summary')
    );
    MockInstance(
      SubmitErrorComponent,
      'focus',
      jasmine.createSpy('focus on submit error')
    );
  });
  afterEach(MockInstance.restore);

  it('should display the provided content', () => {
    const { pageObject } = setup();
    const providedContentText = pageObject.getProvidedContentText();

    expect(providedContentText).toContain('This is some provided content');
    expect(providedContentText).toContain('This is also some provided content');
  });

  describe('the summary of input errors', () => {
    it('should not be displayed by default', () => {
      const { pageObject } = setup();
      expect(pageObject.isInputErrorsSummaryDisplayed()).toBe(false);
    });

    it('should be displayed and have focus when the form is submitted while the provided from group is invalid', fakeAsync(() => {
      const { formGroup, pageObject } = setup();

      setFormControlErrors(formGroup);
      pageObject.detectChanges();
      // still not visible, form is not submitted yet
      expect(pageObject.isInputErrorsSummaryDisplayed()).toBe(false);

      pageObject.submitForm();
      expect(pageObject.isInputErrorsSummaryDisplayed()).toBe(true);

      // wait for `inputErrorsSummaryComponent` to become available
      pageObject.tick(0);
      expect(
        (pageObject.componentInstance as any).inputErrorsSummaryComponent.focus
      ).toHaveBeenCalledOnceWith();
    }));

    it('should receive the input component instances having a control being invalid', () => {
      const { formGroup, pageObject } = setup();
      setFormControlErrors(formGroup);
      pageObject.submitForm();

      const inputErrorsSummaryInstance =
        pageObject.getInputErrorsSummaryInstance();
      expect(inputErrorsSummaryInstance?.invalidInputComponents).toHaveLength(
        1
      );
      expect(inputErrorsSummaryInstance?.invalidInputComponents[0].label).toBe(
        'Mocked input #1'
      );
    });
  });

  describe('the provided submit error', () => {
    it('should not be displayed by default', () => {
      const { pageObject } = setup();
      expect(pageObject.getSubmitError()).toBeFalsy();
    });

    it('should be displayed and have focus when the provided submit request throws an error', fakeAsync(() => {
      const { pageObject } = setup(false);

      pageObject.submitForm();
      expect(pageObject.getSubmitError()).toBe(
        'This is a provided mocked submit error'
      );

      // wait for `submitErrorComponent` to become available
      pageObject.tick(0);
      expect(
        (pageObject.componentInstance as any).submitErrorComponent.focus
      ).toHaveBeenCalledOnceWith();
    }));
  });

  describe('when submitting', () => {
    it('should invoke the provided onSubmit function', () => {
      const { onSubmitSpy, pageObject } = setup(false);

      pageObject.submitForm();
      expect(onSubmitSpy).toHaveBeenCalledOnceWith();
    });

    it('should mark the provided form group and all of its controls as dirty', () => {
      const { formGroup, pageObject } = setup(false);

      expect(formGroup.dirty).toBe(false);
      expect(formGroup.controls['mocked1'].dirty).toBe(false);
      expect(formGroup.controls['mocked2'].dirty).toBe(false);

      pageObject.submitForm();
      expect(formGroup.dirty).toBe(true);
      expect(formGroup.controls['mocked1'].dirty).toBe(true);
      expect(formGroup.controls['mocked2'].dirty).toBe(true);
    });

    it('should do nothing when the form is pending (already submitting)', () => {
      const { formGroup, onSubmitSpy, pageObject } = setup();

      pageObject.componentInstance.isPending = true;
      pageObject.submitForm();
      expect(onSubmitSpy).not.toHaveBeenCalled();
      expect(formGroup.dirty).toBe(false);
    });

    describe('when the form is valid', () => {
      it('should execute the provided request', () => {
        const { pageObject } = setup();

        let submitRequestWasExecuted = false;
        const submitRequest$ = of(true).pipe(
          tap(() => {
            submitRequestWasExecuted = true;
          })
        );
        pageObject.componentInstance.submitRequest$ = submitRequest$;

        expect(submitRequestWasExecuted).toBe(false);
        pageObject.submitForm();
        expect(submitRequestWasExecuted).toBe(true);
      });

      it('should display the form as pending while the request is executing', fakeAsync(() => {
        const { pageObject } = setup();

        pageObject.componentInstance.submitRequest$ = of(true).pipe(delay(500));
        expect(pageObject.isDisplayedAsPending()).toBe(false);

        pageObject.submitForm();
        expect(pageObject.isDisplayedAsPending()).toBe(true);

        pageObject.tick(500);
        expect(pageObject.isDisplayedAsPending()).toBe(false);
      }));

      it('should invoke the provided onSubmitSuccess function with the response from the request as argument when it succeeds', () => {
        const { onSubmitErrorSpy, onSubmitSuccessSpy, pageObject } = setup();

        pageObject.submitForm();

        expect(onSubmitSuccessSpy).toHaveBeenCalledOnceWith(true);
        expect(onSubmitErrorSpy).not.toHaveBeenCalled();
      });

      it('should invoke the provided onSubmitError function with the thrown error as argument when the request fails', () => {
        const { onSubmitErrorSpy, onSubmitSuccessSpy, pageObject } =
          setup(false);

        pageObject.submitForm();
        expect(onSubmitSuccessSpy).not.toHaveBeenCalled();
        expect(onSubmitErrorSpy).toHaveBeenCalledOnceWith(
          new Error('mocked error')
        );
      });
    });
  });
});
