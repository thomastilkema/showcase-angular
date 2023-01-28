import { createHostFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PendingComponent } from './pending.component';
import { ComponentPageObject } from './pending.component.page-object';

describe('The <tms-pending> component', () => {
  const createSpectator = createHostFactory({
    component: PendingComponent,
    declarations: [MockComponent(SpinnerComponent)],
  });

  const setup = () => {
    const spectator = createSpectator(
      '<tms-pending>This is some mocked provided content</tms-pending>'
    );
    return { pageObject: new ComponentPageObject(spectator) };
  };

  const setPending = (isPending: boolean, pageObject: ComponentPageObject) => {
    pageObject.componentInstance.isPending = isPending;
    pageObject.detectComponentChanges();
  };

  it('should display the provided content', () => {
    const { pageObject } = setup();

    expect(pageObject.getProvidedContent()).toBe(
      'This is some mocked provided content'
    );
  });

  it('should not be pending by default', () => {
    const { pageObject } = setup();

    expect(pageObject.isPending()).toBe(false);
    setPending(true, pageObject);
    expect(pageObject.isPending()).toBe(true);
  });

  it('should make the provided content blurred when pending', () => {
    const { pageObject } = setup();

    expect(pageObject.isBlurred()).toBe(false);
    setPending(true, pageObject);
    expect(pageObject.isBlurred()).toBe(true);
  });

  it('should display a spinner when pending', () => {
    const { pageObject } = setup();

    expect(pageObject.isSpinnerVisible()).toBe(false);
    setPending(true, pageObject);
    expect(pageObject.isSpinnerVisible()).toBe(true);
  });
});
