import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { DefaultLayoutComponent } from './default-layout.component';
import { ComponentPageObject } from './default-layout.component.page-object';

describe('The <tms-default-layout> component', () => {
  const createSpectator = createComponentFactory({
    component: DefaultLayoutComponent,
    declarations: [MockComponent(MainNavComponent)],
    imports: [RouterTestingModule],
  });

  const setup = () => {
    return new ComponentPageObject(createSpectator());
  };

  it('should display the main navigation (within a <header> element)', () => {
    const pageObject = setup();
    expect(pageObject.getMainNavigation()).toBeTruthy();
  });

  it('should display the content of the routed component (within a <main id="main-content">)', () => {
    const pageObject = setup();
    expect(pageObject.getRoutedContent()).toBeTruthy();
  });
});
