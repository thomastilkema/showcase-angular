import { omitFirstCharacter } from './omit-first-characater';

describe('The helper function "omitFirstCharacter"', () => {
  it('should return the whole provided string except for the first character', () => {
    expect(omitFirstCharacter('123')).toBe('23');
    expect(omitFirstCharacter('')).toBe('');
  });
});
