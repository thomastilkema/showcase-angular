import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';

describe('The <tms-app> component', () => {
  const createSpectator = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule],
  });

  it('should display the routed content', () => {
    expect(createSpectator().query('router-outlet')).toBeTruthy();
  });
});
