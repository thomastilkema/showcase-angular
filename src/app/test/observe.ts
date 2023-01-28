import { Observable } from 'rxjs';

export interface ObserveResult {
  thrownError: Error | null;
  value: unknown | null;
}

export const observe = (observable: Observable<any>): ObserveResult => {
  let thrownError: ObserveResult['thrownError'] = null;
  let value: ObserveResult['value'] = null;

  const resetError = () => {
    thrownError = null;
  };
  const resetValue = () => {
    value = null;
  };

  try {
    observable.subscribe({
      next: (returnedValue: unknown) => {
        value = returnedValue;
        resetError();
      },
      error: (returnedError: Error) => {
        thrownError = returnedError;
        resetValue();
      },
    });
  } catch (returnedError) {
    thrownError = returnedError as Error;
    resetValue();
  }

  return { thrownError, value };
};
