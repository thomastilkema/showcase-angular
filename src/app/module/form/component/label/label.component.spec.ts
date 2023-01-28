import { createHostFactory } from '@ngneat/spectator';
import { LabelComponent } from './label.component';
import { ComponentPageObject } from './label.component.page-object';

describe('The <tms-label> component', () => {
  const createSpectator = createHostFactory(LabelComponent);

  const setup = () => {
    const spectator = createSpectator(
      '<tms-label [for]="for">Mocked label text</tms-label>',
      {
        hostProps: { for: 'mocked for attribute value' },
      }
    );
    return { pageObject: new ComponentPageObject(spectator) };
  };

  it('should display a label with the provided label text', () => {
    const { pageObject } = setup();

    expect(pageObject.getLabelText()).toBe('Mocked label text');
  });

  it('should have the "for" attribute on the label applied with the provided value', () => {
    const { pageObject } = setup();

    expect(pageObject.getForAttribute()).toBe('mocked for attribute value');
  });
});
