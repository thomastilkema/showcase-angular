import { Route } from '@app/core';
import { PageObject } from '@app/test';
import { MainNavComponent } from './main-nav.component';

export class ComponentPageObject extends PageObject<MainNavComponent> {
  getGoToMainContentLink() {
    return this.findLinkByUrl('#main-content');
  }

  getLogOutButton() {
    return this.findElement('button');
  }

  getNavigationLinks() {
    return this.findElements('nav ul li a');
  }

  hasLinkToDashboardPage() {
    return this.hasLinkToRoute(Route.Dashboard);
  }

  hasLinkToSourceCode() {
    return this.hasLinkToRoute(Route.SourceCode);
  }

  hasLinkToHomePage() {
    return this.hasLinkToRoute(Route.Home);
  }

  hasLinkToLogInPage() {
    return this.hasLinkToRoute(Route.LogIn);
  }

  hasLinkToSignUpPage() {
    return this.hasLinkToRoute(Route.SignUp);
  }

  private findLinkByUrl(url: string) {
    return this.getNavigationLinks().find((anchorElement) => {
      return anchorElement.getAttribute('href') === url;
    });
  }

  private hasLinkToRoute(url: string) {
    return Boolean(this.findLinkByUrl(url));
  }
}
