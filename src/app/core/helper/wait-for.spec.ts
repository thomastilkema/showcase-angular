import { fakeAsync, tick } from '@angular/core/testing';
import { waitFor } from './wait-for';

describe('The helper function "waitFor"', () => {
  it('should execute the provided callback function when the provided "getSource" function returns something', fakeAsync(async () => {
    const callback = jasmine.createSpy();

    let source: unknown = null;
    setTimeout(() => {
      source = true;
    }, 100);

    waitFor(() => source, callback);
    tick(200);

    expect(callback).toHaveBeenCalledOnceWith();
  }));

  it('should not execute the provided callback function when it takes too long for the provided "getSource" function to return something', fakeAsync(async () => {
    const callback = jasmine.createSpy();

    let source: unknown = null;
    setTimeout(() => {
      source = true;
    }, 1500);

    waitFor(() => source, callback);
    tick(2000);

    expect(callback).not.toHaveBeenCalled();
  }));
});
