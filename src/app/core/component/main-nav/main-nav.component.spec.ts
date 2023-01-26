import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory } from '@ngneat/spectator';
import { MainNavComponent } from './main-nav.component';
import { ComponentPageObject } from './main-nav.component.page-object';

describe('The <tms-main-content> component', () => {
  const createSpectator = createComponentFactory({
    component: MainNavComponent,
    imports: [RouterTestingModule],
  });

  const setup = () => new ComponentPageObject(createSpectator());

  it('should display anchors within a list inside a <nav> element', () => {
    const pageObject = setup();
    expect(pageObject.getNavigationLinks().length).toBeGreaterThan(1);
  });

  it('should display a link to go to the main content which is only visible to screen readers and when having focus', () => {
    const pageObject = setup();
    const goToMainContentLink = pageObject.getGoToMainContentLink();

    expect(goToMainContentLink?.classList.contains('sr-only')).toBe(true);
    expect(goToMainContentLink?.classList.contains('focus:not-sr-only')).toBe(
      true
    );
  });

  it('should display a link to the home page', () => {
    const pageObject = setup();
    expect(pageObject.hasLinkToHomePage()).toBe(true);
  });

  it('should display a link to the sign up page', () => {
    const pageObject = setup();
    expect(pageObject.hasLinkToSignUpPage()).toBe(true);
  });

  it('should display a link to the log in page', () => {
    const pageObject = setup();
    expect(pageObject.hasLinkToLogInPage()).toBe(true);
  });

  it('should display a link to the source code of this app', () => {
    const pageObject = setup();
    expect(pageObject.hasLinkToSourceCode()).toBe(true);
  });
});
