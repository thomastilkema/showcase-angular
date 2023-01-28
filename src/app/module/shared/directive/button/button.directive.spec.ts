import { createDirectiveFactory } from '@ngneat/spectator';
import { ButtonDirective } from './button.directive';

describe('The "tmsButton" directive', () => {
  const createSpectator = createDirectiveFactory(ButtonDirective);

  it('should add button styling', () => {
    const spectator = createSpectator(
      '<span tmsButton>A span looking like a button<span>'
    );

    expect(spectator.element).toHaveClass(
      'bg-sky-600 hover:bg-sky-700 py-3 px-4 rounded-sm text-white transition-colors'
    );
  });
});
