import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../constant';

interface MainNavRoute {
  routerLink: Route;
  routerLinkActiveOptions: { exact: boolean };
  text: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-main-nav',
  templateUrl: './main-nav.component.html',
})
export class MainNavComponent {
  sourceCodeUrl = Route.SourceCode;

  routes: MainNavRoute[] = [
    {
      routerLink: Route.Home,
      routerLinkActiveOptions: { exact: true },
      text: 'Home',
    },
    {
      routerLink: Route.LogIn,
      routerLinkActiveOptions: { exact: false },
      text: 'Log in',
    },
    {
      routerLink: Route.SignUp,
      routerLinkActiveOptions: { exact: false },
      text: 'Sign up',
    },
  ];
}
