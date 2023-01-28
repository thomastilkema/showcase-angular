import { AuthenticationError } from './auth.model';

const isOfErrorType = (errorMessage: AuthenticationError, error: Error) =>
  error && error.message === errorMessage;

export const isUserAlreadyExistsError = (error: Error) =>
  isOfErrorType(AuthenticationError.UserAlreadyExists, error);

export const isUserNotFoundError = (error: Error) =>
  isOfErrorType(AuthenticationError.UserNotFound, error);
