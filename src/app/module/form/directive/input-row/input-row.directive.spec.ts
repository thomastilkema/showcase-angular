import { createDirectiveFactory } from '@ngneat/spectator';
import { InputRowDirective } from './input-row.directive';

describe('The "tmsInputRow" directive', () => {
  const createSpectator = createDirectiveFactory(InputRowDirective);

  it('should add input row styling', () => {
    const spectator = createSpectator(
      '<div tmsInputRow>This element acts as an input row<div>'
    );

    expect(spectator.element).toHaveClass('py-3');
  });
});
