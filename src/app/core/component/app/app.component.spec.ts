import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '@app/core/service';
import { UserAction } from '@app/store/user';
import { getMockedUser } from '@app/test';
import { createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ComponentPageObject } from './app.component.page-object';

describe('The <tms-app> component', () => {
  const createSpectator = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule],
    mocks: [Store, UserService],
  });

  const setup = (hasUserInStorage = false) => {
    const spectator = createSpectator({ detectChanges: false });
    const pageObject = new ComponentPageObject(spectator);

    const store = spectator.inject(Store);
    const userService = spectator.inject(UserService);
    userService.getUserFromStorage.and.returnValue(
      hasUserInStorage ? getMockedUser() : undefined
    );

    pageObject.detectChanges();

    return {
      pageObject,
      store,
      userService,
    };
  };

  it('should display the routed content', () => {
    const { pageObject } = setup();
    expect(pageObject.getRoutedContent()).toBeTruthy();
  });

  it('should check if there is a user saved in storage', () => {
    const { userService } = setup();
    expect(userService.getUserFromStorage).toHaveBeenCalledOnceWith();
  });

  it('should not update the state when there is no user saved in storage', () => {
    const { store } = setup();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should update the state with the user saved in storage as the logged in user', () => {
    const { store } = setup(true);
    expect(store.dispatch).toHaveBeenCalledOnceWith(
      UserAction.login(getMockedUser())
    );
  });
});
