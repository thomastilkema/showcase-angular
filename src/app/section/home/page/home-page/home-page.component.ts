import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '@app/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  Route = Route;
}
