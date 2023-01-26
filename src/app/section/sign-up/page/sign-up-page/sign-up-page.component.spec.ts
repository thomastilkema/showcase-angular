import { createComponentFactory } from '@ngneat/spectator';
import { SignUpPageComponent } from './sign-up-page.component';
import { ComponentPageObject } from './sign-up-page.component.page-object';

describe('The sign up page component', () => {
  const createSpectator = createComponentFactory(SignUpPageComponent);

  const setup = () => new ComponentPageObject(createSpectator());

  it('should display the page title', () => {
    const pageObject = setup();
    expect(pageObject.getPageTitle()).toBe('This is the sign up page');
  });
});
