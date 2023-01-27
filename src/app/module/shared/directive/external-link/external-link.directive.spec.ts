import { createDirectiveFactory } from '@ngneat/spectator';
import { ExternalLinkDirective } from './external-link.directive';

describe('The "tmsExternalLink" directive', () => {
  const createSpectator = createDirectiveFactory(ExternalLinkDirective);
  const setup = () =>
    createSpectator(
      '<a tmsExternalLink href="https://google.com">This is an external link</a>'
    ).element;

  it('should add a "rel" attribute with "noreferrer" as value', () => {
    const element = setup();

    expect(element.getAttribute('rel')).toBe('noreferrer');
  });

  it('should add a "target" attribute with "_blank" as value', () => {
    const element = setup();

    expect(element.getAttribute('target')).toBe('_blank');
  });
});
