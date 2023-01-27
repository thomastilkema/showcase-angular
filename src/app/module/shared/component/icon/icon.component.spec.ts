import { createComponentFactory } from '@ngneat/spectator';
import { IconComponent } from './icon.component';
import { ComponentPageObject } from './icon.component.page-object';

describe('The <tms-icon> component', () => {
  const createSpectator = createComponentFactory(IconComponent);

  interface Config {
    height?: number;
    width?: number;
  }
  const setup = (config: Partial<Config> = {}) => {
    const spectator = createSpectator({
      props: { ...config, name: 'github' },
    });
    return { pageObject: new ComponentPageObject(spectator) };
  };

  it('should apply the provied with and height to the displayed svg', () => {
    const { pageObject } = setup({ height: 100, width: 150 });

    expect(pageObject.getIconHeight()).toBe(100);
    expect(pageObject.getIconWidth()).toBe(150);
  });

  it('should apply a default with and height of 24 to the displayed svg', () => {
    const { pageObject } = setup();

    expect(pageObject.getIconHeight()).toBe(24);
    expect(pageObject.getIconWidth()).toBe(24);
  });

  it('should point to the right path of the icon', () => {
    const { pageObject } = setup();

    expect(pageObject.getPathToIcon()).toBe('/assets/img/icons.svg#github');
  });
});
