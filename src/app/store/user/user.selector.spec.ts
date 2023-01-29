import { getMockedUser } from '@app/test';
import { AppState } from '../state.model';
import { selectUser, selectIsUserLoggedIn } from './user.selector';

describe('The state selectors regarding the user', () => {
  const createState = (isUserLoggedIn = true): AppState => ({
    user: {
      ...getMockedUser(),
      ...(isUserLoggedIn ? {} : { email: null, name: null }),
      isLoggedIn: isUserLoggedIn,
    },
  });

  describe('the "selectUser" selector', () => {
    it('should return the user from the state', () => {
      const initialState = createState();
      const user = selectUser.projector(initialState.user);
      expect(user).toEqual(initialState.user);
    });
  });

  describe('the "selectIsUserLoggedIn" selector', () => {
    it('should return the user from the state', () => {
      let isLoggedIn = selectIsUserLoggedIn.projector(createState().user);
      expect(isLoggedIn).toEqual(true);

      isLoggedIn = selectIsUserLoggedIn.projector(createState(false).user);
      expect(isLoggedIn).toEqual(false);
    });
  });
});
