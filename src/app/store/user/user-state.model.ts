export interface UserState {
  email: string | null;
  isLoggedIn: boolean;
  name: string | null;
}

export const enum UserStateActionType {
  Login = 'Login',
  Logout = 'Logout',
}
