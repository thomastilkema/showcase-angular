import { createComponentFactory } from '@ngneat/spectator';
import { HomePageComponent } from './home-page.component';
import { ComponentPageObject } from './home-page.component.page-object';

describe('The home page component', () => {
  const createSpectator = createComponentFactory(HomePageComponent);

  const setup = () => new ComponentPageObject(createSpectator());

  it('should display the page title', () => {
    const pageObject = setup();
    expect(pageObject.getPageTitle()).toBe('This is the homepage');
  });
});
