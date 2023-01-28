import { createDirectiveFactory } from '@ngneat/spectator';
import { SubmitRowDirective } from './submit-row.directive';

describe('The "tmsInputRow" directive', () => {
  const createSpectator = createDirectiveFactory(SubmitRowDirective);

  it('should add submit row styling', () => {
    const spectator = createSpectator(
      '<div tmsSubmitRow>This element acts as a submit row<div>'
    );

    expect(spectator.element).toHaveClass('pt-5');
  });
});
