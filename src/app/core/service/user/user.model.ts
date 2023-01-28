export interface DbUser {
  email: string;
  name: string;
  password: string;
}

export type User = Omit<DbUser, 'password'>;
