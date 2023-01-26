import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { ComponentPageObject } from './app.component.page-object';

describe('The <tms-app> component', () => {
  const createSpectator = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule],
  });

  const setup = () => new ComponentPageObject(createSpectator());

  it('should display the routed content', () => {
    const pageObject = setup();
    expect(pageObject.getRoutedContent()).toBeTruthy();
  });
});
