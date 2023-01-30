import { AuthService } from '@app/core';
import { createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DashboardPageComponent } from './dashboard-page.component';
import { ComponentPageObject } from './dashboard-page.component.page-object';

describe('The dashboard page', () => {
  const createSpectator = createComponentFactory({
    component: DashboardPageComponent,
    mocks: [AuthService, Store],
    detectChanges: false,
  });

  const setup = () => {
    const spectator = createSpectator();

    const authService = spectator.inject(AuthService);
    const store = spectator.inject(Store);
    store.select.and.returnValue(of({ name: 'Mocked User' }));

    const pageObject = new ComponentPageObject(spectator);
    pageObject.detectChanges();

    return { authService, pageObject };
  };

  it('should display the name of the logged in user', () => {
    const { pageObject } = setup();
    expect(pageObject.getTitle()).toBe('Welcome Mocked User');
  });

  it('should log the user out when hitting the log out button', () => {
    const { authService, pageObject } = setup();

    expect(authService.logOut).not.toHaveBeenCalled();
    pageObject.click(pageObject.getLogOutButton());
    expect(authService.logOut).toHaveBeenCalledOnceWith();
  });
});
