import { createComponentFactory } from '@ngneat/spectator';
import { LogInPageComponent } from './log-in-page.component';
import { ComponentPageObject } from './log-in-page.component.page-object';

describe('The log in page component', () => {
  const createSpectator = createComponentFactory(LogInPageComponent);

  const setup = () => new ComponentPageObject(createSpectator());

  it('should display the page title', () => {
    const pageObject = setup();
    expect(pageObject.getPageTitle()).toBe('This is the log in page');
  });
});
