import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, Route } from '@app/core';
import { map, Observable } from 'rxjs';

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
export class MainNavComponent implements OnInit {
  sourceCodeUrl = Route.SourceCode;
  isUserLoggedIn$: Observable<boolean>;
  routes$: Observable<MainNavRoute[]>;

  private possibleRoutes: MainNavRoute[] = [
    {
      routerLink: Route.Home,
      routerLinkActiveOptions: { exact: true },
      text: 'Home',
    },
    {
      routerLink: Route.Dashboard,
      routerLinkActiveOptions: { exact: false },
      text: 'Dashboard',
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

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.authService.isUserLoggedIn$;
    this.routes$ = this.isUserLoggedIn$.pipe(
      map((isUserLoggedIn) => this.getRoutes(isUserLoggedIn))
    );
  }

  logOut() {
    this.authService.logOut();
  }

  private filterRoutes(routes: (MainNavRoute | undefined)[]): MainNavRoute[] {
    return routes.filter(Boolean) as MainNavRoute[];
  }

  private findRoute(route: Route): MainNavRoute | undefined {
    return this.possibleRoutes.find(
      (possibleRoute) => possibleRoute.routerLink === route
    );
  }

  private getRoutes(isUserLoggedIn: boolean): MainNavRoute[] {
    if (isUserLoggedIn) {
      return this.filterRoutes([
        this.findRoute(Route.Home),
        this.findRoute(Route.Dashboard),
      ]);
    }

    return this.filterRoutes([
      this.findRoute(Route.Home),
      this.findRoute(Route.SignUp),
      this.findRoute(Route.LogIn),
    ]);
  }
}
