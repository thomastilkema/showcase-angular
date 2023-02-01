import { RouterTestingModule } from '@angular/router/testing';
import { ExpandableComponent } from '@app/module/shared';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { HomePageComponent } from './home-page.component';
import { ComponentPageObject } from './home-page.component.page-object';

describe('The home page component', () => {
  const createSpectator = createComponentFactory({
    component: HomePageComponent,
    declarations: [MockComponent(ExpandableComponent)],
    imports: [RouterTestingModule],
  });

  const setup = () => new ComponentPageObject(createSpectator());

  it('should display the page title', () => {
    const pageObject = setup();
    const pageTitle = pageObject.getPageTitle();
    expect(pageTitle).toContain('Showcase');
    expect(pageTitle).toContain('of how I write an Angular app');
  });

  it('should display some information about this app', () => {
    const pageObject = setup();
    expect(pageObject.hasAppInformation()).toBe(true);
  });
});
