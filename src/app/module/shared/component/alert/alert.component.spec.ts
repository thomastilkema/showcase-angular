import { createHostFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';
import { AlertComponent, AlertType } from './alert.component';
import { ComponentPageObject } from './alert.component.page-object';

describe('The <tms-alert> component', () => {
  const createSpectator = createHostFactory({
    component: AlertComponent,
    declarations: [MockComponent(IconComponent)],
  });

  const setup = (type: AlertType = 'info', hasRole = true) => {
    const spectator = createSpectator(
      '<tms-alert [hasRole]="hasRole" [type]="type">This is the provided mocked content</tms-alert>',
      {
        hostProps: { hasRole, type },
      }
    );

    const pageObject = new ComponentPageObject(spectator);
    return { pageObject };
  };

  it('should display the provided content', () => {
    const { pageObject } = setup();

    expect(pageObject.getProvidedContent()).toBe(
      'This is the provided mocked content'
    );
  });

  it('should have the role="alert" when the provided property "hasRole" equals true', () => {
    const { pageObject } = setup();

    expect(pageObject.hasAlertRole()).toBe(true);

    pageObject.componentInstance.hasRole = false;
    pageObject.detectComponentChanges();

    expect(pageObject.hasAlertRole()).toBe(false);
  });

  it('should display an icon based on the type of the alert', () => {
    const { pageObject } = setup();

    expect(pageObject.getDisplayedIcon()).toBe('info');

    pageObject.componentInstance.type = 'danger';
    pageObject.detectComponentChanges();
    expect(pageObject.getDisplayedIcon()).toBe('warning');

    pageObject.componentInstance.type = 'success';
    pageObject.detectComponentChanges();
    expect(pageObject.getDisplayedIcon()).toBe('checkmark');
  });
});
