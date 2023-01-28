import { ElementRef, Renderer2 } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { AlertComponent } from '@app/module/shared';
import { createHostFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { FormErrorsComponent } from './form-errors.component';
import { ComponentPageObject } from './form-errors.component.page-object';

describe('The <tms-form-errors> component', () => {
  const createSpectator = createHostFactory({
    component: FormErrorsComponent,
    declarations: [MockComponent(AlertComponent)],
    mocks: [ElementRef],
    providers: [Renderer2],
    detectChanges: false,
  });

  const waitingTimeToBeVisible = 500;

  const setup = () => {
    const spectator = createSpectator(
      '<tms-form-errors>This is mocked provided content</tms-form-errors>'
    );
    const elementRef = spectator.inject(ElementRef, true);
    const renderer2 = spectator.inject(Renderer2, true);

    let elementIsVisible = false;
    setTimeout(() => {
      elementIsVisible = true;
    }, waitingTimeToBeVisible);

    spyOn(elementRef.nativeElement, 'focus');
    spyOnProperty(elementRef.nativeElement, 'offsetParent', 'get').and.callFake(
      () => (elementIsVisible ? true : null)
    );
    spyOn(renderer2, 'setAttribute').and.callThrough();

    spectator.detectChanges();

    const pageObject = new ComponentPageObject(spectator);

    return { elementRef, pageObject, renderer2 };
  };

  it('should allow this component to have focus', () => {
    const { elementRef, renderer2 } = setup();
    expect(renderer2.setAttribute).toHaveBeenCalledOnceWith(
      elementRef.nativeElement,
      'tabindex',
      '0'
    );
  });

  it('should display the provided content with a <tms-alert> component', () => {
    const { pageObject } = setup();

    expect(pageObject.getProvidedContent()).toBe(
      'This is mocked provided content'
    );
  });

  it('should focus on the element when it is visible when invking the `focus` function', fakeAsync(() => {
    const { elementRef, pageObject } = setup();

    expect(elementRef.nativeElement.focus).not.toHaveBeenCalled();
    pageObject.componentInstance.focus();
    expect(elementRef.nativeElement.focus).not.toHaveBeenCalled(); // element is not visible yet

    pageObject.tick(waitingTimeToBeVisible);
    expect(elementRef.nativeElement.focus).toHaveBeenCalledOnceWith();
  }));
});
