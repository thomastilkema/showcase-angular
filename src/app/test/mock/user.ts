import { omit } from 'lodash';

export const getMockedDbUser = () => ({
  email: 'mocked email',
  name: 'mocked name',
  password: 'mocked password',
});

export const getMockedUser = () => omit(getMockedDbUser(), 'password');
