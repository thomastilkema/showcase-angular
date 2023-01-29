import { getMockedUser } from '@app/test';
import { UserAction } from './user.action';
import { initialState, userReducer } from './user.reducer';

describe('The user state', () => {
  const getMockedUserLoggedInState = () => ({
    ...getMockedUser(),
    isLoggedIn: true,
  });

  it('should have a default which has no user name and email and marks the user as logged out', () => {
    expect(initialState).toEqual({
      email: null,
      isLoggedIn: false,
      name: null,
    });
  });

  it('should equal the current state when an unknown action is dispatched', () => {
    const currentState = getMockedUserLoggedInState();
    const state = userReducer(currentState, {
      type: 'unknown action',
      name: 'This name will not be updated',
    } as any);
    expect(state).toEqual(currentState);
  });

  describe('when the user logs in', () => {
    it('should mark the user as logged in and have the name and email address of the user', () => {
      const state = userReducer(
        initialState,
        UserAction.login(getMockedUser())
      );
      expect(state).toEqual(
        jasmine.objectContaining({
          ...getMockedUser(),
          isLoggedIn: true,
        })
      );
    });
  });

  describe('when the user logs out', () => {
    it('should mark the user as logged out and remove the name and email address of the user', () => {
      const state = userReducer(
        getMockedUserLoggedInState(),
        UserAction.logout({})
      );
      expect(state).toEqual(
        jasmine.objectContaining({
          email: null,
          isLoggedIn: false,
          name: null,
        })
      );
    });
  });
});
