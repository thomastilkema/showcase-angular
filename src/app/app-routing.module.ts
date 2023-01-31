import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DefaultLayoutComponent,
  IsLoggedInGuard,
  IsLoggedOutGuard,
  omitFirstCharacter,
  Route,
} from '@app/core';

const routes: Routes = [
  {
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('@app/section/home').then((module) => module.HomeModule),
    path: omitFirstCharacter(Route.Home),
  },
  {
    canMatch: [IsLoggedInGuard],
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('@app/section/dashboard').then((module) => module.DashboardModule),
    path: omitFirstCharacter(Route.Dashboard),
  },
  {
    canMatch: [IsLoggedOutGuard],
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('@app/section/log-in').then((module) => module.LogInModule),
    path: omitFirstCharacter(Route.LogIn),
  },
  {
    canMatch: [IsLoggedOutGuard],
    component: DefaultLayoutComponent,
    loadChildren: () =>
      import('@app/section/sign-up').then((module) => module.SignUpModule),
    path: omitFirstCharacter(Route.SignUp),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
